<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Sign Up</h2>
    <p>Sign up for an account</p>
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
        <span class="form-group__message" v-if="!$v.credentials.password.minLength">Password must have at least {{$v.credentials.password.$params.minLength.min}} letters.</span>
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model.trim="credentials.password"
          @input="$v.credentials.password.$touch()"
        >
      </div>
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.credentials.firstname.$error }">
        <span class="required form-group__message" v-if="!$v.credentials.firstname.required">*</span>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your firstname"
          v-model="credentials.firstname"
          @input="$v.credentials.firstname.$touch()"
        >
      </div>
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.credentials.lastname.$error }">
        <span class="required form-group__message" v-if="!$v.credentials.lastname.required">*</span>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your lastname"
          v-model="credentials.lastname"
          @input="$v.credentials.lastname.$touch()"
        >
      </div>
      <button :disabled="$v.credentials.$invalid" class="btn btn-primary" @click.prevent="submit()">Sign Up</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'signup',
  data () {
    return {
      credentials: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
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
        required,
        minLength: minLength(6)
      },
      firstname: {
        required
      },
      lastname: {
        required
      }
    }
  },
  methods: {
    submit () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        firstname: this.credentials.firstname,
        lastname: this.credentials.lastname
      }
      auth.signUp(this, credentials, 'Posts')
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
