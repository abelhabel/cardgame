<?php
$fileNames = Array();
foreach(glob('cards/*.txt') as $filename)
{
	echo $filename;
}
?>