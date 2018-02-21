<template>
  <div class="post">
    <div class="main-title">
      <div class="author">
        <img src="http://thesundry.com/wp-content/uploads/2017/12/person-placeholder.jpg" alt="">
      </div>
      <div class="title">
          {{ post.name }}
      </div>
      <div class="edit">
        <span @click="openProp = !openProp">&#8943;</span>
        <div class="prop" v-if="openProp">
          <ul>
            <li><router-link v-bind:to="{ name: 'editpost', params: { id: post._id } }">Edit</router-link></li>
            <li><a href="#" @click="deletePost(post._id)">Delete</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="message">
      {{ post.message }}
    </div>
    <div class="actions">
      <button type="button" name="button">Like</button>
      <button type="button" @click="commentBoxToggle" v-bind:class="{ active: isCommentBoxOpen }" name="button">Comment</button>
    </div>
    <transition name="fade">
      <div class="comment-box" v-if="isCommentBoxOpen">
        <div class="author">
          <img src="http://thesundry.com/wp-content/uploads/2017/12/person-placeholder.jpg" alt="">
        </div>
        <div class="comment-field">
          <input type="text" placeholder="Place your Comment here.." value="">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import auth from '../auth'
import PostsService from '@/services/PostsService'

export default {
  props: ['itemData'],
  data () {
    return {
      name: '',
      isCommentBoxOpen: false,
      openProp: false,
      post: this.itemData
    }
  },
  methods: {
    commentBoxToggle () {
      this.isCommentBoxOpen = !this.isCommentBoxOpen
    },
    async deletePost (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        PostsService.deletePost(id)
        $this.$store.commit('deletePost', id)
        // $this.$router.push({ name: 'Posts' })
        // $this.$router.go({ path: '/' })
      })
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
<style lang="scss">

</style>
