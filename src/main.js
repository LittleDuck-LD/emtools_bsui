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
