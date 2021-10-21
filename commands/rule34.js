const fetch = require('node-fetch')
const xml2js = require('xml2js');

async function getLewd(message, args) {
  const arguments = args[0] ? args[0] : ''
  const url = encodeURI('https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + arguments);
  try {
    const response = await fetch(url)
    apiData = await response.text()

    var parser = new xml2js.Parser();
    parser.parseStringPromise(apiData).then(function (r34Result) {
      let postCount = r34Result.posts.$.count - 1;
      if(postCount > 100) {
        postCount = 100;
      }
      if(postCount > 0) {
        var picNum = Math.floor(Math.random() * postCount) + 0;
        var r34Pic = r34Result.posts.post[picNum].$.file_url;
        try {
          fetch(r34Pic, {method: 'HEAD'}).then(function (r34PicResponse){
            r34PicSize = r34PicResponse.headers.get("Content-Length");
            if(parseInt(r34PicSize, 10) < 8000000) {
              message.channel.send({
                files: [r34Pic]
              });
            } else {
              message.channel.send("File was too large ;__;");
            }
          }).catch(function (error) {
            console.log(error);
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        message.channel.send("Nobody here but us chickens!");
      }
    })
    .catch(function (error) {
      console.log(error)
    });
  } catch (error) {
    console.log(error)
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