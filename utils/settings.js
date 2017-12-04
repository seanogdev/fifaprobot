const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')

const settings = new Enmap({provider: new EnmapLevel({name: 'settings', persistant: true})})
module.exports = settings
