const { MessageEmbed } = require('discord.js');
const { MessageReaction } = require('discord.js');
const axios = require('axios').default;
const Command = require('./command')

module.exports =  class wiki extends Command {

    static match (message) {
        return message.content.startsWith('*wiki'); //si le message commence par *wiki
    };

    static action (message) {
        //Je dois faire une triple requête
        //d'abord le search : je récupère le string de fin d'url
        //ensuite query redirects&prop=redirects : je récupère la pageid
        //finalement query pageid : on a la page
        
        //On split le message pour récupérer les arguments et on supprime le premier élément qui est *wiki
        let i = message.content.indexOf(' ');
        let args = [message.content.slice(0,i), message.content.slice(i+1)];
        args.shift();
        let encoded = encodeURI(args);

        axios.get('https://fr.wikipedia.org/w/api.php?action=opensearch&search=' + encoded)
            .then((response) => {
                var pages = response.data["3"]["0"];
                var finUrl = pages.split('/');
                var nomPages = finUrl.pop();

                axios.get('https://fr.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects&titles=' + nomPages)
                    .then((response) => {
                        var idPage = response.data["query"]["pages"]["0"]["pageid"];

                        axios.get('https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&explaintext&redirects=1&pageids=' + idPage)
                            .then((response) => {
                                var resume = response.data["query"]["pages"][idPage]["extract"];
                                var para = resume.split('\n');

                                axios.get('https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&pageids=' + idPage)
                                    .then((response) => {
                                        var thumbnail = response.data["query"]["pages"][idPage]["thumbnail"]["source"];
                                        let embed = new MessageEmbed()
                                            .setTitle(decodeURI(nomPages.split('_').join(' ')))
                                            .setThumbnail(thumbnail)
                                            .setColor(0xffd801)
                                            .setDescription(para[0]);
                                        message.channel.send(embed);
                                    });
                            });
                    });
            }).catch((error) => {
                message.channel.send('Erreur : veuillez réessayer');
                console.log(error);
            });
    };
};