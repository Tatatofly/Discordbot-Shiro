async function purge(message, amount) {
  try {
    message.channel.bulkDelete(amount)
      .then(messages => message.channel.send(`Purged ${messages.size} messages`))
      .catch(console.error)
  } catch (error) {
    console.log(error)
    message.channel.send("There was error with purge")
  }
}

module.exports = {
	name: 'purge',
  cooldown: 5,
  guildOnly: true,
  ownerOnly: true,
  nsfw: false,
	description: 'Purges a specified amount of messages',
	execute(message, args) {
    if (!args.length) return message.channel.send(`You didn't pass any amount`)
    const amount = args[0].toLowerCase()
    if (isNaN(amount)) return message.channel.send(`Argument isNaN`)
		purge(message, amount)
	}
}