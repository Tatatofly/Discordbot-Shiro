const fetch = require('node-fetch')

async function getAPI(message) {
  const url = 'https://random.dog/woof.json'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.url !== 'undefined' && apiData.url) {
      try {
        fetch(apiData.url, {method: 'HEAD'}).then(function (dogPicResponse){
          dogPicSize = dogPicResponse.headers.get("Content-Length");
          if(parseInt(dogPicSize, 10) < 8000000) {
            message.channel.send({
              files: [apiData.url]
            })
          } else {
            message.channel.send("File was too large ;__;");
          }
        })
      } catch (error) {
        message.channel.send("The dog escaped! :dog: ")
        console.log(error);
      }
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
		getAPI(message)
	}
}