const path = require('path')
const { getBotConfig, hasSolvedSync } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Chall, Player } = require(path.join(__dirname, '../../models/index'))

const { themecolour, flagformat, cmdprefix } = getBotConfig()

const MAX_SEARCH_LEN = 30

// set up yargs
const yargs = require('yargs')
yargs
	.option('plain', {
		alias: 'p',
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

	var { plain, hideSolved, search, sort } = argv

	Chall.find().sort('challid').then(async (dbChalls) => {
		
		if(!dbChalls) {
			msg.channel.send('No challenges found!')
			return false
		}

		var p = await Player.findOne({ playerid: msg.author.id })
		var solves = p ? p.solves : undefined
	
		var fields = processChallsDisplay(dbChalls, plain, hideSolved, search, sort, solves)
	
		var embed = {
			title: 'Challenges List',
			description: `
			The flag format is \`${flagformat}\` unless otherwise specified.`,
			fields,
			timestamp: `${new Date().toISOString()}`,
			footer: {
                icon_url: msg.author.displayAvatarURL,
                text: `${msg.author.username} ${search ? '| search: ' + search : ''} ${hideSolved ? '| Hiding solved challs' : ''} ${plain ? '| plain' : ''}` 
            },
			color: themecolour
		}

		msg.channel.send({ embed })

	})		
}

const Fuse = require('fuse.js')

function processChallsDisplay(dbChalls, plain, hideSolved, search, sort, playerSolves) {

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
			categorySeparated[chall.category] = [processChallDisplay(chall)]
		} else {
			categorySeparated[chall.category].push(processChallDisplay(chall))
		}
	})

	//FIELD GENERATION
	fields = []
	for(var cat in categorySeparated) {
		field = {
			name: `**__${cat}__**`,
			value: categorySeparated[cat].join('\n'),
			inline: true
		}
		fields.push(field)
	}

	if(fields.length == 0) {
		return [{
			name: ':tada: :tada: :tada:',
			value: 'You\'ve solved all the current challenges!'
		}]
	} else {
		return fields
	}

	function processChallDisplay(chall) {
		let { challid, title, points, solves } = chall
		var display = `**${challid}**: ${title} [${points}] - ${solves.length} solves`
		if(!plain && playerSolves && hasSolvedSync(playerSolves, challid)) {
			display += ':white_check_mark:'
		}
		return display
	}
}
