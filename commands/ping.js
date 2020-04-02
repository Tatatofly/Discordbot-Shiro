module.exports = {
	name: 'ping',
	cooldown: 10,
	guildOnly: false,
  ownerOnly: false,
	description: 'Ping -> Pong',
	execute(message, args) {
		message.channel.send('pong')
	}
}