const fetch = require('node-fetch')
const config = require("../config.json")

async function getGuilds(message) {
  const guildsSize = await message.client.guilds.cache.size
  const url = `https://top.gg/api/bots/${config.topggBotID}/stats`

  const headers = {
    'Authorization': config.topggBotAPIKey,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const data = JSON.stringify({"server_count": guildsSize})

  try {
    fetch(url, { method: 'POST', headers: headers, body: data})
    .then((res) => {
       return res.json()
    })
    .then((json) => {
      message.channel.send(`I'm in ${guildsSize} guilds`)
    })
  } catch(error) {
    console.log(error)
    message.channel.send("Something went wrong ;__;")
  }
}

module.exports = {
	name: 'guilds',
  cooldown: 30,
  guildOnly: false,
  ownerOnly: true,
  nsfw: false,
	description: 'Displays guilds count and posts it to top.gg bot page',
	execute(message, args) {
		getGuilds(message)
	}
}