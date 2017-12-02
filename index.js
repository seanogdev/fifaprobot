const Discord = require('discord.js')
const FifaAPI = require('./fifa-18-api')
const _ = require('lodash')
const PREFIX = '!fifa'
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_TOKEN

const handleMessage = message => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return

  const normalizedMessage = message.content.toLowerCase()
  const args = normalizedMessage.split(' ')

  // Dispose of !fifa
  args.shift()

  // Get method call
  const call = args.shift()

  if (call === 'clubinfo') {
    // const clubSearchString = args.length ? args[0] : message.guild.name
    const clubSearchString = args.length ? args.join(' ') : 'Magic Potatoes'
    getClubInfo(message, clubSearchString)
  }
}

const getClubInfo = async (clubSearchString) => {
  // message.channel.send(`Searching for ${clubSearchString}`)

  console.log(`Searching for ${clubSearchString}`)

  const clubSearch = await FifaAPI.search.searchClubByName(clubSearchString)

  const clubInfo = await FifaAPI.club.getClubInfo(clubSearch.clubId)

  console.log(clubInfo)

  // message.channel.send(`found ${clubInfo.name}`)
  // message.channel.send({embed: {
  // 	color: 3447003,
  // 	description: 'A very simple Embed!'
  // }})
}

client.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  // Example of changing the bot's playing game to something useful.
  client.user.setGame(`on ${client.guilds.size} servers`)
  getClubInfo('magic potatoes')
})

client.on('guildCreate', guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
  client.user.setGame(`with ${client.guilds.size} balls`)
})

client.on('guildDelete', guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
  client.user.setGame(`on ${client.guilds.size} servers`)
})

client.on('message', handleMessage)

client.login(token)
