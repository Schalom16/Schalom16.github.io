const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let comp=0; //pour compter le nombre de paire de carte bloquer
let tableauTemps=[];//liste des temps


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
  comp=comp+1;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  if(comp==6){
    stopChrono();
    let sec=seconde.textContent;
    let min=minute.textContent;
    let temp=min;
    temp+=sec;
    tableauTemps=JSON.parse(localStorage.getItem("Temps"));
    tableauTemps.push(temp);
    localStorage.setItem("Temps", JSON.stringify(tableauTemps));
  }
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
const rejouer=document.getElementById("rejouer");
const score=document.getElementById("score");
const btn_score=document.getElementById("pause");
const snowflakes = document.querySelector('.snowflakes');

/******************************/
/*declaration des evenements**/
/****************************/
window.addEventListener('load',Affichage_boite_dialogue);
window.addEventListener('load',neige);
bouton_fermeDialogue.addEventListener("click",Fermeture);
fermerToujours.addEventListener("click",NePlusAfficher);
bouton_fermeDialogue.addEventListener("click",play);
fermerToujours.addEventListener("click",play);
rejouer.addEventListener("click",Rejouer);
btn_score.addEventListener("click",Score);






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
    play();
  }
  else{
    AfficheDialogue();
  }
  if(!localStorage.getItem('Temps')){
    localStorage.setItem('Temps',JSON.stringify([10000000000]));
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
    intervalID=setInterval(chrono,1000);
  }
  
}

function stopChrono(){
  clearInterval(intervalID);
  intervalID=null;
}

function Rejouer(){
  location.reload();
}

function Score()
{
  let temporel;
  let temporel2;
  let swap;
  let tableauTemps=JSON.parse(localStorage.getItem("Temps"));
  for(let i=0; i<tableauTemps.length; i++)
  {
    tableauTemps[i]=parseInt(tableauTemps[i]);
  }

  for(let i=0; i<tableauTemps.length; i++){
    for(let j=1; j<tableauTemps.length;j++){
        if(tableauTemps[i]>tableauTemps[j]){
          swap=tableauTemps[i];
          tableauTemps[i]=tableauTemps[j];
          tableauTemps[j]=swap;
        }
    }
  }

  temporel=tableauTemps[0];
  if(temporel<100){
    temporel.toString();
    temporel2="00"+temporel;
  }
  else if(temporel<1000){
    temporel.toString();
    temporel2="0"+temporel;
  }
  else{
    temporel2=temporel.toString();
  }
  let minute_part=temporel2.substring(0, 2);
  let seconde_part=temporel2.substring(2,4);
  score.innerText=minute_part;
  score.innerText+=":";
  score.innerText+=seconde_part;

  score.classList.add("apparition");
}

//creation des flocons de neige
function neige(){
  for (let i = 0; i < 50; i++) {
    let snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = ['❅', '❆', '❄'][Math.floor(Math.random() * 3)];
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDelay = `${Math.random() * 10}s`;
    snowflake.style.fontSize = `${Math.random() * 24 + 12}px`;
    snowflake.style.opacity = Math.random();
    snowflakes.appendChild(snowflake);
}
}