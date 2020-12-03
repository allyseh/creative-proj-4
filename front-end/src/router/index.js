import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Person from '../views/Person.vue'
import Gift from '../views/Gift.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/person',
    name: 'person',
    component: Person
  },
  {
    path: '/gift',
    name: 'gift',
    component: Gift
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
