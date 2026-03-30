<?php
header('Content-Type: application/json');

$testEmail = 'nazarenkoarchitect@yandex.ru';
$subject = 'Тест с хостинга';
$body = 'Тестовое письмо от ' . date('d.m.Y H:i');

$headers = "From: nazarenkoarchitect@yandex.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$result = mail($testEmail, $subject, $body, $headers);

echo json_encode(['success' => $result, 'time' => date('d.m.Y H:i')]);
