# Discordbot-Shiro
DiscordBot WiP with JavaScript powered by Node.JS

Live test and support in: [https://discord.gg/pGbbcgV](https://discord.gg/pGbbcgV)


## Install required packages
```
npm install --save discord.js-commando xml2js twitter discord.js
```

## config.json
- token = discord token
- prefix = command prefix
- botOwnerID = your discord id
- botActivity = bot default activity
- myGuildID = your server id (for commands like tweet)
- OWMKey = OpenWeatherMap api key
- twitterConsumerKey = Twitter developer consumer key
- twitterConsumerSecret = Twitter developer consumer secret
- twitterAccessKey = Twitter developer access key
- twitterAccessSecret = Twitter developer access secret
- spotifyID = Spotify developer client ID
- spotifySecret = Spotify developer client secret


## Current modules
### Fun
- Cat: Posts awesome cat :cat: *API will be fixed*
- Meme: Posts spicy meme :ok_hand:
- Smug: Posts smug anime girl :^)
- Rule34: Posts lewd image from rule34.xxx :sweat_drops:
- Get: Checks 'em and posts result :point_right: 

### Twitter
- Twitter: Tweets you message :bird:

### Sää
- Weather: Posts weather from given city (*currently only finnish cities*)

### Status
- Steam: Posts steam and csgo server status

### Owner Tools
- Activity: Sets bot Activity
- Picture: Sets bot profile picture from url

## Planned modules
- Spotify: Sends random song from spotify 
- Rate: Adds reaction to previous message
- Hashtag: Searches given hashtag from twitter and posts first result


## TODO
- Input filter and sanitization
