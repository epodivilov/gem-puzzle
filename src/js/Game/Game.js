import {Tile, TileBtn} from './Tile'

export default class Game {
    constructor(props) {
        this.field = props.field;
        this.steps = props.steps;
        this.gameOver = props.gameOver;
        this.tiles = [];
        this.count = 0;
    }

    checkPossibleSolution(arr) {
        let sum = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            let l = 1;
            while (arr[i] - l > 0) {
                if (arr.indexOf(arr[i] - l) > i) {
                    sum++
                }
                l++;
            }
        }

        sum += (arr.indexOf(0)/4|0) + 1;

        return sum%2 === 0;
    }

    randomCombination() {
        let sourceArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
            randIndex, temp;

        for (let i = sourceArr.length-1; i > 0; i--) {
            randIndex = Math.floor(Math.random() * i);
            temp = sourceArr[i];
            sourceArr[i] = sourceArr[randIndex];
            sourceArr[randIndex] = temp;
        }

        return sourceArr;
    }
    
    initialize() {
        this.clear();

        let combination = this.randomCombination()

        while (!this.checkPossibleSolution(combination)) {
            combination = this.randomCombination()
        }

        for (let row = 0; row < 4; row++) {
            this.tiles.push([]);
            for (let col = 0; col < 4; col++) {
                let lbl = combination.shift()

                if (lbl === 0) {
                    this.tiles[row].push(new TileBtn('Press to start', (e) => {
                        e.stopPropagation();
                        this.field.removeChild(this.tiles[row][col].el)
                        this.tiles[row][col] = undefined;
                        this.field.onclick = () => {
                            for (let row = 0; row < 4; row++) {
                                for (let col = 0; col < 4; col++) {
                                    if (this.tiles[row][col] && event.target === this.tiles[row][col].el) {
                                        return this.moveTile(row, col);
                                    }
                                }
                            }
                        };
                    }))
                } else {
                    this.tiles[row].push(new Tile(lbl))

                }

            }
        }

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
        this.count = 0;
        this.gameOver.style.zIndex = '-1';
        this.field.onclick = undefined;
    }

    render() {
        this.tiles.forEach((row, dX) => {
            row.forEach((column, dY) => {
                if (column) column.render(dX, dY)
            })
        })
        this.steps.innerHTML = this.count;
    }

    moveTile(dX, dY) {
        const currentTile = this.tiles[dX][dY];

        if(dX + 1 <= 3 && !this.tiles[dX + 1][dY]) {
            this.tiles[dX + 1][dY] = currentTile;
            this.tiles[dX][dY] = undefined;
            this.count++;
        }
        if (dX - 1 >= 0 && !this.tiles[dX - 1][dY]) {
            this.tiles[dX - 1][dY] = currentTile;
            this.tiles[dX][dY] = undefined;
            this.count++;
        }
        if(dY + 1 <= 3 && !this.tiles[dX][dY + 1]) {
            this.tiles[dX][dY + 1] = currentTile;
            this.tiles[dX][dY] = undefined;
            this.count++;
        }
        if (dY - 1 >= 0 && !this.tiles[dX][dY - 1]) {
            this.tiles[dX][dY - 1] = currentTile;
            this.tiles[dX][dY] = undefined;
            this.count++;
        }
        
        if (this.isGameOver()) {
            this.gameOver.style.zIndex = '100';
        }


        this.render()
    }

    isGameOver() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if ((row * 4 + col + 1) != 16 && !this.tiles[row][col]) return false;
                if ((row * 4 + col + 1) != 16 && this.tiles[row][col].label !== (row * 4 + col + 1)) return false;
            }
        }
        return true;
    }
}