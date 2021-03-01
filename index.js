const Discord = require('discord.js');
const bot = new Discord.Client();
const Wiki = require('./wiki/wiki');

bot.on('message' , function (message) {
    let commandUsed = Wiki.parse(message); //Utiliser || pour les autres commandes
});

bot.login('ODE1Mjg0NDgwNzY3Njg4NzE0.YDqK1w.rkkqQ5ymWKckFmZOsAbvhY83ohI');