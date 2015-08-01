function createEmptyCards()
{
    var cards = document.getElementsByClassName('closedCardSlot');
    var card;
    for(var i = 0; i < cards.length; i += 1)
    {
        card = new Card(cards[i]);
    }
}
//createEmptyCards();