<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$log = [];
$log[] = "=== Request at " . date('Y-m-d H:i:s') . " ===";
$log[] = "POST: " . json_encode($_POST);
$log[] = "Headers: " . json_encode(getallheaders());

require_once 'config.php';

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$projectType = trim($_POST['projectType'] ?? $_POST['project_type'] ?? '');
$message = trim($_POST['message'] ?? '');

$log[] = "Parsed - name: $name, phone: $phone, email: $email, projectType: $projectType";

if (empty($name) || empty($phone)) {
    http_response_code(400);
    $log[] = "ERROR: Missing name or phone";
    file_put_contents('/var/www/u3452422/data/www/api.nazarenkoarchitect.ru/log.txt', implode("\n", $log) . "\n\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Имя и телефон обязательны']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("INSERT INTO leads (name, phone, email, project_type, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $phone, $email, $projectType, $message]);
    $log[] = "DB: Inserted successfully";

    $emailSubject = 'Новая заявка с сайта nazarenkoarchitect.ru';
    $emailBody = "Имя: $name\nТелефон: $phone\nEmail: $email\nТип проекта: $projectType\nСообщение: $message\n\n---\nДата: " . date('d.m.Y H:i');
    $log[] = "Email body prepared";

    $sock = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 10);
    if (!$sock) {
        $log[] = "SMTP ERROR: $errstr ($errno)";
        throw new Exception("SMTP connection failed: $errstr ($errno)");
    }

    $log[] = "SMTP: Connected";
    
    fgets($sock, 515);
    fputs($sock, "EHLO api.nazarenkoarchitect.ru\r\n");
    while ($line = fgets($sock, 515)) {
        if (substr($line, 3, 1) === ' ') break;
    }
    
    fputs($sock, "AUTH LOGIN\r\n");
    fgets($sock, 515);
    fputs($sock, base64_encode(SMTP_USER) . "\r\n");
    fgets($sock, 515);
    fputs($sock, base64_encode(SMTP_PASS) . "\r\n");
    $response = fgets($sock, 515);
    $log[] = "SMTP Auth: $response";
    
    if (strpos($response, '235') === false) {
        $log[] = "SMTP AUTH FAILED!";
        throw new Exception("SMTP auth failed");
    }
    
    fputs($sock, "MAIL FROM:<" . SMTP_USER . ">\r\n");
    fgets($sock, 515);
    fputs($sock, "RCPT TO:<" . NOTIFY_EMAIL . ">\r\n");
    fgets($sock, 515);
    fputs($sock, "DATA\r\n");
    fgets($sock, 515);
    
    $mimeHeaders = "From: =?UTF-8?B?" . base64_encode("Сайт nazarenkoarchitect") . "?= <" . SMTP_USER . ">\r\n";
    $mimeHeaders .= "To: " . NOTIFY_EMAIL . "\r\n";
    $mimeHeaders .= "Subject: =?UTF-8?B?" . base64_encode($emailSubject) . "?=\r\n";
    $mimeHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $mimeHeaders .= "\r\n";
    
    fputs($sock, $mimeHeaders . $emailBody . "\r\n");
    fputs($sock, ".\r\n");
    $response = fgets($sock, 515);
    $log[] = "SMTP Send response: $response";
    
    fputs($sock, "QUIT\r\n");
    fclose($sock);
    
    $log[] = "SUCCESS! Email sent";

    file_put_contents('/var/www/u3452422/data/www/api.nazarenkoarchitect.ru/log.txt', implode("\n", $log) . "\n\n", FILE_APPEND);
    echo json_encode(['success' => true, 'message' => 'Заявка принята']);
} catch (Exception $e) {
    $log[] = "EXCEPTION: " . $e->getMessage();
    file_put_contents('/var/www/u3452422/data/www/api.nazarenkoarchitect.ru/log.txt', implode("\n", $log) . "\n\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}
