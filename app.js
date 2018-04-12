const qwerty = document.getElementById('qwerty');
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');
let ul = document.getElementById('phrase');
let letter = document.getElementsByClassName('letter');
let missed = 0;
let missedTries = 4;
let tries = document.getElementsByClassName('tries');
let show = document.getElementsByClassName('show');
const phrases = ['An apple a day keeps the doctor away',
                'Those who study will succeed',
                'Those who are healthy are rich',
                'A nice word opens golden gates',
                'Challenges teach you']

//hide the overlay, show the game screen
btnReset.addEventListener('click', ()=>{
  overlay.style.display = 'none';
});

// pick random phrase from phrase array
function getRandomPhraseAsArray(arr){
  let p = arr[Math.floor(Math.random() * arr.length)];
  console.log(p);
  return p.split('');
}
const phraseArray = getRandomPhraseAsArray(phrases);

// create li elements with spaces and letters from the random phrase
function addPhraseToDisplay(phraseArray){
  const ul = phrase.firstElementChild;
  for(let i = 0; i<phraseArray.length; i++){
    let li = document.createElement('li');
    let text = document.createTextNode(phraseArray[i]);
    li.appendChild(text);
    ul.appendChild(li);
    if(phraseArray[i]!==' '){
      li.className = 'letter';
    } 
      if(phraseArray === ' '){
      li.className = 'space';
    }
  }
}
addPhraseToDisplay(phraseArray);

// when click on btn, btn gets blue and if btn.textContent is in the phrase,
//show the letter
function checkLetter(btn){
  let letterFound = null;
  if(btn.tagName === 'BUTTON'){
    btn.setAttribute('disabled', true);
   for(let i=0; i<letter.length; i++){
     if(btn.textContent.toLowerCase()===letter[i].textContent.toLocaleLowerCase()){
       letter[i].classList.add('show');
       letterFound = letter[i].textContent;
       btn.classList.add('chosen');
     }
   }
   if (letterFound === null) {
      missed +=1;
      btn.className = 'btnMiss';
      tries[missedTries].innerHTML = '<img scr="images/lostHeart.png/>';
      missedTries -=1;
    }
   console.log(missed);
   }}

//checking after each click if we reached 5 wrong letters or guessed the phrase and display appropriate display
function checkWin(){
  if(missed === 5){
    overlay.style.display = 'initial';
    overlay.className = ('lose');
    btnReset.textContent = 'you lost!';
  }
  if(letter.length === show.length){
    overlay.style.display = 'initial';
    overlay.className = ('win');
    btnReset.textContent = 'YOU WON!!';
  }
} 


qwerty.addEventListener('click',(e)=>{
    if(e.target.tagName = 'button'){
      let btn = e.target;
      checkLetter(btn);
      checkWin();
    }
});




