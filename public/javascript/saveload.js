function getFileNames()
{
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
  	var url = "getfilenames.php";
  	xmlhttp.open("GET",url,true);
  	// xmlhttp.withCredentials = true;
  	// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
  	var done = false;
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			localStorage.spellImages = xmlhttp.responseText;
		}
	}
	
	xmlhttp.send(null);
}
getFileNames();
