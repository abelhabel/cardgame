<?php
$filename = htmlspecialchars($_GET["filename"]);
$data = file_get_contents("./cards/" . $filename . ".txt");
header("Access-Control-Allow-Header: true");
header("Access-Control-Allow-Origin: *");
if($data !== FALSE)
{
	echo $data;
}else
{
	echo 'failed loading';
}

?>