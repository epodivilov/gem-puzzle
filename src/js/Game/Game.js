import {Tile, TileBtn} from './Tile'

export default class Game {
    constructor(props) {
        this.field = props.field;
        this.steps = props.steps;
        this.tiles = [];
    }
    
    initialize() {
        this.clear();

        for (let row = 0; row < 4; row++) {
            this.tiles.push([]);
            for (let col = 0; col < 4; col++) {
                this.tiles[row].push(new Tile(row * 4 + col + 1))
            }
        }

        this.tiles[3][3] = new TileBtn('Press to start', (e) => {
            e.stopPropagation();
            this.field.removeChild(this.tiles[3][3].el)
            this.tiles[3][3] = undefined;
            this.field.addEventListener('click', this.onClick.bind(this))
        })

        for (let row = 0; row < 4; row++) {
            this.tiles.push([]);
            for (let col = 0; col < 4; col++) {
                this.field.appendChild(this.tiles[row][col].el)
            }
        }

        this.render()

    }

    clear() {
        this.tiles.forEach((row) => {
            row.forEach((column) => {
                if (column) this.field.removeChild(column.el)
            })
        })
        this.tiles = [];
        this.steps.innerHTML = 0;
        this.field.removeEventListener('click', this.onClick.bind(this))
    }

    render() {
        this.tiles.forEach((row, dX) => {
            row.forEach((column, dY) => {
                if (column) column.render(dX, dY)
            })
        })
    }

    onClick(event) {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.tiles[row][col] && event.target === this.tiles[row][col].el) {
                    return this.moveTile(row, col);
                }
            }
        }
    }

    moveTile(dX, dY) {
        const currentTile = this.tiles[dX][dY];

        if(dX + 1 <= 3 && !this.tiles[dX + 1][dY]) {
            this.tiles[dX + 1][dY] = currentTile;
            this.tiles[dX][dY] = undefined;
        }
        if (dX - 1 >= 0 && !this.tiles[dX - 1][dY]) {
            this.tiles[dX - 1][dY] = currentTile;
            this.tiles[dX][dY] = undefined;
        }
        if(dY + 1 <= 3 && !this.tiles[dX][dY + 1]) {
            this.tiles[dX][dY + 1] = currentTile;
            this.tiles[dX][dY] = undefined;
        }
        if (dY - 1 >= 0 && !this.tiles[dX][dY - 1]) {
            this.tiles[dX][dY - 1] = currentTile;
            this.tiles[dX][dY] = undefined;
        }

        this.render()
    }
}