<?php
$card = htmlspecialchars($_GET["card"],ENT_NOQUOTES);
// $data = htmlspecialchars($_POST["data"],ENT_NOQUOTES);
$savename = htmlspecialchars($_GET["savename"],ENT_NOQUOTES);
header("Access-Control-Allow-Header: true");
header("Access-Control-Allow-Origin: *");
if(file_put_contents("./cards/" . $savename . ".txt", $card) !== FALSE)
{
	echo $card;
}else
{
	echo 'failed saving';
}

?>