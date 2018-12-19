<template id="tempusers">
  <div class="users">
        <h1> List of Users</h1>
    <div class="find">
          <form id="suchform">
            Suche nach der Username <input id="valuesuchung" type="text"><input id="suchen" type="button" value="Suchung">
           <input id="iterator" type="button" value="Nexte">
          </form>
        <div class="result">

        </div>
    </div>
    <div class="spinner" v-if="loading">
        <img src ="../components/load.svg" width="50" height ="50">
  
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div  class="content" v-for="user in users"  v-bind:key="user.id" >
      <h2>Username: {{ user.username }} </h2>
      <div>Name: {{ user.name }} </div>
      <div>Email: {{ user.email }} </div>
    </div>

  </div>
</template>




<script>
function getPost (user, func) {
 // setTimeout(() => {
    if (typeof(user) == 'object') {
      func(null, user)
    } else {
      func(new Error('User not found.'))
    }
 // }, 1000)
}
   
export default {
  data () {
    return {
      loading: false,
      users: null,
      error: null
    }
  },
  created () {
  this.loading = true;
  let that = this;
async function daten(){
await fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
         return response.json()})
    .then(function(myJSON){
        that.user = myJSON; 
        })
    .catch(function(err){
        alert("MY ERROR: " + err); 
    })
}
daten().then(()=>{this.fetchData()
     const suchvalue = document.querySelector('#valuesuchung')
     const Suchen = document.querySelector("#suchen")
     const Iterator = document.querySelector("#iterator")
     const result = document.querySelector(".result")
     let it;
    Suchen.addEventListener('click', ()=>{
        if (!suchvalue.value) {result.innerHTML= `Sie haben nichts für Suchung geschrieben `;}
        else {
        it = this.iterator(this.suchung(suchvalue.value));
        let temp = (it.next())
        if (temp != undefined){
        result.innerHTML= ` <h3>Suchergebnisse: </h3> ${temp.value} `;
    }
        else {result.innerHTML= ` <h3>Suchergebnisse: </h3> Kein Information wurde gefunden`;}
        }})

    Iterator.addEventListener("click", ()=>{
        let temp = it.next();
        if (temp !== undefined){
        result.innerHTML= ` <h3>Suchergebnisse: </h3> ${temp.value} `;
    }
    else {alert("Das war alles")}
    })
    
}) 
},

  methods: {
    fetchData () {
     getPost(this.user, (err, user) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
         this.users = user;
        }
      })
    },
    suchung(value){
    let suchresult = new Map();
    suchresult.clear();
    for (let i in this.user){
        for (let j in this.users[i])
            if ((j=='username' && this.users[i][j].toLowerCase().indexOf(value.toLowerCase()) >= 0)){
                suchresult.set(i+j, this.user[i][j]) 
               } 
                
        }
        return suchresult;
    },
    
iterator(object){
    let massvalue = []
    for (let value of object.values()){
        massvalue.push(value)}
    let i = 0;
    return{
        
        next: function(){
            if (massvalue[i]){
            return {value: `${massvalue[i++]}`, done: false }
            }
            else {true;}
            
        }
      }
    }
  }
}

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.result{
    margin-top: 15px;
}
</style>
