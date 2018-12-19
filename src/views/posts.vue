<template>
  <div class="posts">
        <h1> List of Posts</h1>
      <div class="spinner" v-if="loading">
    <img src ="../components/load.svg" width="50" height ="50">
  
     </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div  class="content" v-for="posts in post"                          v-bind:key="posts.id" >
        <div class="nr_post"><router-link :to="{name: 'Details', 
        params:{postid:posts.id, userid:posts.userId} }"> Nachrichtennummer {{ posts.id }} </router-link>
        </div>
        <h2>{{ posts.title }}</h2>
        <div>{{ posts.body }}</div>
        
    </div>

  </div>
</template>




<script>
function getPost (post, func) {
// setTimeout(() => {
    if (typeof(post) == 'object') {
      func(null, post)
    } else {
      func(new Error('Post not found.'))
    }
  //}, 1000)
}



export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
  this.loading = true;
  let that = this;
async function daten(){
await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response){
         return response.json()})
    .then(function(myJSON){
        that.posts = myJSON; 
        })
    .catch(function(err){
        alert("MY ERROR: " + err); 
    })
}
daten().then(()=>this.fetchData()) 
},

  methods: {
    fetchData () {
    
     getPost(this.posts, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
         this.post = post;
        }
      })
    }
  }
}

</script>

<style scoped>
.nr_post{
    margin-top: 60px;
    text-align: left;
    font-size: 12px;
}

</style>