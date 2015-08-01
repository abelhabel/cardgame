<?php
$player = htmlspecialchars($_POST["player"],ENT_NOQUOTES);
$nplayer = json_decode($player);
$data = file_get_contents("./players/players.txt");
header("Access-Control-Allow-Header: true");
header("Access-Control-Allow-Origin: *");
$users = explode("-",$data);
$pos = strpos($data, $nplayer->playerID);

function saveIndividual()
{
    global $nplayer, $player;
    //check if the player has an individual text file created
    if(file_get_contents("./players/" . $nplayer->playerID . ".txt") === FALSE)
    {
        //create the text file for the player
        if(file_put_contents("./players/" . $nplayer->playerID . ".txt", $player) !== FALSE)
        {
        }else
        {
            echo "failed saving a new text file for this player but";
        }
    }else
    {
        echo "failed saving a new text file for this player ";
    }
}

if($pos === FALSE) 
{
    if(file_put_contents("./players/players.txt", $nplayer->playerID . "-", FILE_APPEND) !== FALSE)
    {
        //the player was not registerd but has now been registered
        //save an individual text file for this player
        saveIndividual();
        //look for another player and return the first player who is not in a game
    }else
    {
    	echo 'fail!';
    }
}else
{
    //the player is already registered
    //look for another player and return the first player whos is no in a game
    // echo "already registered";
    saveIndividual();
}
?>