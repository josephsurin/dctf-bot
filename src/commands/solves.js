const path = require('path')
const { getBotConfig, getRank } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Chall } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = async function profile(msg, args) {
	/*
		Displays the solves for a challenge
    */
    
    var challid = args[0]
    
    if(!allChalls[challid]) {
        msg.channel.send('That is an invalid challenge id!')
        return false
    }

    var { solves } = await Chall.findOne({ challid })
    
    var embed = {
        title: `Solves for **${challid}**`,
        description: await formatSolves(solves),
        color: themecolour
    }

    msg.channel.send({ embed })
}

async function formatSolves(solves) {
    if(solves.length == 0) {
        return 'None yet... Can you be the first?'
    }
    return (await Promise.all(solves.map(async ({ playerid, time }, i) => {
        var { username, discriminator } = await global.djsclient.fetchUser(playerid)
        var rank = i + 1
        return `**#${rank}** ${username}#${discriminator} (${new Date(time).toLocaleString()})`
    }))).join('\n')
}