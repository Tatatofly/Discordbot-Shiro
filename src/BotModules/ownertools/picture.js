const Commando = require('discord.js-commando');
const config = require("../../config.json");

class PictureCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'picture',
            aliases: ['pic'],
            group: 'ownertools',
            memberName: 'picture',
            description: 'Sets bot profile picture from url.',
            ownerOnly: true,
            examples: [config.prefix + 'picture http://files.tatu.moe/9b040357.jpg']
        });
    }

    async run(message, args) {
        try {
            var messageUserID = message.author.id;
            messageUserID = messageUserID.toString();
            if(config.botOwnerID === messageUserID){
                if(args[0] === undefined){
                    var argR = 'http://files.tatu.moe/9b040357.jpg';
                } else {
                    var argR = args;
                }
                
                this.client.user.setAvatar(argR);
                console.log("Picture changed");
            }
        } catch(e) {
            console.log(e);
        }   
    }
}

module.exports = PictureCommand;