module.exports = {
	name: 'ping',
	cooldown: 10,
	description: 'Ping',
	execute(message, args) {
		message.channel.send('pong')
	},
}