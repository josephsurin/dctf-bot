const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
My jumbled flag printing [program](https://drive.google.com/open?id=1reOoCYHeXE2NzTk84KyfodPqjxKryden) keeps segfaulting and I can't figure out why! :slight_frown:

Can you help me fix it?
`

var chall = {
    challid: 'rev5',
    title: 'Segfault',
    category: 'Reversing',
    points: 15,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '94859f96644f8429895e6c42e291c11f49f399c3cdc0a8db086320b54073c91b',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: []
}

module.exports = chall
