<template>
    <div>
        <div class="main_author">

            <Text class="title">主要作者：</Text>
            <div class="author_list">
                <AuthorCard class="item" v-for="author in authors.main_authors" v-bind="author" />
            </div>
        </div>
        <div class="sp_thanks">
            <Text class="title">特别感谢：</Text>
            <div class="items">
                <Text v-for="who in authors.sp_thanks" :text="who" class="color_2 item" />
            </div>
        </div>
        <div class="footer">
            <div>
                <Button class="primary">我没意见</Button>
                <Button class="danger" @click="popup.Dialog.Info({ text: '我阐述你的梦', title: '你有意见?' })">我有意见</Button>
                <Button class="success"
                    @click="popup.Dialog.Confirm({ title: authors.q_link.title, text: authors.q_link.text, callback: (e) => (e ? open_qlink : () => { })() })">点击加入网站Q群</Button>
            </div>
            <div class="website_stat">
                <Text class="c">网站状态：</Text>
                <img src="https://api.netlify.com/api/v1/badges/c0c76732-0cde-4e1e-a31b-df4097ab6287/deploy-status">
            </div>
            <div class="copyright">
                <Text>此非官方作品，未获得Supercell认可。更多信息，请参阅Supercell 玩家内容条款：</Text>
                <a href="//www.supercell.com/en/fan-content-policy"><Text
                        color="#81D621">www.supercell.com/en/fan-content-policy</Text>
                </a>
                <Text>Copyright © 2024 EmberHeart. All rights reserved. <br>版权所有© 2024 EmberHeart</Text>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import authors from '@/data/authors';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
import AuthorCard from './authorCard.vue';
import { inject } from 'vue';
var popup = inject('popup');
const open_qlink = (a) => ((a = document.createElement('a')).target = '_blank') && (a.href = authors.q_link.link) && a.click()
const route = useRoute();
console.log(route);
</script>
<style scoped>
.title {
    font-size: 2em;
}

.main_author {
    display: flex;
    flex-direction: column;
    padding: 1em;
}

.main_author .title {
    margin: 1em;
}

.author_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.author_list .item {
    flex: 1;
    min-width: 130px;
    max-width: 180px;
}

.sp_thanks {
    display: flex;
    flex-direction: row;
    padding: 1em;
    flex-wrap: wrap;
}

.sp_thanks .title {
    flex: 0;
    margin: 1em;
    min-width: 150px;
}

.sp_thanks .items {
    display: flex;
    flex-direction: column;
    margin-top: 2em;
    flex: 1 1 auto;
    align-items: center;
}

.sp_thanks .item {
    font-size: 1.5em;
    margin-left: 2em;
    margin-top: 5px;
}

button {
    margin: 5px;
}

.footer {
    display: flex;
    flex-direction: column;
    margin: 2em;
}



.website_stat {
    display: inline-flex;
    font-size: 1.3em;
    align-items: center;
}

.website_stat img {
    width: 100px;
    height: 50px;
    object-fit: contain;
}

.copyright {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.2em;
    line-height: 20px;
}
</style>
