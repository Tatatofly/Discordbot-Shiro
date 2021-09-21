const { prefix } = require("../config.json")

module.exports = {
	name: 'help',
  cooldown: 60,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts help message',
	execute(message) {
    const { commands } = message.client;
    const fieldsData = commands.reduce(function(result, command) {
      if(!command.ownerOnly) {
        result.push({
          "name": prefix + command.name,
          "value": command.description,
          "inline": true
        })
      }
      return result
    }, [])
    const messageEmbed = {
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
        "fields": fieldsData
      }
      try {
        message.channel.send({embeds: [messageEmbed]})
      } catch(error) {
        console.log(error)
      }
	}
}