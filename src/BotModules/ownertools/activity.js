const Commando = require('discord.js-commando');
const config = require("../../config.json");

class ActiCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'activity',
            aliases: ['act'],
            group: 'ownertools',
            memberName: 'activity',
            description: 'Sets bot Activity',
            ownerOnly: true,
            examples: [config.prefix + 'activity Code']
        });
    }

    async run(message, args) {
        try {
            var messageUserID = message.author.id;
            messageUserID = messageUserID.toString();
            if(config.botOwnerID === messageUserID){
                if(args[0] === undefined){
                    var argR = config.botActivity;
                } else {
                    var argR = args;
                }
                
                this.client.user.setActivity(argR);
                console.log(`Activity: ${argR}`);
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

module.exports = ActiCommand;