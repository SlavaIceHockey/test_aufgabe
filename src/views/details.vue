<template>
  <div class="details">
        <h1> Detail of Posts</h1>
    <div class="spinner" v-if="loading">
    <img src ="../components/load.svg" width="50" height ="50">
  
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="posts" class="post"   >
        <h2>{{ posts.title }}</h2>
        <div>{{ posts.body }}</div>
    </div>
  
    
    <div v-if="users"  class="author">
    <h3>About the author </h3>
        <div>Username: {{ users.username }} </div>
        <div>Name: {{ users.name }} </div>
        <div>Address: {{ users.address.street }}, {{ users.address.city }} </div>
        <div>Email: {{ users.email }} </div>
        <div>Phone: {{ users.phone }} </div>
        <div>Website: {{ users.website }} </div>
        <div>Email: {{ users.email }} </div>
    </div>

    <h3>Comments </h3>
    <div  class="comment" v-for="comment in comments" v-bind:key="comment.title" >
         <div class="commtitle">{{ comment.name }}</div>
        <div class="commtext">{{ comment.body }}</div>
    </div>
    

  </div>
</template>




<script>
function getInfrom (inform, func) {
    if (typeof(inform) == 'object') {
      func(null, inform)
    } else {
      func(new Error('Information not found.'))
    }
}



export default {
  data () {
    return {
      loading: false,
      posts: null,
      users:null,
      comments: null,
      error: null
    }
  },
  created () {
  let that = this;
  let postid = this.$route.params.postid;
  this.loading = true;
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

await fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
         return response.json()})
    .then(function(myJSON){
        that.users = myJSON; 
        })
    .catch(function(err){
        alert("MY ERROR: " + err); 
    })
await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
    .then(function(response){
         return response.json()})
    .then(function(myJSON){
        that.comments = myJSON; 
        })
    .catch(function(err){
        alert("MY ERROR: " + err); 
    })
}


daten().then(()=>this.fetchData()) 
},

  methods: {
    fetchData () {
    let postid = this.$route.params.postid-1;
    let userid = this.$route.params.userid-1;
    
     getInfrom(this.posts, (err, post) => {
        if (err) {
          this.error = err.toString()
        } else {
         this.posts = post[postid];
        }
      })
      getInfrom(this.users, (err, user) => {
        if (err) {
          this.error = err.toString()
        } else {
         this.users = user[userid];
        }
      })
    getInfrom(this.comments, (err, comment) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
             this.comments = comment;
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
.author, .comment{
    text-align: left;
}
.author > div, .comment > div{
    margin:20px 0px 0px 0px;
}
.commtitle{
    padding-left: 5px;
    font-weight: bold;
}
.commtext{
    padding-left: 15px;
}
</style>