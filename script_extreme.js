const character = document.getElementById("hero");
const block = document.getElementById("blocks12");
const blocks2 = document.getElementById("blocks22");
const blocks3 = document.getElementById("blocks32");
const blocks4 = document.getElementById("blocks42");
const highScore = document.getElementById("top-score");

const TIMER = document.getElementById("safeTimerDisplay");
let timerId = null;


let lost = false;
let seconds = 0;

let pop = false;
function GoRight() {
    const posH = character.offsetLeft;
    if (posH < 330){
        character.style.left = (posH + 110) + 'px';
    }
    if (posH==330){ 
        character.style.left = (0) + 'px';
    } 
}

function GoLeft() {
    const posH = character.offsetLeft;
    if (posH > 0) {
        character.style.left = (posH - 110) + 'px';
    }
    if (posH==0){
        character.style.left = (330) + 'px';
    } 
}


function UpdateHighScore() {
    const current = parseInt(TIMER.innerText);
    let scores = JSON.parse(localStorage.getItem('Scores Extreme')) || [];
    scores.push(current);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem('Scores Extreme', JSON.stringify(scores));
    highScore.innerText = scores[0];
}


window.addEventListener("keydown", Mouvement);
function Mouvement(e) {
    if (!lost){
        switch (e.key) {
            case "ArrowRight":
            case "d" :
                GoRight();
                break;

        case "ArrowLeft":
            case "q":
                GoLeft();
                break;
        };
    }
}


// Changement de voie du block
block.addEventListener('animationiteration', BlockMouvement);

function BlockMouvement() { 
  //On trouve la ligne et on mets le block sur la ligne
    const lanes = [0, 110, 220,330];
    const lanesblock = lanes[Math.floor(Math.random() * lanes.length)]
    const lanesblock2 = lanes[Math.floor(Math.random() * lanes.length)]
    const lanesblock3 = lanes[Math.floor(Math.random() * lanes.length)]
    const lanesblock4 = lanes[Math.floor(Math.random() * lanes.length)]

  //block
    block.style.left = lanesblock + 'px';

    if (lanesblock2!=lanesblock) {
        blocks2.style.left = lanesblock2 + 'px';
    }
    else {
        blocks2.style.left = -220 + 'px';
    }

    if (lanesblock3!=lanesblock && lanesblock3!=lanesblock2)  {
        blocks3.style.left = lanesblock3 + 'px';
    }
    else {
    blocks3.style.left = -220 + 'px';
    }


  //block4 
    if (lanesblock4!=lanesblock && lanesblock4!=lanesblock2 && lanesblock4!=lanesblock3)  {
        blocks4.style.left = lanesblock4 + 'px';
    }
    else {
        blocks4.style.left = -220 + 'px';
    }

}


// Vérification collision

setInterval(function() {
    if (lost) return;
    let heroPosition = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let blockPosition =parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    let blockTop =parseInt(window.getComputedStyle(block).getPropertyValue('top'));

  //block2
    let block2Position =parseInt(window.getComputedStyle(blocks2).getPropertyValue('left'));
    let block2Top =parseInt(window.getComputedStyle(blocks2).getPropertyValue('top'));

  //block3
    let block3Position =parseInt(window.getComputedStyle(blocks3).getPropertyValue('left'));
    let block3Top =parseInt(window.getComputedStyle(blocks3).getPropertyValue('top'));

  //block4
    let block4Position =parseInt(window.getComputedStyle(blocks4).getPropertyValue('left'));
    let block4Top =parseInt(window.getComputedStyle(blocks4).getPropertyValue('top'));


  // Zone de collision 
  //block1
    if (heroPosition === blockPosition && blockTop > 420 && blockTop < 600) {
        GameOver();
    }
  //block2
    if (heroPosition === block2Position && block2Top > 420 && block2Top < 600) {
        GameOver();
    }
    if (heroPosition === block3Position && block3Top > 370 && block3Top < 600) {
        GameOver();
    }
    if (heroPosition === block4Position && block4Top > 420 && block4Top < 600) {
        GameOver();
    }

    console.log("hero:", heroPosition, "computed:", parseInt(getComputedStyle(character).left));
}, 50);


window.addEventListener('load', InitHS);

function timer() {
    timerId = setInterval(
        function() {
            document.getElementById("safeTimerDisplay").innerHTML = seconds;
            seconds++;
            if (seconds < 0) {
                clearInterval(timerId);
            }
        }, 1000);
}



timer();

function InitHS() {
    const scores = JSON.parse(localStorage.getItem('Scores Extreme')) || [];
    if (scores.length === 0) {
        highScore.innerText = '0';
    }   
    else {
    highScore.innerText = scores[0];
    }
}

function GameOver() {
    UpdateHighScore();
    PauseAnimation();
    TIMER.innerText = '0';
    seconds = 0;
    character.style.left = '220px';
    lost = true;
    PopDefaite();
}


function PauseAnimation() {
    clearInterval(timerId); // stop timer
    character.style.animationPlayState = 'paused';
    block.style.animationPlayState = 'paused';
    blocks2.style.animationPlayState = 'paused';
    blocks3.style.animationPlayState = 'paused';
    blocks4.style.animationPlayState = 'paused';
}


function PopDefaite() {
    if (pop==false){
        CreationPop();
        pop = true;
    };
}

function CreationPop() {

    const overlay = document.createElement("div");
    overlay.id = "pop";
    overlay.className = "popup-overlay";

        overlay.innerHTML = `
        <div class="popup-content">
            <h2>Vous avez perdu</h2>
            <button id="rejouer">Rejouer</button>
            <h2>Vous ne voulez pas rejouer</h2>
            <a href="index2.html"><button>Ecran d'accueil</button></a>
        </div>
        `;


    document.body.appendChild(overlay);

    document.getElementById("rejouer").addEventListener("click", () => {
        location.reload();
    });
}