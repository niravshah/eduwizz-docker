import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import NewDashboard from '@/components/Dashboard-New'
import Math from '@/components/Math'
import Physics from '@/components/Physics'
import Biology from '@/components/Biology'
import Chemistry from '@/components/Chemistry'
import Download from '@/components/Download'
import Users from '@/components/Users'
import EditUser from '@/components/User-Edit'
import DeleteUser from '@/components/User-Delete'
import AddUser from '@/components/User-Add'
import UserPassword from '@/components/User-Password'
import Error from '@/components/Error'
import Papers from '@/components/Papers'
import AddPaper from '@/components/Papers-Add'
import EditPaper from '@/components/Papers-Edit'
import DeletePaper from '@/components/Papers-Delete'

import Group from '@/components/Group'
import AddGroup from '@/components/Group-Add'
import EditGroup from '@/components/Group-Edit'
import DeleteGroup from '@/components/Group-Delete'
import Results from '@/components/Answers-Corrected'
import SubmitAnswers from '@/components/Answers-Submit'
import Uploaded from '@/components/Answers-ToCorrect'
import UploadCorrected from '@/components/Answers-UploadCorrected'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {auth: true},
      children: [
        {path: '', name: 'Home', component: NewDashboard, meta: {auth: true}},
        {path: '/error', component: Error, metas: {auth: false}},
        {path: '/download', component: Download, metas: {auth: true}},
        {
          path: '/maths',
          component: Math,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasMathsPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/physics',
          component: Physics,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasPhysicsPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/biology',
          component: Biology,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasBiologyPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/chemistry',
          component: Chemistry,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasChemistryPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/answers/submit',
          component: SubmitAnswers,
          meta: {auth: true}
        },
        {
          path: '/results',
          component: Results,
          meta: {auth: true}
        },
        {
          path: '/admin/papers/correct',
          component: Uploaded,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/papers/correct/upload',
          component: UploadCorrected,
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/groups',
          component: Group,
          name: 'Group',
          metas: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/groups/add',
          component: AddGroup,
          name: 'AddGroup',
          metas: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/groups/edit',
          component: EditGroup,
          name: 'EditGroup',
          metas: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/groups/delete',
          component: DeleteGroup,
          name: 'DeleteGroup',
          metas: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users',
          component: Users,
          name: 'Users',
          metas: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users/add',
          component: AddUser,
          name: 'AddUser',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users/edit',
          component: EditUser,
          name: 'EditUser',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users/reset-password',
          component: UserPassword,
          name: 'UserPassword',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/users/delete',
          component: DeleteUser,
          name: 'DeleteUser',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/papers',
          component: Papers,
          name: 'Papers',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/papers/add',
          component: AddPaper,
          name: 'AddPaper',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/papers/delete',
          component: DeletePaper,
          name: 'DeletePaper',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        },
        {
          path: '/admin/papers/edit',
          component: EditPaper,
          name: 'EditPaper',
          meta: {auth: true},
          beforeEnter: (to, from, next) => {
            if (Vue.hasAdminPerm()) {
              next()
            } else {
              next('/error')
            }
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.auth && !Vue.isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

export default router
