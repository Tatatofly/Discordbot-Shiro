const Commando = require('discord.js-commando');
const request = require("request");
const config = require("../../config.json");

class GuildsCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'guilds',
            aliases: ['guild'],
            group: 'ownertools',
            memberName: 'guilds',
            description: 'Gets bot guilds and updates discord bots value',
            ownerOnly: true
        });
    }

    async run(message, args) {
        try {
            var messageUserID = message.author.id;
            messageUserID = messageUserID.toString();
            if(config.botOwnerID === messageUserID){
                var apiUrl = config.discordBotsApiUrl;
                var guildsSize = this.client.guilds.size;
                var apiKey = config.discordBotsApiKey;
                var apiPost = {"server_count" : guildsSize};
                message.channel.send("I'm in " + guildsSize + " guilds :hushed:");
                var headers = {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                };
            
                request.post({ url: apiUrl, json: apiPost, headers: headers}, function(err, httpResponse, body) {
                        if (err) {
                            return console.error('post failed:', err);
                    }
                });
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

module.exports = GuildsCommand;