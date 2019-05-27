const fs = require('fs')
const path = require('path')
const { Player, Chall } = require(path.join(__dirname, '../../models/index'))

function getBotConfig() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../../botconfig.json')))
}

function ordinalSuffix(num) {
	var dig = num % 10
	var suffix = ''
	switch(dig) {
		case 1: suffix = 'st'; break
		case 2: suffix = 'nd'; break
		case 3: suffix = 'rd'; break
		default: suffix = 'th'
	}
	return num.toString() + suffix
}

function getTotalPoints(solves) {
	const allChalls = require(path.join(__dirname, '../challs/index'))
	return solves.reduce((acc, { challid }) => acc + allChalls[challid].points, 0)
}

async function getRank(player) {
	var leaderboard = await getLeaderboard()
	return leaderboard.findIndex(({ playerid }) => playerid == player.playerid) + 1
}

async function getLeaderboard() {
	var players = await Player.find()
	players.sort((a, b) => {
		var { solves: as } = a
		var { solves: bs } = b
		var aT = getTotalPoints(as)
		var bT = getTotalPoints(bs)
		if(bT > aT) {
			return 1
		} else if(aT > bT) {
			return -1
		} else { //scores are equal, so compare latest completion time
			var at = Math.max(...as.map(({ time }) => new Date(time).getTime()))
			var bt = Math.max(...bs.map(({ time }) => new Date(time).getTime()))
			return at - bt //put the smallest max first
		}
	})
	return players
}

function emojiRank(n) {
	if(n > 3) return ''
	return [':first_place:' ,':second_place:', ':third_place:'][n-1]
}

function filterAlphanumeric(str) {
	return str.replace(/\W/g, '')
}

async function genChallEmbed({challid, title, category, points, authorid, authorName, themecolour, description}) {
	var d = await Chall.findOne({ challid })
	var { solves, votes } = d
	var authorUser = await global.djsclient.fetchUser(authorid)
	var { username, discriminator, displayAvatarURL: icon_url } = authorUser
	var author = `${username}#${discriminator} (${authorName})`
	return {
		title: `${title} - ${category} [${points}] (${solves.length} solves) {Average Vote: ${avgVote(votes)}}`,
		description,
		footer: {
			icon_url,
			text: `Author: ${author} | Challenge id: ${challid}`
		},
		color: themecolour
	}
}

function avgVote(votes) {
	if(votes.length == 0) {
		return '?'
	}
	return (votes.reduce((acc, { vote }) => acc + vote, 0) / votes.length).toFixed(2)
}

async function hasSolved(playerid, challid) {
	// searches up for player document with playerid
	const { solves } = await Player.findOne({ playerid })
	return hasSolvedSync(solves, challid)
}

function hasSolvedSync(solves, challid) {
	// uses already found solves array
	var solveIndex = solves.findIndex(s => s.challid == challid)
	if(solveIndex == -1) {
		return false
	} else {
		return true
	}
}

module.exports = {
	getBotConfig,
	ordinalSuffix,
	getTotalPoints,
	filterAlphanumeric,
	genChallEmbed,
	getRank,
	getLeaderboard,
	emojiRank,
	hasSolved,
	hasSolvedSync
}