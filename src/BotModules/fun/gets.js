const Commando = require('discord.js-commando');

class GetCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'gets',
            aliases: ['get'],
            group: 'fun',
            memberName: 'gets',
            description: 'Checks \'em',
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    async run(message, args) {
        try {
            var date = new Date();

            var hourNow = date.getHours();
            var minuteNow = date.getMinutes();

            var doublesNow = "x";
            var doublesNowD = "x";
            var getText = "fail ";

            var getEmoji = ":japanese_goblin:";

            switch(minuteNow) {
                case 0:
                    doublesNow = 0;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
                case 11:
                    doublesNow = 1;
                    doublesNowD = 11;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
                case 22:
                    doublesNow = 2;
                    doublesNowD = 22;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
                case 33:
                    doublesNow = 3;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
                case 44:
                    doublesNow = 4;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
                case 55:
                    doublesNow = 5;
                    getText = "Dubs ";
                    getEmoji = ":ok_hand:";
                    break;
            }

            if(doublesNow !== "x" && (hourNow === doublesNow || hourNow === doublesNowD)){
                
                switch(hourNow) {
                    case 11:
                        getText = "Quads ";
                        getEmoji = ":smirk: :ok_hand:";
                        break;
                    case 22:
                        getText = "Quads ";
                        getEmoji = ":smirk: :ok_hand:";
                        break;
                    default:
                        getText = "Trips ";
                        getEmoji = ":v:";
                        break;
                }
            }

            if(hourNow === 13 && minuteNow === 37){
                getText = "l33t ";
                getEmoji = ":sunglasses:";
            }

            if(minuteNow === 20 && (hourNow === 4 || hourNow === 16)){
                getText = "ayyyyyy ";
                getEmoji = ":alien:";
            }

            message.channel.send(getText + getEmoji);

        } catch(e) {
            console.log(e);
        }   
    }
}

module.exports = GetCommand;