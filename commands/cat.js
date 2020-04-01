const fetch = require('node-fetch')

async function getCat(message) {
  const url = 'https://aws.random.cat/meow'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.file !== 'undefined' && apiData.file) {
      message.channel.send({
        files: [apiData.file]
      })
    } else {
      message.channel.send("The cat escaped! :crying_cat_face: ")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("The cat escaped! :crying_cat_face: ")
  }
}

module.exports = {
	name: 'cat',
	cooldown: 30,
	description: 'Posts awesome cat 🐱',
	execute(message, args) {
		getCat(message)
	},
}