function $(type, parent, className)
{
	var div = document.createElement(type);
	div.className = className;
	parent.appendChild(div);
	return div;
}

function setMoveResize()
{
    this.style.marginLeft = this.style.marginTop = "0px";
    function changeSize(e)
    {
    	if(e.clientX - this.parentElement.offsetLeft > parseInt(this.style.marginLeft) + this.clientWidth - 15)
    	{
    		this.style.cursor = "e-resize";
    		return;
    	}else
    	{
    		this.style.cursor = "default";
    
    	}
    	if(e.clientY - this.parentElement.offsetTop > parseInt(this.style.marginTop) + this.clientHeight - 15)
    	{
    		this.style.cursor = "s-resize";
    		return;
    	}else
    	{
    		this.style.cursor = "default";
    		return;
    	}
    }
    this.changeSize = changeSize;
    this.changeSize = function(e)
	{
		if(e.clientX - this.parentElement.offsetLeft > parseInt(this.style.marginLeft) + this.clientWidth - 15)
		{
			this.style.cursor = "e-resize";
			return;
		}else
		{
			this.style.cursor = "default";

		}
		if(e.clientY - this.parentElement.offsetTop > parseInt(this.style.marginTop) + this.clientHeight - 15)
		{
			this.style.cursor = "s-resize";
			return;
		}else
		{
			this.style.cursor = "default";
			return;
		}
	}

	//events
	this.onmousedown = function(e)
	{
		//set the offset points to calculate how the div should be dragged
		// and flag the div to be draggable
		console.log(this.style.cursor);
		if(this.style.cursor == "default")
		{
			console.log('start drag');
			this.dragoffsetx = e.clientX - parseInt(this.style.marginLeft);
			this.dragoffsety = e.clientY - parseInt(this.style.marginTop);
			this.startdrag = true;
		}
		if(this.style.cursor == "e-resize")
		{
			this.resizeoriginX = e.clientX;
			this.startResizeX = true;
		}
		if(this.style.cursor == "s-resize")
		{
			this.resizeoriginY = e.clientY;
			this.startResizeY = true;
		}

		//resize
		
	}
	this.onmousemove = function(e)
	{
		// update the div's position if it is draggable
		if(this.startdrag)
		{
			this.style.marginLeft = e.clientX - this.dragoffsetx + "px";
			this.style.marginTop = e.clientY - this.dragoffsety + "px";
		}
		if(this.startResizeX)
		{
			this.style.width = this.clientWidth + e.clientX - this.resizeoriginX + "px";
			this.resizeoriginX = e.clientX;
		}
		if(this.startResizeY)
		{
			this.style.height = this.clientHeight + e.clientY - this.resizeoriginY + "px";
			this.resizeoriginY = e.clientY;
		}
		this.changeSize(e);
	}
	this.onmouseleave = function(e)
	{
		this.startdrag = false;
		this.startResizeX = false;
		this.startResizeY = false;
	}
	this.onmouseup = function(e)
	{
		this.startdrag = false;
		this.startResizeX = false;
		this.startResizeY = false;
	}
}
function edincreaseStat()
{
    console.log(this.min);
	var a = parseInt(this.innerHTML) || this.min;
	a += 1;
	if(a > this.max)
	{
		a = this.min;
	}
	this.innerHTML = a;
}
function eddecreaseStat()
{
    console.log(this.min);
	var a = parseInt(this.innerHTML) || this.min;
	a -= 1;
	if(a < this.min)
	{
		a = this.max;
	}
	this.innerHTML = a;
	return false;
}
function increaseStat(card)
{
    card.target[card.targetstat] += card.targetstatvalue;
}
function decreaseStat(card)
{
    card.target[card.targetstat] -= card.targetstatvalue;
}
function saveCard(card)
{
    var obj = {};
    obj.title = card.htmlTitle.innerHTML;
    obj.img = card.htmlImg.style.backgroundImage.replace("url(","").replace(")","");
    obj.description = card.htmlDescription.innerHTML;
    obj.school = card.cardProperties.school.htmlElement.value;
    obj.energyCost = parseInt(cardGraphics.cardProperties.energyCost.htmlElement.cellValue.innerHTML) || 0;
    obj.duration = parseInt(cardGraphics.cardProperties.duration.htmlElement.cellValue.innerHTML) || 0;
    obj.protection = parseInt(cardGraphics.cardProperties.protection.htmlElement.cellValue.innerHTML) || 0;
    obj.castTime = parseInt(cardGraphics.cardProperties.castTime.htmlElement.cellValue.innerHTML) || 0;
    var onCast = card.cardProperties.onCast;
    obj.onCast = [];
    var temp;
    for(var i = 0; i < card.cardProperties.onCast.length; i += 1)
    {
        temp =
        {
            onCast: onCast[i].onCast.htmlElement.value,
            target: onCast[i].target.htmlElement.value,
            targetStat: onCast[i].targetStat.htmlElement.value,
            targetStatValue: onCast[i].targetStatValue.htmlElement.value
            
        };
        obj.onCast.push(temp);
    }
    console.log(onCast);
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
  	var url = "putFile.php?card=" + JSON.stringify(obj) + "&savename=" + obj.title;
  	xmlhttp.open("GET",url,true);
  	// xmlhttp.withCredentials = true;
  	// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			console.log(xmlhttp.responseText);
		}
	}
	
	xmlhttp.send(null);
}
function loadCard(card)
{
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
  	var url = "getFile.php?filename=" + card.htmlTitle.innerHTML;
  	xmlhttp.open("GET",url,true);
  	// xmlhttp.withCredentials = true;
  	// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			console.log(JSON.parse(xmlhttp.responseText));
			console.log(xmlhttp.responseText);
			updateCard(JSON.parse(xmlhttp.responseText));
		}
	}
	
	xmlhttp.send(null);
}

function updateCard(cardObject)
{
    var cg = cardGraphics;
    var cp = cg.cardProperties;
    console.log("card",cg,cp);
    cg.htmlTitle.innerHTML = cardObject.title;
    cg.htmlImg.style.backgroundImage = "url(" + cardObject.img +")";
    cg.htmlDescription.innerHTML = cardObject.description;
    
    cp.school.htmlElement.value = cardObject.school;
    cp.energyCost.htmlElement.cellValue.innerHTML = cardObject.energyCost || 0;
    cp.duration.htmlElement.cellValue.innerHTML = cardObject.duration || 0;
    cp.protection.htmlElement.cellValue.innerHTML = cardObject.protection || 0;
    cp.castTime.htmlElement.cellValue.innerHTML = cardObject.castTime || 0;
    console.log
    for(var i = 0; i < cardObject.onCast.length; i += 1)
    {
        console.log(typeof cp.onCast[i] != 'object');
        if(typeof cp.onCast[i] != 'object')
        {
            console.log('create new');
            cp.newOnCastButton.onclick();
        }
        cp.onCast[i].onCast.htmlElement.value = cardObject.onCast[i].onCast;
        cp.onCast[i].target.htmlElement.value = cardObject.onCast[i].target;
        cp.onCast[i].targetStat.htmlElement.value = cardObject.onCast[i].targetStat;
        cp.onCast[i].targetStatValue.htmlElement.value = cardObject.onCast[i].targetStatValue;
    }
}
function Card()
{
    var card = this;
	//html
	var table = document.getElementById('table');
	this.htmlFrame = $('div', table, 'cardFrame');
	this.htmlFrame.card = this;
	this.htmlFrame.style.marginLeft = "0px";
	this.htmlFrame.style.marginTop = "0px";
	this.htmlTitle = $('div', this.htmlFrame, 'cardTitle');
	this.htmlTitle.innerHTML = "Card Name Here";
	this.htmlTitle.contentEditable = true;
	this.htmlImg = $('div', this.htmlFrame, 'cardImage');
	this.htmlImg.onclick = arrangeDivs;
	this.htmlDescription = $('div', this.htmlFrame, 'cardDescription');
	this.htmlDescription.contentEditable = true;
	this.htmlDescription.innerHTML = "Type a lengthy description here to give the card some flavor";
	this.saveButton = $('button',this.htmlFrame, 'buttonClass');
	this.saveButton.innerHTML = "Save Card";
	this.saveButton.onclick = function()
	{
	    saveCard(card);
	}
	this.loadButton = $('button', this.htmlFrame, 'buttonClass');
	this.loadButton.innerHTML = "Load Card";
	this.loadButton.onclick = function()
	{
	    loadCard(card);
	}
// 	this.htmlFooter = $('div', this.htmlFrame, 'cardFooter');
// 	this.htmlTypeIcon  = $('div', this.htmlFooter, 'cardProperty');
// 	this.htmlTypeIcon.id = "typeIcon";
// 	this.htmlTypeList = $('select', this.htmlFooter, 'cardPropertyText');
// 	var destruction = $('option', this.htmlTypeList);
// 	destruction.innerHTML = "Destruction";
// 	var conjuration = $('option', this.htmlTypeList);
// 	conjuration.innerHTML = "Conjuration";
// 	var blessing = $('option', this.htmlTypeList);
// 	blessing.innerHTML = "Blessing";
// 	var illusion = $('option', this.htmlTypeList);
// 	illusion.innerHTML = "Illusion";
// 	var harmony = $('option', this.htmlTypeList);
// 	harmony.innerHTML = "Harmony";
// 	var curse = $('option', this.htmlTypeList);
// 	curse.innerHTML = "Curse";
// 	this.htmlPowerIcon = $('div', this.htmlFooter, 'cardProperty');
// 	this.htmlPowerIcon.id = "powerIcon";
// 	this.htmlPowerText = $('div', this.htmlFooter, 'cardPropertyText');
// 	this.htmlPowerText.innerHTML = "Energy cost. Click icon to increase";
// 	this.htmlCastTimeIcon = $('div', this.htmlFooter, 'cardProperty');
// 	this.htmlCastTimeIcon.id = "castTimeIcon";
// 	this.htmlCastTimeText = $('div', this.htmlFooter, 'cardPropertyText');
// 	this.htmlCastTimeText.innerHTML = "Cast time. Click icon to increase";

// 	function increasePower()
// 	{
// 		var a = parseInt(this.innerHTML) || 0;
// 		a += 1;
// 		if(a > 4)
// 		{
// 			a = 0;
// 		}
// 		this.innerHTML = a;
// 	}
// 	this.htmlPowerIcon.onclick = increasePower;
// 	this.htmlCastTimeIcon.onclick = increasePower;
    this.htmlFrame.setMoveResize = setMoveResize;
    this.htmlFrame.setMoveResize();
}
var cardGraphics = new Card();
cardGraphics.cardProperties = new CardProperties(cardGraphics);