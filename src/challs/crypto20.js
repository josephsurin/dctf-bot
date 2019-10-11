const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Everyone knows that CRC is not to be used as a hashing function, but can you prove it?

\`\`\`
package main

import (
    "fmt"
    "hash/crc32"
    "os"
)

func crc(data []byte, poly uint32) uint32 {
    table := crc32.MakeTable(poly)
    return crc32.Checksum(data, table)
}

func unloved() {
    fmt.Println("</3")
    os.Exit(1)
}

func main() {
    if len(os.Args) != 2 || len(os.Args[1]) != 16 {
        unloved()
    }
    guess := []byte(os.Args[1])
    check := []uint32{0x69c312d4, 0xa2caf197, 0xf15b316e, 0x4c18a769}
    poly := uint32(0xdeadbeef)
    for i := uint32(0); i < 4; i++ {
        if crc(guess, poly + i) != check[i] {
            unloved()
        }
    }
    fmt.Printf("<3 Flag is MISCCTF{%s}\n", guess)
}
\`\`\`
`

var chall = {
    challid: 'crypto20',
    title: 'Poly Amory',
    category: 'Cryptography',
    points: 50,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '2c2f74445bdd94e5af6f7732c7d9a8d3e41f30341a7dd651ca2bdbd22c3dcd64',
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
