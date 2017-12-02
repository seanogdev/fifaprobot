var api = require('./api')

exports.searchClubByName = (query) => api.get(`clubsComplete/${query}`)
