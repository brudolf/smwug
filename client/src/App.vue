<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand v-bind:to="{ name: 'Home' }" href="#">SMWUG</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="user.authenticated" v-bind:to="{ name: 'Posts' }">Posts</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!user.authenticated" v-bind:to="{ name: 'Signup' }">Sign Up</b-nav-item>
          <b-nav-item v-if="!user.authenticated" v-bind:to="{ name: 'Login' }">Log in</b-nav-item>
          <!--
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          -->
          <b-nav-item-dropdown v-if="user.authenticated" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut()">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <div class="MainContainer">
      <router-view></router-view>
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
        user: auth.user
      }
    },
    methods: {
      logOut () {
        auth.logout()
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
.MainContainer {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
a {
  color: #fff;
}
</style>
