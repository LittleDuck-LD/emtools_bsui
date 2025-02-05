<template>
    <div class="clubList">
        <div class="header">
            <span class="name" v-for="item in [
                { ico: '/b_assets/trophy_cur.png', desc: '奖杯' },
                { ico: '/b_assets/ticket.png', desc: '金券' },
                { ico: '/b_assets/Megapig.png', desc: '剩余票数' },
                { ico: '/b_assets/megapig_wins.png', desc: '猪猪胜场' },
            ]">
                <img class="ico" :src="item.ico">
                <Text>{{ item.desc }}</Text>
            </span>

        </div>
        <div class="sort">
            <Button @click="sortCup(false)">按奖杯数升序</Button>
            <Button @click="sortCup(true)">按奖杯数降序</Button>
        </div>
        <div class="content">
            <clubMember @click="() => popup(i)" v-for="i in _members" class="item" v-bind="i" />
        </div>
    </div>
</template>

<script setup>
//https://brawlace.com/assets/images/brawlstars/icons-players/28000244.png?size=200
import Text from '@/components/Text/Text.vue';
import clubMember from './clubMember.vue';
import { inject, ref, h } from 'vue';
var _tip = inject('popup').Tip;
var goto = inject('goto');
var Message = inject('popup').Message;
import Button from '@/components/Button/Button.vue';
import querySingle from './querySingle.vue';
var { members } = defineProps(['members']);
var _members = ref(members || []);
_members.value = _members.value.map((e, index) => ({ ...e, index: index + 1 }));


const sortCup = (m) => _members.value = [..._members.value].sort((a, b) => m ? a.cup - b.cup : b.cup - a.cup).map((e, index) => ({ ...e, index: index + 1 }));
const popup = (e) => {
    _tip.Show(h(querySingle,
        {
            query_player: () => goto('/player/' + e.tag),
            copy_tag: () => copyTextToClipboard(e.tag),
            name: e.name,
            tag: e.tag
        }));
}
function copyTextToClipboard(text) {
    // 创建一个临时的文本输入框
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // 将文本输入框添加到页面上
    document.body.appendChild(textArea);

    // 选中文本框中的文本
    textArea.select();
    textArea.setSelectionRange(0, 99999); // 对于手机设备也有效

    // 执行复制命令
    document.execCommand('copy');

    // 删除临时文本框
    document.body.removeChild(textArea);

    Message.show('标签已复制');
}
</script>

<style scoped>
.clubList {
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.5em;
}

.sort {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.sort button {
    margin: 5px;
}

.header .name {
    margin: 5px;
    font-size: 1.3em;
}

.name {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.ico {
    width: 35px;
    height: 35px;
    object-fit: contain;
}

.content {
    display: flex;
    flex-direction: column;
}

.content .item {
    flex: 1;
    margin: 5px;
}
</style>