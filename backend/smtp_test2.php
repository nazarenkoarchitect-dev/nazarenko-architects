<?php
header('Content-Type: text/plain');

require_once 'config.php';

echo "=== SMTP Test ===\n";
echo "To: " . NOTIFY_EMAIL . "\n\n";

$sock = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 10);
if (!$sock) {
    echo "ERROR: $errstr ($errno)\n";
    exit;
}

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

if (strpos($response, '235') === false) {
    echo "AUTH FAILED!\n";
    fclose($sock);
    exit;
}

echo "Auth OK\n";

fputs($sock, "MAIL FROM:<" . SMTP_USER . ">\r\n");
$response = fgets($sock, 515);
echo "MAIL FROM: $response";

fputs($sock, "RCPT TO:<" . NOTIFY_EMAIL . ">\r\n");
$response = fgets($sock, 515);
echo "RCPT TO: $response";

fputs($sock, "DATA\r\n");
$response = fgets($sock, 515);
echo "DATA: $response";

$subject = 'Тест с сайта ' . date('Y-m-d H:i:s');
$body = "Тестовое письмо\nДата: " . date('Y-m-d H:i:s');

$mimeHeaders = "From: =?UTF-8?B?" . base64_encode("Сайт nazarenkoarchitect") . "?= <" . SMTP_USER . ">\r\n";
$mimeHeaders .= "To: " . NOTIFY_EMAIL . "\r\n";
$mimeHeaders .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
$mimeHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
$mimeHeaders .= "MIME-Version: 1.0\r\n";
$mimeHeaders .= "\r\n";

fputs($sock, $mimeHeaders . $body . "\r\n");
fputs($sock, ".\r\n");
$response = fgets($sock, 515);
echo "SEND: $response";

fputs($sock, "QUIT\r\n");
fclose($sock);

echo "\n=== DONE ===\n";
echo "Check your email inbox and spam folder!\n";
