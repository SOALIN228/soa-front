import axios from 'axios'

export const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.error(e)
  }
  return result
}

export const forget = async option => {
  let result = ''
  try {
    result = await axios.post('/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.error(e)
  }
  return result
}
