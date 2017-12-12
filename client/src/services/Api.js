import axios from 'axios'
import auth from '../auth'

export default() => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getAuthHeader()
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
