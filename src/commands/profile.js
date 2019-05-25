const path = require('path')
const { getBotConfig, getRank } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Player } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = async function profile(msg, args) {
	/*
		Displays user's profile
    */
    
    var searchUser = args[0]
    var userid = msg.author.id
    if(searchUser) {
        var searchResult = msg.guild.members.find(gm => matchUser(searchUser, gm))
        if(!searchResult) {
            msg.channel.send('No user found with that name!')
            return false
        } else {
            userid = searchResult.user.id
        }
    }

    var player = await Player.findOne({ playerid: userid })

    if(!player) {
        msg.channel.send('That user has no submissions yet!')
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
    s += solves.map(({ challid }) => {
        var { title, points } = allChalls[challid]
        totalPoints += points
        return `**${challid}**: ${title} [${points}]`
    }).join('\n')
    return s + `\nTotal points: ${totalPoints} | Rank: **#${rank}**`
}

function matchUser(search, guildMember) {
    var { displayName, nickname, user: { username } } = guildMember
    return username.startsWith(search) || displayName.startsWith(search) || (nickname && nickname.startsWith(search))
}