<template>
    <div class="update_list">
        <div>
            <Text class="title">更新记录</Text>
            <Text class="title" v-if="git_list.length <= 0">加载中...</Text>
        </div>
        <div class="list">
            <UpdateCard class="item" v-for="who in git_list" :ico="get_git_ico(who.author)" :nick="who.author"
                :pushtime="who.date" :hash="who.hash" :info="who.summary"></UpdateCard>
        </div>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import { GetJson } from '@/assets/js/util';
import UpdateCard from './updateCard.vue';
import { onMounted, ref } from 'vue';
import api from '@/data/api';
var git_list = ref([]);
const get_git_ico = (e) => api.git_author_pictrues.find(j => j.name == e)?.ico ?? '/assets/image/user.png';
onMounted(async () => {
    // git_list.value = (await GetJson(api.git_url)).filter((e, i) => i <= 59);
    git_list.value = (await GetJson(api.git_url));
});
</script>

<style scoped>
.update_list {
    display: flex;
    flex-direction: column;
}

.update_list .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    align-items: stretch;
    margin: 10px;
}

.update_list .list .item {
    margin: 5px;
}

.title {
    font-size: 2em;
    margin: 1em;
}
</style>