const fetch = require('node-fetch')
const parseString = require('xml2js').parseString;

async function getLewd(message, args) {
  const arguments = args[0] ? args[0] : ''
  const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + arguments;
  try {
    const response = await fetch(url)
    apiData = await response.text()
    parseString(apiData, function (error, result) {
      let postCount = result.posts.$.count - 1;
      if(postCount > 100) {
        postCount = 100;
      }
      if(postCount > 0) {
        var picNum = Math.floor(Math.random() * postCount) + 0;
        var r34Pic = result.posts.post[picNum].$.file_url;
        var r34Preview = result.posts.post[picNum].$.sample_url;
        try {
          message.channel.send({
            files: [r34Pic]
          });
        } catch (error) {
          message.channel.send({
            files: [r34Preview]
          });
        }
      } else {
        message.channel.send("Nobody here but us chickens!");
      }
    })
  } catch (error) {
    console.log(error)
    message.channel.send("There was error with rule34.xxx")
  }
}

module.exports = {
  name: 'rule34',
  aliases: ['r34'],
  cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  nsfw: true,
	description: 'Posts lewd image from rule34.xxx',
	execute(message, args) {
		getLewd(message, args)
	}
}