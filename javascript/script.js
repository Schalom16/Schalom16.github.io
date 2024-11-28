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







/******************************/
/*declaration des evenements**/
/****************************/
window.addEventListener('load',Affichage_boite_dialogue);
bouton_fermeDialogue.addEventListener("click",Fermeture);
fermerToujours.addEventListener("click",NePlusAfficher);









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
}