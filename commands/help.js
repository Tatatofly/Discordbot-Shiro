const config = require("../config.json")
module.exports = {
	name: 'help',
  cooldown: 60,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts help message :3',
	execute(message) {
    message.channel.send({
      "embed": {
        "title": "Discordbot-Shiro",
        "description": "List of commands: ",
        "url": "https://github.com/Tatatofly/Discordbot-Shiro",
        "color": 9442302,
        "thumbnail": {
          "url": "https://cdn.discordapp.com/app-icons/267636401573462016/03f3d357e36b57c8a95f719cb4fe0263.png?size=256"
        },
        "author": {
          "name": "Tatatofly#0854",
          "url": "https://tatu.moe",
          "icon_url": "http://files.tatu.moe/toplel.jpg"
        },
        "footer": {
          "icon_url": "https://cdn.discordapp.com/app-icons/267636401573462016/03f3d357e36b57c8a95f719cb4fe0263.png?size=256",
          "text": "Source in Github"
        },
        "fields": [
          {
            "name": `${config.prefix}help`,
            "value": "Posts this message",
            "inline": true
          },
          {
            "name": `${config.prefix}info`,
            "value": "Posts info message",
            "inline": true
          },
          {
            "name": `${config.prefix}ping`,
            "value": "Ping -> Pong",
            "inline": true
          },
          {
            "name": `${config.prefix}bitcoin`,
            "value": "Posts current price of bitcoin",
            "inline": true
          },
          {
            "name": `${config.prefix}bored`,
            "value": "Posts activity to fight boredom",
            "inline": true
          },
          {
            "name": `${config.prefix}dog`,
            "value": "Posts awesome dog 🐶",
            "inline": true
          },
          {
            "name": `${config.prefix}fox`,
            "value": "Posts awesome fox 🦊",
            "inline": true
          },
          {
            "name": `${config.prefix}shibe`,
            "value": "Posts awesome shibe 🐕",
            "inline": true
          },
          {
            "name": `${config.prefix}smug`,
            "value": "Posts smug anime girl :^)",
            "inline": true
          }
        ]
      }
    })
	}
}