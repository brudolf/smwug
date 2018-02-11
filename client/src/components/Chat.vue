<template>
  <b-container>
    <b-row>
        <b-col cols="2">
          <div class="userlist">
            <ul>
              <li>User 1</li>
              <li>User 1</li>
              <li>User 1</li>
            </ul>
          </div>
        </b-col>
        <b-col cols="10">
          <div class="chatwindow">
            <div class="send">
              <input type="text" name="" value="">
              <button type="button" name="button">Send</button>
            </div>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from '../auth'

export default {

  data () {
    return {

    }
  },
  methods: {
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
</style>
