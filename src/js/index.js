import '../styles/index.styl'
import Game from './Game/Game'

window.onload = function () {

    const   playfield = document.getElementById('playfield'),
            gameOver =  document.getElementById('gameover'),
            stepsBar =  document.getElementById('currentsteps'),
            resetBtn =  document.getElementById('reset');

    const game = new Game({
        field: playfield,
        steps: stepsBar,
        gameOver: gameOver
    })
    
    game.initialize();

    resetBtn.addEventListener('click', () => {
        game.initialize();
    })
}