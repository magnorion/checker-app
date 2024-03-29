const TICKERS_PLAYER_1 = [
    { position: 41, color: 'white', is_alive: true },
    { position: 43, color: 'white', is_alive: true },
    { position: 45, color: 'white', is_alive: true },
    { position: 47, color: 'white', is_alive: true },
    { position: 50, color: 'white', is_alive: true },
    { position: 52, color: 'white', is_alive: true },
    { position: 54, color: 'white', is_alive: true },
    { position: 56, color: 'white', is_alive: true },
    { position: 57, color: 'white', is_alive: true },
    { position: 59, color: 'white', is_alive: true },
    { position: 61, color: 'white', is_alive: true },
    { position: 63, color: 'white', is_alive: true },
];

const TICKERS_PLAYER_2 = [
    { position: 2, color: 'black', is_alive: true },
    { position: 4, color: 'black', is_alive: true },
    { position: 6, color: 'black', is_alive: true },
    { position: 8, color: 'black', is_alive: true },
    { position: 9, color: 'black', is_alive: true },
    { position: 11, color: 'black', is_alive: true },
    { position: 13, color: 'black', is_alive: true },
    { position: 15, color: 'black', is_alive: true },
    { position: 18, color: 'black', is_alive: true },
    { position: 20, color: 'black', is_alive: true },
    { position: 22, color: 'black', is_alive: true },
    { position: 24, color: 'black', is_alive: true },
];

export class Player {
    ticker = null;
    player = '';
    
    color = '';
    tickers = [];
    selected = null;

    constructor(color, tickers, player) {
        this.color = color;
        this.tickers = tickers;
        this.player = player;
    }

    getTicker = (position) => {
        return this.tickers.filter(_ticker => _ticker.position === position)[0];
    }

    selectTick = (tick) => {
        this.selected = tick;
    }

    lostATick = (position) => {
        this.searchTickByPosition(position).is_alive = false;
    }

    updateTickPosition = (position, newPosition) => {
        this.searchTickByPosition(Number(position)).position = Number(newPosition);
    }

    searchTickByPosition = (position) => {
        const index = this.tickers.findIndex(_ticker => _ticker.position === position);
        if (index !== -1) {
            return this.tickers[index];
        }

        return null;
    }
}

export const PLAYER_1 = new Player('white', TICKERS_PLAYER_1, '1');
export const PLAYER_2 = new Player('black', TICKERS_PLAYER_2, '2');

export function getCurrentPlayer(playerNumber) {
    return  playerNumber === '1' ? PLAYER_1 : (playerNumber === '2') ? PLAYER_2 : null;
}
