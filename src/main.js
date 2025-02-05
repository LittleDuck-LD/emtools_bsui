import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import popup from './components/Popup/popup';
// vue virtual scroller
import "vue-virtual-scroller/dist/vue-virtual-scroller.css" // 引入它的 css
import VueVirtualScroller from "vue-virtual-scroller" // 引入它


// css
import '@/assets/css/common.css';
// import '@/assets/css/cup_progress.css';
import '@/assets/css/color.css';
const app = createApp(App);
app.provide('popup', popup);
app.provide('get_pv', () => new Promise((ok, fuck) => {
    let out = setTimeout(() => fuck(false), 2 * 1000);
    bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", (a) => {
        ok(a);
        clearTimeout(out);
    });
}))
app.use(router);
app.use(VueVirtualScroller) // use 它
app.directive('focus', {
    bind() { },
    inserted(el) {
        el.focus()
    },
    update() { },
    componentUpdated() { },
    unbind() { }
})
app.mount('#app');
