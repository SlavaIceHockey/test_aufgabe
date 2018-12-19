import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Posts from './views/posts.vue'
import Users from './views/users.vue'
import Details from './views/details.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/details:postid/user/:userid',
      name: 'Details',
      component: Details
    }
   
  ]
})
