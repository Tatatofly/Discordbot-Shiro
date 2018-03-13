const Commando = require('discord.js-commando');
const memes = require('./funData/memes.json');

class memeCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'meme',
            aliases: ['meemi'],
            group: 'fun',
            memberName: 'meme',
            throttling: {
                usages: 2,
                duration: 10
            },
            description: 'Posts spicy meme :ok_hand:'
        });
    }

    async run(message, args) {
        try {
            var randMeme = Math.floor(Math.random() * memes.memeCount) + 1;
            var realMemeDeal = "meme" + randMeme;
            var memeReply = memes[realMemeDeal];
            message.channel.send({
                files: [memeReply]
            });
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = memeCommand;