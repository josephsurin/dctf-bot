const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

var chall = {
    challid: 'crypto1',
    title: 'ROT13',
    category: 'Cryptography',
    points: 5,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '569d0e82442ef1900ee8ee49fc9b818494172c34277c52389ee170f40625446c',
    desc: async function(msg) {
        var description = `

            Sanity check...

            \`\`\`ZVFPPGS{ebg13_vfa'g_irel_vagrerfgvat}\`\`\`
        `

        let { challid, title, category, points, authorid, authorName } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://en.wikipedia.org/wiki/ROT13']
}

module.exports = chall