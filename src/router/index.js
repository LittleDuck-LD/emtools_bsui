import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home/home.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: home, name: 'home'
    },
    { path: '/about', name: 'about', meta: { title: '关于' }, component: () => import('@/views/About/about.vue') },
    { path: '/update', name: 'update', meta: { title: '更新日志' }, component: () => import('@/views/Update/update.vue') },
    { path: '/themes', name: 'music', meta: { title: '音乐播放' }, component: () => import('@/views/Music/music.vue') },
    { path: '/quickstart', name: 'quickstart', meta: { title: '快速启动' }, component: () => import('@/views/QuickStart/quickstart.vue') },
    {
      path: '/search', name: 'search', meta: { title: '玩家信息查询' }, component: () => import('@/views/Search/search.vue'), children: [

      ]
    },
    { path: '/player/:tag', name: 'search_query', meta: { title: '玩家信息查询', isNeedALL: true, forceReload: true }, component: () => import('@/views/Search/query/player.vue') },
    { path: '/debug', component: () => import('@/views/Search/ui/playerPanel.vue'), meta: { isNeedALL: true } },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/PageLocked/404.vue')
    },
    {
      path: '/fuck',
      name: 'fuck',
      component: () => import('@/views/PageLocked/locked.vue')
    },
    {
      path: '/display',
      redirect: '/fuck'
    },
    {
      path: '/brawltv',
      redirect: '/fuck'
    },
    {
      path: '/roomlobby',
      redirect: '/fuck'
    },
    {
      path: '/rank',
      redirect: '/fuck'
    },
    {
      path: '/club',
      redirect: '/fuck'
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    },


  ],
})

export default router
