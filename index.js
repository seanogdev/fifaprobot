const {RichEmbed, ...Discord} = require('discord.js')
const { getClubInfo } = require('./messages')
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_TOKEN

const PREFIX = '!fifa'

const handleMessage = async message => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return

  const normalizedMessage = message.content.toLowerCase().split(' ')
  const [prefix, method, ...args] = normalizedMessage

  if (method === 'clubinfo') {
    // const clubSearchString = args.length ? args[0] : message.guild.name
    const clubName = args.length ? args.join(' ') : 'Magic Potatoes'
    message.channel.send(`Searching for ${clubName}`)
    const embed = await getClubInfo(clubName)
    message.channel.send({
      embed
    })
  }
}

client.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  // Example of changing the bot's playing game to something useful.
  client.user.setGame(`on ${client.guilds.size} servers`)
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
