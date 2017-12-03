// var { RichEmbed } = require('discord.js')
var FifaAPI = require('../fifa-18-api')
var {RichEmbed} = require('discord.js')

exports.run = async (client, message, args) => {
  // const clubSearchString = args.length ? args[0] : message.guild.name

  const playerName = args.splice(-1)[0].toLowerCase()
  const clubName = args.join(' ')

  message.channel.send(`Getting stats for *${playerName}*`)

  const clubId = await FifaAPI.club.getClubIdByName(clubName)
  const members = await FifaAPI.club.getClubMembers(clubId)
  const { blazeId, ...member } = members.find(member => member.name.toLowerCase() === playerName)
  const [club, overall] = await Promise.all([
    FifaAPI.member.getMembersClubStats(clubId, blazeId), FifaAPI.member.getMembersStats(blazeId)
  ])

  console.log(overall, club)

  const flagUrl = `https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/flags/html5/35x22/${overall.proNationality}.png`

  const embed = new RichEmbed()
    .setAuthor(member.name, flagUrl)
    .setTitle(`${club.proName} - ${club.proOverall}`)
    .setDescription('test')
  message.channel.send({embed})
}
