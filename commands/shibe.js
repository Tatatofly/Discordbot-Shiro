const fetch = require('node-fetch')

async function getCat(message) {
  const url = 'https://shibe.online/api/shibes'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData[0] !== 'undefined' && apiData[0]) {
      message.channel.send({
        files: [apiData[0]]
      })
    } else {
      message.channel.send("The shibe escaped! :hotdog: ")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("The shibe escaped! :hotdog: ")
  }
}

module.exports = {
	name: 'shibe',
  cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts awesome shibe 🐕',
	execute(message, args) {
		getCat(message)
	}
}