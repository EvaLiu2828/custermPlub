import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '../components/Home'
import Visit from '../components/Visit'
import VisitList from '../components/visitAdmins/VisitList'
import VisitMap from '../components/visitAdmins/VisitMap'
import Users from '../components/Users'
import OrbitSearch from '../components/OrbitSearch'
import Interview from '../components/Interview'
import Feedback from '../components/viewAdminis/Feedback'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {//排程
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
    {//签到查询
      path: '/users',
      name: 'users',
      component: Users,
    },
    {//轨迹查询
      path: '/orbitsearch',
      name: 'orbitsearch',
      component: OrbitSearch,
    },
    {//外访管理
      path: '/interview',
      name: 'interview',
      component: Interview,
    },
    {//外访管理
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
    },
    {//默认路径
      path: "*",
      redirect: "/visit/visitmap"
    },

  ]
})
