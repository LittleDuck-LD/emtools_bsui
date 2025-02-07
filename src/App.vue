<template>
    <div class="container">
        <div class="background">
            <div class="mask"></div>
        </div>
        <div :class="{ app_pc: is_pc, app_div: true }">
            <div :class="{ app_pc_item: true, app_home_content: true }" v-if="is_pc && !need_all">
                <Home v-if="is_pc"></Home>
            </div>
            <div :class="{ app_content: true, app_pc_item: is_pc }">
                <div v-if="isshow_bar" class="holder_bar">
                    <Button class="back_btn" @click="go_back"><img class="image" src="./assets/image/back.png"></Button>
                    <div class="holder">
                        <Text class="holder_title">{{ route_name }}</Text>
                    </div>
                    <Button class="home_btn" @click="go_home"><img class="image" src="./assets/image/home.png"></Button>
                </div>
                <LoadingPage v-if="isLoading" class="__app_content" />
                <RouterView v-else class="__app_content" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from './components/Button/Button.vue';
import Home from './views/Home/home.vue';
import Text from './components/Text/Text.vue';
import LoadingPage from './views/Loading/loading.vue';
import { watch, ref, onMounted, inject, provide } from 'vue';
provide('goto', (e) => window.location.href = e);
import { useLink, useRouter } from 'vue-router';
const router = useRouter();
const isshow_bar = ref(false);
const need_all = ref(false);
const route_name = ref('');
const min_width = 700;
const is_pc = ref(false);
const main_root = '/';
const pc_root = '/about';
const fix_margin = ref(true);
const isLoading = ref(false);
const url_complate = () => is_pc.value ? pc_root : main_root;
function check_pc_or_phone(path) {
    is_pc.value = window.innerWidth > min_width;
    if (!is_pc.value && path != url_complate())
        isshow_bar.value = true;
    else if (path == url_complate()) isshow_bar.value = false;
    re_check(path);

}
router.beforeEach(async (to, from, next) => {
    next();
    isLoading.value = true;
    route_name.value = '加载中...';

});
router.afterEach((to, from) => {
    isLoading.value = false;
    if (to.meta.forceReload && router.currentRoute.value.path != to.path) window.location.reload();
    if (to.meta && to.meta.title)
        route_name.value = to.meta.title;
    else route_name.value = '';
});
function re_check(path) {
    if (path == main_root || (is_pc.value && path == pc_root))
        router.push(url_complate());
}
function go_back() {
    if (router.currentRoute.value.path != url_complate())
        router.back();
}
function go_home() {
    if (router.currentRoute.value.path != url_complate())
        router.push(url_complate());
}
onMounted(() => {
    window.addEventListener('resize', () => check_pc_or_phone(router.currentRoute.value.path));
});

watch(() => router.currentRoute.value, (a) => {
    let res = a.path != url_complate();
    fix_margin.value = url_complate() != main_root;
    isshow_bar.value = res;

    if (a.meta.isNeedALL) {
        need_all.value = true;
    } else need_all.value = false;
    re_check(a.path);
    check_pc_or_phone(a.path);

});
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}

.holder_bar {
    display: flex;
    flex-wrap: wrap;
    border-top: solid 10px black;
}

.image {
    width: 40px;
    height: 30px;
    object-fit: contain;
}

.back_btn,
.home_btn {
    width: 80px;
    height: 60px;
    margin-top: -20px;
}



.back_btn {
    margin-left: -10px;
}

.home_btn {
    margin-right: -10px;
}

.holder {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: top;

}

.holder_title {
    font-size: 2em;
    margin-top: -5px;
}

@media screen and (max-width:360px) {

    .back_btn,
    .home_btn {
        width: 60px;
    }

    .image {
        width: 40px;
    }
}

.app_div {
    height: 100%;
    width: 100%;
}

.app_pc {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
}

.app_pc_item {
    flex: 1;
}

.app_content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.app_home_content {
    height: 100%;
    overflow-x: auto;
    max-width: 600px;
    display: flex;
}

.app_content_body {
    margin: 2em;
}

.__app_content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>