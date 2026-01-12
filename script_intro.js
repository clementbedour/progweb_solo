const nameInput = document.querySelector('#playerName');
const submitButton = document.querySelector('#validerValidation');


function afficherScores(niveau, idElement) {
    let scores = JSON.parse(localStorage.getItem(niveau)) || [];
    const scoresList = document.getElementById(idElement);
    scoresList.innerHTML = '';

    if (scores.length > 0) {
        for (let i = 0; i < 5; i++) {
            const score = scores[i];
            const scoreItem = document.createElement('div');
            if (score !== undefined) {
                scoreItem.textContent = `Top ${i + 1} : ${score}`;
            } 
            else {
                scoreItem.textContent = `Top ${i + 1} : Aucun score`;
                scoreItem.classList.add('empty');
            }
            scoresList.appendChild(scoreItem);
        }
    } else {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = 'Aucune partie jouée';
        scoreItem.classList.add('empty');
        scoresList.appendChild(scoreItem);
    }
}

// Affiche les scores pour chaque niveau au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    afficherScores('Scores Easy', 'score-simple');
    afficherScores('Scores Difficile', 'score-dur');
    afficherScores('Scores Extreme', 'score-ext');
});


//Validation

if (document.getElementById('validerValidation')) {
    const nameInput = document.querySelector('#playerName');
    const submitButton = document.querySelector('#validerValidation');

    submitButton.addEventListener('click', () => {
        if (nameInput.checkValidity()) {
            localStorage.setItem('playerName', nameInput.value);
        } else {
            alert("Veuillez entrer un pseudo valide ! Caractères autorisés : lettres, chiffres, espaces, underscores. Pas de caractères spéciaux et d'accents.");
        }
    });
}

if (document.getElementById('playerNameDisplay')) {
    const playerName = localStorage.getItem('playerName');
    const playerNameDisplay = document.getElementById('playerNameDisplay');

    if (playerName) {
        playerNameDisplay.textContent = playerName;
    } else {
        playerNameDisplay.textContent = "Joueur (Veuillez entrer un nom à l'accueil)";
    }
}