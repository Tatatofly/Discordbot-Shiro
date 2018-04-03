const Commando = require('discord.js-commando');
const memes = require('./funData/memes.json');
const config = require("../../config.json");
const fs = require('fs');

class memeCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'addmeme',
            aliases: ['ameme', 'admeme'],
            group: 'fun',
            memberName: 'addmeme',
            throttling: {
                usages: 3,
                duration: 10
            },
            description: 'Adds spicy meme from url :ok_hand: (Only trusted users)',
            examples: [config.prefix + 'addmeme http://i.imgur.com/1ZZ7ZFH.jpg']
        });
    }

    async run(message, args) {
        try {
            var i = 0;
            var trusties = [];
            while(i < config.trustedUsers.length){
                trusties.push(config.trustedUsers[i].userTrustID);
                i += 1;
            }
            var messageUserID = message.author.id;
            messageUserID = messageUserID.toString();
            if(config.botOwnerID === messageUserID || trusties.includes(messageUserID)){
                if(!args[0]){
                    console.log("No memes ;__;");
                    message.channel.send("No memes given :thinking:");
                } else {
                    var argR = args;
                    var obj = {
                        memeList: []
                    };
                    fs.exists(__dirname + '/funData/memes.json', function(exists){
                        if(exists){
                            fs.readFile(__dirname + '/funData/memes.json', function readFileCallback(err, data){
                            if (err){
                                console.log(err);
                            } else {
                                obj = JSON.parse(data); 
                                obj.memeList.push({"meme": argR});
                                var json = JSON.stringify(obj); 
                                fs.writeFile(__dirname + '/funData/memes.json', json); 
                            }});
                        } else {
                                console.log("file not exists")
                            }
                         });
                    message.channel.send(":ok_hand:");
                    console.log(`Meme: ${argR}`);
                }
            } else {
                message.channel.send("You are not in trusted users ;__;");
            }
        } catch(e) {
            console.log(e);
        }  
    }
}

module.exports = memeCommand;