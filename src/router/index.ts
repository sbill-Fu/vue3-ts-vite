import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import storage from '../utils/storage'
import API from '../api'
import utils from '../utils/utils'
import store from '../store'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎'
        },
        component: () => import('@/views/Welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue')
  },
  {
    name: 'screenData',
    path: '/screenData',
    meta: {
      title: '数据大屏'
    },
    component: () => import('@/views/ScreenData/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 修复线上部署不能访问问题
async function loadAsyncRoutes() {
  let userInfo = storage.getItem('userInfo') || {}
  if (userInfo.token) {
    try {
      const { menuList, actionList } = await API.getPermissionList()
      store.commit('saveMenuList', menuList)
      store.commit('saveActionList', actionList)
      let routes = utils.generateRoute(JSON.parse(JSON.stringify(menuList)))
      const modules = import.meta.glob('../views/*.vue')
      routes.map((route) => {
        let url = `../views/${route.name}.vue`
        route.component = modules[url]
        router.addRoute('home', route)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
loadAsyncRoutes()
// 判断当前地址是否可以访问
/*
function checkPermission(path) {
    let hasPermission = router.getRoutes().filter(route => route.path == path).length;
    if (hasPermission) {
        return true;
    } else {
        return false;
    }
}
*/
// 导航守卫
router.beforeEach(async (to, from, next) => {
  if (to.name) {
    if (router.hasRoute(to.name)) {
      document.title = to.meta.title
      next()
    } else {
      next('/404')
    }
  } else {
    // TODO 如果在一个子页面刷新的话，会进入到此判断逻辑，暂时搞不明白
    await loadAsyncRoutes()
    let curRoute = router.getRoutes().filter((item) => item.path == to.path)
    if (curRoute?.length) {
      document.title = curRoute[0].meta.title
      next({ ...to, replace: true })
    } else {
      next('/404')
    }
  }
})

export default router
