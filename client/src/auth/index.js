import router from '../router'
import UserService from '@/services/UserService'

export default {

  user: {
    authenticated: false
  },

  async logIn (context, creds, redirect) {
    const response = await UserService.login({
      creds: creds
    })

    if (response.data.success) {
      localStorage.setItem('id_token', response.data.id_token)
      this.user.authenticated = true
      if (redirect) {
        router.push({ name: 'Posts' })
      }
    } else {
      context.error = response.data.error
      router.push({ name: 'Login' })
    }
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  getAuthHeader () {
    return localStorage.getItem('id_token')
  },
  async signUp (context, creds, redirect) {
    const response = await UserService.create({
      creds: creds
    })
    if (response.data.success) {
      localStorage.setItem('id_token', response.data.id_token)
      this.user.authenticated = true
      if (redirect) {
        router.push({ name: 'Posts' })
      }
    } else {
      context.error = response.data.error
    }
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    router.push({ name: 'Login' })
  }
}
