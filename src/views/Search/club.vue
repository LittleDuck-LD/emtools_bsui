<template>
    <div class="container">
        <div class="item">
            <Text class="title">国服战队查询</Text>
            <Text class="sub_title">看看你/朋友在国服的数据面板</Text>
        </div>
        <div class="input_query">
            <ExInput class="userid_input" title="#" ref="neiger">
            </ExInput>
            <Button class="primary" @click="query(neiger.input.value)">查询</Button>
        </div>
        <cueWord title="或者查询以下玩家的信息：" :words="cue_clublist.club" showkey="name" :callback="(e) => query(e.tag)" />
        <div class="find_id">
            <Text class="title">我的战队ID是什么?</Text>
            <img src="/b_assets/club_find_tag_1.png">
            <img src="/b_assets/club_find_tag_2.png">
            <img src="/b_assets/club_find_tag_3.jpg">
        </div>

    </div>
</template>

<script setup>
import ExInput from '@/components/Input/ExInput.vue';
import Text from '@/components/Text/Text.vue';
import Button from '@/components/Button/Button.vue';
import cueWord from './ui/common/cueWord.vue';
import router from '@/router';
import { inject, onMounted, useTemplateRef } from 'vue';
import { MatchPlayerId } from '@/assets/js/util';
import cue_clublist from '@/data/cue_playerlist';
var goto = inject('goto');
var Message = inject('popup').Message;
var neiger = useTemplateRef('neiger');
onMounted(() => {
    neiger.value.input.addEventListener('keydown', (e) => e.keyCode == 13 && query(neiger.value.input.value));
});
function query(e) {
    if (e == "")
        return Message.show('战队标签不能为空！');
    let p = MatchPlayerId(e);
    if (!p.check)
        return Message.show('战队标签不能包含字符：' + '[' + p.array.join(',') + ']', 3000);
    goto('/club/' + e);
}
</script>

<style scoped>
.container {
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 2em;
    margin: 5px;
}

.sub_title {
    font-size: 1.5em;
    margin: 5px;
}

.item {
    display: flex;
    flex-direction: column;
}

.input_query {
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
}

.input_query .userid_input {
    flex: 1;
    min-width: 80px;

}

.input_query .userid_input,
.input_query button {
    margin: 5px;
    font-size: 2em;
}


.find_id {
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius: 10px;
    border: solid 3px rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.5);
    box-shadow: inset -1px 2px 0px 0px rgba(0, 0, 0, 0.5);
}

.find_id img {
    max-width: 100%;
    max-height: 50%;
    margin: 5px;
}
</style>