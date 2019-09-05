const path = require('path')
const { RichEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed')
const { getBotConfig, hasSolvedSync } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Chall, Player } = require(path.join(__dirname, '../../models/index'))

const { themecolour, flagformat, cmdprefix } = getBotConfig()

const MAX_SEARCH_LEN = 30

// set up yargs
const yargs = require('yargs')
yargs
	.option('plain', {
		alias: 'P',
		describe: 'Shows challenges without additional emoji'
	})
	.option('hideSolved', {
		alias: 'H',
		describe: 'Hides challenges you have solved'
	})
	.option('search', {
		alias: 'S',
        type: 'string',
		describe: `Search all challenges for a keyword (please limit your search query to less than ${MAX_SEARCH_LEN} characters)`
	})
	.option('sort', {
		alias: 's',
		describe: 'Sort the challenges list',
		choices: ['solves', 'points']
	})
    .option('points', {
        alias: 'p',
        describe: 'Filter challenges based on how many points they are worth'
    })
	.alias('h', 'help')
	.hide('version')
	.check(argv => {
		if(argv.search && argv.search.length > MAX_SEARCH_LEN) {
			throw new Error(`Search query too long (${argv.search.length})`)
		} else {
			return true
		}
	})
	.example(`${cmdprefix}challs --sort solves -H`, 'List my unsolved challenges, sorted by number of solves')

async function parseArgs(args) {
	return new Promise((resolve, reject) => {
		yargs.parse(args, (err, argv, output) => {
			if(err || Object.keys(argv).includes('help')) {
				return reject(output)
			} else {
				return resolve(argv)
			}
		})
	})
}

module.exports = async function challs(msg, args) {
	/*
		Lists available challenges
	*/

	var argv = await parseArgs(args.join(' ')).catch(output => {
		if(output) msg.channel.send(`\`\`\`${output}\`\`\``)
	})

	if(!argv) return false

	var { plain, hideSolved, search, sort, points } = argv
    var filters = { plain, hideSolved, search, sort, points }

    var dbChalls = await Chall.find().sort('challid')

    if(!dbChalls) {
        msg.channel.send('No challenges found!')
        return false
    }

    var p = await Player.findOne({ playerid: msg.author.id })
    var solves = p ? p.solves : undefined

    var embeds = processChallsDisplay(dbChalls, filters, solves)

    var pagEmbeds = new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([msg.author.id])
        .setChannel(msg.channel)
        .setFooter(`${msg.author.username} ${search ? '| search: ' + search : ''} ${hideSolved ? '| Hiding solved challs' : ''} ${plain ? '| plain' : ''}`, msg.author.displayAvatarURL)

    await pagEmbeds.build()
}

function parsePointsFilter(expr) {
    const eq = (b, a) => a == b
    if(typeof expr == 'number') return eq.bind(this, expr)
    if(expr.includes('..')) {
        var vals = expr.split('..')
        if(vals.length == 2) {
            var [a, b] = vals.map(a => parseInt(a))
            if(typeof a == 'number' && typeof b == 'number') {
                const rng = (a, c, b) => (a <= b && b <= c)
                return rng.bind(this, a, b)
            } else return false
        } else return false
    }
    const lte = (b, a) => a <= b
    const lt = (b, a) => a < b
    const gt = (b, a) => a > b
    const gte = (b, a) => a >= b
    expr = expr.replace(/\s/g, '')
    if(expr[1] == '=') {
        var val = parseInt(expr.slice(2))
        if(typeof val != 'number') return false

        if(expr[0] == '<') return lte.bind(this, val)
        else if(expr[0] == '>') return gte.bind(this, val)
        else if(expr[0] == '=') return eq.bind(this, val)
        else return false
    } else {
        var val = parseInt(expr.slice(1))
        if(typeof val != 'number') return false

        if(expr[0] == '<') return lt.bind(this, val)
        else if(expr[0] == '>') return gt.bind(this, val)
        else if(expr[0] == '=') return eq.bind(this, val)
        else return false
    }
}

const Fuse = require('fuse.js')

function processChallsDisplay(dbChalls, { plain, hideSolved, search, sort, points }, playerSolves) {

	//SEARCING
	var filteredChalls = dbChalls.map(({ challid, solves }) => Object.assign({ solves }, allChalls[challid]))
	if(search) {
		const fuse = new Fuse(filteredChalls, {
			threshold: 0.2,
			distance: 10000,
			minMatchCharLength: 3,
			maxPatternLength: MAX_SEARCH_LEN,
			keys: ['challid', 'title', 'category', 'authorid', 'authorName', 'description']
		})
		filteredChalls = fuse.search(search)
	}

	if(filteredChalls.length == 0) {
		return [{
			name: ':slight_frown: :slight_frown: :slight_frown:',
			value: 'Your search did not return any results!'
		}]
	}

	//HIDE SOLVED CHALLS
	if(hideSolved && playerSolves) {
		filteredChalls = filteredChalls.filter(({ challid }) => !hasSolvedSync(playerSolves, challid))
	}

    //POINTS FILTERING
    if(points) {
        var op = parsePointsFilter(points)
        if(op) {
            filteredChalls = filteredChalls.filter(({ challid }) => op(allChalls[challid].points))
        } else {
            return [{
                name: ':slight_frown: :slight_frown: :slight_frown:',
                value: 'Something went wrong with your search!'
            }]
        }
    }

	//SORTING
	var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }) //natural sort
	var naturalSort = (a, b) => collator.compare(a.challid, b.challid) // default
	if(sort == 'solves') {
		filteredChalls.sort((a, b) => b.solves.length - a.solves.length || naturalSort(a, b))
	} else if(sort == 'points') {
		filteredChalls.sort((a, b) => b.points - a.points || naturalSort(a, b))
	} else {
		filteredChalls.sort(naturalSort)
	}

	//CATEGORY SEGMENTATION
	var categorySeparated = {}
	filteredChalls.forEach(chall => {
		if(!categorySeparated[chall.category]) {
			categorySeparated[chall.category] = [chall]
		} else {
			categorySeparated[chall.category].push(chall)
		}
	})

    var chunkedChalls = []
    Object.keys(categorySeparated).forEach(cat => {
        var ch = categorySeparated[cat]
        var cobj = { category: cat, chall_fields: [] }
        for(var i = 0; i < ch.length; i+=15) {
            var challs = ch.slice(i, i+15).map(processChallDisplay)
            var field = {
                name: `**__${cat}__**`,
                value: challs.join('\n'),
                inline: true
            }
            cobj.chall_fields.push(field)
        }
        chunkedChalls.push(cobj)
    })

    //map the chunkedChalls array to an array of embeds
    var embeds = chunkedChalls.map(({ category, chall_fields }) => {
        return new RichEmbed({
            title: 'Challenges List',
			description: `
			The flag format is \`${flagformat}\` unless otherwise specified.`,
			fields: chall_fields,
			timestamp: `${new Date().toISOString()}`,
			color: themecolour
        })
    })

    return embeds

    function processChallDisplay(chall) {
        if(!chall.solves) {
            console.log(chall)
        }
        let { challid, title, points, solves } = chall
        var display = `**${challid}**: ${title} [${points}] - ${solves.length} solves`
        if(!plain && playerSolves && hasSolvedSync(playerSolves, challid)) {
            display += ':white_check_mark:'
        }
        return display
    }
}
