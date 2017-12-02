var api = require('./api')

exports.getClubInfo = clubId => api.get(`/clubs/${clubId}/info`)
exports.getClubMatchHistory = clubId => api.get(`/clubs/${clubId}/matches`)
exports.getClubSeasonRank = clubId => api.get(`/clubs/${clubId}/seasonRank`)
exports.getClubSeasonStats = clubId => api.get(`/clubs/${clubId}/seasonalStats`)
exports.getClubStats = clubId => api.get(`/clubs/${clubId}/stats`)
