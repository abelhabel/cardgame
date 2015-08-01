function arrangeDivs(e)
{
	var owner = this;
	var sourceNames = localStorage.spellImages.split('./img/');
	sourceNames.shift();
	var frame = $('div', document.getElementsByTagName('body')[0], 'uiBox');
	frame.style.marginLeft = e.clientX + "px";
	frame.style.marginTop = e.clientY + "px";
	var div;

	function deleteSelf()
	{
	    
		this.parentElement.removeChild(this);
	}
	function deleteParent()
	{
		this.parentElement.parentElement.removeChild(this.parentElement);
	}
	function addToOwner()
	{
		owner.style.backgroundImage = this.style.backgroundImage;
		deleteParent.call(this);
	}
	for(var i = 0; i < sourceNames.length; i += 1)
	{
		div = $('div', frame, '');
		div.style.backgroundImage = 'url(img/' + sourceNames[i] + ')';
		div.style.backgroundSize = 'contain';
		div.onclick = addToOwner;
	}
	frame.ondblclick = deleteSelf;

}