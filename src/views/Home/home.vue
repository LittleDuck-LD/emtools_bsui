<template>
    <div class="body">
        <div class="tool_head">
            <div class="header">
                <img class="_ico" src="/b_assets/SiteIcon.png">
                <Text class="title pro_color_text">BrawlBox v2</Text>
                <img class="_ico" src="/b_assets/SiteIcon.png">
            </div>
            <br>
            <Text class="sub_title colorful_text">一个荒野乱斗国服的工具箱</Text>
            <div class="back_classic">
                <Text>返回旧版→：</Text>
                <a href="//classic.brawlstars.top"><Text color="#81D621">classic.brawlstars.top</Text>
                </a>
            </div>
        </div>
        <div class="group_list">
            <GroupCard v-for="i in home_data" :title="i.title" class="item" @click="() => router.push(i.url)"
                :sub_title="i.sub_title" :color="i.color" :desc="i.desc" :src="i.ico">
            </GroupCard>
        </div>
    </div>
</template>
<script setup>
import BaseCard from '@/components/Card/BaseCard.vue';
import GroupCard from '@/components/Card/GroupCard.vue';
import home from '@/data/home';
import Text from '@/components/Text/Text.vue';
import { useRoute, useRouter } from 'vue-router';
var home_data = home.map(e => ({ ...e, ico: e.ico.startsWith('http') ? e.ico : `/assets/ico/${e.ico}.png` }));
const router = useRouter();
</script>
<style scoped>
.body {
    padding: 2em;
    width: 100%;
    margin: auto auto;
}

.tool_head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 3em;
}

.back_classic {
    font-size: 1.5em;
}

._ico {
    max-width: 50px;
    object-fit: contain;
}

.sub_title {
    font-size: 2em;
}

.group_list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    margin-top: 2em;
}

.group_list .item {
    flex: 1;
    margin: 5px;
    min-width: 200px;
}
</style>
