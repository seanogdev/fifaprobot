exports.getPercentage = (num, amount) => ((num / amount) * 100).toFixed()
exports.getRatio = (num, amount) => (num / amount).toFixed(2)
exports.getDifference = (num) => (num > 0 ? `+${num}` : num == 0 ? 0 : num) // eslint-disable-line eqeqeq
