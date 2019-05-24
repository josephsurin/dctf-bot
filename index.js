const path = require('path')
const mongoose = require('mongoose')
const Discord = require('discord.js')
const client = new Discord.Client()

global.djsclient = client

const { getBotConfig } = require(path.join(__dirname, './src/util/util'))
const { cmdprefix } = getBotConfig()

if(process.env.MODE != 'prod') {
	require('dotenv').config()
}

//load challenges
require(path.join(__dirname, './src/challs/index'))

//Database connection
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/dctf-bot'
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => {
		console.log(`Connected to DB at ${dbURI}`)
		client.login(process.env.TOKEN)
	})


//Command handling
const commands = require(path.join(__dirname, './src/commands/index'))
const commandsList = Object.keys(commands)

client.on('message', msg => {
	if(msg.content.startsWith(cmdprefix)) {
		var command = msg.content.split(cmdprefix)[1].split(' ')[0]
		if(commandsList.includes(command)) {
			var args = msg.content.split(' ').slice(1)
			commands[command](msg, args)
		}
	}
})

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})