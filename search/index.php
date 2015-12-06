<?php
// Use AWS SDK as a proxy for Embedr cloudsearch.
include_once('config.php'); // Should set $config['cloudsearch']
require('vendor/autoload.php');
$client = new Aws\CloudSearchDomain\CloudSearchDomainClient([
  'endpoint' => $config['cloudsearch'],
  'version'  => '2013-01-01',
  'credentials' => false
]);
$query = $_GET['query'];
$start = $_GET['start'];
$result = $client->search(["query" => $query, 'queryParser' => 'lucene', 'size' => 120, 'start' => $start]);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$hits = $result['hits'];
echo json_encode(['total' => $hits['found'], 'start' => $hits['start'],'hits' => $hits['hit']]);
?>
