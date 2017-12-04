const { Client } = require('discord.js')
const express = require('express')
const http = require('http')
const settings = require('./utils/settings')
const app = express()
const client = new Client()
const token = process.env.DISCORD_BOT_TOKEN
// const fs = require('fs')
// const avatar = fs.readFileSync('./avatar.png')

const defaultSettings = {
  clubName: '',
  members: ''
}

app.set('port', (process.env.PORT || 5000))

app.get('/', (request, response) => {
  var result = 'App is running'
  response.send(result)
}).listen(app.get('port'), () => {
  console.log('App is running, server is listening on port ', app.get('port'))
})

client.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  // Example of changing the bot's playing game to something useful.
  client.user.setGame(`on ${client.guilds.size} servers`)
  // client.user.setAvatar(avatar)
})

client.on('guildCreate', guild => {
  settings.set(guild.id, defaultSettings)
  client.user.setGame(`with ${client.guilds.size} balls`)
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
})

client.on('guildDelete', guild => {
  settings.delete(guild.id)
  client.user.setGame(`on ${client.guilds.size} servers`)
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
})

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return

  // This is the best way to define args. Trust me.
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
  const commandMethod = args.shift().toLowerCase()

  try {
    let command = await require(`./commands/${commandMethod}.js`)
    command.run(client, message, args)
  } catch (err) {
    console.log(err)

    console.error(`Command "${commandMethod}" not found.`)
  }
})

client.login(token)

setInterval(() => {
  http.get(`http://${process.env.HEROKU_APP_NAME}.herokuapp.com`)
}, 1000 * 60 * 25)
