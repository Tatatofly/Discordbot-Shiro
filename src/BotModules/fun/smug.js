const Commando = require('discord.js-commando');

class SmugCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'smug',
            group: 'fun',
            memberName: 'smug',
            throttling: {
                usages: 2,
                duration: 10
            },
            description: 'Posts smug anime girl :^)'
        });
    }

    async run(message, args) {
        try {
            var smugger = Math.floor(Math.random() * 59) + 1;
            var smugReply = "http://smug.moe/smg/" + smugger + ".png";
            message.channel.send({
                files: [smugReply]
            });
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = SmugCommand;