const fetch = require('node-fetch')

async function getCat(message) {
  const url = 'https://random.dog/woof.json'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.url !== 'undefined' && apiData.url) {
      message.channel.send({
        files: [apiData.url]
      })
    } else {
      message.channel.send("The dog escaped! :dog: ")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("The dog escaped! :dog: ")
  }
}

module.exports = {
	name: 'dog',
  cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts awesome dog 🐶',
	execute(message, args) {
		getCat(message)
	}
}