import { initialMove, moveChecker } from "./moves";
import { PLAYER_1, PLAYER_2 } from "./player";

export const board = document.querySelector('.board');

/**
 * cria o tabuleiro
 */
function createBoardSpaces() {
    for (let _space = 1; _space <= 64; _space++) {
        let li = document.createElement('li');
        li.classList.add('space');
        li.innerText = _space;

        board.append(li);
    }
}

createBoardSpaces();

export const BOARD_SPACES = Array.from(board.querySelectorAll('.space'));

/**
 * configura o tabuleiro
 */
export function initialConfig() {
    // quantas casas por linha/coluna
    const limitPerRows = 8;
    
    let row = 1;
    let space = 1;
    
    let colorClass = 'white-black'; // black-white
    
    for (const _space of BOARD_SPACES) {
        colorClass = (row % 2 === 0) ? 'black-white' : 'white-black';
        
        _space.classList.add(colorClass);
    
        _space.dataset.space = (row % 2 === 0 && space % 2 === 0) || (row % 2 !== 0 && space % 2 !== 0) ? -1 : 0;
        _space.dataset.position = space;
        _space.dataset.row = row;

        _space.addEventListener('click', () => moveChecker(_space));
    
        if (space % limitPerRows === 0) {
            row++;
        }
    
        space++;
    }
}


/**
 * configura as pecas nas posicoes iniciais
 */
export function startPlayersPosition() {
    for (const _ticker of PLAYER_1.tickers) {
        initialMove(_ticker, 1);
    }

    for (const _ticker of PLAYER_2.tickers) {
        initialMove(_ticker, 2);
    }
}

startPlayersPosition();
