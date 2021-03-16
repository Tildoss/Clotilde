const Discord = require('discord.js');
const bot = new Discord.Client();
const Wiki = require('./wiki/wiki');
const Autist = require('./autist/autist');
const { token } = require('./config.json');

bot.on('message' , function (message) {
    let commandUsed = Wiki.parse(message) || Autist.parse(message); //Utiliser || pour les autres commandes
});

bot.login(token);