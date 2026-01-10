const nameInput = document.querySelector('#playerName');
const submitButton = document.querySelector('#submitName');


function afficherScores(niveau, idElement) {
    // Récupère les scores depuis le localStorage ou initialise un tableau vide
    let scores = JSON.parse(localStorage.getItem(niveau)) || [];
    // Trie les scores par ordre décroissant
    scores.sort((a, b) => b - a);
    // Récupère l'élément HTML où afficher les scores
    const scoresList = document.getElementById(idElement);

    // Efface le contenu actuel
    scoresList.innerHTML = '';

    // Affiche les 5 meilleurs scores (ou "Aucun score" si vide)
    if (scores.length > 0) {
        for (let i = 0; i < 5; i++) {
            const score = scores[i];
            const scoreItem = document.createElement('div');
            if (score !== undefined) {
                scoreItem.textContent = `Top ${i + 1} : ${score}`;
            } else {
                scoreItem.textContent = `Top ${i + 1} : Aucun score`;
                scoreItem.classList.add('empty');
            }
            scoresList.appendChild(scoreItem);
        }
    } else {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = 'Aucun score enregistré.';
        scoreItem.classList.add('empty');
        scoresList.appendChild(scoreItem);
    }
}

// Affiche les scores pour chaque niveau au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    afficherScores('Scores Easy', 'score-simple');
    afficherScores('Scores Hard', 'score-dur');
    afficherScores('Scores Ext', 'score-ext');
});


submitButton.addEventListener('click', () => {
    if (nameInput.checkValidity()) {
        localStorage.setItem('playerName', nameInput.value);
        alert("Nom enregistré : " + nameInput.value);
    } else {
        alert("Veuillez entrer un nom valide !!!!");
    }
});