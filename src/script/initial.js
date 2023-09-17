import { move } from "./moves";
import { PLAYER_1, PLAYER_2 } from "./player";

export const board = document.querySelector('.board');
export const spaces = document.querySelectorAll('.space');

export function initialConfig() {
    // quantas casas por linha/coluna
    const limitPerRows = 8;
    
    let row = 1;
    let space = 1;
    
    let colorClass = 'white-black'; // black-white
    
    for (const _space of spaces) {
        colorClass = (row % 2 === 0) ? 'black-white' : 'white-black';
        
        _space.classList.add(colorClass);
    
        _space.dataset.space = (row % 2 === 0 && space % 2 === 0) || (row % 2 !== 0 && space % 2 !== 0) ? -1 : 0;
        _space.dataset.position = space;
    
        if (space % limitPerRows === 0) {
            row++;
        }
    
        space++;
    }

    for (const _player of PLAYER_1) {
        move(_player.position, _player, 0);
    }

    for (const _player of PLAYER_2) {
        move(_player.position, _player, 0);
    }
}

export function startPlayersPosition() {
    
}
