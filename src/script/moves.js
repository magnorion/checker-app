import { BOARD_SPACES } from "./initial";
import { getCurrentPlayer } from "./player";

export function move(ticker, player, color = null) {
    const space = BOARD_SPACES[ticker.position - 1];
    
    space.dataset.space = 1;
    space.dataset.player = player;
    
    const applyTickColor = ticker?.color || color;

    space.classList.add(applyTickColor);
}

export function prepareToMove(position, player, oldPosition, currentPlayer) {
    try {
        if (!currentPlayer || !currentPlayer.selected || !player) {
            return;
        }
        
        currentPlayer.selected.position = position;
        
        const spacePosition = oldPosition - 1;
        BOARD_SPACES[spacePosition].dataset.space = 0;
        
        move(currentPlayer.selected, player, currentPlayer.color);

        delete BOARD_SPACES[spacePosition].dataset.player;
        delete BOARD_SPACES[spacePosition].dataset.selected;

        BOARD_SPACES[spacePosition].classList.remove(currentPlayer.color);

        currentPlayer.selected = null;
    } catch (err) {
        console.log(err);
    }
}

export function checkMoviment(tick) {
    // se o local clicado nao houver jogador, nao seguir!
    if (!tick?.dataset?.player) {
        return;
    }

    // limpa qualquer casa destacada antes
    clearHighlight(BOARD_SPACES.map((_space, index) => index));

    const currentPlayer = getCurrentPlayer(tick.dataset.player);

    let isSpaceAlreadySelect = (tick?.hasAttribute('data-selected'));

    if (!isSpaceAlreadySelect) {
        tick.classList.add('selected');
        tick.dataset.selected = true;

        // o jogador selecionou a peca
        currentPlayer.selectTick(tick);
    } else {
        tick.classList.remove('selected');
        delete tick.dataset.selected;

        currentPlayer.selectTick(null);
    }

    // calcula as possiveis posicoes para mover a peca
    const nextRowPositions = calcPositionsToMove(tick);

    // calcula todos os espacos nao usados
    const positionsNotUsed = BOARD_SPACES.map((_space, index) => 
        nextRowPositions.indexOf(index) === -1 ? index : null)
        .filter(_space => !!_space);

    // se a casa ja havia sido selecionada, nao seguir com os calculos
    if (isSpaceAlreadySelect) {
        return;
    }

    for (const _position of nextRowPositions) {
        const movePosition = () => {
            prepareToMove(
                Number(BOARD_SPACES[_position].dataset.position),
                tick?.dataset?.player,
                Number(tick.dataset.position),
                currentPlayer
            );

            for (const _position of nextRowPositions) {
                BOARD_SPACES[_position].removeEventListener('click', movePosition, false);
            }

            clearHighlight(nextRowPositions);
        }

        if (Number(BOARD_SPACES[_position].dataset.space) === 0) {
            if (!isSpaceAlreadySelect && tick.dataset.position === currentPlayer?.selected?.dataset?.position) {
                BOARD_SPACES[_position].classList.add('highlight');
                BOARD_SPACES[_position].addEventListener('click', movePosition, { once: true });
            } else {
                BOARD_SPACES[_position].classList.remove('highlight');
                BOARD_SPACES[_position].removeEventListener('click', movePosition, false);
            }
        }

        // remove de todas as outras
        for (const _position of positionsNotUsed) {
            BOARD_SPACES[_position].classList.remove('highlight');
            BOARD_SPACES[_position].removeEventListener('click', movePosition, false);
        }
    }
}

function calcPositionsToMove(tick) {
    const spaceNumberInCurrentRow = Number(tick.dataset.position) % 8;

    let calcSpace = tick?.dataset?.player === '1'
        ? (Number(tick.dataset.position) - 8)
        : (Number(tick.dataset.position) + 8);
    calcSpace = (calcSpace < 0) ? calcSpace * -1 : calcSpace;
    
    return BOARD_SPACES.map((_space, index) => {
        const position = Number(_space.dataset.position);

        if (_space.dataset.player === undefined &&
            ((spaceNumberInCurrentRow === 1 && position === (calcSpace + 1)) 
            || spaceNumberInCurrentRow === 8 && position === (calcSpace - 1)
            || (position === (calcSpace - 1) || position === (calcSpace + 1)))
        ) {
            return index;
        }
    }).filter(_space => !!_space);
}

function clearHighlight(positionsHighlited) {
    for (const _highlited of positionsHighlited) {
        BOARD_SPACES[_highlited].classList.remove('highlight');
        BOARD_SPACES[_highlited].classList.remove('selected');
    }
}
