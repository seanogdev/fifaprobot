var api = require('./api')

exports.searchClub = (query) => api.get(`clubsComplete/${query}`)
