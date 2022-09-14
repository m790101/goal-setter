import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/goals'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/goals',
    name: 'goals',
    component: () => import( '../views/Goals.vue')
  },
  {
    path: '/goals/new',
    name: 'new-goal',
    component: () => import( '../views/NewGoalForm.vue')
  },
  {
    path: '/goals/:id',
    name: 'goal-detail',
    component: () => import( '../views/GoalDetail.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
