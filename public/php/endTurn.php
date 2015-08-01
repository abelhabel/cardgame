<?php
$player = htmlspecialchars($_POST["player"],ENT_NOQUOTES);
$nplayer = json_decode($player);
$playerOnFile = json_decode(file_get_contents("./players/" . $nplayer->playerID . ".txt"));
$opponent = json_decode(file_get_contents("./players/" . $nplayer->isInGameWith . ".txt"));
$opponentID = htmlspecialchars($_POST["opponent"],ENT_NOQUOTES);
header("Access-Control-Allow-Header: true");
header("Access-Control-Allow-Origin: *");

if($playerOnFile->playerOrder == 0)
{
    $folderName = "./matches/" . $playerOnFile->playerID . "-" . $playerOnFile->isInGameWith . "/";
}else
{
    $folderName = "./matches/" . $playerOnFile->isInGameWith . "-" . $playerOnFile->playerID . "/";
}

file_put_contents($folderName . $playerOnFile->playerID . ".txt", $player);
echo($folderName . " " . $player);
?>