const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Two people are trying to communicate privately using a symmetric cipher, but I think there's something fishy about their key exchange...

I've managed to intercept some of the values they were using. You can find them [here](https://paste.ee/r/RkdXY/0).

\`\`\`python
from Crypto.Cipher import AES
from Crypto.Random.random import randint
from Crypto.Util.number import bytes_to_long, long_to_bytes
from hidden import flag
from truncated import n, g, T_pub

M_priv = randint(0, n)
M_pub = pow(g, M_priv, n)
s = pow(T_pub, M_priv, n)
key = long_to_bytes(s)[:32]
cipher = AES.new(key, AES.MODE_ECB)
enc = hex(bytes_to_long(cipher.encrypt(flag)))
print('n=', n)
print('g=', g)
print('T_pub=', T_pub)
print('M_pub=', M_pub)
print('enc=', enc)
\`\`\``

var chall = {
    challid: 'crypto12',
    title: 'An Easy Problem!',
    category: 'Cryptography',
    points: 35,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '4bbed8820b3d7d999e554e95811e2100a56cd3b41bb9c82d171f6e1fc9d5d3b2',
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
