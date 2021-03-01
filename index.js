const Discord = require('discord.js');
const bot = new Discord.Client();
const Wiki = require('./wiki/wiki');
const { token } = require('./config.json');

bot.on('message' , function (message) {
    let commandUsed = Wiki.parse(message); //Utiliser || pour les autres commandes
});

bot.login(token);