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
  }, {
    path: "infoList",
    name: "InfoList",
    component: () => import("@/views/infoList/InfoList")
  }]
}]

const router = new VueRouter({
  routes
})
export default router