const fetch = require('node-fetch')

async function getAPI(message) {
  const url = 'https://meme-api.herokuapp.com/gimme'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.url !== 'undefined' && apiData.url) {
      fetch(apiData.url, {method: 'HEAD'}).then(function (apiResponse){
        dataSize = apiResponse.headers.get("Content-Length");
        if(parseInt(dataSize, 10) < 8000000) {
          message.channel.send({
            files: [apiData.url]
          });
        } else {
          message.channel.send("Meme was too large ;__;");
        }
      });
    } else {
      message.channel.send("Something memed wrong..")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("Something memed wrong..")
  }
}

module.exports = {
	name: 'meme',
  cooldown: 30,
  guildOnly: true,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts spicy meme 👌',
	execute(message) {
		getAPI(message)
	}
}