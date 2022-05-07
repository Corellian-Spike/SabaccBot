module.exports = class Player {
    constructor(user, credits) {
        this.user = user;
        this.name = user.username;
        this.credits = credits;
        this.hand = [];
    };
};