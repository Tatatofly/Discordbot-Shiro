const fetch = require('node-fetch')

async function getCat(message) {
  const url = 'https://randomfox.ca/floof/'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.image !== 'undefined' && apiData.image) {
      message.channel.send({
        files: [apiData.image]
      })
    } else {
      message.channel.send("The fox escaped! :fox: ")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("The fox escaped! :fox: ")
  }
}

module.exports = {
	name: 'fox',
  cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts awesome fox 🦊',
	execute(message, args) {
		getCat(message)
	}
}