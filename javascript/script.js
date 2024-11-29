const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);

}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

/***********************code ben**************************/

/****************************/
/*declaration des constantes*/
/****************************/
const maBoite=document.getElementById("dialogue");
const bouton_fermeDialogue=document.getElementById("ferme_dialogue");
const fermerToujours=document.getElementById("fermerPourToujours");
const minute=document.getElementById('chrono_minute');
const seconde=document.getElementById('chrono_seconde');
let intervalID;
let compteur=0; //utiliser dasns une fonction plus haut pour savoir si toutes les cartes ont été checké




/******************************/
/*declaration des evenements**/
/****************************/
window.addEventListener('load',Affichage_boite_dialogue);
bouton_fermeDialogue.addEventListener("click",Fermeture);
fermerToujours.addEventListener("click",NePlusAfficher);
bouton_fermeDialogue.addEventListener("click",play);
fermerToujours.addEventListener("click",play);








/******************************/
/*****code intermédiaire******/
/****************************/










/************************************/
/*****déclaration des fonctions*****/
/**********************************/
function AfficheDialogue()
{
    maBoite.showModal();
}

function Fermeture(){
  maBoite.close();
}

function Affichage_boite_dialogue()
{
  if(localStorage.getItem('nePlusAfficher'))
  {
    maBoite.style.display="none";
  }
  else{
    AfficheDialogue();
  }
}

function NePlusAfficher(){
  localStorage.setItem('nePlusAfficher','true');
  Fermeture();
  play();
}

function chrono(){
  let sec=seconde.textContent;
  let min=minute.textContent;
  sec=parseInt(sec);
  sec=sec+1;
  if(sec==60){
    min=parseInt(min);
    min=min+1;
    sec=0;
    if(min<10){
      minute.innerText="0"+min;
    }
    else{
      minute.innerText=min;
    }
   
  }

  if(sec<10){
    seconde.innerText="0"+sec;
  }
  else{
    seconde.innerText=sec
  }
}

function play(){

  if(!intervalID)
  {
    setInterval(chrono,1000);
  }
  
}

function stopChrono(){
  clearInterval(intervalID);
  intervalID=null;
}