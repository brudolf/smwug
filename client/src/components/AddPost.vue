<template>
  <div class="addContainer">
      <div class="form">
        <div class="main-title">
          <img class="author" src="http://thesundry.com/wp-content/uploads/2017/12/person-placeholder.jpg" alt="">
          <div class="title">
              {{ loggedUser.firstname }}
          </div>
        </div>
        <div class="message">
          <textarea rows="3" cols="5" placeholder="What's in your head?" v-model="message"></textarea>
          <div class="actions">
            <button class="add" @click="addPost">Post</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import auth from '../auth'
import { store } from '../store/store'

export default {
  name: 'addpost',
  data () {
    return {
      loggedUser: {},
      message: ''
    }
  },
  methods: {
    async addPost () {
      let newPost = {
        name: this.loggedUser.firstname,
        message: this.message
      }
      store.getters.socket.emit('post', newPost)
    }
  },
  created () {
    this.loggedUser = store.getters.getLoggedUser
  },
  beforeRouteEnter (to, from, next) {
    if (auth.user.authenticated) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>
<style type="text/css">
.post {
  max-width: 800px;
}
.form input, .form textarea {
  width: 100%;
  border: 1px solid #e0dede;
  outline: none;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  border: none;
  cursor: pointer;
}
.message {
  display: block;
  padding: 0;
  margin: 18px 0 18px 0 !important;
}
.add {
  width: 100% !important;
}
</style>
