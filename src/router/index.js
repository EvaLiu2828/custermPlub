import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '../components/Home'
import Visit from '../components/Visit'
import VisitList from '../components/VisitList'
import VisitMap from '../components/VisitMap'
import Users from '../components/Users'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/visit',
      name: 'visit',
      component: Visit,
      redirect: "/visit/visitmap",
      children : [
        {
          path: 'visitlist',
          name: 'visitlist',
          component: VisitList
        },
        {
          path: 'visitmap',
          name: 'visitmap',
          component: VisitMap
        }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {//默认路径
      path: "*",
      redirect: "/visit/visitmap"
    },

  ]
})
