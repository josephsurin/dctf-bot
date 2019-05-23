const fs = require('fs')
const path = require('path')
const { Player } = require(path.join(__dirname, '../../models/index'))

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

function genChallEmbed({challid, title, category, points, author, solveCount, themecolour, description, icon_url}) {
	return {
		title: `${title} - ${category} [${points}] (${solveCount} solves)`,
		description,
		footer: {
			icon_url,
			text: `Author: ${author} | Challenge id: ${challid}`
		},
		color: themecolour
	}
}

async function hasSolved(playerid, challid) {
	const { solves } = await Player.findOne({ playerid })
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
	hasSolved
}