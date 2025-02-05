<template>
    <div>
        <div class="loading" v-if="isLoading">
            <Text class="title">{{ PromiseText }}</Text>
            <!-- {{ $route.params.tag }} -->

        </div>

        <component :is="module" v-if="!isLoading" :data="data" :tag="tag" />
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import { onMounted, ref, inject } from 'vue';
import { isValidTag } from '@/assets/js/util';
var { mode = 'player', data_api, tag } = defineProps(['mode', 'data_api', 'tag']);
var isLoading = ref(true);
var popup = inject('popup');
var PromiseText = ref('加载中...');
var data = ref({});
var module = ref(null);
var go_back = inject('go_back');
const getMode = async () => (mode == 'club' ? await import('@/views/Search/ui/club/clubPanel.vue') : await import('@/views/Search/ui/player/playerPanel.vue')).default;
const updateStatus = (e, res, failed_title) => {
    isLoading.value = !e;
    if (!e) PromiseText.value = (failed_title ?? "加载失败：") + res;
    else PromiseText.value = "加载中...";
}
const return_back = (t, tt) => popup.Dialog.Info({ text: t, title: tt, callback: () => go_back(), close_text: '返回' });
const init = async () => {
    module.value = await getMode();
    if (!isValidTag(tag)) {
        return_back(`标签 [#${tag}] 无效`, '查询失败');
        return updateStatus(false, `标签 [#${tag}] 无效`);
    }
    updateStatus(false, "查询中...", '');

    fetchData(data_api).then(res => {
        console.log(res);
        if (res.success) {
            data.value = res.query;
            return updateStatus(true);
        }
        if (!res.success && res.message) {
            return_back(res.message, '查询失败');
            return updateStatus(false, res.message);
        }
        return_back('服务器错误或请求有误', '查询失败');
        updateStatus(false, '网络错误');
    });
};
function fetchData(api) {
    return fetch(api).then(e => e.json()).catch(e => false);
}
onMounted(() => init());
</script>

<style scoped>
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    height: 100%;

}

.loading .title {
    font-size: 2em;
}
</style>