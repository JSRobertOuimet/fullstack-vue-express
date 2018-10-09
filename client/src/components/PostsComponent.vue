<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Post</label>
      <input type="text" name="create-post" id="create-post" v-model="text" placeholder="Say Something...">
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PostService from "../PostService";

  export default {
    name: 'PostComponent',
    data() {
      return {
        posts: [],
        error: "",
        text: ""
      }
    },
    async created() {
      try {
        this.posts = await PostService.getPosts();
      }
      catch(err) {
        this.error = err.message;
      }
    },
    methods: {
      async createPost() {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
      },
      async deletePost(id) {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      }
    }
  }
</script>

<style scoped>

</style>
