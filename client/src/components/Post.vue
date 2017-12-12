<template>
  <div class="post">
    <h1>{{ this.title }}</h1>
    <p>
      {{ this.description }}
    </p>
    <router-link v-bind:to="{ name: 'Posts' }">Back</router-link>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService.js'
import auth from '../auth'

export default {
  name: 'getpost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
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
