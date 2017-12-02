var api = require('./api')

exports.getClubMembers = clubId => api.get(`clubs/${clubId}/members`)
exports.getClubMemberStats = clubId => api.get(`clubs/${clubId}/membersComplete`)
exports.getMembersClubStats = (clubId, memberId) => api.get(`clubs/${clubId}/members/${memberId}/stats?filters=pretty`)
exports.getMembersOverallStats = memberId => api.get(`members/${memberId}/stats?filters=pretty`)
