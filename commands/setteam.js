const settings = require('../utils/settings')
const FifaAPI = require('fifa18-proclubs-api')

exports.run = async (client, message, args) => {
  const clubName = args.join(' ')
  try {
    const guildConf = settings.get(message.guild.id)
    const clubId = await FifaAPI.club.getClubIdByName(clubName)
    const members = await FifaAPI.club.getClubMembers(clubId)

    const parsedMembers = members.map(member => ({
      name: member.name,
      blazeId: member.blazeId
    }))

    guildConf['clubName'] = clubName
    guildConf['members'] = JSON.stringify(parsedMembers)

    settings.set(message.guild.id, guildConf)
    message.channel.send(`Club for this Discord server is now set to "*${clubName}*"`)
  } catch (e) {
    message.channel.send(`No club called "*${clubName}*" was found.`)
  }
}
