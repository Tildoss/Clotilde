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

        //On init la requete
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();

        //On lance la requete
        request.open("GET", "https://fr.wikipedia.org/w/api.php?action=opensearch&search=" + args);
        request.send();
        
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                var pages = response["3"]["0"];
                var tabPages = pages.split("/");
                //on récupère le dernier élément de l'url
                var nomPages = tabPages.pop();

                var request2 = new XMLHttpRequest();
                request2.open("GET", "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=redirects&redirects&titles=" + nomPages);
                request2.send();

                request2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var response2 = JSON.parse(this.responseText);
                        var pages2 = response2["query"]["pages"];
                        for (var id in pages2) {
                            if (pages2.hasOwnProperty(id)) {
                                var idpage = pages2[id]["pageid"];
                            };
                        };
                        var request3 = new XMLHttpRequest();
                        request3.open("GET", "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&explaintext&redirects=1&pageids=" + idpage);
                        request3.send();

                        request3.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                //On parse le json obtenu
                                var response3 = JSON.parse(this.responseText);
                                var pages3 = response3["query"]["pages"];

                                //On boucle pour déterminer l'id de la page
                                for (var id in pages3) {
                                    if (pages3.hasOwnProperty(id)) {
                                        var resume = pages3[id];
                                    };
                                };

                                // var tab = resume["extract"].split('\n').forEach((item) => {
                                //     message.channel.send(item);
                                // });
                                var para = resume["extract"].split('\n');
                                message.channel.send(para[0]);
                            };
                        };
                    };
                };
            };
        };
    };
};