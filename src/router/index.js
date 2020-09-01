import Vue from 'vue'
import VueRouter from "vue-router"
import store from "@/store"

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'Login',
  component: () => import("@/views/login/Login")
}, {
  path: "/regist",
  name: 'Regist',
  component: () => import("@/views/regist/Regist")
}, {
  path: "/project",
  name: "Project",
  component: () => import("@/views/projectManage/ProjectManage")
}, {
  path: '/',
  name: 'Home',
  redirect: {
    name: "List",
    query: {
      index: 0
    }
  },
  component: () => import("@/views/home/Home"),
  children: [{
    path: 'list',
    name: "List",
    component: () => import("@/views/list/List")
  }, {
    path: 'personal',
    name: "Personal",
    component: () => import("@/views/personal/Personal")
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.length === 0) {
    next("/")
  } else {
    if(store.state.token) {
      next()
    } else {
      if(to.name === "Login" || to.name === 'Regist') {
        next()
      } else {
        next("/login")
      }
    }
  }
  // if(to.name === "Login" || to.name === "Regist") {
  //   console.log("登录页面")
  //   next()
  // } else {
  //   next("/login")
  // }
  // console.log("1")
  // if (!store.state.token) {
  //   console.log("1")
  //   console.log(to)
  //   if(to.name === "Login") {
  //     next()
  //   }
  //   next("/login")
  //   // if (to.name === "Login" || to.name === "Regist") {
  //   //   console.log("white")
  //   //   next()
  //   // }
  //   // console.log("black")
  //   // next({
  //   //   name: "Login"
  //   // })
  // } else {
  //   console.log("3")
  //   next()
  // }
})

export default router