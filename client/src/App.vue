<template>
  <div id="app">
    <!--
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>



      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="user.authenticated" v-bind:to="{ name: 'Posts' }">Posts</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -
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
          -
          <b-nav-item-dropdown v-if="user.authenticated" right>
            <!-- Using button-content slot -
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
    -->
    <div class="container-fluid">
    <!-- This checkbox will give us the toggle behavior, it will be hidden, but functional -->
    <input id="toggle" type="checkbox">

    <!-- IMPORTANT: Any element that we want to modify when the checkbox state changes go here, being "sibling" of the checkbox element -->

    <!-- This label is tied to the checkbox, and it will contain the toggle "buttons" -->
    <label class="toggle-container" for="toggle">
        <!-- If menu is open, it will be the "X" icon, otherwise just a clickable area behind the hamburger menu icon -->
        <span class="button button-toggle"></span>
    </label>

    <span class="logo">SMWUG</span>

    <!-- The nav menu -->
    <nav class="nav">
        <router-link class="nav-item" v-if="!user.authenticated" v-bind:to="{ name: 'Signup' }">Signup</router-link>
        <router-link class="nav-item" v-if="!user.authenticated" v-bind:to="{ name: 'Login' }">Login</router-link>
        <router-link class="nav-item" v-if="user.authenticated" v-bind:to="{ name: 'Posts' }">Posts</router-link>
        <a class="nav-item" v-if="user.authenticated" @click="logOut()">Sign Out</a>
    </nav>

    <!-- Just dummy content like in the animated gif -->
    <section class="dummy-content">
        <!--
        <div class="circle"></div>
        <div class="text">
            <span></span><span></span>
        </div>
        <div class="square-top"></div>
        <div class="square-behind"></div>
      -->
      <div class="MainContainer">
        <router-view></router-view>
      </div>
    </section>
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

<style lang="scss">
$items: 4;
$transition-duration: 0.5s;
$transition-delay: 0.05s;


/* Basic styles */

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  height: 100%;
}

body {
  font-family: sans-serif;
  background-color: #F6C390;
}

a {
  text-decoration: none;
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
.container-fluid {
  position: relative;
  /*
  margin: 35px auto 0;
  width: 300px;
  height: 534px;
  */
  height: 100%;
  background-color: #533557;
  overflow: hidden;
}


/* Toggle functionality */

// To hide the checkbox
#toggle {
  position: absolute;
  left: -100%;
  top: -100%;
}

#toggle:focus {

  & ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

// Styles for the 'open' state, if the checkbox is checked
#toggle:checked {
  // Any element you need to change the style if menu is open goes here, using the sibling selector (~) as follows

  // Making the "X" icon using `:before` and `:after` pseudo-elements
  & ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
    }

    &:before {
      transform: translateY(-50%) rotate(45deg) scale(1);
    }

    &:after {
      transform: translateY(-50%) rotate(-45deg) scale(1);
    }
  }

  &:focus ~ .toggle-container .button-toggle {
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }

  // Open nav
  & ~ .nav {
    margin-bottom: 100px;
    pointer-events: auto;
    transform: translate(50px, 50px);

    // Restoring nav items from "lines" in the menu icon
    .nav-item {
      color: #EC7263;
      letter-spacing: 0;
      height: 40px;
      line-height: 40px;
      margin-top: 0;
      opacity: 1;
      transform: scaleY(1);
      transition: $transition-duration, opacity 0.1s;

      // Setting delays for the nav items in open transition
      @for $i from 1 through $items {
        &:nth-child(#{$i}) {
          $delay: ($items - $i) * $transition-delay;
          transition-delay: $delay;
          &:before {
            transition-delay: $delay;
          }
        }
      }

      // Hiding the lines
      &:before {
        opacity: 0;
      }
    }
  }

  // Dummy content
  & ~ .dummy-content {
    padding-top: 30px;

    &:before {
      /*background-color: rgba(0, 0, 0, 0.3);*/
    }
  }
}


/* Toggle button */

.button-toggle {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  transition: $transition-duration + 0.1;

  // Shadow on hover
  &:hover {
    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1), inset 0 0 0 20px rgba(0, 0, 0, 0.1);
  }

  // Making the "X" icon using `:before` and `:after` pseudo-elements
  // Initially hidden because `scale(0)` transformation

  &:before, &:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #EC7263;
    border-radius: 5px;
    transition: $transition-duration;
  }

  &:before {
    transform: translateY(-50%) rotate(45deg) scale(0);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg) scale(0);
  }
}


/* Menu */

.nav {
  display: inline-block;
  margin: 25px 25px 20px;
  // Don't want pointer-events as menu is closed
  pointer-events: none;
  transition: $transition-duration;
}

// Showing nav items as lines, making up the hamburger menu icon
.nav-item {
  position: relative;
  display: inline-block;
  float: left;
  clear: both;
  color: transparent;
  font-size: 14px;
  letter-spacing: -6.2px;
  height: 7px;
  line-height: 7px;
  text-transform: uppercase;
  white-space: nowrap;
  transform: scaleY(0.2);
  transition: $transition-duration, opacity 1s;

  // Setting delays for the nav items in close transition
  @for $i from 1 through $items {
    &:nth-child(#{$i}) {
      $delay: ($i - 1) * $transition-delay;
      transition-delay: $delay;
      &:before {
        transition-delay: $delay;
      }
    }
  }

  // Adjusting width for the first line
  &:nth-child(1) {
    letter-spacing: -8px;
  }

  // Adjusting width for the second line
  &:nth-child(2) {
    letter-spacing: -7px;
  }

  // Adjusting from the fourth element onwards
  &:nth-child(n + 4) {
    letter-spacing: -8px;
    margin-top: -7px;
    opacity: 0;
  }

  // Getting the lines for the hamburger menu icon
  &:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #EC7263;
    transform: translateY(-50%) scaleY(5);
    transition: $transition-duration;
  }
}


/* Dummy content */

.dummy-content {
  color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  transition: $transition-duration;

  &:before {
    /*position: absolute;*/
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    /*z-index: 2;*/
    transition: $transition-duration;
  }
}

.circle {
  display: inline-block;
  width: 75px;
  height: 75px;
  background-color: #EC7263;
  border-radius: 100%;
}

.text {
  margin: 15px 0 30px;

  span {
    display: inline-block;
    height: 10px;
    margin: 0 5px;
    background-color: #C06162;
    border-radius: 5px;

    &:first-child {
      width: 50px;
    }

    &:last-child {
      width: 80px;
    }
  }
}

.square-top {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 300px;
  background-color: #FEBE7E;
  /*z-index: 1; */
}

.square-behind {
  display: inline-block;
  position: relative;
  top: -256px;
  width: 250px;
  height: 210px;
  background-color: #C28683;

  &:before, &:after {
    position: absolute;
    content: '';
    top: 0;
    width: 40%;
    height: 100%;
  }

  &:before {
    left: 0;
    background-color: #9D567C;
  }

  &:after {
    right: 0;
    background-color: #958C6B;
  }
}
label {
  display: initial;
}
.MainContainer {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
#app {
  height: 100%;
}

/* -----------------------------------


#app {
  a {
    color: #000;
  }
}


*/
</style>
