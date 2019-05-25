const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))

const { themecolour, author, botname, cmdprefix } = getBotConfig()

module.exports = async function notes(msg, args) {
	/*
        Displays the global leaderboard
    */

    var authors = await getAuthors(allChalls)
	
    var embed = {
        title: `About`,
		description: `${botname} is a Discord CTF bot created by ${author}
		
        Type ${cmdprefix}help for a list of commands.
		
		The code for the bot is open source (https://github.com/josephsurin/dctf-bot)
		and makes use of the [discord.js](https://discord.js.org/) library.
		
        If you have any issues/questions/suggestions please message ${author}
        
        Special thanks to the following challenge authors:
        ${authors.join('\n')}`,
        color: themecolour
    }

    msg.channel.send({ embed })
}

async function getAuthors(allChalls) {
    /*
        Get an array of all the challenge authors sorted based on number of challenges authored
    */
    var authors = {}
    //hacky async
    await Promise.all(Object.values(allChalls).map(async ({ authorid, authorName }) => {
        var authorUser = await global.djsclient.fetchUser(authorid)
        var { username, discriminator } = authorUser
        var author = `${username}#${discriminator} (${authorName})`
        if(authors[author]) {
            authors[author] += 1
        } else {
            authors[author] = 1
        }
    }))
    return Object.entries(authors).sort((a, b) => b[1] - a[1]).map(el => el[0])
}