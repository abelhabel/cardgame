<?php
$player = htmlspecialchars($_POST["player"],ENT_NOQUOTES);
$nplayer = json_decode($player);
$data = file_get_contents("./players/players.txt");
header("Access-Control-Allow-Header: true");
header("Access-Control-Allow-Origin: *");
$users = array_filter(explode("-",$data));
$playerOnFile = json_decode(file_get_contents("./players/" . $nplayer->playerID . ".txt"));
if($playerOnFile->isInGame == true)
{
    $opponent = file_get_contents("./players/" . $playerOnFile->isInGameWith . ".txt");
    echo $opponent;
}else
{
    $returnUser = "fail!";
    for($i = 0; $i < count($users); $i += 1)
    {
        $user = json_decode(file_get_contents("./players/" . $users[$i] . ".txt"));
        if($user->lookingForGame == true && $user->playerID !== $nplayer->playerID)
        {
            $user->lookingForGame = false;
            $nplayer->lookingForGame = false;
            $user->isInGame = true;
            $nplayer->isInGame = true;
            $user->isInGameWith = $nplayer->playerID;
            $nplayer->isInGameWith = $user->playerID;
            $user->playerOrder = 0;
            $nplayer->playerOrder = 1;
            file_put_contents("./players/" . $user->playerID . ".txt", json_encode($user));
            file_put_contents("./players/" . $nplayer->playerID . ".txt", json_encode($nplayer));
            
            $folderName = "./matches/" . $user->playerID . "-" . $nplayer->playerID;
            mkdir($folderName, 0700);
            if(is_dir($folderName) === FALSE)
            {
                
            }
            file_put_contents($folderName . "/" . $nplayer->playerID . ".txt", json_encode($nplayer));
            file_put_contents($folderName . "/" . $user->playerID . ".txt", json_encode($user));
            $returnUser = json_encode($user);
        }
    }
    if($returnUser == "fail!")
    {
        $nplayer->lookingForGame = true;
        file_put_contents("./players/" . $nplayer->playerID . ".txt", json_encode($nplayer));
    }
    echo $returnUser;
}
?>