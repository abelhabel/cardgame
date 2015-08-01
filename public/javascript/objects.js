
function createRow(appendTo, nameEditable, valueEditable)
{
	var row = document.createElement('tr');
	appendTo.appendChild(row);
	row.cellName = document.createElement('td');
	row.cellValue = document.createElement('td');
	row.appendChild(row.cellName);
	row.appendChild(row.cellValue);
	row.cellName.contentEditable = nameEditable;
	row.cellValue.contentEditable = valueEditable;
	return row;
}

function List(name,owner, optionValues)
{
    this.name = name;
    this.htmlElement = $('select',owner, "listClass");
    var option;
    for(var i = 0; i < optionValues.length; i += 1)
    {
        option = $('option', this.htmlElement);
        option.innerHTML = optionValues[i];
    }
}
function Stat(name, owner, min, max, htmlElement)
{
    var stat = this;
    this.name = name;
    this.htmlElement = htmlElement;
    owner.min = min;
    owner.max = max;
    owner.innerHTML = min;
    owner.onclick = function()
    {
        edincreaseStat.call(owner);
        stat.value = parseInt(owner.innerHTML);
    }
    owner.oncontextmenu = function()
    {
        eddecreaseStat.call(owner);
        stat.value = parseInt(owner.innerHTML);
    }
}
function CardProperties()
{
    var card = this;
    var body = document.getElementsByTagName('body')[0];
    var frame = $('div', body, "cardFrame");
    setMoveResize.call(frame);
    frame.style.marginLeft = "400px";
    var row;
    var table = $('table', frame);
    row = createRow(table, false, false);
    this.school = new List('school', row.cellValue,['Destruction', 'Conjuration', 'Illusion', 'Blessing', 'Curse', 'Harmony']);
    row.cellName.innerHTML = "School";
    row = createRow(table, false, false);
    this.energyCost = new Stat('energyCost', row.cellValue,0,4,row);
    row.cellName.innerHTML = "Energy Cost";
    row = createRow(table, false, false);
    this.duration = new Stat('duration',row.cellValue, 0,4,row);
    row.cellName.innerHTML = "Duration";
    row = createRow(table, false, false);
    this.protection = new Stat('protection', row.cellValue, 0,4,row);
    row.cellName.innerHTML = "Protection";
    row = createRow(table, false, false);
    this.castTime = new Stat('casttime', row.cellValue, 0,4,row);
    row.cellName.innerHTML = "Cast Time";
    
    //events
    var onCastFunctions = ['increaseStat', 'decreaseStat', 'destroyCard','destroyMinion','disableCard','enableCard', 'disableStat','enableStat', 'scrambleCards', 'summonMinion', 'activateCards', 'giveIllusionCards', 'repeatAction', 'increaseStatPerConjurationCard'];
    var stats = ['none', 'currentHealth', 'maxHealth', 'healthPerTurn', 'damageReduction' ,'damage', 'damageBonus', 'maxEnergy', 'currentEnergy', 'energyPerTurn', 'minionChanceToFindEnergy', 'minionChanceToFindCard', 'minionSurvivalChance', 'globalCastTime','conjurationEffectBonus','conjuration','canActivateCard', 'canCastCards','canBuyMinion', 'closedCardSlots', 'activeCardSlots', 'canCombineCards', 'globalMinionBonus'];
    var statValues = [0,1,2,3,4,5,6,7,8,9,10];
    
    var addOnCastButton = $('button',frame, 'buttonClass');
    this.newOnCastButton = addOnCastButton;
    addOnCastButton.innerHTML = "Add On Cast";
    this.onCast = [];
    addOnCastButton.onclick = function()
    {
        var obj = {};
        var row = createRow(table, false, false);
        row.cellName.innerHTML = "On Cast";
        obj.onCast = new List('oncast', row.cellValue, onCastFunctions);
        obj.target = new List('target', row.cellValue, ['Self', "Own card", 'Opponent', 'Opponent card']);
        obj.targetStat = new List('targetstat', row.cellValue, stats);
        obj.targetStatValue = new List('targetstatvalue', row.cellValue,statValues);
        card.onCast.push(obj);
    }
}






























