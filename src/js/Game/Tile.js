
export class Tile {
    constructor(props) {
        this.label = props;
        this.el = document.createElement('div');
        this.el.className = 'tile';
        this.el.appendChild(document.createTextNode(this.label))
    }

    render(dX, dY) {
        const   top = dX * 100 + dX * 5,
                left = dY * 100 + dY * 5

        this.el.style.cssText = 'top: ' + top + 'px; left: ' + left + 'px;';
        return this.el;
    }
}

export class TileBtn extends Tile {
    constructor(props, callback) {
        super(props)
        this.el.className = 'tileBtn';
        this.el.addEventListener('click', callback)
    }
    
}