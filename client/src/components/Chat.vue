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
            <div class="chat-stack" id="chat-cont">
              <ul>
                <li v-for="message in messages">{{ message.name }}: {{ message.message }}</li>
              </ul>
            </div>
            <div class="send">
              <input type="text" v-model="message" v-on:keyup="hitEnter">
              <button @click="sendMessage()" type="button" name="button">Send</button>
            </div>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from '../auth'
import { store } from '../store/store'

export default {
  name: 'chat',
  data () {
    return {
      message: '',
      users: [],
      loggedUser: '',
      messages: []
    }
  },
  methods: {
    sendMessage () {
      store.getters.socket.emit('message', {
        username: this.loggedUser.firstname,
        message: this.message
      })
      this.message = ''
    },
    hitEnter (e) {
      if (e.keyCode === 13) {
        this.sendMessage()
      }
    },
    scrollToEnd () {
      var container = this.$el.querySelector('#chat-cont')
      container.scrollTop = container.scrollHeight
    }
  },
  created () {
    this.loggedUser = store.getters.getLoggedUser
    this.users = store.getters.getUserList
  },
  computed: {
    userList () {
      return store.getters.getUserList
    },
    messagesList () {
      return store.getters.getMessages
    }
  },
  watch: {
    userList (newList, oldList) {
      this.users = store.getters.getUserList
    },
    messagesList (newMessagesList, oldMessagesList) {
      this.messages = store.getters.getMessages
      this.$nextTick(() => {
        this.scrollToEnd()
      })
    }
  },
  mounted () {
    this.users = store.getters.getUserList
    this.messages = store.getters.getMessages
    this.$nextTick(() => {
      this.scrollToEnd()
    })
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

$purple: #533557;

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
  padding-bottom: 10px;
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    li {
      cursor: pointer;
      margin-top: 1px;
      padding: 10px;
      list-style-type: none;
      background: rgba(73,46,77,0.1);
      color: $purple;

      &:hover {
        background: $purple;
        color: #fff;
      }
    }
  }
}
.chatwindow {
  border-radius: 3px;
  height: 471px;
  background: #fff;
  position: relative;
  .chat-stack {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ul {
      margin: 10px;
      padding: 0;
      li {
        display: table;
        margin: 2px;
        padding: 2px 12px;
        background: $purple;
        border-radius: 10px;
        color: #fff;
        list-style-type: none;
      }
    }
  }
  .send {
    border-radius: 3px;
    position: absolute;
    bottom: -30px;
    right: 0;
    left: 0;
    width: 100%;
    input[type=text] {
      border-radius: 3px;
      width: 90%;
      border: none;
      border-top: 1px solid $purple;
    }
    button {
      cursor: pointer;
      height: 100%;
      width: 9%;
      background: $purple;
      border: none;
      color: #fff;
    }
  }
}
.greeting {
  color: #fff;
}
</style>
