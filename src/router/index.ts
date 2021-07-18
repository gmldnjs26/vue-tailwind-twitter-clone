// import Router from 'vue-router'

// import Home from '../pages/Home.vue'
// import Notification from '../pages/Notification.vue'
// import Messages from '../pages/Messages.vue'
// import Profile from '../pages/Profile.vue'

// const router: any = new Router({
//   mode: 'history',
//   base: '/',
//   routes: [
//     {
//       path: '/',
//       component: Home
//     },
//     {
//       path: '/notification',
//       component: Notification
//     },
//     {
//       path: '/messages',
//       component: Messages
//     },
//     {
//       path: '/profile',
//       component: Profile
//     },
//   ]
// })

// export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Notification from '../pages/Notification.vue'
import Messages from '../pages/Messages.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/notifications', component: Notification },
  { path: '/messages', component: Messages },
  { path: '/profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router