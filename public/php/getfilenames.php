<?php
$fileNames = Array();
foreach(glob('./img/*.jpg') as $filename)
{
	echo $filename;
}
?>