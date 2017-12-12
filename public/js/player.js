export default class Player {
    input;

    /**
     * @type {Sprite}
     */
    sprite;

    constructor(input) {
        this.input = input;

        this.sprite = new Sprite(48, 64);
    }

    getSprite() {
        
    }
}
