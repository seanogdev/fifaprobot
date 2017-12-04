const FifaAPI = require('fifa18-proclubs-api')
const { RichEmbed } = require('discord.js')
const { getRegionNameById } = require('../utils/regions')
const { calculateDivision } = require('../utils/divisions')
const { getPercentage, getRatio, getDifference } = require('../utils/maths')

const parseRecord = (s) => {
  const parseNum = num => (num === '0' ? ':regional_indicator_w:' : num === '1' ? ':regional_indicator_d:' : ':regional_indicator_l:')

  const results = [ s.lastMatch0, s.lastMatch1, s.lastMatch2, s.lastMatch3, s.lastMatch4, s.lastMatch5 ]

  return results.map(result => parseNum(result)).reverse().join('')
}

exports.run = async (client, message, args) => {
  const clubNameString = args.join(' ')
  let clubName

  if (clubNameString) {
    clubName = clubNameString
    message.channel.send(`Searching for ${clubName}`)
  } else {
    clubName = message.guild.name
    message.channel.send(`No club name given. Searching for ${clubName}`)
  }

  try {
    const clubId = await FifaAPI.club.getClubIdByName(clubName)

    const [info, all, season] = await Promise.all([
      FifaAPI.club.getClubInfo(clubId),
      FifaAPI.club.getClubStats(clubId),
      FifaAPI.club.getClubSeasonStats(clubId)
      // FifaAPI.club.getClubMatchHistory(clubId)
    ])

    const DIVISION = calculateDivision(season.currentDivision)

    const teamCrest = `https://fifa17.content.easports.com/1630db19-29b0-4904-a574-f52f7c09e166/fifaweb_assets/crests/128x128/l${info.customKit.isCustomTeam === '0' ? info.teamId : info.customKit.crestAssetId}.png`

    console.log(teamCrest)

    const divisionImage = `https://www.easports.com/iframe/fifa17proclubs/bundles/fifa/dist/images/division-crests/DivisionCrest${DIVISION}.png`

    const seasonGD = getDifference(season.goals - season.goalsAgainst)
    const allGD = getDifference(all.goals - all.goalsAgainst)

    const playedRecord = `**${all.gamesPlayed}** played. **${getPercentage(all.wins, all.gamesPlayed)}%** wins. **${getPercentage(all.losses, all.gamesPlayed)}%** losses. **${getPercentage(all.ties, all.gamesPlayed)}%** ties`

    const currentSeason = [
      `Record: **${season.seasonWins}** - **${season.seasonTies}** - **${season.seasonLosses}**`,
      `Points: **${season.points}**`,
      `Projected points: **${season.projectedPts === '-1' ? 'N/A' : season.projectedPts}**`,
      `Matches played: **${season.gamesPlayed}**`,
      ``,
      `Goals: **${season.goals}**`,
      `Goals conceded: **${season.goalsAgainst}**`,
      `Goals scored / match: **${getRatio(season.goals, season.gamesPlayed)}**`,
      `Goals conceded / match: **${getRatio(season.goalsAgainst, season.gamesPlayed)}**`,
      `Goal difference: **${seasonGD}**`
    ].join('\n')

    const allSeasons = [
      // `Points in last matches: **${}**`,
      `Best division: **Div ${calculateDivision(season.bestDivision)}** (${season.bestPoints} pts)`,
      `Seasons played: **${season.seasons}**`,
      `Promotions: **${season.promotions}**`,
      `Seasons held: **${season.holds}**`,
      `Relegations: **${season.relegations}**`,
      ``,
      `Goals : **${all.goals}**`,
      `Goals conceded: **${all.goalsAgainst}**`,
      `Goals scored / match: **${all.averageGoalsPerGame}**`,
      `Goals conceded / match: **${all.averageGoalsAgainstPerGame}**`,
      `Goal difference: **${allGD}**`
    ].join('\n')

    const embed = new RichEmbed()
      .setColor(16238340)
      .setAuthor(info.name, divisionImage)
      .setTitle(`**${all.wins}** - **${all.ties}** - **${all.losses}**`)
      .setDescription(`Division ${DIVISION} — ${getRegionNameById(info.regionId)}`)
      .setTimestamp(new Date())
      .setThumbnail(teamCrest)
      .addField('Record', parseRecord(season))
      .addField('Played', playedRecord)
      .addField('Current Season', currentSeason, true)
      .addField('Overall Stats', allSeasons, true)

    message.channel.send({embed})
  } catch (e) {
    console.log(e)

    message.channel.send(`No club called "*${clubName}*" was found`)
  }
}
