module.exports = class command {

    //On vérifie la commande afin de déterminer l'action
    static parse (message) {
        if (this.match(message)) {
            this.action(message);
            return true;
        }
        return false;
    };
};