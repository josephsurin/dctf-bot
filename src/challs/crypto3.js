const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Is there anything noteworthy about \`n\`?

\`\`\`n = 64102002301840754228195419684105688294791204377114921273193411967543960790809
e = 65537
c = 59275256886013998614804534443446044923122093593042100696977962063455729483055\`\`\``

var chall = {
    challid: 'crypto3',
    title: 'RSA Level 1',
    category: 'Cryptography',
    points: 15,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '50a2bbf84bc08fe39874dd534dc53ae62dc6596f7085958d6b3fc45bf9a98455',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://en.wikipedia.org/wiki/Integer_factorization']
}

module.exports = chall