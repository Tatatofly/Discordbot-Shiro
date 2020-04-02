const fetch = require('node-fetch')

async function getCat(message, participants) {
  const url = 'https://www.boredapi.com/api/activity'
  try {
    if(typeof participants !== 'undefined' && participants) {
      const response = await fetch(url+'?participants='+participants)
      apiData = await response.json()
      if(typeof apiData.activity !== 'undefined' && apiData.activity) {
        message.channel.send(`${apiData.activity}`)
      } else {
        message.channel.send("Something went wrong with the API")
      }
    } else {
      const response = await fetch(url)
      apiData = await response.json()
      if(typeof apiData.activity !== 'undefined' && apiData.activity) {
        message.channel.send(`${apiData.activity}`)
      } else {
        message.channel.send("Something went wrong with the API")
      }
    }
  } catch (error) {
    console.log(error)
    message.channel.send("Something went wrong with the Command")
  }
}

module.exports = {
	name: 'bored',
  cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts activity to fight boredom',
	execute(message, args) {
    if (!args.length) return getCat(message)
    const participants = args[0].toLowerCase()
    if (isNaN(participants)) return getCat(message)
		getCat(message, participants)
	}
}