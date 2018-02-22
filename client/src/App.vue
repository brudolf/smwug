<template>
  <div id="app">
    <div id="slide-menu" class="slide-menu" v-bind:class="{ open: isNavOpen }">
      <nav>
        <ul>
          <li><router-link v-if="!user.authenticated" v-bind:to="{ name: 'Signup' }">Sign Up</router-link></li>
          <li><router-link v-if="!user.authenticated" v-bind:to="{ name: 'Login' }">Log In</router-link></li>
          <li><router-link v-if="user.authenticated" v-bind:to="{ name: 'Posts' }">Posts</router-link></li>
          <li><router-link v-if="user.authenticated" v-bind:to="{ name: 'Chat' }">Chat</router-link></li>
          <li><a v-if="user.authenticated" @click.prev="logOut()" href="#">Log Out</a> </li>
        </ul>
      </nav>
    </div>
    <div id="page" v-bind:style="{ 'margin-left': marginOnMain }" class="page-wrap">
      <span id="toggler" @click="navToggle()"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/198756-200.png" alt=""></span>
      <div class="MainContainer">
        <router-view></router-view>
      </div>
    </div>
</div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import auth from './auth'

  export default {
    name: 'app',
    data () {
      return {
        user: auth.user,
        isNavOpen: false,
        marginOnMain: '0'
      }
    },
    methods: {
      logOut () {
        localStorage.clear()
        this.$store.commit('userDisconnected')
        // this.$store.getters.socket.disconnect()
        auth.logout()
      },
      navToggle () {
        this.isNavOpen = !this.isNavOpen
        if (this.marginOnMain === '0') {
          this.marginOnMain = '250px'
        } else {
          this.marginOnMain = '0'
        }
      },
      navClose () {
        if (this.isNavOpen) {
          this.isNavOpen = false
          this.marginOnMain = '0'
        }
      }
    },
    watch: {
      '$route': 'navClose'
    }
  }
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  height: 100%;
}

body {
  font-family: sans-serif;
  background-color: #533557;
}

a,
a:hover {
  text-decoration: none;
  color: #fff;
}

#page {
  transition: margin-left .5s;
}

#slide-menu {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: 0.5s;
  width: 0;
  height: 100%;
  padding-top: 50px;
  background: #000;
  nav {
    display: flex;
    justify-content: center;
    ul {
      padding: 0;
      li {
        list-style-type: none;
        padding: 5px;
      }
    }
  }
  &.open {
      width: 250px;
  }
}

.MainContainer {
  display: flex;
  justify-content: center;
}

span#toggler {
  padding: 15px;
  display: inline-block;
  cursor: pointer;
  img {
    width: 24px;
  }
}

.logo {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #EC7263;
  font-family: 'Shadows Into Light', cursive;
  font-size: 35px;
}
</style>
