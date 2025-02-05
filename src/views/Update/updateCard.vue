<template>
    <div class="update_card">
        <div class="update_head">
            <div class="update_author_head">
                <img class="head" :src="GetImage(ico)">
            </div>
            <div class="update_author">
                <span><Text class="colorful_text">提交：</Text><Text class="nick colorful_text">{{ nick }}</Text></span>
                <span><Text class="colorful_text">提交时间：</Text><Text color="#81D621">{{ pushtime.replaceAll('+0800', '')
                        }}</Text></span>
                <span> <Text class="colorful_text">hash：</Text><Text color="#81D621">{{ hash }}</Text></span>
            </div>
        </div>
        <hr>
        <div class="update_info">
            <Text class="title" color="#81D621">更新内容：</Text>
            <Text class="content">{{ info }}</Text>
        </div>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import { GetImage } from '@/assets/js/util';
defineProps(['ico', 'nick', 'pushtime', 'hash', 'info']);
</script>

<style scoped>
.update_card {
    display: flex;
    flex-direction: column;
    border: solid 3px black;
    border-radius: 10px;
    padding: 10px;
    background: #756673d8;
    border: solid 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);
}

.update_card hr {
    height: 3px;
    width: 100%;
    outline: none;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 10px;
}

.update_card .update_head {
    display: flex;
    flex-direction: row;
}

.update_author_head {
    margin: 5px;
}

.update_author_head .head {
    width: 80px;
    height: 100px;
    object-fit: contain;
}

.update_author {
    display: flex;
    flex-direction: column;
    margin: 5px;
    justify-content: center;
}

.update_info {
    display: flex;
    flex-direction: row;
    max-height: 320px;
    overflow-y: auto;
}

.update_info .title {
    margin: 5px;
}

.update_info .content {
    margin: 5px;
    flex: 1;
}

.text,
.text::before {
    word-break: break-all;
}
</style>