const fetch = require('node-fetch')

async function getBitcoin(message) {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
  try {
    const response = await fetch(url)
    apiData = await response.json()
    if(typeof apiData.bpi !== 'undefined' && apiData.bpi) {
      message.channel.send({
        "embed": {
          "title": "Current price of Bitcoin",
          "color": 15825207,
          "timestamp": `${apiData.time.updatedISO}`,
          "footer": {
            "text": "Updated"
          },
          "thumbnail": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png"
          },
          "fields": [
            {
              "name": "EUR",
              "value": `${Math.round(apiData.bpi.EUR.rate_float)}`,
              "inline": true
            },
            {
              "name": "GBP",
              "value": `${Math.round(apiData.bpi.GBP.rate_float)}`,
              "inline": true
            },
            {
              "name": "USD",
              "value": `${Math.round(apiData.bpi.USD.rate_float)}`,
              "inline": true
            }
          ]
        }
      })
    } else {
      message.channel.send("There is something wrong with API")
    }
  } catch (error) {
    console.log(error)
    message.channel.send("Error with API connection")
  }
}

module.exports = {
	name: 'bitcoin',
  cooldown: 120,
  guildOnly: true,
  ownerOnly: false,
  nsfw: false,
	description: 'Posts current price of bitcoin',
	execute(message, args) {
		getBitcoin(message)
	}
}