exports.parseRecord = (s) => {
  const parseNum = num => (num === '0' ? ':regional_indicator_w:' : num === '1' ? ':regional_indicator_d:' : ':regional_indicator_l:')

  const results = [ s.lastMatch0, s.lastMatch1, s.lastMatch2, s.lastMatch3, s.lastMatch4, s.lastMatch5 ]

  return results.map(result => parseNum(result)).join('')
}

exports.calculateDivision = (divId) => 11 - divId
