<?php

function getCurrentVersion()
{
    $sql = "SELECT MAX(GREATEST(Date_inscription, IFNULL(Date_reviewed, 0))) AS revision_date FROM coordinate_systems;";
    $query = tep_db_query($sql);
    $revisionDate = tep_db_fetch_array($query)["revision_date"];
    $dateTime = DateTime::createFromFormat('Y-m-d H:i:s', $revisionDate);
    return intval($dateTime->format('U'));
}

function exitWith404($type) {
    if (isset($_SERVER['REQUEST_METHOD'])) {
        header('Content-Type:',true,404);
        die("Not found ($type)");
    } else {
        throw new \Exception("Not found ($type)");
    }
}

require '../application_top.php';

basicAuthenticate(REST_API_USERNAME, REST_API_PASSWORD);

$version = (isset($_GET['apiversion'])) ? $_GET['apiversion'] : null;
if (!isset($_GET['apiforce']) && ($version===null || !is_numeric($version))) {
    exitWith404("apiversion");
}

$currentVersion = getCurrentVersion();
$version = intval($version);

$response = new stdClass;
$response->currentVersion = $currentVersion;
$response->status = "OK";

if ($currentVersion <= $version && !isset($_GET['apiforce'])) {
    header('Content-Type: application/json; charset=utf-8');
    $response->data = null;
    echo json_encode($response);
    die();
}

unset($_GET['apiversion']);
unset($_GET['apiforce']);

$api = new PHP_CRUD_API(array(
	'dbengine'=>'MySQL',
	'hostname'=>DB_SERVER,
	'username'=>DB_SERVER_USERNAME,
	'password'=>DB_SERVER_PASSWORD,
	'database'=>DB_DATABASE,
	'charset'=>'utf8'
));

ob_start();
$api->executeCommand();
$content = ob_get_contents();
ob_end_clean();

$response->data = json_decode($content,true);

echo json_encode($response);
