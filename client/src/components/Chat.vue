<template>
  <b-container>
    <span class="greeting">Hi, {{ loggedUser.firstname }}</span>
    <b-row>
        <b-col cols="2">
          <div class="userlist">
            <ul>
              <li v-for="user in users">{{ user.userdata.firstname }}</li>
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
      this.$socket.emit('message', {
        username: this.loggedUser.firstname,
        message: this.message
      })
      this.message = ''
    }
  },
  created () {
    if (!this.loggedUser) {
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
    }
    console.log(this.$store.getters.isConnect)
  },
  mounted () {
    // console.log(this.loggedUser)
    this.$socket.emit('addUser', this.loggedUser)

    async function yo (str) {
      let x = await str.getters.getUserList[0]
      return x
    }
    this.users = yo(this.$store)
    /*
    const timer = setInterval(() => {
      this.users = this.$store.getters.getUserList[0]
      console.log('brekekee')
      if (this.users !== undefined) {
        clearInterval(timer)
      }
    }, 2)
    */
    // console.log(this.$store.getters.getUserList)
    // this.users = this.$store.getters.getUserList[0]
    // console.log(this.users)
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
