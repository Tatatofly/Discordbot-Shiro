async function getSmug(message) {
  const url = 'https://smug.moe/smg/'
  const randomSmug = Math.floor(Math.random() * 59) + 1 
  const fileEnding = '.png'
  try {
    const smugFile = url + randomSmug + fileEnding
    message.channel.send({
      files: [smugFile]
    })
  } catch (error) {
    console.log(error)
    message.channel.send("There was error with the smug ;__;")
  }
}

module.exports = {
	name: 'smug',
  cooldown: 15,
  guildOnly: false,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts smug anime girl :^)',
	execute(message, args) {
		getSmug(message)
	}
}