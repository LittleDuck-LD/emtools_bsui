import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home/home.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: home, name: 'home' },
    { path: '/about', name: 'about', meta: { title: '关于' }, component: () => import('@/views/About/about.vue') },
    { path: '/update', name: 'update', meta: { title: '更新日志' }, component: () => import('@/views/Update/update.vue') },
    { path: '/themes', name: 'music', meta: { title: '音乐播放' }, component: () => import('@/views/Music/music.vue') },
    { path: '/quickstart', name: 'quickstart', meta: { title: '快速启动' }, component: () => import('@/views/QuickStart/quickstart.vue') }
  ],
})

export default router
