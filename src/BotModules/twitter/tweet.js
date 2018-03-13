const Commando = require('discord.js-commando');
const Twitter = require('twitter');
const config = require("../../config.json");

const clientTwitter = new Twitter({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token_key: config.twitterAccessKey,
    access_token_secret: config.twitterAccessSecret
});

class TweetCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'tweet',
            aliases: ['tw'],
            group: 'twitter',
            memberName: 'tweet',
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 60
            },
            description: 'Tweets you message :bird:',
            examples: [config.prefix + 'tweet Hello Twitter :3']
        });
    }

    async run(message, args) {
        try {
            // Checks the guild and only allows commands from trusted guild. Define in config.json
            if(message.guild.id === config.myGuildID) { 
                if(args[0] === undefined){
                    message.channel.send("You must write something :thinking:");
                } else {
                    var argR = args;
                    clientTwitter.post('statuses/update', {status: argR},  function(error, tweet, response) {
                        if(error === undefined) {
                            message.channel.send("Tweeted :notes:");
                        } else {
                            message.channel.send("Error: " + error[0].code);
                            message.channel.send(error[0].message);
                    }
                    });
                }
            } else{
                message.channel.send("Command not allowed in this guild :angry:");
            }
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = TweetCommand;