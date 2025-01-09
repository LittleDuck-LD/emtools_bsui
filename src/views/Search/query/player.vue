<template>
    <div>
        <div class="loading" v-if="isLoading">
            <Text class="title">{{ PromiseText }}</Text>
            <!-- {{ $route.params.tag }} -->

        </div>
        <PlayerPanel v-if="!isLoading" :data="playerObj" :tag="playerTag"></PlayerPanel>
    </div>
    <!-- <button @click="updateStatus(true)">try loading</button>
    <button @click="updateStatus(false, '测试')">try loading false</button> -->
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import { onMounted, ref } from 'vue';
import PlayerPanel from '../ui/playerPanel.vue';
import { useRoute } from 'vue-router';
import { GetJson, isValidTag } from '@/assets/js/util';
import convertPlayer from '@/data/convert/convertPlayer';
import global_api from '@/data/api';
var isLoading = ref(true);
var PromiseText = ref('加载中...');
var playerObj = ref({});
const updateStatus = (e, res, failed_title) => {
    isLoading.value = !e;
    if (!e) PromiseText.value = (failed_title ?? "加载失败：") + res;
    else PromiseText.value = "加载中...";
}
var router = useRoute();
var playerTag = router.params.tag.toUpperCase();
const init = () => {
    if (!isValidTag(playerTag)) {
        updateStatus(false, `玩家ID [#${playerTag}] 无效`);
    } else {
        updateStatus(false, "查询中...", '');
        fetchPlayer(playerTag).then(res => {
            if (res.find) {
                playerObj.value = convertPlayer(res.obj);
                updateStatus(true);
            }
            else updateStatus(false, '找不到此玩家ID');
        })//.catch(e => updateStatus(false, '网络错误', '服务器错误或请求有误：'));
        // setTimeout(() => updateStatus(true), 2000 * 1);
    }
};
function fetchPlayer(tag) {
    let api = global_api.api.default_api + `getprofilebytag?tag=${tag}`;
    return new Promise((find, fuck) => {
        // try {
        fetch(api).then(e => e.json()).then(e => !e.success ? find({ find: true, obj: e }) : find({ find: false })).catch(e => {
            fuck(false);
        });
        //}
        // catch {
        //     fuck(false);
        // }
    });

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