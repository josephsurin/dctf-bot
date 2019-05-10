const fs = require('fs')
const mongoose = require('mongoose')
const Discord = require('discord.js')
const client = new Discord.Client()

const { author, cmdprefix } = JSON.parse(fs.readFileSync('./botconfig.json'))

if(process.env.MODE != 'prod') {
	require('dotenv').config()
}

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/dctf-bot'
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => {
		console.log(`Connected to DB at ${dbURI}`)
		client.login(process.env.TOKEN)
	})

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	if(msg.content.startsWith(cmdprefix)) {
		msg.reply('yeah!')
	}
})

client.login(process.env.TOKEN)