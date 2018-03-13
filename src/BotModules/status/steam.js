const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const https = require("https");

const config = require("../../config.json");

class SteamCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'steam',
            aliases: ['csgo'],
            group: 'status',
            memberName: 'steam',
            throttling: {
                usages: 2,
                duration: 20
            },
            description: 'Posts steam and csgo server status'
        });
    }

    async run(message, args) {
        var url = 'https://steamgaug.es/api/v2';

        try {
            https.get(url, function(res){
                var body = '';
        
                res.on('data', function(chunk){
                    body += chunk;
                });
        
                res.on('end', function(){
                    var getResponse = JSON.parse(body);
                    var communityStatus = getResponse.SteamCommunity.online;
                    var storetStatus = getResponse.SteamStore.online;
                    var csgoAppID = "730";
                    var csgoStatus = getResponse.ISteamGameCoordinator[csgoAppID].online;

                    var onlineEmoji = ":white_check_mark:";
                    var offlineEmoji = ":x:";

                    var statusColor = "#00ff00";

                    if(communityStatus === 1){
                        var communityStatusEmoji = onlineEmoji;
                    } else {
                        var communityStatusEmoji = offlineEmoji;
                        statusColor = "#ff0000";
                    }

                    if(storetStatus === 1){
                        var storeStatusEmoji = onlineEmoji;
                    } else {
                        var storeStatusEmoji = offlineEmoji;
                        statusColor = "#ff0000";
                    }

                    if(csgoStatus === 1){
                        var csgoStatusEmoji = onlineEmoji;
                    } else {
                        var csgoStatusEmoji = offlineEmoji;
                        statusColor = "#ff0000";
                    }

                    var steamEmbed = new Discord.RichEmbed()
                    .setColor(statusColor)
                    .setTitle("Steam status")
                    .setDescription(communityStatusEmoji + " Community" + "\n" + storeStatusEmoji + " Store" + "\n" + csgoStatusEmoji + " CS:GO")
                    message.channel.send(steamEmbed);
                });
                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
        } catch(e) {
            console.log(e);
        }
        
    };
}

module.exports = SteamCommand;