import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const Login =()=>import(/* webpackChunkName: "login" */ '../views/Login.vue')

  const routes = [
    {
      path:'/',
      name:'Admin',
      component:()=>import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
      children:[
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import store from './../store'
router.beforeEach(function(to,from,next){
  if(to.path == '/login'){//直接访问登录，不做任何的访问
    next();
  }else{
    //还没有用户数据 说明没有登录
    if(store.getters.user == null){
       console.log("没有权限，请先登录")
       //跳转到登录页面
       next({path:'/login'})
    }else{
      next();
    }
  }
})
export default router
