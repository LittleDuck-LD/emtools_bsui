<template>
    <descCard class="hero_panel">
        <HeroCard class="item" color="5" :head="hero_head" :name="hero_name">
        </HeroCard>
        <descCard class="jc_data item" title="基础数据">
            <descCard class="sub_item" title="奖杯数">
                <CupProgress class="cup_p" :number="cup" :limit_show="true"></CupProgress>
            </descCard>
            <descCard class="sub_item" title="最高奖杯数">
                <CupProgress class="cup_p" :number="max_cup" :limit_show="true"></CupProgress>
            </descCard>
            <descCard class="sub_item" title="等级">
                <Level :level="level" />
            </descCard>
            <descCard class="sub_item" title="专精">
                <MasteryProgress class="cup_p" :number="mastery" />
            </descCard>
        </descCard>
        <descCard class="sp_data item" title="饰品数据">
            <IconCard :text="skin || '无'" class="sub_item" title="皮肤" ico="/ass/head/skin.png" />
            <IconCard :text="skin_head || '无'" class="sub_item" title="头饰" ico="/ass/head/head.png" />
            <IconCard :text="skin_back || '无'" class="sub_item" title="背饰" ico="/ass/head/back.png" />
        </descCard>
    </descCard>
</template>

<script setup>
import descCard from '@/views/Search/ui/descCard.vue';
import HeroCard from './HeroCard.vue';
import CupProgress from '../Progress/CupProgress.vue';
import MasteryProgress from '../Progress/MasteryProgress.vue';
import IconCard from '@/views/Search/ui/iconCard.vue';
import Level from '../Progress/Level.vue';
defineProps(['hero_name', 'hero_head', 'level', 'cup', 'max_cup', 'mastery', 'skin_head', 'skin_back', 'skin'])
</script>

<style scoped>
.hero_panel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.hero_panel .item {
    flex: 1 1 auto;
    margin: 10px;
}

.jc_data,
.sp_data {
    display: flex;
    flex-wrap: wrap;
    min-width: 150px;
}

.jc_data .sub_item {
    flex: 1 1 auto;
    margin: 10px;
    min-width: 130px;
    padding: 0.5em 0.5em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.sp_data .sub_item {
    flex: 1 1 auto;
    margin: 10px;
}

.basedata .item {
    flex: 1;
}

.cup_p {
    height: 4em;
}
</style>