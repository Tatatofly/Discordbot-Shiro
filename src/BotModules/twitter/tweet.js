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
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to tweet?',
                    type: 'string',
                    validate: text => {
                        if (text.length < 141) return true;
                        return 'Message Content is above 140 characters';
                    }    
                }
            ],
            description: 'Tweets you message :bird:',
            examples: [config.prefix + 'tweet Hello Twitter :3']
        });
    }

    async run(message, args) {
        try {
            // Checks the guild and only allows commands from trusted guild. Define in config.json
            if(message.guild.id === config.myGuildID) { 
                if(args.text === undefined){
                    message.channel.send("You must write something :thinking:");
                } else {
                    var argR = args.text;
                    clientTwitter.post('statuses/update', {status: argR},  function(error, tweet, response) {
                        if (!error) {
                            message.channel.send("Tweeted :notes:");
                          } else {
                            message.channel.send(":x: Error");
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