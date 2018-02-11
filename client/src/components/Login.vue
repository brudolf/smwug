<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account</p>
    <form>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.credentials.email.$error }">
        <span class="required form-group__message" v-if="!$v.credentials.email.required">*</span>
        <span class="form-group__message" v-if="!$v.credentials.email.email">Must be email format</span>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your email"
          v-model.trim="credentials.email"
          @input="$v.credentials.email.$touch()"
        >
      </div>
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.credentials.password.$error }">
        <span class="required form-group__message" v-if="!$v.credentials.password.required">*</span>
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model.trim="credentials.password"
          @input="$v.credentials.password.$touch()"
        >
      </div>
      <button :disabled="$v.credentials.$invalid" class="btn btn-primary" @click.prevent="submit()">Access</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.logIn(this, credentials, 'Chat')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!auth.user.authenticated) {
      next()
    } else {
      next('/')
    }
  }
}
</script>
<style>
  .form-group__message {
    display: block;
    color: red;
  }
  .required {
    text-align: left;
  }
</style>
