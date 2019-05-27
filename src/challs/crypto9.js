const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

var description = `
Two values of \`e\` but only one \`n\` :thinking:

The values are [here](https://paste.ee/r/7Qhh3/0)

\`\`\`python
from Crypto.Util.number import getPrime, bytes_to_long

flag = b'MISCCTF{this is not the flag by the way}'

n = getPrime(1024) * getPrime(1024)

e1 = 17489
e2 = 65537

m = bytes_to_long(flag)

c1 = pow(m, e1, n)
c2 = pow(m, e2, n)\`\`\``

var chall = {
    challid: 'crypto9',
    title: 'RSA Level 5',
    category: 'Cryptography',
    points: 25,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'b6b6d3b6a08b82340a87f10e45ad1bedd0189bec9cd61f73c310278c42d8a01a',
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
