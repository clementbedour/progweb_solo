# progweb2
Création d'un jeu pour un projet à l'INSA

# Source
https://cssgridgenerator.io/ 
https://uiverse.io/ 
https://animejs.com/ 
https://reactbits.dev/ 
https://developer.mozilla.org/fr/docs/Web/API/Window/alert 
https://www.jsdelivr.com/
https://openclassrooms.com/forum/sujet/creation-classement-joueur 
https://community.latenode.com/t/how-can-i-create-a-leaderboard-for-my-javascript-platformer/7664
https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval
https://stackoverflow.com/questions/37735022/javascript-setinterval-collision-between-the-delay-and-execution-time
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-play-state
https://developer.mozilla.org/fr/docs/Web/API/Document/createElement


Problème :
Bug de triche (sans clique pour init ou alt tab).
Si l'écran n'est pas en 1920 par 1080 et/ou qu'on change le zoom alors ça baise la fenêtre du jeu et d'acceuil.
J'ai essayé de mettre "width: 20vw; /* 20% largeur écran */ height: 80vh; /* 80%  hauteur écran */" Mais ça ne résoud pas le problème
Problème lors du premier cycle, tous les blocks sont dans la première colonne