var axios = require('axios')

const API_URL = 'https://www.easports.com/iframe/fifa17proclubs/api/platforms'
const API_PLATFORM = 'PC'

exports.get = async function (endpoint, params) {
  try {
    const response = await axios.get(`${API_URL}/${API_PLATFORM}/${endpoint}`)
    return response
  } catch (e) {
    console.log(e)
  }
}
