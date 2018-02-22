<template>
  <div class="posts">
    <div class="post-container">
      <!--<router-link v-bind:to="{ name: 'addpost' }" class="">Add Post</router-link>-->
      <AddPost></AddPost>
    </div>
    <div v-if="posts.length > 0" class="table-wrap">
      <div v-for="post in posts" class="post-container">
        <Post :item-data="post"></Post>
      </div>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addpost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import Post from './Post'
import AddPost from './AddPost'
import PostsService from '@/services/PostsService'
import auth from '../auth'

export default {
  name: 'posts',
  components: {
    Post,
    AddPost
  },
  data () {
    return {
      posts: []
    }
  },
  created () {
    this.getPosts()
  },
  mounted () {
    this.$store.watch(() => this.$store.getters.getPosts, (value) => {
      this.posts = this.$store.getters.getPosts
    })
  },
  computed: {
    postsWatch () {
      return this.$store.getters.getPosts
    }
  },
  watch: {
    postsWatch (newPosts, oldPost) {
      this.posts = this.$store.getters.getPosts
    }
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.$store.commit('setPosts', response.data.posts)
      this.posts = this.$store.getters.getPosts
      // this.getPosts()
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
.post-container {
  box-sizing: border-box;
  background: #fff;
  max-width: 800px;
  height: auto;
  margin: 10px 0 10px 0;
  padding: 12px;
  -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.21);
  -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.21);
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.21);
  border-radius: 4px;
  .main-title {

    .title {
      margin-left: 10px;
      line-height: 1.2;
      vertical-align: middle;
      display: inline-block;
      font-size: 20px;
      a {
        color: #1d2129;
      }
    }
    .edit {
      position: relative;
      display: inline-block;
      float: right;
      a {
        color: #1d2129;
      }
      span {
        font-weight: bold;
        cursor: pointer;
        padding: 8px;
        border-radius: 2px;
        &:hover {
          background: rgba(73,46,77,0.1);
        }
      }
      .prop {
        border-radius: 2px;
        border: 1px solid rgba(73,46,77,0.1);
        position: absolute;
        top: 30px;
        right: 0;
        background: #fff;
        display: flex;
        justify-content: center;
        ul {
          margin: 0;
          padding: 15px;
          li {
            list-style-type: none;
            padding: 2px 0 2px 0;
            &:hover {
              color: #533557;
            }
          }
        }
      }
    }
  }
  .message,
  .message {
    margin: 12px 0 12px 0;
    padding: 12px;
  }
  .actions {
    display: flex;
    justify-content: space-around;
    button {
      cursor: pointer;
      width: 400px;
      background: transparent;
      border: none;
      padding-top: 8px;
      padding-bottom: 8px;
      &:hover,
      &.active {
        background: rgba(73,46,77,0.1);
      }
    }
  }
  img.author {
    vertical-align: middle;
    border-radius: 130px;
    width: 50px;
    height: 50px;
  }
  .date {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
  }
  .comment-box {
    &.open {
      display: block;
      opacity: 1;
    }
    .comment-field {
      display: inline-block;
      input {
        border: none;
        width: 300px;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transition: opacity 0.4s;
}

</style>
