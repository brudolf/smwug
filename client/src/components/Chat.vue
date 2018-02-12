<template>
  <b-container>
    <span class="greeting">Hi, {{ loggedUser.firstname }}</span>
    <b-row>
        <b-col cols="2">
          <div class="userlist">
            <ul>
              <li v-for="user in users">{{ user.name }}</li>
            </ul>
          </div>
        </b-col>
        <b-col cols="10">
          <div class="chatwindow">
            <div class="send">
              <input type="text" name="" value="">
              <button @click="load()" type="button" name="button">Send</button>
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
      users: [],
      loggedUser: {}
    }
  },
  methods: {
    load () {
      this.users = this.$store.state.userlist
      this.loggedUser = this.$store.state.loggedUser
    }
  },
  created () {
    this.load()
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
