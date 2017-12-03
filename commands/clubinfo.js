const FifaAPI = require('fifa18-proclubs-api')
const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const clubName = args.join(' ') || 'Magic Potatoes'
  message.channel.send(`Searching for ${clubName}`)

  const clubId = await FifaAPI.club.getClubIdByName(clubName)
  const [clubInfo, clubStats] = await Promise.all([FifaAPI.club.getClubInfo(clubId), FifaAPI.club.getClubStats(clubId)])

  const {name, teamId} = clubInfo
  const {gamesPlayed, wins, losses, ties, goals, goalsAgainst} = clubStats

  const currentStats = [
    `Goals For: **${goals}**`,
    `Goals Against: **${goalsAgainst}**`
  ].join('\n')

  const overallStats = [
    `Goals For: **${goals}**`,
    `Goals Against: **${goalsAgainst}**`
  ].join('\n')

  const teamCrest = `https://fifa17.content.easports.com/1630db19-29b0-4904-a574-f52f7c09e166/fifaweb_assets/crests/128x128/l${teamId}.png`

  const embed = new RichEmbed()
    .setColor(16238340)
    .setTitle(name)
    .setDescription(`**${wins}** - **${losses}** - **${ties}** | Played: **${gamesPlayed}**`)
    .setTimestamp(new Date())
    .setThumbnail(teamCrest)
    .addField('Current Season', currentStats, true)
    .addField('Overall Stats', overallStats, true)
    .addBlankField()

  message.channel.send({embed})
}
