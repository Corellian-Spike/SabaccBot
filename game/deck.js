class Card {
    constructor(value, id) {
        this.value = value;
        this.id = id;
    }
};

module.exports = class Deck {
    constructor() {
        this.order = [
            new Card(0, '0a'),
            new Card(0, '0b'),
        ];
        const suits = ['c','s','t'];
        suits.map((suit)=>{
            for (let value = 1; value <= 10; value++) {
                this.order.push(new Card(value, `${value}${suit}`));
            };
          });
      
        suits.map((suit)=>{
            for (let value = -1; value >= -10; value--) {
                this.order.push(new Card(value, `${value}${suit}`));
            };
        });
    };
    shuffle() {
        for (let i = this.order.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
        };
        return this.order;
    };
    drawTo(player) {
        player.hand.push(this.order.pop());
    }
    dealTo(player, number) {
        const count = number ? number : 2;
        for (let i = 0; i < count; i++) {
            this.drawTo(player);
        };
    };
};