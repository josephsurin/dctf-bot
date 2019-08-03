const path = require('path')
const challs = require(path.join(__dirname, './challs'))
const chall = require(path.join(__dirname, './chall'))
const submit = require(path.join(__dirname, './submit'))
const help = require(path.join(__dirname, './help'))
const profile = require(path.join(__dirname, './profile'))
const leaderboard = require(path.join(__dirname, './leaderboard'))
const notes = require(path.join(__dirname, './notes'))
const about = require(path.join(__dirname, './about'))
const vote = require(path.join(__dirname, './vote'))
const solves = require(path.join(__dirname, './solves'))
const say = require(path.join(__dirname, './say'))

module.exports = {
	challs,
	chall,
	submit,
	help,
	profile,
	leaderboard,
	notes,
	about,
	vote,
	solves,
    say
}
