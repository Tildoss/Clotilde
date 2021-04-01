const Command = require('./command');

module.exports = class autist extends Command {

    static match (message) {
        return message.content.startsWith('*autist');
    };

    static action (message) {
        let indice = message.content.indexOf(' ');
        let args = message.content.slice(indice + 1);

        let motAutist = '';
        for (let i = 0; i < args.length; i++) {
            (i % 2) == 0 ? motAutist += args.charAt(i).toUpperCase() : motAutist += args.charAt(i);
        };

        message.channel.send(motAutist);
    };
};