import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'
import Home from '../pages/Home.vue'
import Notifications from '../pages/Notification.vue'
import Messages from '../pages/Messages.vue'
import Profile from '../pages/Profile.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Tweet from '../pages/Tweet.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    title: '홈',
    icon: 'fas fa-home fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/',
    name: 'explore',
    component: Home,
    title: '탐색하기',
    icon: 'fas fa-hashtag fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    title: '알림',
    icon: 'far fa-bell fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    title: '쪽지',
    icon: 'far fa-envelope fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/',
    name: 'bookmarks',
    component: Home,
    title: '북마크',
    icon: 'far fa-bookmark fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/',
    name: 'list',
    component: Home,
    title: '리스트',
    icon: 'far fa-list-alt fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    title: '프로필',
    icon: 'far fa-user fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/profile/:uid',
    component: Profile,
    meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/',
    name: 'more',
    component: Home,
    title: '더보기',
    icon: 'fas fa-ellipsis-h fa-fw text-2xl',
    meta: { isMenu: true, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: Tweet,
    meta: { isMenu: false, layout: 'AfterLogin', requireAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { isMenu: false, layout: 'BeforeLogin' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isMenu: false, layout: 'BeforeLogin' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.user) {
    router.push('/login')
  } else {
    next()
  }
})

export default router
