<template>
    <descCard class="hero_panel">
        <div class="hero">
            <HeroCard class="item" :color="rarity" :head="ico" :name="name">
            </HeroCard>
            <div class="header">
                <CupProgress class="cup" :limit_show="true" :number="trophies" />
            </div>
            <div class="hero_level">
                <Level :level="level" />
            </div>
        </div>
        <descCard class="jc_data item" title="基础数据">
            <IconCard class="sub_item" title="最高奖杯数" :text="htrophies" ico="/b_assets/trophy.png" />
            <IconCard class="sub_item" title="专精" :text="mastery" ico="/ass/icon_mastery_point.png" />
        </descCard>
        <descCard class="sp_data item" title="饰品数据">
            <IconCard :text="skin || '无'" class="sub_item pf" title="皮肤" ico="/ass/head/skin.png" />
            <IconCard :text="halo || '无'" class="sub_item" title="头饰" ico="/ass/head/head.png" />
            <IconCard :text="wing || '无'" class="sub_item" title="背饰" ico="/ass/head/back.png" />
        </descCard>
    </descCard>
</template>

<script setup>
import descCard from '@/components/Card/descCard.vue';
import HeroCard from './HeroCard.vue';
import CupProgress from '../Progress/CupProgress.vue';
import IconCard from '@/components/Card/iconCard.vue';
import Level from '../Progress/Level.vue';
defineProps(['name', 'ico', 'level', 'trophies', 'htrophies', 'mastery', 'halo', 'wing', 'skin', 'rarity'])
</script>

<style scoped>
.hero_panel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.hero {
    position: relative;
    display: flex;
    margin-top: 1em;
    min-width: 150px;
    min-height: 150px;
}

.hero .header {
    margin-top: -27px;
    position: absolute;
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.hero .header .cup {
    height: 55px;
    width: 100%;
}

.hero .hero_level {
    display: block;
    position: absolute;
    bottom: 0;
    margin: 1em;
}

.hero_panel .item {
    flex: 1;
    margin: 10px;
}

.jc_data,
.sp_data {
    display: flex;
    flex-wrap: wrap;
    min-width: 150px;
}

.sp_data .pf {
    min-width: 100px;
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