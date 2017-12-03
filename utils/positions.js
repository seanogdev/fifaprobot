const POSITIONS = [
  {
    'id': 0,
    'internalName': 'PLAYER_POSITION_GK',
    'shortName': 'gk',
    'name': 'Goalkeeper'
  },
  {
    'id': 1,
    'internalName': 'PLAYER_POSITION_SW',
    'shortName': 'sw',
    'name': 'Defender'
  },
  {
    'id': 2,
    'internalName': 'PLAYER_POSITION_RWB',
    'shortName': 'rwb',
    'name': 'Defender'
  },
  {
    'id': 3,
    'internalName': 'PLAYER_POSITION_RB',
    'shortName': 'rb',
    'name': 'Defender'
  },
  {
    'id': 4,
    'internalName': 'PLAYER_POSITION_RCB',
    'shortName': 'rcb',
    'name': 'Defender'
  },
  {
    'id': 5,
    'internalName': 'PLAYER_POSITION_CB',
    'shortName': 'cb',
    'name': 'Defender'
  },
  {
    'id': 6,
    'internalName': 'PLAYER_POSITION_LCB',
    'shortName': 'lcb',
    'name': 'Defender'
  },
  {
    'id': 7,
    'internalName': 'PLAYER_POSITION_LB',
    'shortName': 'lb',
    'name': 'Defender'
  },
  {
    'id': 8,
    'internalName': 'PLAYER_POSITION_LWB',
    'shortName': 'lwb',
    'name': 'Defender'
  },
  {
    'id': 9,
    'internalName': 'PLAYER_POSITION_RDM',
    'shortName': 'rdm',
    'name': 'Midfielder'
  },
  {
    'id': 10,
    'internalName': 'PLAYER_POSITION_CDM',
    'shortName': 'cdm',
    'name': 'Midfielder'
  },
  {
    'id': 11,
    'internalName': 'PLAYER_POSITION_LDM',
    'shortName': 'ldm',
    'name': 'Midfielder'
  },
  {
    'id': 12,
    'internalName': 'PLAYER_POSITION_RM',
    'shortName': 'rm',
    'name': 'Midfielder'
  },
  {
    'id': 13,
    'internalName': 'PLAYER_POSITION_RCM',
    'shortName': 'rcm',
    'name': 'Midfielder'
  },
  {
    'id': 14,
    'internalName': 'PLAYER_POSITION_CM',
    'shortName': 'cm',
    'name': 'Midfielder'
  },
  {
    'id': 15,
    'internalName': 'PLAYER_POSITION_LCM',
    'shortName': 'lcm',
    'name': 'Midfielder'
  },
  {
    'id': 16,
    'internalName': 'PLAYER_POSITION_LM',
    'shortName': 'lm',
    'name': 'Midfielder'
  },
  {
    'id': 17,
    'internalName': 'PLAYER_POSITION_RAM',
    'shortName': 'ram',
    'name': 'Midfielder'
  },
  {
    'id': 18,
    'internalName': 'PLAYER_POSITION_CAM',
    'shortName': 'cam',
    'name': 'Midfielder'
  },
  {
    'id': 19,
    'internalName': 'PLAYER_POSITION_LAM',
    'shortName': 'lam',
    'name': 'Midfielder'
  },
  {
    'id': 20,
    'internalName': 'PLAYER_POSITION_RF',
    'shortName': 'rf',
    'name': 'Forward'
  },
  {
    'id': 21,
    'internalName': 'PLAYER_POSITION_CF',
    'shortName': 'cf',
    'name': 'Forward'
  },
  {
    'id': 22,
    'internalName': 'PLAYER_POSITION_LF',
    'shortName': 'lf',
    'name': 'Forward'
  },
  {
    'id': 23,
    'internalName': 'PLAYER_POSITION_RW',
    'shortName': 'rw',
    'name': 'Forward'
  },
  {
    'id': 24,
    'internalName': 'PLAYER_POSITION_RS',
    'shortName': 'rs',
    'name': 'Forward'
  },
  {
    'id': 25,
    'internalName': 'PLAYER_POSITION_ST',
    'shortName': 'st',
    'name': 'Forward'
  },
  {
    'id': 26,
    'internalName': 'PLAYER_POSITION_LS',
    'shortName': 'ls',
    'name': 'Forward'
  },
  {
    'id': 27,
    'internalName': 'PLAYER_POSITION_LW',
    'shortName': 'lw',
    'name': 'Forward'
  }
]

exports.positions = POSITIONS

exports.getPositionById = id => POSITIONS.find(position => position.id == id).shortName.toUpperCase()
