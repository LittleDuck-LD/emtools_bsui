<template>
  <div class="card">
    <div class="hero_card legendary">
      <img :src="get_hero_image(hero.name)" />
      <div class="holder">
        <Text class="title">{{ get_hero_tr(hero.name) }}</Text>
      </div>
    </div>
    <div class="data_card">
      <div class="jc">
        <!-- jb1 & jb2 -->
        <div>
          <Text class="btitle">基础数据</Text>
        </div>
        <div class="jb">
          <span class="item_50">
            <Text class="title">奖杯数</Text>
            <CupProgress :number="hero.cup" :limit_show="true" />
          </span>
          <span class="item_50">
            <Text class="title">最高奖杯数</Text>
            <CupProgress :number="hero.max_cup" />
          </span>
          <span class="item_50">
            <Text class="title">等级</Text>
            <span class="dj_c">
              <img class="dj" src="/ass/level.png" />
              <Text class="dj_t">{{ hero.level }}</Text>
            </span>
          </span>
          <span class="item_50">
            <Text class="title">专精</Text>
            <MasteryProgress :number="hero.mastery" />
          </span>
        </div>
        <!-- jb1 & jb2 end-->
      </div>
      <div class="sp">
        <Text class="btitle">饰品数据</Text>
        <div class="sj">
          <span class="item">
            <Text class="title">皮肤</Text>
            <span class="bg_mask">
              <img src="/ass/head/skin.png" />
              <Text class="mtitle">{{ skin.skin }}</Text>
            </span>
          </span>
          <span class="item">
            <Text class="title">头饰</Text>
            <span class="bg_mask">
              <img src="/ass/head/head.png" />

              <Text class="mtitle">{{ skin.head }}</Text>
            </span>
          </span>
          <span class="item dd">
            <Text class="title">背饰</Text>
            <span class="bg_mask">
              <img src="/ass/head/back.png" />
              <Text class="mtitle">{{ skin.back }}</Text>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Text from "../Text/Text.vue";
import CupProgress from "../Progress/CupProgress.vue";
import { get_hero_image, get_hero_tr } from "../../data/herolist";
import MasteryProgress from "../Progress/MasteryProgress.vue";
defineProps(["hero", "skin"]);
/*
hero ={
cup:'奖杯数',
max_cup:'最大奖杯数',
mastery:'专精',
level:'等级'
}
skin={
head:'头饰',
back:'背饰',
skin:'皮肤'
}
*/
</script>

<style>
.card .default {
  background: #94d7f4;
}

.card .rape {
  background: #2edd1c;
}

.card .super_rape {
  background: #0087fa;
}

.card .epic {
  background: #b015ec;
}

.card .mythic {
  background: #ff011f;
}

.card .legendary {
  background: #fef01d;
}
</style>
<style>
.card {
  max-width: 320px;
  padding: 1rem;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.05);
  border: solid 5px #264653;
  box-shadow: 4px 4px 0px 1px #2a9d8f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
}

.hero_card {
  max-width: 300px;
  width: 100%;
  height: 200px;
  border: solid 5px black;
  border-radius: 25px;
  /* margin: auto auto; */
  position: relative;
  margin-bottom: 5px;
}

.hero_card .holder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
}

.hero_card .title {
  font-size: 1.5rem;
  margin: 1rem;
}

.hero_card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  border-radius: inherit;
}

.data_card {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
}

.data_card .jc,
.data_card .sp {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.data_card .jc .jb {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.data_card .sp .sj {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.data_card .jc .jb .dj {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin: 5px;
}

.data_card .jc .jb .dj_c {
  position: relative;
}

.data_card .jc .jb .dj_t {
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 1.8rem;
  transform: translate(-50%, -50%);
}

.data_card .jc .item_50,
.data_card .sp .item {
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.data_card .sp .item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.data_card .sj .dd {
  width: 100%;
}

.data_card .sp .mtitle {
  font-size: 1.2em;
  margin: 3px;
  font-weight: 500;
}

.data_card .sp img {
  width: 30px;
  height: 30px;
  /* position: absolute; */
  object-fit: contain;
  left: -10px;
  margin: 5px;
}

.data_card .bg_mask {
  display: inline-block;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px;
  /* padding-left: 30px; */
  transform: skewX(-5deg);
  display: inline-flex;
  align-items: center;
  margin: 5px;
}

.data_card .bg_mask * {
  transform: skewX(5deg);
}

.data_card .title {
  font-size: 1.15rem;
  margin: 2px;
}
.data_card .btitle {
  font-size: 1.3rem;
  margin: 5px;
}
</style>
<style>
@media (max-width: 320px) {
  .data_card .jc .item_50,
  .data_card .sp .item {
    width: 100%;
  }
}

@media (max-width: 205px) {
  .cup_container .badge {
    display: none !important;
  }

  .cup_container .cup_progress_bar,
  .cup_container .panel {
    left: 0;
  }
}
</style>
