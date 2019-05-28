# Discord CTF Bot

### Commands

- `help` - displays this help screen
- `challs` - displays all available challenges
- `chall <challid>` - displays information about a challenge
- `submit <challid> <flag>` - submits a flag for checking (this can only be used in a direct message with the bot)
- `vote <challid> <vote value>` - vote on the difficulty of a challenge, on a scale from (easy) 1 to 10 (hard)
- `profile (user)` - displays the profile of the specified user, or the person who issued the command if not specified
- `leaderboard` - displays the global leaderboard
- `solves <challid>` - displays the solvers and their time of solving for a challenge
- `notes <challid>` - displays notes/resources/hints for a challenge (only use this if you're stuck!)
- `about` - displays information about the bot

---

### Submitting a challenge

1. Fork this repository.
2. Create a new file in `/src/challs/` with filename `<challid>.js` and paste the template below in:

```javascript
const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `<description message goes here (supports basic markdown)>`

var chall = {
    challid: '<challid goes here>',
    title: '<chall title goes here>',
    category: '<chall category goes here>',
    points: 0,
    authorid: '<discord id goes here>',
    authorName: '<author display name goes here>',
    flag: '<sha256 hash of flag goes here>',
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
```

3. If your challenge doesn't require any further interactivity, you should only need to edit the `challid`, `title`, `category`, `points`, `authorid`, `authorName`, `flag` fields and the `description` message, you can also optionally add some `notes`,
4. Create a pull request.
