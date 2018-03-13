const Commando = require('discord.js-commando');
const https = require("https");
const xml2js = require('xml2js');

const config = require("../../config.json");

class Rule34Command extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'rule34',
            aliases: ['r34'],
            group: 'fun',
            memberName: 'rule34',
            nsfw: true,
            throttling: {
                usages: 2,
                duration: 10
            },
            description: 'Posts lewd image from rule34.xxx :sweat_drops:',
            examples: [config.prefix + 'r34 loli+small_breasts']
        });
    }

    async run(message, args) {
        try {
            // Currently there is something wrong with Commando nsfw detection... So better make sure this works
            if(message.message.channel.nsfw === true){
                if(args[0] === undefined){
                    var argR = "";
                } else {
                    var argR = args;
                }

                var url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + argR;

                https.get(url, function(res){
                    var body = '';
            
                    res.on('data', function(chunk){
                        body += chunk;
                    });
            
                    res.on('end', function(){
                        var parser = new xml2js.Parser();
                        parser.parseString(body, function (err, result) {
                            var postCount = result.posts.$.count - 1;
                            if(postCount > 100) {
                                postCount = 100;
                            }
                            if(postCount > 0) {
                                var picNum = Math.floor(Math.random() * postCount) + 0;
                                var r34Pic = result.posts.post[picNum].$.file_url;
                                // console.log(result.posts.post[picNum].$.file_url);
                                message.channel.send({
                                    files: [r34Pic]
                                });
                            
                            } else {
                                console.log("Nothing found:", argR);
                                message.channel.send("Nobody here but us chickens!");
                            }

                            });
                        });
                    }).on('error', function(e){
                        console.log("Got an error: ", e);
                });
            } else {
                message.channel.send(":warning: This channel is not NSFW!");
            }
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = Rule34Command;