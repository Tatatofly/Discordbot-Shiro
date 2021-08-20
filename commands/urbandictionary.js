const fetch = require('node-fetch')

async function getAPI(message, args) {
  if (!args.length) return message.channel.send('You need to give a word to search...')
  const url = 'https://api.urbandictionary.com/v0/define?term=' + args[0];
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(apiData.list.length > 0) {
      message.channel.send(apiData.list[0].definition);
    } else {
      message.channel.send("Sorry, we couldn't find it")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("Something memed wrong..")
  }
}

module.exports = {
	name: 'urbandictionary',
  aliases: ['urbandict', 'urdict'],
  cooldown: 120,
  guildOnly: true,
  ownerOnly: false,
  nsfw: false,
	description: 'Searches given word from urbandictionary',
	execute(message, args) {
		getAPI(message, args)
	}
}