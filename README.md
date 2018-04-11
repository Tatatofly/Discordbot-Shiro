# Discordbot-Shiro
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![HitCount](http://hits.dwyl.io/Tatatofly/Discordbot-Shiro.svg)](http://hits.dwyl.io/Tatatofly/Discordbot-Shiro)

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
- discordBotsApiKey = bots.discord.pw api key
- discordBotsApiUrl = The url with your botid
- trustedUsers = Add userid of trusted users. You can use module to add more users.


## Current modules
### Fun
- Cat: Posts awesome cat :cat: *API will be fixed*
- Meme: Posts spicy meme :ok_hand:
- AddMeme: Owner and trusted users can add memes from url :smirk:
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
- Guilds: Posts number of guilds bot are into and updates count to bots.discord.pw
- Trusted: Adds user to trusted list

## Planned modules
- Info: Info message
- Spotify: Sends random song from spotify 
- Rate: Adds reaction to previous message
- Hashtag: Searches given hashtag from twitter and posts first result
- Suggest: Saves suggested feature for bot owner
- Purge: Purges a specified amount of messages
- Userinfo: Gives info from given user (roles etc.)
- UrbanDict: Searches given word from urbandictionary


## TODO
- Input filter and sanitization
