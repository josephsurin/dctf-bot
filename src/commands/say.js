const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))

const { themecolour, admins } = getBotConfig()

module.exports = function say(msg, args) {
	/*
        Send a message as the bot
    */
    if(!admins.includes(msg.author.id)) {
        return false
    }

    var targMsg = args.slice(1).join(' ')
    var targChannel = global.djsclient.channels.get(args[0])

    if(targChannel) {
        console.log('[LOG]', 'sending', targMsg, 'to channel', args[0], 'requested by', msg.author.username)
        targChannel.send(targMsg)
    }
}
