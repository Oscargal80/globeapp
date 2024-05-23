<?php
header('Content-Type: application/json');

$ip = $_SERVER['REMOTE_ADDR'];
$details = @file_get_contents("http://ipinfo.io/{$ip}/json");
if ($details === FALSE) {
    $details = new stdClass();
    $details->loc = 'N/A';
    $details->org = 'N/A';
} else {
    $details = json_decode($details);
}

$response = array(
    "ip" => $ip,
    "location" => $details->loc,
    "organization" => $details->org
);

echo json_encode($response);
?>
