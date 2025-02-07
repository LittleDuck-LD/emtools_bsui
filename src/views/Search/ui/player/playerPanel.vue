<template>
    <div class="container">
        <div class="flex_row flex_warp c2">
            <div class="flex_col flex_warp auto_flex item_1">
                <descCard class="list_for_info flex_row flex_warp">
                    <descCard title="玩家信息" class="player_info auto_flex">
                        <img class="player_head" :src="head">
                        <div class="player_nick_tag">
                            <Text class="player_nick" :color="cv2color(data['color'])">{{ nick }}</Text>
                            <Text class="player_tag">#{{ tag }}</Text>
                        </div>
                    </descCard>

                </descCard>

                <div v-for="item in build_config">
                    <descCard class="auto_flex list_for_info" :title="item.title" v-if="item.type == 's'">
                        <Text>{{ item.content }}</Text>
                    </descCard>
                    <descCard v-else-if="item.type == 'm'" class="auto_flex flex_row flex_warp list_for_info"
                        :title="item.title">
                        <template v-for="sub_item in item.obj.map(e => ({ ...e, type: e.type || 'm' }))">
                            <IconCard v-if="sub_item.type == 'm'"
                                :class="{ list: true, [sub_item.long ? 'auto_flex' : 'auto_flex_ex']: true }"
                                :title="sub_item.title" :ico="'/b_assets/' + sub_item.ico" :text="sub_item.content"
                                :link="sub_item.link || false" :href="sub_item.href || false"></IconCard>
                            <descCard :class="{ list: true, [sub_item.long ? 'auto_flex' : 'auto_flex_ex']: true }"
                                :title="sub_item.title" v-if="sub_item.type == 's'">
                                <Text>{{ sub_item.content }}</Text>
                            </descCard>
                        </template>
                    </descCard>
                    <IconCard v-else-if="item.type == 'sm'" class="auto_flex list_for_info"
                        :ico="'/b_assets/' + item.ico" :title="item.title" :text="item.content"
                        :link="item.link || false" :href="item.href || false">
                    </IconCard>
                </div>
                <descCard class="list_for_info flex_row flex_warp">
                    <descCard title="乱斗名片" class="brawl_card auto_flex">
                        <div class="brawlcard_info auto_flex">
                            <img class="player_head auto_flex" :src="brawl_card_head_1">
                            <img class="player_head auto_flex" :src="brawl_card_head_2">
                        </div>
                        <div class="brawlcard_desc auto_flex">
                            <Text class="colorful_text" v-if="brawl_card_title">{{ brawl_card_title }}</Text>
                            <Text v-else>无头衔</Text>
                        </div>
                    </descCard>
                    <descCard title="最爱英雄" class="favorite_hero auto_flex">
                        <HeroCard class="item" :head="f_hero" :name="f_hero_desc" :color="GetRarity(f_hero_rarity)">
                        </HeroCard>
                    </descCard>
                </descCard>

            </div>

            <descCard title="英雄列表" class="flex_col flex_warp flex_ali_center item_2">
                <div class="hero_count">
                    <Text color="#53C5F7">{{ data.data.heroesCount }}</Text>
                    <Text color="#53C5F7">/</Text>
                    <Text color="#53C5F7">{{ heroCount }}</Text>
                </div>
                <div class="hero_level_count">
                    <Text>满级英雄数量：</Text>
                    <Text color="#53C5F7">{{ hero_data.filter(e => e.level >= 11).length }}</Text>
                    <Text color="#53C5F7">/</Text>
                    <Text color="#53C5F7">{{ data.data.heroesCount }}</Text>
                </div>
                <HeroList class="auto_flex_ex" :size="10" :heros="hero_data"></HeroList>
            </descCard>
        </div>
    </div>
</template>

<script setup>
import descCard from '../../../../components/Card/descCard.vue';
import Text from '@/components/Text/Text.vue';
import IconCard from '../../../../components/Card/iconCard.vue';
import HeroCard from '@/components/Card/HeroCard.vue';
import HeroList from './heroList.vue';
import router from '@/router';
import data_pves from "@/data/global_data/pves";
import { GetHeroImages, GetExpLevel, GetHeroSkins, GetThumbOffested, GetRarity, GetRanked, heroCount } from '@/data/convert/convertResouces';
import player_titles from '@/data/global_data/player_titles';
import cv2color from '@/data/convert/convertnamecolor';
import api from '@/data/api';
import { inject } from 'vue';
var props = defineProps(['data', 'tag']);
var data = props.data || {};
var goto = inject('goto');
console.log(data);
console.log(goto);
var hero_data = (data['data']['heros'] || []).map(e => ({
    id: e.id,
    uid: e.uid,
    level: e.level,
    rarity: GetRarity(e.rarity),
    trophies: e.trophies,
    htrophies: e.highestTrophies,
    mastery: e.masteryPoints,
    ico: `${api.api.hero_images_api}/${e.uname}_portrait.png`,
    name: e.name,
    halo: e.hasHalo ? GetHeroSkins(e.halo && e.halo[1]) : '无',
    wing: e.hasWing ? GetHeroSkins(e.wing && e.wing[1]) : '无',
    skin: GetHeroSkins(e.skin[1]) || '无'
}));

console.log(hero_data);
// console.log(character);
// console.log(hero_data);
var [
    nick,
    head,
    tag,
    f_hero,
    f_hero_desc,
    f_hero_rarity
] = [
        data['name'],
        GetThumbOffested(data['head'], true),
        props.tag || data['tag'],
        GetHeroImages(data['favouriteBrawler']['brawler']['uid']),
        data['favouriteBrawler']['brawler']['name'],
        data['favouriteBrawler']['brawler']['rarity']
    ];
console.log(GetRarity(f_hero_rarity));
var [brawl_card_head_1, brawl_card_head_2, brawl_card_title] = [GetThumbOffested(data['battleCard']['headOne'][1] || 0), GetThumbOffested(data['battleCard']['headTwo'][1] || 0), data['battleCard']['title'][0] == 76 ? player_titles[data['battleCard']['title'][1]] : false];
var build_config = [

    {
        type: 'm', obj: [
            { ico: 'ID.png', title: '账号注册于', content: data['registerInfo']['year'] },
            { ico: 'trophy.png', title: '奖杯数', content: data['data']['trophiesInfo']['totalTrophies'] ?? 0 },

            { ico: 'XP.png', title: '总专精点数', content: data['data']['trophiesInfo']['totalMastery'] },
            { ico: 'trophy.png', title: '最高奖杯数', content: data['data']['trophiesInfo']['highTrophies'] ?? 0 },
            { ico: 'trophy.png', title: '英雄平均奖杯数', content: data['data']['trophiesInfo']['rateTrophies'] ?? 0 },
            { ico: 'max_cup.png', title: '最高连胜数', content: data['winStreak']['count'] ?? 0 },
            { ico: 'brawlpass.png', title: '金券', content: data['brawlpass'] ? '购买' : '未购买' },
            { ico: `${data['loginPlatform'] == 1 ? 'wx' : 'qq'}.png`, title: '登录平台', content: data['loginPlatform'] == 1 ? '微信区' : 'QQ区' },

        ]
    },
    {
        type: 'm', title: '胜场', obj: [
            { ico: 'icon_3v3.png', title: '3v3', content: data['data']['profile']['group'] || 0 },
            { ico: 'icon_solo_showdown.png', title: '单鸡', content: data['data']['profile']['single'] || 0 },
            { ico: 'icon_duo_showdown.png', title: '双鸡', content: data['data']['profile']['double'] || 0 },
        ]
    },
    {
        type: 'sm', ico: 'club.png', title: '战队', long: true, content: data['club']['joined'] ? data['club']['name'] : '无', link: data['club']['joined'], href: () => goto(`/club/${data['club']['tag']}`)
    },
    { type: 'sm', ico: 'button_info.png', title: '参考信息', content: ((e) => `您是${e.type == 0 ? '国际' : '国'}服 ${e.index} 大区第${e.number}位注册的玩家\n(约合全服第${e.total}位玩家)`)(data['registerInfo']['calc']) },
    {
        type: 'm', title: '隐私设置透视', obj: [
            { ico: 'leaderboards.png', title: '参与排行榜', content: data['privacySettings']['rank'] ? '开' : '关' },
            { ico: 'button_alert.png', title: '个人资料展示', content: data['privacySettings']['profile'] ? '开' : '关' },
            { ico: 'club.png', title: '查看战队信息', content: data['privacySettings']['privacySettings'] ? '开' : '关' },
            { ico: 'icon_settings.png', title: '街区邀请', content: data['privacySettings']['invite'] ? '开' : '关' }
        ]
    },
    {
        type: 'm', title: '段位', obj: [
            { ico: 'icon_ranked_front.png', title: '当前段位', content: data['data']['rank']['current'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '最高段位', content: data['data']['rank']['high'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '战队联赛段位', content: GetRanked(data['data']['rank']['club']) ?? '无' },
            { ico: 'icon_ranked_front.png', title: '个人最高段位', content: GetRanked(data['data']['rank']['single']) ?? '无' },
            { ico: 'icon_ranked_front.png', title: '排位赛当前分', content: GetRanked(data['data']['rank']['rankCurrent']) ?? '无' },
            { ico: 'icon_ranked_front.png', title: '排位赛最高分', content: GetRanked(data['data']['rank']['rankHigh']) ?? '无' }
        ]
    },
    {
        type: 'm', title: '其他信息', obj: [
            { ico: 'icon_settings.png', title: '经验等级', content: ((op) => op[0] + "级-" + op[1] + "/" + op[2])(GetExpLevel(data['data']['other']['exp'])) || '无' },
            { ico: 'robo_rumble_icon.png', title: '机甲入侵记录', content: data_pves[data['data']['other']['raidBoss'] - 1] || '无' },
            { ico: 'robo_icon.png', title: '首领之战记录', content: data_pves[data['data']['other']['roboRumble'] - 1] || '无' },
        ]
    },

];

</script>
<style scoped>
.container {
    padding: 0.5em;
    font-size: 1.35em;
}

.container .c2 {
    align-items: stretch;
}

.container .item_1 {
    flex: 0 0 45%;
    max-width: 600px;
}

@media screen and (max-width:1000px) {
    .container .item_1 {
        flex: 1 1 auto;
        max-width: 100%;
    }
}


.container .item_2 {
    flex: 1;
    /* justify-content: start; */
}

/* 
@media screen and (max-width:1300px) {
    .container .item_2 {
        flex: 1 1 100%;
    }
} */

.container .item_2 .content {
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
<style scoped>
.favorite_hero {
    margin: 10px;
}

.hero_count {
    font-size: 1.4em;
}

.hero_level_count {
    font-size: 1.2em;
}

/* ************************************************************** */
.brawl_card {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px;
}

.brawlcard_info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
}

.brawlcard_desc {
    margin: 5px;
    font-size: 1.5em;
}

/* ************************************************************ */
.player_info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px;
}

.player_nick_tag {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.player_head {
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
    /* background: darkolivegreen; */
    margin: 5px;
}

.player_nick {
    font-size: 1.5em;
}

.player_tag {
    font-size: 1.2em;
}
</style>
<style scoped>
.list {
    min-width: 110px;
}

.list_for_info {
    margin: 0.5em;
}
</style>
<style scoped>
.flex_row {
    display: flex;
    flex-direction: row;
}

.flex_col {
    display: flex;
    flex-direction: column;
}

.flex_center {
    justify-content: center;
}

.flex_ali_center {
    align-items: center;
}

.flex_warp {
    flex-wrap: wrap;
}

.auto_flex {
    flex: 1 1 auto;
}

.auto_flex_ex {
    flex: 1;
}
</style>