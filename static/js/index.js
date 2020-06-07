//declaring constants
let blackJackGame={
    'you':{'span':'#yourScore', 'div':'#yourBox' , 'score':0},
    'dealer':{'span':'#dealerScore' , 'div':'#dealerBox' , 'score':0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsScore': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
    'wins': 0,
    'loses': 0,
    'draws': 0,
    'standClicked':false,
    'turnsOver':false,
}
var YOU= blackJackGame['you'];
var DEALER= blackJackGame['dealer'];
//adding sounds
var hitSound= new Audio('static/sounds/swish.m4a');
var winSound = new Audio('static/sounds/cash.mp3');
var lossSound = new Audio('static/sounds/aww.mp3');
document.querySelector('#hit').addEventListener('click', hitbutton);
document.querySelector('#stand').addEventListener('click', dealerTurn);
document.querySelector('#deal').addEventListener('click', dealButton);

//when hit button is clicked
function hitbutton()
{
    if (blackJackGame['standClicked']===false)
    {
        let card = randomCard();
        showCard(card, YOU);
        scoreUpdate(card,YOU);
        scoreShow(YOU);
    }
    
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerTurn()
{
    blackJackGame['standClicked']=true;
  //choosing random card
  while(DEALER['score'] < 16 && blackJackGame['standClicked']==true ){
    let card = randomCard();
    showCard(card, DEALER);
    scoreUpdate(card,DEALER);
    scoreShow(DEALER);
    await sleep(1000);
  }
     blackJackGame['turnsOver']=true;
     let result = winner();
    printResult(result);
}

//when deal button is clicked
function dealButton()
{
  if(blackJackGame['turnsOver']==true)
  {
    let playerImages = document.querySelector('#yourBox').querySelectorAll('img');
    let botImages = document.querySelector('#dealerBox').querySelectorAll('img');
    //removing images
    for(i=0;i<playerImages.length;i++){
        playerImages[i].remove();
    }
    for(i=0;i<botImages.length;i++){
        botImages[i].remove();
     }
    //setting score back to 0
    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector(YOU['span']).textContent=0;
    document.querySelector(DEALER['span']).textContent=0;
        
    document.querySelector('#yourScore').style.color = '#ffffff'; 
    document.querySelector('#dealerScore').style.color = '#ffffff'; 

    document.querySelector('#bjResult').textContent = "Let's Play!";
    document.querySelector('#bjResult').style.color = "black";

    blackJackGame['standClicked']=false;
    blackJackGame['turnsOver']=false;
  } 
}

//choosing random card
function randomCard()
{
    let randomIndex =  Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card,activePlayer)
{
    if(activePlayer['score']<=21)
    {
        var image= document.createElement('img');   
        image.src=`static/css/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(image);
        hitSound.play();
    }   
    
}

function scoreUpdate(card,activePlayer)
{
    if(card == 'A')
    {
        if(activePlayer['score'] + blackJackGame['cardsScore'][card][1] <= 21)
            {
             activePlayer['score'] += blackJackGame['cardsScore'][card][1];
            }
        else{
             activePlayer['score'] += blackJackGame['cardsScore'][card][0];
            }
    }
    else
    {
        activePlayer['score'] += blackJackGame['cardsScore'][card];
    }
}

//printing score
function scoreShow(activePlayer)
{
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['span']).textContent="BUST!";
        document.querySelector(activePlayer['span']).style.color="red";
    }
    else
    {
        document.querySelector(activePlayer['span']).textContent=activePlayer['score'];
    }
}

function winner(){
    let result;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            console.log('You Won!');
            blackJackGame['wins']++;
            result = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            console.log('You lost!');
            blackJackGame['loses']++;
            result = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            console.log('You Drew!');
            blackJackGame['draws']++;
        }
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You Lost!');
        blackJackGame['loses']++;
        result = DEALER;
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        console.log('You Drew!');
        blackJackGame['draws']++;
    }

    return result;
}

//printing in table and on top
function printResult(result){
    let message, colorMessage;
    if(blackJackGame['turnsOver']==true)
    {
        if(result == YOU){
            document.querySelector('#win').textContent = blackJackGame['wins'];
            message = 'You Won!';
            colorMessage = 'green';
            winSound.play();
        }else if(result == DEALER){
            document.querySelector('#loose').textContent = blackJackGame['loses'];
            message = 'You Lost!';
            colorMessage = 'red';
            lossSound.play();
        }else{
            document.querySelector('#tie').textContent = blackJackGame['draws'];
            message = 'You Drew ';
            colorMessage = 'black';
        }

        document.querySelector('#bjResult').textContent = message;
        document.querySelector('#bjResult').style.color = colorMessage;

    }   
    
}