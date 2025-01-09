<template>
    <div class="container">
        <div class="flex_row flex_warp c2">
            <div class="flex_col flex_warp auto_flex item_1">
                <descCard class="list_for_info flex_row flex_warp">
                    <descCard title="玩家信息" class="player_info auto_flex">
                        <img class="player_head" :src="head">
                        <div class="player_nick_tag">
                            <Text class="player_nick">{{ nick }}</Text>
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
                            <IconCard v-if="sub_item.type == 'm'" class="list auto_flex" :title="sub_item.title"
                                :ico="'/b_assets/' + sub_item.ico" :text="sub_item.content"
                                :link="sub_item.link || false" :href="sub_item.href || false"></IconCard>
                            <descCard class="list auto_flex" :title="sub_item.title" v-if="sub_item.type == 's'">
                                <Text>{{ sub_item.content }}</Text>
                            </descCard>
                        </template>
                    </descCard>
                    <IconCard v-else-if="item.type == 'sm'" class="auto_flex list_for_info"
                        :ico="'/b_assets/' + item.ico" :title="item.title" :text="item.content">
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
                        <HeroCard class="item" color="5" :head="f_hero" :name="f_hero_desc">
                        </HeroCard>
                    </descCard>
                </descCard>

            </div>

            <descCard title="英雄列表" class="flex_row flex_warp flex_center item_2">
                <HeroList :size="10" :heros="hero_data"></HeroList>
            </descCard>
        </div>
    </div>
</template>

<script setup>
import descCard from './descCard.vue';
import Text from '@/components/Text/Text.vue';
import IconCard from './iconCard.vue';
import HeroCard from '@/components/Card/HeroCard.vue';
import HeroList from './heroList.vue';
import router from '@/router';
import character from '@/data/global_data/character';
import { GetHeroImages, GetHeroName, GetHeroSkins, GetThumbOffested } from '@/data/convert/convertResouces';
var props = defineProps(['data', 'tag']);
var data = props.data || {};
console.log(data['heros']);
var hero_data = data['heros'].map((e) => ({
    hero_head: GetHeroImages(e.hero_id),
    hero_name: GetHeroName(e.hero_id),
    level: e.level,
    cup: e.cup,
    max_cup: e.max_cup,
    mastery: e.mastery,
    skin: GetHeroSkins(e.skin.skin_name) ?? '原皮',
    skin_head: GetHeroSkins(e.head) || '无',
    skin_back: GetHeroSkins(e.back) || '无',
    chara: e.chara
}));

// console.log(character);
// console.log(hero_data);
var [nick,
    head,
    tag,
    f_hero,
    f_hero_desc] = [
        data['name'],
        GetThumbOffested(data['head_id']),
        props.tag || data['tag'],
        GetHeroImages(data['favouriteBrawler']['hero']),
        GetHeroName(data['favouriteBrawler']['hero'])
    ];
var [brawl_card_head_1, brawl_card_head_2, brawl_card_title] = [GetThumbOffested(data['brawlCard']['headOne']), GetThumbOffested(data['brawlCard']['headTwo']), data['brawlCard']['title']];
var build_config = [
    { type: 'sm', ico: 'button_info.png', title: '参考信息', content: ((e) => `您是${e.type == 0 ? '国际' : '国'}服 ${e.index} 大区第${e.number}位注册的玩家\n(约合全服第${e.total}位玩家)`)(data['calc_reg_data']) },
    {
        type: 'm', obj: [
            { ico: 'trophy.png', title: '参考注册日期', content: data['reg_data'] },
            { ico: 'club.png', title: '战队', content: data['club']['joined'] ? data['club']['name'] : '无', link: data['club']['joined'], href: () => router.push('/club/3cl') },
            { ico: 'XP.png', title: '总专精点数', content: data['totalMastery'] },
            { ico: 'ID.png', title: '账号注册于', content: data['reg_year'] }
        ]
    },
    {
        type: 'm', title: '隐私设置透视', obj: [
            { ico: 'leaderboards.png', title: '参与排行榜', content: data['privacy']['rank'] ? '开' : '关' },
            { ico: 'button_alert.png', title: '个人资料展示', content: data['privacy']['profile'] ? '开' : '关' },
            { ico: 'club.png', title: '查看战队信息', content: data['privacy']['club'] ? '开' : '关' },
            { ico: 'icon_settings.png', title: '街区邀请', content: data['privacy']['invite'] ? '开' : '关' }
        ]
    },
    {
        type: 'm', title: '奖杯', obj: [
            { ico: 'trophy.png', title: '奖杯数', content: data['wins']['cup'] ?? 0 },
            { ico: 'trophy.png', title: '最高奖杯数', content: data['wins']['maxCup'] ?? 0 },
            { ico: 'trophy.png', title: '英雄平均奖杯数', content: data['rateCup'] ?? 0 },
            { ico: 'max_cup.png', title: '最高连胜数', content: data['wins']['maxWins'] ?? 0 }
        ]
    },
    {
        type: 'm', title: '其他信息', obj: [
            { ico: 'brawlpass.png', title: '金券', content: data['brawlpass'] ? '购买' : '未购买' },
            { ico: 'icon_settings.png', title: '经验等级', content: data['exp_info'] || '无' },
            { ico: 'robo_rumble_icon.png', title: '机甲入侵记录', content: data['wins']['RoboBoss'] || '无' },
            { ico: 'robo_icon.png', title: '首领之战记录', content: data['wins']['BrawlBoss'] || '无' },
        ]
    },
    {
        type: 'm', title: '段位', obj: [
            { ico: 'icon_ranked_front.png', title: '当前段位', content: data['wins']['rankNow'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '最高段位', content: data['wins']['rankMax'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '战队联赛段位', content: data['wins']['rankClub'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '个人最高段位', content: data['wins']['rankClubS'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '排位赛当前分', content: data['wins']['rankClubM'] ?? '无' },
            { ico: 'icon_ranked_front.png', title: '排位赛最高分', content: data['wins']['rankClubSM'] ?? '无' }
        ]
    }
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
    min-width: 100px;
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
</style>