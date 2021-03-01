const Command = require('./command')

module.exports =  class wiki extends Command {

    static match (message) {
        return message.content.startsWith('*wiki'); //si le message commence par *wiki
    };

    static action (message) {
        //On init la requete
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        
        //On split le message pour récupérer les arguments et on supprime le premier élément qui est *wiki
        //let args = message.content.split(' ');
        //args.shift();

        //On lance la requete
        request.open('GET', 'https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&explaintext&redirects=1&titles=Henri_IV_(roi_de_France)', true);
        request.send();

        //Dès que le statut de la requete change on appelle la fonction
        request.onreadystatechange = function () {

            //Si la requete est DONE et qu'elle renvoie le code 200
            //On récupère le JSON et on le parse afin de l'afficher paragraphe par paragraphe
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                var tab = response.query.pages[12345].extract.split('\n');
                for (let i = 0; i < tab.length; i++) {
                    message.channel.send(tab[i]).catch(console.error);
                };
            };
        };
    };
};