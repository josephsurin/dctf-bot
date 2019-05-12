const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))

const { themecolour, author, botname, cmdprefix } = getBotConfig()

module.exports = function notes(msg, args) {
	/*
        Displays the global leaderboard
    */
	
    var embed = {
        title: `About`,
		description: `${botname} is a Discord CTF bot created by ${author}
		
		Type ${cmdprefix}help for a list of commands.
		
		The code for the bot is open source (https://github.com/josephsurin/dctf-bot)
		and makes use of the [discord.js](https://discord.js.org/) library.
		
		If you have any issues/questions/suggestions please message ${author}`,
        color: themecolour
    }

    msg.channel.send({ embed })
}
