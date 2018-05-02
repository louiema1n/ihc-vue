import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/views/login'
import Content from '@/components/Content'
import IhcsForm from '@/components/IhcsForm'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/index',
      component: Index,
      children:[
        {
          path: '/content',
          component: Content
        }, {
          path: '/ihcsForm/:ihcs',
          component: IhcsForm,
          name: 'ihcsForm',
          props: true
        }
      ]
    }
  ]
})
