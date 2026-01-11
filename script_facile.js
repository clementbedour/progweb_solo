const character = document.getElementById("hero");
const block = document.getElementById("blocks");
const block2 = document.getElementById("blocks2");
const highScore = document.getElementById("top-score");


const TIMER = document.getElementById("safeTimerDisplay");
let timerId = null;

let lost = false;
let seconds = 0;

let pop = false;


function GoRight() {
    const posH = character.offsetLeft;
    if (posH < 220){
        character.style.left = (posH + 110) + 'px';
    }
    if (posH==220){ 
        character.style.left = (0) + 'px';
    } 
}

function GoLeft() {
    const posH = character.offsetLeft;
    if (posH > 0) {
        character.style.left = (posH - 110) + 'px';
    }
    if (posH==0){ 
        character.style.left = (220) + 'px';
    } 
}



// maj du meilleur score
function UpdateHighScore() {
    const current = parseInt(TIMER.innerText);
    let scores = JSON.parse(localStorage.getItem('Scores Easy')) || [];
    scores.push(current);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem('Scores Easy', JSON.stringify(scores));
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
    const lanes = [0, 110, 220];
    //On trouve la ligne et on mets le block sur la ligne
    const lanesblock = lanes[Math.floor(Math.random() * lanes.length)]
    block.style.left = lanesblock + 'px';

  //On mets 50% du temps block2 et si ligne diff alors apparition block2
    const apparition = Math.random();
    if (apparition>0.5) {
        block2.style.left = -220 + 'px';
    }
    if (apparition<0.5) {
        const lanesblock2 = lanes[Math.floor(Math.random() * lanes.length)]
        if (lanesblock2!=lanesblock) {
            block2.style.left = lanesblock2 + 'px';
        }
    }
}



// Vérification collision
setInterval(function() {
    if (lost) return;
    let heroPosition = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let blockPosition =parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    let blockTop =parseInt(window.getComputedStyle(block).getPropertyValue('top'));

  //block2
    let block2Position =parseInt(window.getComputedStyle(block2).getPropertyValue('left'));
    let block2Top =parseInt(window.getComputedStyle(block2).getPropertyValue('top'));

  // Zone de collision 
  //block1
    if (heroPosition === blockPosition && blockTop > 300 && blockTop < 530) {
        GameOver();
}

  //block2
    if (heroPosition === block2Position && block2Top > 350 && block2Top < 530) {
        GameOver();   
}}, 50);




// Chargement initial du high score 
window.addEventListener('load', InitHS);



function timer() {
    timerId = setInterval(
        function() {
            document.getElementById("safeTimerDisplay").innerHTML = seconds;
            seconds++;
        }, 1000);
}
timer();

function InitHS() {
    const scores = JSON.parse(localStorage.getItem('Scores Easy')) || [];
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
    character.style.left = '110px';
    lost = true;
    PopDefaite();
}


function PauseAnimation() {
    clearInterval(timerId); // stop timer
    character.style.animationPlayState = 'paused';
    block.style.animationPlayState = 'paused';
    block2.style.animationPlayState = 'paused';
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
            <a href="index.html"><button>Ecran d'accueil</button></a>
        </div>
        `;

    document.body.appendChild(overlay);

    document.getElementById("rejouer").addEventListener("click", () => {
        location.reload();
    });
}