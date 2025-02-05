<template>
    <div class="hero_list">
        <div class="sort_list">
            <Button @click="select_hero">{{ default_selected }}</Button>
        </div>
        <div class="content">
            <HeroPanel class="_item" :key="item" v-if="Page_Slice" v-for="item in Page_Slice[PageIndex]"
                v-bind="item" />
        </div>
        <div class="footer">
            <span class="pagelist">
                <span v-for="i in PageNumber">
                    <Text class="item" v-if="i - 1 == PageIndex" color="red" @click="toPage(i - 1)">{{ i }}</Text>
                    <Text class="item" v-else-if="i" color="green" @click="toPage(i - 1)">{{ i }}</Text>
                </span>
            </span>
            <div class="btn">
                <Button @click="prevPage">上一页</Button>
                <Button @click="nextPage">下一页</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import Button from '@/components/Button/Button.vue';
import HeroPanel from '@/components/Card/HeroPanel.vue';
import { ref, h } from 'vue';
import { inject } from 'vue';
var popup = inject('popup');
console.log(popup);
var props = defineProps(['heros', 'size']);
var heros = props.heros || [];
// ----------------------------------------
var Page_List = ref(heros || []);//所有数据
var PageIndex = ref(0);//默认页面index
var PageSize = ref(props.size || 2);//每个页面数量
var PageNumber = Math.ceil(Page_List.value.length / PageSize.value) || 1;//计算有多少页数据，默认为1
var Page_Slice = ref([]);//当前分页
var default_selected = ref('按奖杯数降序');
const select_options = [
    ['按奖杯数升序', () => sortHero('trophies', 'asc')],
    ['按奖杯数降序', () => sortHero('trophies', 'desc')],
    ['按最高奖杯数升序', () => sortHero('htrophies', 'asc')],
    ['按最高奖杯数降序', () => sortHero('htrophies', 'desc')],
    ['按能量等级升序', () => sortHero('level', 'asc')],
    ['按能量等级降序', () => sortHero('level', 'desc')],
    ['按专精点数升序', () => sortHero('mastery', 'asc')],
    ['按专精点数降序', () => sortHero('mastery', 'desc')],
    ['英雄推出时间升序', () => sortHero('id', 'asc')],
    ['英雄推出时间降序', () => sortHero('id', 'desc')]
].map(e => h(Button, {
    style: {
        margin: '5px'
    },
    onClick: () => {
        e[1]();
        default_selected.value = e[0];
    }
}, () => e[0]));
const select_hero = () => {
    popup.Tip.Show(select_options);
}
//-----------------------------------------
const build_slice = () => Page_Slice.value = [...Array(PageNumber)].map((e, i) => Page_List.value.slice(PageSize.value * i, PageSize.value * (i + 1))).filter(e => e.length > 0);

//-----------------------------------------
const prevPage = () => {
    if (PageIndex.value == 0) return PageIndex.value = PageNumber - 1;
    PageIndex.value -= 1;
};
const nextPage = () => {
    if (PageIndex.value == PageNumber - 1) return PageIndex.value = 0;
    PageIndex.value += 1;
};
const toPage = (e) => {
    PageIndex.value = e;
};
//------------------------------------------
const _sortHeroes = (array, field, order) => array.sort((a, b) => {

    let aValue = a[field];
    let bValue = b[field];
    // console.log(a, b);
    if (field === 'chara') {
        aValue = a.chara[1];
        bValue = b.chara[1];
    }

    if (order === 'asc') {
        return aValue - bValue;
    } else {
        return bValue - aValue;
    }
});
const sortHero = (field, order) => {
    console.log(Page_List.value);
    _sortHeroes(Page_List.value, field, order);
    console.log(Page_List.value);
    build_slice();
}
build_slice();

</script>

<style scoped>
.hero_list {
    padding: 1em;
    display: flex;
    flex-direction: column;
}

.hero_list .sort_list {
    display: flex;
    flex-wrap: wrap;
}

.hero_list .sort_list .group {
    flex: 1 1 auto;
}

.hero_list .sort_list button {
    margin: 5px;
    flex: 1 1 auto;
}

.content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    /* 默认行为 */
}

/* 当子元素是唯一时，强制顶部对齐 */
.content>* {
    align-self: stretch;
    /* 继承父容器默认值 */
}

.content> :only-child {
    align-self: flex-start;
    /* 覆盖为顶部对齐 */
}

.content ._item {
    flex: 1;
    margin: 5px;
}

.footer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}

.footer button {
    margin: 5px;
}

.footer .btn,
.footer .pagelist {
    display: inline-flex;
    justify-content: center;
    flex: 1 1 auto;
}

.footer .item {
    margin: 5px;
}
</style>