import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'
import editpost from '@/components/EditPost'
import getpost from '@/components/Post'
import login from '@/components/Login'
import signup from '@/components/Signup'
import home from '@/components/Home'
import notfound from '@/components/Notfound'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueResource)

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: notfound
    },
    {
      path: '/',
      component: home,
      name: 'Home'
    },
    {
      path: '/login',
      component: login,
      name: 'Login'
    },
    {
      path: '/posts',
      component: Posts,
      name: 'Posts'
    },
    {
      path: '/signup',
      component: signup,
      name: 'Signup'
    },
    {
      path: '/posts/add',
      component: addpost,
      name: 'addpost'
    },
    {
      path: '/posts/:id/edit',
      component: editpost,
      name: 'editpost'
    },
    {
      path: '/posts/:id',
      component: getpost,
      name: 'getpost'
    }
  ]
})
