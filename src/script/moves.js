import { spaces } from "./initial";

export function move(position, player, oldPosition) {
    spaces[position - 1].dataset.space = 1;
    spaces[position - 1].dataset.player = player;
    
    spaces[position - 1].classList.add(player.color);
}
