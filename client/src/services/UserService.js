import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('users')
  },

  login (params) {
    return Api().post('users/login', params)
  },

  create (params) {
    return Api().post('users/create', params)
  },

  deleteUser (id) {
    return Api().delete('posts/' + id)
  }
}
