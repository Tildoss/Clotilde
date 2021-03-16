const Command = require('../commande/command');

module.exports = class autist extends Command {

    static match (message) {
        return message.content.startsWith('*autist');
    };

    static action (message) {
        let indice = message.content.indexOf(' ');
        let args = [message.content.slice(0, indice), message.content.slice(indice + 1)];
        args.shift();
        args = args.join();

        let motAutist = '';
        for (let i = 0; i < args.length; i++) {
            (i % 2) == 0 ? motAutist += args.charAt(i).toUpperCase() : motAutist += args.charAt(i);
        };

        message.channel.send(motAutist);
    };
};