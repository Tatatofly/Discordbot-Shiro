const Commando = require('discord.js-commando');
const config = require("../../config.json");

class TrustCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'trusted',
            aliases: ['trust'],
            group: 'ownertools',
            memberName: 'trusted',
            description: 'Adds user to trusted list',
            ownerOnly: true,
            examples: [config.prefix + 'trust 128810662880083968']
        });
    }

    async run(message, args) {
        try {
            var messageUserID = message.author.id;
            messageUserID = messageUserID.toString();
            if(config.botOwnerID === messageUserID){
                if(!args[0]){
                    console.log("Trust: pls give userid");
                } else {
                    var argR = args;
                    console.log(`Trusted: ${argR}`);
                    var obj = {
                        trustedUsers: []
                    };
                    fs.exists(__dirname + '../../config.json', function(exists){
                        if(exists){
                            fs.readFile(__dirname + '../../config.json', function readFileCallback(err, data){
                            if (err){
                                console.log(err);
                            } else {
                                obj = JSON.parse(data); 
                                obj.memeList.push({"userTrustID": argR});
                                var json = JSON.stringify(obj); 
                                fs.writeFile(__dirname + '../../config.json', json); 
                            }});
                        } else {
                                console.log("file not exists")
                            }
                    });
                }
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

module.exports = TrustCommand;