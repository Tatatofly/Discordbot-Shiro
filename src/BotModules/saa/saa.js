const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const http = require("http");

const config = require("../../config.json");

class SaaCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'saa',
            aliases: ['sää'],
            group: 'saa',
            memberName: 'saa',
            guildOnly: true,
            throttling: {
                usages: 3,
                duration: 300
            },
            description: 'Posts weather from given city :white_sun_rain_cloud: Only finnish cities and USE ä and ö :flag_fi:',
            examples: [config.prefix + 'saa jyvaskyla']
        });
    }

    async run(message, args) {
        try {
            // Checks the guild and only allows commands from trusted guild. Define in config.json
            if(message.guild.id === config.myGuildID) { 

                if(args[0] === undefined){
                    var argR = "jyvaeskylae";
                } else {
                    var argR = args;
                    argR = argR.replace(/ä/gi, "ae");  
                    argR = argR.replace(/ö/gi, "oe");  
                    argR = argR.replace(/\s/g, '');
                }

                switch(argR) {
                    case "jkl":
                        argR = "jyvaeskylae";
                        break;
                    case "hki":
                        argR = "helsinki";
                        break;
                    case "hesa":
                        argR = "helsinki";
                        break;
                    case "hese":
                        argR = "helsinki";
                        break;
                }

                var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + argR + ',fi&lang=fi&appid=' + config.OWMKey;

                http.get(url, function(res){
                    var body = '';
            
                    res.on('data', function(chunk){
                        body += chunk;
                    });
            
                    res.on('end', function(){
                        var getResponse = JSON.parse(body);
                        
                        if(getResponse.cod === "404") {
                            message.channel.send("City not found.");
                        } else {
                            try {

                            
                                // City name
                                var saaCity = getResponse.name;
                                saaCity = saaCity.replace(/ae/gi, "ä");
                                saaCity = saaCity.replace(/oe/gi, "ö");

                                // Temp
                                var saaTemp = getResponse.main.temp;
                                var saaMark = "°C";

                                switch(true) {
                                case (saaTemp < 263):
                                    var saaVari = "#0000FF";
                                    break;
                                case (saaTemp < 273):
                                    var saaVari = "#0096FF";
                                    break;
                                case (saaTemp < 288):
                                    var saaVari = "#EAFF00";
                                    break;
                                case (saaTemp < 300):
                                    var saaVari = "#FF9D00";
                                    break;
                                default:
                                    var saaVari = "#FF0000";
                                }

                                // Temp Kelvin to C
                                saaTemp = saaTemp - 273.15;
                                saaTemp = saaTemp.toFixed(1);

                                // Wind
                                var saaWind = getResponse.wind.speed;
                                var saaWindDeg = getResponse.wind.deg;

                                switch(true) {
                                    case (saaWindDeg < 23):
                                        var saaWindEmoji = ":arrow_down:";
                                        break;
                                    case (saaWindDeg < 68):
                                        var saaWindEmoji = ":arrow_lower_left:";
                                        break;
                                    case (saaWindDeg < 113):
                                        var saaWindEmoji = ":arrow_left:";
                                        break;
                                    case (saaWindDeg < 158):
                                        var saaWindEmoji = ":arrow_upper_left:";
                                        break;
                                    case (saaWindDeg < 203):
                                        var saaWindEmoji = ":arrow_up:";
                                        break;
                                    case (saaWindDeg < 248):
                                        var saaWindEmoji = ":arrow_upper_right:";
                                        break;
                                    case (saaWindDeg < 293):
                                        var saaWindEmoji = ":arrow_right:";
                                        break;
                                    case (saaWindDeg < 338):
                                        var saaWindEmoji = ":arrow_lower_right:";
                                        break;
                                    default:
                                        var saaWindEmoji = ":arrow_down:";
                                }

                                // Conditions
                                var saaCond = getResponse.weather[0].main;
                                var saaDesc = getResponse.weather[0].description;

                                switch(saaCond) {
                                    case "Thunderstorm":
                                        var saaCondEmoji = ":cloud_lightning:";
                                        break;
                                    case "Drizzle":
                                        var saaCondEmoji = ":droplet:";
                                        break;
                                    case "Rain":
                                        var saaCondEmoji = ":sweat_drops:";
                                        break;
                                    case "Snow":
                                        var saaCondEmoji = ":snowflake:"; 
                                        break;
                                    case "Atmosphere":
                                        var saaCondEmoji = ":bat:";
                                        break;
                                    case "Clear":
                                        var saaCondEmoji = ":sparkles:";
                                        break;
                                    case "Clouds":
                                        var saaCondEmoji = ":cloud:";
                                        break;
                                    case "Extreme":
                                        var saaCondEmoji = ":skull:";
                                        break;
                                    default:
                                        var saaCondEmoji = ":thinking:";
                                }

                                var saaEmbed = new Discord.RichEmbed()
                                    .setColor(saaVari)
                                    .addField("Weather of " + saaCity, saaTemp + saaMark + " " + ":dash: " + saaWind + "m/s " + saaWindEmoji)
                                    .addField("Sää ", saaCondEmoji + " " + saaDesc)
                                    message.channel.send(saaEmbed);
                            }
                            catch(e) {
                                console.log(error);
                            }
                        }
                    });
                }).on('error', function(e){
                            console.log("Got an error: ", e);
                    });

            } else{
                message.channel.send("Command not allowed in this guild :angry:");
            }
        } catch(e) {
            console.log(e);
        }
    };
}

module.exports = SaaCommand;