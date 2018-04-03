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
            var randMemeNum = Math.floor(Math.random() * memes.memeList.length) + 1;
            var randMeme = memes.memeList[randMemeNum].meme;
            message.channel.send({
                files: [randMeme]
            });
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = memeCommand;