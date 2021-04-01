const Command = require('./command');
const { MessageEmbed } = require('discord.js');

module.exports = class help extends Command {
    static match (message) {
        return message.content.startsWith('*help');
    }

    static action (message) {
        let msg = "*wiki [recherche wiki]\n*autist [message]";
        let aide = new MessageEmbed()
            .setTitle("Aide")
            .setColor(0xffd801)
            .setDescription(msg);
        message.channel.send(aide);
    }
}