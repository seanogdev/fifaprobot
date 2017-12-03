const FifaAPI = require('fifa18-proclubs-api')
const { RichEmbed } = require('discord.js')
const { getPositionById } = require('../utils/positions')
const { getPercentage, getRatio } = require('../utils/maths')
const blankString = '\u200B'

exports.run = async (client, message, args) => {
  let playerName = args.splice(-1)[0].toLowerCase()
  const clubName = args.join(' ')

  if (playerName === 'me') {
    playerName = message.author.username
  }

  message.channel.send(`Getting stats for *${playerName}*`)

  try {
    const clubId = await FifaAPI.club.getClubIdByName(clubName)
    const [clubInfo, members] = await Promise.all([FifaAPI.club.getClubInfo(clubId), FifaAPI.club.getClubMembers(clubId)])
    const { blazeId, ...member } = members.find(member => member.name.toLowerCase() === playerName)
    const [club, overall] = await Promise.all([
      FifaAPI.member.getMembersClubStats(clubId, blazeId),
      FifaAPI.member.getMembersStats(blazeId)
    ])

    const position = getPositionById(club.proPos)

    let teamCrest

    if (clubInfo.customKit.isCustomTeam != 0) { // eslint-disable-line eqeqeq
      teamCrest = `https://fifa15.content.easports.com/1630db19-29b0-4904-a574-f52f7c09e166/fifaweb_assets/crests/128x128/l${clubInfo.customKit.crestAssetId}.png`
    } else {
      teamCrest = `https://fifa17.content.easports.com/1630db19-29b0-4904-a574-f52f7c09e166/fifaweb_assets/crests/128x128/l${clubInfo.teamId}.png`
    }

    const flagUrl = `https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/flags/html5/35x22/${club.proNationality}.png`

    const clubStats1 = [
      `Matches played: **${club.gamesPlayed}**`,
      `Win rate: **${club.winRate}%**`,
      `Man of the match: **${club.manOfTheMatch}**`,
      `Man of the match rate: **${getPercentage(club.manOfTheMatch, club.gamesPlayed)}%**`,
      ``,
      `Goals: **${club.goals}**`,
      `Goals per match: **${getRatio(club.goals, club.gamesPlayed)}**`,
      `Shot success rate: **${club.shotSuccessRate}%**`,
      `Assists: **${club.assists}**`,
      `Assists per match: **${getRatio(club.assists, club.gamesPlayed)}**`,
      ``,
      `Passes made: **${club.passesMade}**`,
      `Passes per match: **${getRatio(club.passesMade, club.gamesPlayed)}**`,
      `Pass success rate: **${club.passSuccessRate}%**`
    ].join('\n')

    const clubStats2 = [
      `Tackles made: **${club.tacklesMade}**`,
      `Tackles per match: **${getRatio(club.tacklesMade, club.gamesPlayed)}**`,
      `Tackle success rate: **${club.tackleSuccessRate}%**`,
      ``,
      `Red cards: **${club.redCards}**`,
      `Red cards rate: **${getPercentage(club.redCards, club.gamesPlayed)}%**`,
      ``,
      `Def clean sheets: **${club.cleanSheetsDef}**`,
      `Def clean sheets rate: **${getPercentage(club.cleanSheetsDef, club.gamesPlayed)}%**`,
      ``,
      `GK clean sheets: **${club.cleanSheetsGK}**`,
      `GK clean sheets rate: **${getPercentage(club.cleanSheetsGK, club.gamesPlayed)}%**`
    ].join('\n')

    const overallStats1 = [
      `Matches Played: **${overall.gamesPlayed}**`,
      `Man of the match: **${overall.manOfTheMatch}**`,
      `MotM Percentage: **${getRatio(overall.manOfTheMatch, overall.gamesPlayed)}%**`
    ].join('\n')

    const overallStats2 = [
      `Goals: **${overall.goals}**`,
      `Goals per match: **${getRatio(overall.goals, overall.gamesPlayed)}**`,
      `Assists: **${overall.assists}**`,
      `Assists per match: **${getRatio(overall.assists, overall.gamesPlayed)}**`
    ].join('\n')

    const embed = new RichEmbed()
      .setColor(13574506)
      .setTitle(`${club.proOverall} - ${position}`)
      .setAuthor(member.name, flagUrl)
      .setTimestamp(new Date())
      .setThumbnail(teamCrest)
      .addField('Overall Info', overallStats1, true)
      .addField(blankString, overallStats2, true)
      .addField('Club Info', clubStats1, true)
      .addField(blankString, clubStats2, true)

    message.channel.send({embed})
  } catch (e) {
    message.channel.send(`No player called "*${playerName}*" was found in ${clubName}`)
  }
}
