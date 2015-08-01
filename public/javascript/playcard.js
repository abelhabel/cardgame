function $(type, parent, className)
{
	var div = document.createElement(type);
	div.className = className;
	parent.appendChild(div);
	return div;
}


function saveUserID()
{
    var signedRequest = FB.getAuthResponse().signedRequest;
    var srObject = JSON.parse(atob(signedRequest.split(".")[1]));
}

function endTurn()
{
    var xmlhttp = xh();
	var p = mainGame.players[0];
	var ks = Object.keys(p);
	var np = {};
	for(var i = 0; i < ks.length; i += 1)
	{
	    k = ks[i];
	    if(typeof p[k] != 'function' && typeof p[k] != 'object')
	    {
	        np[k] = p[k];
	    }
	    
	}
	console.log(np);
	var params = "player=" + JSON.stringify(np) + "&opponent=" + mainGame.players[1].playerID;
	console.log(params);
  	var url = "endTurn.php";
  	xmlhttp.open("POST",url,true);
  	// xmlhttp.withCredentials = true;
  	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			if(xmlhttp.responseText.search('fail!') == -1)
			{
			    displayHint('floating', "it's " + mainGame.players[1].name + " 's turn.");
			    console.log(xmlhttp.responseText);
			}
		}
	}
	
	xmlhttp.send(params);
    
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
	var loadedCard;
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
		    loadedCard = JSON.parse(xmlhttp.responseText);
		    loadedCard.img = loadedCard.img.replace(/http:/g, 'https:');
		    if(loadedCard.img.search(/.jpg/g) == -1 && loadedCard.img.search(/.png/g) == -1)
		    {
		        loadedCard.img += "img/placeholder1.jpg";
		    }
			updateCard(loadedCard, card);
		}
	}
	
	xmlhttp.send(null);
}
function loadDeck(deck)
{
    var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
  	var url = "getDeck.php";
  	xmlhttp.open("GET",url,true);
  	// xmlhttp.withCredentials = true;
  	// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
		    var names = xmlhttp.responseText.replace(/.txt/g, '').split('cards/');
		    names.shift();
			deck.cardNames = names;
// 			updateCard(JSON.parse(xmlhttp.responseText));
		}
	}
	
	xmlhttp.send(null);
}
function updateCard(cardObject, htmlCard)
{
    var cg = htmlCard;
    cg.htmlTitle.innerHTML = cardObject.title;
    cg.htmlImg.style.backgroundImage = "url(" + cardObject.img +")";
    cg.htmlDescription.innerHTML = cardObject.description;
    cg.htmlEnergyCost.innerHTML = cardObject.energyCost || 0;
    cg.htmlCastTime.innerHTML = cardObject.castTime || 0;
    cg.htmlDuration.innerHTML = cardObject.duration || 0;
    cg.htmlProtection.innerHTML = cardObject.protection || 0;

}
function Card(frame)
{
    var card = this;
	//html
	this.htmlFrame = frame;
	this.htmlFrame.chosen = false;
	this.htmlFrame.card = this;
	this.htmlTitle = $('div', this.htmlFrame, 'cardTitle');
	this.htmlTitle.innerHTML = "Card Name Here";
	this.htmlImg = $('div', this.htmlFrame, 'cardImage');
	this.htmlDescription = $('div', this.htmlFrame, 'cardDescription');
	this.htmlDescription.innerHTML = "Type a lengthy description here to give the card some flavor";
	this.htmlEnergyCost = $('div', this.htmlFrame, 'energyCost');
	this.htmlCastTime = $('div', this.htmlFrame, 'castTime');
	this.htmlDuration = $('div', this.htmlFrame, 'duration');
	this.htmlProtection = $('div', this.htmlFrame, 'protection');
	//properties
	this.title = "";
	this.energyCost = 0;
	this.castTime = 0;
	this.duration = 0;
	this.protection = 0;
	this.onCast = {};
	this.htmlFrame.onclick = chooseCardForDeck;
}
function selectCard(card)
{
    card.className += " chosenCard";
}
function deselectCard(card)
{
    card.className = card.className.replace('chosenCard', "");
    card.className = card.className.trim();
}
function chooseCardForDeck()
{
    if(this.className.search('chooseCardSlot') != -1)
    {
        var c = document.getElementById('cardsChosen');
        var m = document.getElementById('maxCards');
        if(this.chosen)
        {
            //display that the card is not chosen
            this.chosen = false;
            deselectCard(this);
            //register how many cards has been chosen.
            c.innerHTML = parseInt(c.innerHTML) - 1;
        }else
        {
            if(parseInt(c.innerHTML) < parseInt(m.innerHTML))
            {
    	        this.chosen = true;
    	        selectCard(this);
    	        c.innerHTML = parseInt(c.innerHTML) + 1;
            }
        }
    }
}

function chooseCardToActivate()
{
    if(this.className.search('closedCardSlot') != -1)
    {
        var p = mainGame.players[0];
        if(p.selectedClosedCard)
        {
            console.log("another card is selected");
            console.log(p.selectedClosedCard);
            //deselect the previously selected card
            p.selectedClosedCard.className = p.selectedClosedCard.className.replace('chosenCard', "");
            p.selectedClosedCard.className = p.selectedClosedCard.className.trim();
            //select the new card
            p.selectedClosedCard = this;
            deselectCard(this);
        }else
        {
            //select this card
            p.selectedClosedCard = this;
            selectCard(this);
        }
    }
}
function Deck()
{
    var d = this;
    this.cardNames = "";
    this.cards = [];
    this.deckCards = [];
    this.closedCards = [];
    this.activeCards = [];
    this.usedCards = [];
    this.getCardNames = function()
    {
        loadDeck(this);
    };
    
    this.shuffle = function()
    {
        var rand;
        var tempcard;
        var newOrder = [];
        for(var i = 0; i < this.closedCards.length; i += 1)
        {
            rand = Math.floor(Math.random() * this.closedCards.length);
            while(newOrder[rand] != undefined)
            {
                rand += 1;
                if(rand > this.closedCards.length)
                {
                    rand = 0;
                }
            }
            newOrder[rand] = this.closedCards[i];
        }
        this.closedCards = newOrder;
    };
}
function Player(name, playerID, savedPlayer)
{
    var p = this;
    // information to save to the server
    this.playerID = playerID;
    this.name = name;
    this.isInGame = false;
    this.gamesPlayed = 0;
    this.gamesWon = 0;
    this.gamesLost = 0;
    this.experience = 0;
    this.level = 0;
    //information used in game logic
    this.currentHealth = 10;
    this.maxHealth = 10;
    this.healthPerTurn = 10;
    this.currentEnergy = 10;
    this.maxEnergy = 10;
    this.energyPerTurn = 1;
    this.damage = 0;
    this.damageBonus = 0;
    this.damageReduction = 0;
    this.globalMinionBonus = 100; //percent
    this.minionChanceToFindEnergy = 0;
    this.minionChanceToFindCard = 0;
    this.minionSurvivalChance = 20; //percent
    this.globalCastTime = 0;
    this.conjurationEffectBonus = 0;
    this.conjuration = 0;
    this.canActivateCard = true;
    this.canCastCards = true;
    this.canBuyMinion = true;
    this.canCombineCards = true;
    this.closedCardSlots = 5;
    this.activeCardSlots = 3;
    
    this.deck = new Deck();
    this.deck.getCardNames();
    
    this.finalizeDeck = function()
    {
        var els = document.getElementsByClassName('chosenCard');
        for(var i = 0; i < els.length; i += 1)
        {
            p.deck.cards[i] = els[i];
        }
        
    };
    this.dealCard = function()
    {
        //only deal a card if there are cards left in the deck
        if(p.deck.cards.length > 0)
        {
            var el = document.getElementById('closedCardsContainerP1')
            var full = true;
            for(var i = 0; i < el.children.length; i += 1)
            {
                if(!el.children[i].occupied)
                {
                    full = false;
                    el.children[i].occupied = true;
                    var card = new Card(el.children[i]);
                    el.children[i].onclick = chooseCardToActivate;
                    p.deck.closedCards[i] = card;
                    var rand = Math.floor(Math.random() * p.deck.cards.length);
                    card.htmlTitle.innerHTML = p.deck.cards[rand].firstChild.innerHTML;
                    loadCard(card);
                    p.deck.cards.splice(rand, 1);
                    break;
                }
            }
            if(full)
            {
                displayHint('floating', "You have no closed card slots left!");
            }
        }else
        {
            displayHint('floating','No cards left!');
        }
    };
    this.activateCard = function()
    {
        console.log('activate card', p.selectedClosedCard);
        if(p.selectedClosedCard && !this.occupied)
        {
            //load the card from the server
            var c = new Card(this);
            c.htmlTitle.innerHTML = p.selectedClosedCard.card.htmlTitle.innerHTML;
            loadCard(c);
            this.occupied = true;
            p.deck.activeCards.push(this);
            //delete the card from the closed card slot
            chooseCardToActivate.call(this);
            p.selectedClosedCard.innerHTML = "";
            p.selectedClosedCard.occupied = false;
            deselectCard(p.selectedClosedCard);
            p.selectedClosedCard = "";
        }
    };
}
function displayHint(displayType, text)
{
    if(displayType == 'floating')
    {
        var el = $('div', document.getElementsByTagName('body')[0], 'floatingHint');
        el.innerHTML = text;
        window.setTimeout(removeElement, 2000, el);
    }
}
function removeElement(el)
{
    el.parentNode.removeChild(el);
}
function Game()
{
    this.players = [];
    this.addPlayer = function(player)
    {
        this.players.push(player);
    };
}
var mainGame = new Game();
window.onload = function()
{
    var navEls = document.getElementById('navigation').children;
    for(var i = 0; i < navEls.length; i += 1)
    {
        navEls[i].onclick = function()
        {
            goToPage(this.getAttribute('data-goto'));
            
        };
    }
    document.getElementById('chooseDeck').onclick = function()
    {
        mainGame.players[0].finalizeDeck();
        goToPage('playPage');
    }
    document.getElementById('dealCard').onclick = function()
    {
        mainGame.players[0].dealCard();
    }
    document.getElementById('endTurn').onclick = endTurn;
    
}


function goToPage(id)
{
    //this makes sure that the navigation is showing the correct location
    var navEls = document.getElementById('navigation').children;
    for(var i = 0; i < navEls.length; i += 1)
    {
        var data_goto = navEls[i].getAttribute('data-goto');
        if(data_goto == id)
        {
            navEls[i].style.color = "white";
        }else
        {
            navEls[i].style.color = "black";
        }
    }
    var pages = ['loginPage', 'findPage', 'chooseDeckPage', 'playPage'];
    for(var i = 0; i < pages.length; i += 1)
    {
        document.getElementById(pages[i]).className = 'hidePage';
        if(id == pages[i])
        {
            document.getElementById(pages[i]).className = 'showPage';
        }
        
    }
    if(id == 'loginPage')
    {
        registerPlayer();
    }
    if(id == 'findPage')
    {
        if(FB.getAuthResponse())
        {
            matchPlayer();
        }
    }
    if(id == 'chooseDeckPage')
    {
        displayDeck();
    }
    if(id == 'playPage')
    {
        //registerMatch();
        //set onclick for active card slots
        var ac = document.getElementsByClassName('activeCardSlot');
        for(var j = 0; j < ac.length; j += 1)
        {
            ac[j].onclick = mainGame.players[0].activateCard;
        }
    }
}

function displayDeck()
{
    var p = mainGame.players[0];
    var cn = p.deck.cardNames;
    var card;
    for(var i = 0; i < cn.length; i += 1)
    {
        card = new Card($('div', document.getElementById('chooseDeckPage'), 'chooseCardSlot'));
        card.htmlTitle.innerHTML = cn[i];
        loadCard(card);
    }
}
function displayPlayerNames()
{
    document.getElementById('p1').innerHTML = mainGame.players[0].name;
    document.getElementById('p2').innerHTML = mainGame.players[1].name;
}
function startGame(response)
{
    mainGame.addPlayer(new Player(response.name, response.id));
    goToPage('loginPage');
    
    console.log("game now starts", response);
}

function lookForPlayers()
{
    
}

function registerPlayer()
{
    var xmlhttp = xh();
	var p = mainGame.players[0];
	var np =
	{
	    playerName: p.name,
	    playerID: p.playerID,
	    isInGame: p.isInGame,
	    gamesPlayed: p.gamesPlayed,
	    gamesWon: p.gamesWon,
	    gamesLost: p.gamesLost,
	    experience: p.experience,
	    level: p.level,
	    lookingForGame: false,
	    isInGameWidth: 0
	};
	var params = "player=" + JSON.stringify(np);
	console.log(params);
  	var url = "registerPlayer.php";
  	xmlhttp.open("POST",url,true);
  	// xmlhttp.withCredentials = true;
  	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			if(xmlhttp.responseText.search('fail!') == -1)
			{
			    //goToPage('findPage');
		        console.log(xmlhttp.responseText);
			    displayHint('floating', "You are now registered. Click 'Find Game' to look for a match.");
			}
		}
	}
	
	xmlhttp.send(params);
}
function matchPlayer()
{
    var xmlhttp = xh();
	var p = mainGame.players[0];
	var np =
	{
	    playerName: p.name,
	    playerID: p.playerID,
	    isInGame: p.isInGame,
	    gamesPlayed: p.gamesPlayed,
	    gamesWon: p.gamesWon,
	    gamesLost: p.gamesLost,
	    experience: p.experience,
	    level: p.level,
	    lookingForGame: true,
	    isInGameWith: 0
	};
	var params = "player=" + JSON.stringify(np);
  	var url = "matchPlayer.php";
  	xmlhttp.open("POST",url,true);
  	// xmlhttp.withCredentials = true;
  	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xmlhttp.setRequestHeader("Access-Control-Allow-Origin","http://localhost");
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
		    console.log(xmlhttp.responseText);
			if(xmlhttp.responseText.search('fail!') == -1)
			{
			    console.log('create game',  xmlhttp.responseText);
			    var ps = JSON.parse(xmlhttp.responseText);
			    mainGame.addPlayer(new Player(ps.playerName, ps.playerID));
			    displayPlayerNames();
			    goToPage('chooseDeckPage');
			}else
			{
			    document.getElementById('findPage').innerHTML = "No match found! Click 'Find game' to try to find a match again."
			    displayHint('floating', "No Match found!");
			}
		}
	}
	
	xmlhttp.send(params);
}
function xh()
{
    var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}










