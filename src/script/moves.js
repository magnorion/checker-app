import { spaces } from "./initial";
import { PLAYER_1, PLAYER_2 } from "./player";

export function initialMove(ticker, player) {
    const space = spaces[ticker.position - 1];
    
    space.dataset.space = 1;
    space.dataset.player = player;
    
    space.classList.add(ticker.color);
}

export function move(position, player, oldPosition) {
    try {
        // array de check de usuario
        const checkers = [
            PLAYER_1.getTicker(oldPosition),
            PLAYER_2.getTicker(oldPosition),
        ];

        const currentPlayer = !!checkers[0] ? PLAYER_1 
            : (!!checkers[1]) ? PLAYER_2
            : null;

        currentPlayer.selectTick(currentPlayer.getTicker(oldPosition));

        if (!currentPlayer || !currentPlayer.selected) {
            throw new Error('Nao foi possivel encontrar o jogador');
        }
    
        currentPlayer.selected.position = position;
        
        const spacePosition = oldPosition - 1;
        spaces[spacePosition].dataset.space = 0;
    
        delete spaces[spacePosition].dataset.player;
        delete spaces[spacePosition].dataset.selected;
    
        spaces[spacePosition].classList.remove(currentPlayer.color);
    
        initialMove(currentPlayer.selected, player);

        currentPlayer.selected = null;
    } catch (err) {
        console.log(err);
    }
}

export function moveChecker(tick) {
    // se o local clicado nao houver jogador, nao seguir!
    if (!tick?.dataset?.player) {
        return;
    }

    const currentRow = Number(tick.dataset.row);
    const nextRow = (tick?.dataset?.player === '1') ? currentRow - 1 : currentRow + 1;
    const spaceNumberInCurrentRow = Number(tick.dataset.position) % 8;

    let isSpaceAlreadySelect = (tick?.hasAttribute('data-selected'));

    let calcSpace = tick?.dataset?.player === '1'
        ? (Number(tick.dataset.position) - 8)
        : (Number(tick.dataset.position) + 8);
    calcSpace = (calcSpace < 0) ? calcSpace * -1 : calcSpace;

    const nextRowPositions = Array.from(spaces).map((_space, index) => {
        const position = Number(_space.dataset.position);

        if ((spaceNumberInCurrentRow === 1 && position === (calcSpace + 1)) 
            || spaceNumberInCurrentRow === 8 && position === (calcSpace - 1)
            || (position === (calcSpace - 1) || position === (calcSpace + 1))
        ) {
            return index;
        }
    }).filter(_space => !!_space);

    if (!isSpaceAlreadySelect) {
        tick.classList.add('selected');
        tick.dataset.selected = true;
    } else {
        tick.classList.remove('selected');
        delete tick.dataset.selected;
    }

    for (const _position of nextRowPositions) {
        const movePosition = () => {
            move(
                Number(spaces[_position].dataset.position),
                tick?.dataset?.player,
                Number(tick.dataset.position),
            );

            for (const _position of nextRowPositions) {
                spaces[_position].removeEventListener('click', movePosition, false);
            }

            clearHighlight(nextRowPositions);
        }

        if (Number(spaces[_position].dataset.space) === 0) {

            if (!isSpaceAlreadySelect) {
                spaces[_position].classList.add('highlight');
                spaces[_position].addEventListener('click', movePosition, { once: true });
            } else {
                spaces[_position].classList.remove('highlight');
                spaces[_position].removeEventListener('click', movePosition, false);
            }
        }
    }
}

function clearHighlight(positionsHighlited) {
    for (const _highlited of positionsHighlited) {
        spaces[_highlited].classList.remove('highlight');
    }
}
