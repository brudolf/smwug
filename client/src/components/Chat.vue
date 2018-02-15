<template>
  <b-container>
    <span class="greeting">Hi, {{ loggedUser.firstname }}</span>
    <b-row>
        <b-col cols="2">
          <div class="userlist">
            <ul>
              <li v-for="user in users">{{ user.username.firstname }}</li>
            </ul>
          </div>
        </b-col>
        <b-col cols="10">
          <div class="chatwindow">
            <div class="send">
              <input type="text" v-model="message" value="">
              <button @click="sendMessage()" type="button" name="button">Send</button>
            </div>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from '../auth'

export default {
  name: 'chat',
  data () {
    return {
      message: '',
      users: [],
      loggedUser: ''
    }
  },
  methods: {
    sendMessage () {
      /*
      this.$socket.emit('message', {
        username: this.loggedUser.firstname,
        message: this.message
      })
      this.message = ''
      */
      // this.$socket.emit('disconnect', this.loggedUser)
    }
  },
  created () {
    // this.$socket.emit('conn')
  },
  computed: {
    list () {
      return this.$store.getters.getUserList
    }
  },
  watch: {
    list (newList, oldList) {
      this.users = this.$store.getters.getUserList
      console.log('changed')
    }
  },
  mounted () {
    // Get Username from LocalStorage
    this.loggedUser = JSON.parse(localStorage.getItem('user'))

    // Get userlist from Vuex Store
    this.users = this.$store.getters.getUserList

    if (!this.$store.getters.isUserConnected) {
      this.$socket.emit('addUser', this.loggedUser)
    }
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
<style lang="scss">
.row {
  //border: 1px solid black;
  .col-10 {
    padding: 0;
  }
}
.userlist {
  height: 500px;
  background: #fff;
  border-radius: 3px;
}
.chatwindow {
  border-radius: 3px;
  height: 500px;
  background: #fff;
  position: relative;
  .send {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    input[type=text] {
      width: 80%;
    }
    button {
      width: auto;
    }
  }
}
.greeting {
  color: #fff;
}
</style>
