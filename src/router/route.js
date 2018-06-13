import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/views/login'
import Content from '@/components/Content'
import IhcsForm from '@/components/IhcsForm'
import OthersPrint from '@/components/OthersPrint'
import IhcManual from '@/components/ihcManual'
import User from '@/components/User'
import UserForm from '@/components/UserForm'

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
          path: '/ihcsForm',
          component: IhcsForm,
          name: 'ihcsForm',
          // props: true
        }, {
          path: '/othersPrint',
          component: OthersPrint,
          name: 'othersPrint',
        }, {
          path: '/ihcManual',
          component: IhcManual,
          name: 'ihcManual',
        }, {
          path: '/User',
          component: User,
          name: 'user',
        }, {
          path: '/userForm/:user',
          component: UserForm,
          name: 'userForm',
          props: true
        }
      ]
    }
  ]
})
