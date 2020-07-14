const config = require("../config.json")
const fetch = require('node-fetch')

const lastCommit = async () => {
  const url = 'https://api.github.com/repos/Tatatofly/Discordbot-Shiro/commits'
  try {
    const response = await fetch(url)
    data = await response.json()
    if(typeof data[0] !== 'undefined' && data[0]) {
      return new Date(data[0].commit.author.date);
    }
  } catch (error) {
    console.log(error)
  }
}

const sendMessage = async (message) => {
  const guildSize = await message.client.guilds.cache.size;
  const lastCommitDate = await lastCommit();
  message.channel.send({
    "embed": {
      "title": "Discordbot-Shiro",
      "description": "DiscordBot WiP with JavaScript powered by Node.JS",
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
        "text": "Source in Github - Last commit"
      },
      "timestamp": lastCommitDate,
      "fields": [
        {
          "name": "Guilds size",
          "value": guildSize,
          "inline": true
        }
      ]
    }
  })
}

module.exports = {
	name: 'info',
  cooldown: 60,
  guildOnly: true,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts info message',
	execute(message) {
    sendMessage(message)
	}
}