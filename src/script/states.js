import { BOARD_SPACES } from "./initial";
import { getCurrentPlayer } from "./player";

export function playerLostATick(tick, player) {
    tick.space = 0;

    const currentPlayer = getCurrentPlayer(player);
    currentPlayer.lostATick(tick.dataset.position);

    delete tick.player;

    clearAllRemovables();
}


/**
 * limpa qualquer dado sujo dos removiveis
 */
export function clearAllRemovables() {
    for (const _space of BOARD_SPACES) {
        delete _space.dataset.remove;
    }
}
