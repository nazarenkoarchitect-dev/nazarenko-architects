<?php
header('Content-Type: text/plain');

require_once 'config.php';

echo "Testing SMTP connection...\n";
echo "Host: " . SMTP_HOST . "\n";
echo "User: " . SMTP_USER . "\n\n";

$sock = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 10);

if (!$sock) {
    echo "FAILED: $errstr ($errno)\n";
    exit;
}

echo "Connected!\n";

fgets($sock, 515);
fputs($sock, "EHLO api.nazarenkoarchitect.ru\r\n");
while ($line = fgets($sock, 515)) {
    if (substr($line, 3, 1) === ' ') break;
}

fputs($sock, "AUTH LOGIN\r\n");
$response = fgets($sock, 515);
echo "AUTH LOGIN: $response\n";

fputs($sock, base64_encode(SMTP_USER) . "\r\n");
$response = fgets($sock, 515);
echo "Username: $response\n";

fputs($sock, base64_encode(SMTP_PASS) . "\r\n");
$response = fgets($sock, 515);
echo "Password response: $response\n";

if (strpos($response, '235') === false) {
    echo "AUTH FAILED!\n";
    fclose($sock);
    exit;
}

echo "AUTH SUCCESS!\n";

fputs($sock, "MAIL FROM:<" . SMTP_USER . ">\r\n");
fgets($sock, 515);

fputs($sock, "RCPT TO:<" . NOTIFY_EMAIL . ">\r\n");
fgets($sock, 515);

fputs($sock, "DATA\r\n");
fgets($sock, 515);

$emailBody = "Test email at " . date('Y-m-d H:i:s');
$mimeHeaders = "From: =?UTF-8?B?" . base64_encode("Сайт") . "?= <" . SMTP_USER . ">\r\n";
$mimeHeaders .= "To: " . NOTIFY_EMAIL . "\r\n";
$mimeHeaders .= "Subject: =?UTF-8?B?" . base64_encode("Тест") . "?=\r\n";
$mimeHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
$mimeHeaders .= "\r\n";

fputs($sock, $mimeHeaders . $emailBody . "\r\n");
fputs($sock, ".\r\n");
fgets($sock, 515);

fputs($sock, "QUIT\r\n");
fclose($sock);

echo "\nDONE!";
