const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const { cmdprefix } = getBotConfig()

module.exports = function help(msg, args) {
	/*
		Displays help information for the bot
	*/
	
	msg.channel.send(`\`\`\`Usage: ${cmdprefix}command arg1 arg2 ...

Available Commands:
	${cmdprefix}help - displays this help screen
	${cmdprefix}challs - displays all available challenges
	${cmdprefix}chall <challid> - displays information about a challenge
	${cmdprefix}submit <challid> <flag> - submits a flag for checking
	${cmdprefix}profile (user) - displays the profile of the specified user, or the person who issued the command if not specified
	${cmdprefix}leaderboard - displays the server leaderboard\`\`\``)

}