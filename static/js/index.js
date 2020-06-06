let blackJackGame={
    'you':{'span':'#yourScore', 'div':'#yourBox' , 'score':0},
    'dealer':{'span':'#dealerScore' , 'div':'#dealerBox' , 'score':0}
}
var YOU= blackJackGame['you'];
var DEALER= blackJackGame['dealer'];

document.querySelector('#hit').addEventListener('click', hitbutton);
function hitbutton()
{
    var image= document.createElement('img');
    image.src='static/css/images/Q.png';
    document.querySelector(YOU['div']).appendChild(image);

}