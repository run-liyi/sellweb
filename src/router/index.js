import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import Notice from '../views/Notice.vue'
import Sell from '../views/Sell.vue'
import Print from '../views/Print.vue'
import Response from '../views/Response.vue'
import List from '../views/List.vue'
import View from '../views/View.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/login',
    children: [
      {
        path: 'home', 
        name: 'home',
        component: Home
      },
      {
        path: 'user',
        name: 'user',
        component: User
      },
      {
        path: 'mall',
        name: 'mall',
        component: Mall
      },
      {
        path: 'notice',
        name: 'notice',
        component: Notice
      },
      {
        path: 'sell',
        name: 'sell',
        component: Sell
      },
      {
        path: 'print',
        name: 'print',
        component: Print
      },
      {
        path: 'response',
        name: 'response',
        component: Response
      },
      {
        path: 'list',
        name: 'list',
        component: List
      },
      {
        path: 'view',
        name: 'view',
        component: View
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router