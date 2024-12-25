import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import popup from './components/Popup/popup';
// css
import '@/assets/css/common.css';
import '@/assets/css/cup_progress.css';
import '@/assets/css/color.css';
const app = createApp(App);
app.provide('popup', popup);
app.use(router);
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
