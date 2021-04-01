const Discord = require('discord.js');
const bot = new Discord.Client();
const Wiki = require('./commande/wiki');
const Autist = require('./commande/autist');
const Help = require('./commande/help')
const { token } = require('./config.json');

bot.on('ready', () => {
    bot.user.setActivity('*help', { type: "PLAYING" }).catch(console.error)
})

bot.on('message' , function (message) {
    let commandUsed = Wiki.parse(message) || Autist.parse(message) || Help.parse(message); //Utiliser || pour les autres commandes
});

bot.login(token);