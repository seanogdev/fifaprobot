var { RichEmbed } = require('discord.js')
var FifaAPI = require('../fifa-18-api')

module.exports = async (clubName) => {
  const clubId = await FifaAPI.club.getClubIdByName(clubName)
  const {name} = await FifaAPI.club.getClubInfo(clubId)
  const {gamesPlayed, wins, losses, ties, goals, goalsAgainst} = await FifaAPI.club.getClubStats(clubId)
  return new RichEmbed({
    title: name,
    description: `P: ${gamesPlayed} — W: **${wins}** — L: **${losses}** — D: **${ties}** | Goals For: ${goals} — Goals Against: ${goalsAgainst}`,
    fields: [
      {
        name: 'Division 2',
        value: 'test'
      },
      {
        name: 'Division 2',
        value: 'test'
      },
      {
        name: 'Division 2',
        value: 'test'
      }
    ]
  })
}
