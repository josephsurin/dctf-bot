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
	var { playerid, solves } = player
	var totalPoints = getTotalPoints(solves)
	var otherPlayers = await Player.find({ playerid: { "$ne": playerid }})
	var otherTotalPoints = otherPlayers.map(({ solves }) => getTotalPoints(solves))
	otherTotalPoints.sort()
	return binarySearchLeft(otherTotalPoints, totalPoints) + 1
}

function binarySearchLeft(arr, T) {
	var l = 0
	var r = arr.length
	while(l < r) {
		m = floor((l + r) / 2)
		if(arr[m] < T) {
			l = m + 1
		} else {
			r = m
		}
	}
	return l
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

module.exports = {
	getBotConfig,
	ordinalSuffix,
	getTotalPoints,
	filterAlphanumeric,
	genChallEmbed,
	getRank
}