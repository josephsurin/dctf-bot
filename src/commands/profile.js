const path = require('path')
const { getBotConfig, getRank } = require(path.join(__dirname, '../util/util'))
const { Chall, Player } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = async function profile(msg, args) {
	/*
		Displays user's profile
    */
    
    var searchUser = args[0]
    var userid = msg.author.id
    if(searchUser) {
        var searchResult = msg.guild.members.find(gm =>  [gm.displayName, gm.nickname, gm.user.username].includes(searchUser))
        if(!searchResult) {
            msg.channel.send('No user found with that name!')
            return false
        } else {
            userid = searchResult.user.id
        }
    }

    var player = await Player.findOne({ playerid: userid })

    if(!player) {
        msg.channel.send('That user has no solves yet!')
        return false
    }

    var formattedProfile = await formatProfile(player)
    var { username } = userid == msg.author.id ? msg.author : (await msg.guild.fetchMember(userid)).user

    var embed = {
        title: `Profile for ${username}`,
        description: formattedProfile,
        color: themecolour
    }

    msg.channel.send({ embed })
}

async function formatProfile(player) {
    var { solves } = player
    if(!solves) {
        return 'None yet!'
    }
    var s = '__**Solves**__:\n'
    var totalPoints = 0
    var rank = await getRank(player)
    s += (await Promise.all(solves.map(async ({ challid }) => {
        var { title, points } = await Chall.findOne({ challid })
        totalPoints += points
        return `**${challid}**: ${title} [${points}]`
    }))).join('\n')
    return s + `\nTotal points: ${totalPoints} | Rank: **#${rank}**`
}