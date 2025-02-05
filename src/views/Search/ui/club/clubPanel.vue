<template>
    <div class="container">
        <div class="flex_row flex_warp c2">
            <div class="flex_col flex_warp auto_flex item_1">
                <descCard class="list_for_info flex_row flex_warp">
                    <descCard title="战队信息" class="club_info auto_flex">
                        <img class="club_head" :src="badge ? GetClubIco(badge[1]) : '/b_assets/club.png'">
                        <div class="club_nick_tag">
                            <Text class="club_nick">{{ name }}</Text>
                            <Text class="club_tag">#{{ tag }}</Text>
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
            </div>

            <descCard title="成员列表" class="flex_col flex_warp flex_ali_center item_2">
                <div class="c_member_list">
                    <clubList :members="_members" v-if="_members.length > 0" />
                    <Text class="empty_member" v-if="_members.length <= 0">成员列表为空</Text>
                </div>
            </descCard>
        </div>
    </div>
</template>

<script setup>
import descCard from '../../../../components/Card/descCard.vue';
import Text from '@/components/Text/Text.vue';
import IconCard from '../../../../components/Card/iconCard.vue';
import { GetClubIco, GetThumbOffested } from '@/data/convert/convertResouces';
import clubList from './clubList.vue';
import cv2color from '@/data/convert/convertnamecolor';
var { data, tag } = defineProps(['data', 'tag']);
var { name, description, memberCount, badge, requiredTrophies, totalTrophies, onlineCount, familyFriendly, type, megaPig, megaPigData, members } = data;
var _members = (members || []).map(e => ({
    head: GetThumbOffested(e.head, true),
    brawlpass: e.brawlpass,
    name: e.name,
    role: ({ 1: '队员', 2: '队长', 3: '资深队员', 4: '副队长' })[e.role || 0] || '未知',
    cup: e.trophies,
    tag: e.tag,
    count: e.megaPigData['wins'] || 0,
    ticket: e.megaPigData['tickets'] || 0,
    color: cv2color(e.color)
}));
var build_config = [
    { type: 's', title: '描述', content: description || '无' },
    {
        type: 'm', obj: [
            { type: 'm', ico: 'trophy.png', title: '总奖杯', content: totalTrophies },
            { type: 'm', ico: 'trophy.png', title: '奖杯门槛', content: requiredTrophies },
            { type: 'm', ico: 'icon_rank_team_mode.png', title: '人数', content: memberCount },
            { type: 'm', ico: 'time.png', title: '在线人数', content: onlineCount },
            { type: 'm', ico: 'icon_settings.png', title: '战队类型', content: ({ 1: "自由加入", 2: "需要批准", 3: "不可加入" })[type] || '未知' },
            { type: 'm', ico: 'icon_friends.png', title: '全年龄', content: familyFriendly ? '开' : '关' },
            { type: 'm', ico: 'Megapig.png', title: '超级猪猪胜场', content: megaPigData['wins'] || 0 },
            { type: 'm', ico: 'Megapig.png', title: '超级猪猪参与人数', content: megaPig },
        ]
    }
];

</script>
<style scoped>
.empty_member {
    font-size: 1.6em;
    display: flex;
    justify-content: center;
}

.container {
    padding: 0.5em;
    font-size: 1.3em;
}

.container .c2 {
    align-items: stretch;

}


.c_member_list {
    font-size: 1rem;
    width: 100%;
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
.club_info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px;
}

.club_nick_tag {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.club_head {
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
    /* background: darkolivegreen; */
    margin: 5px;
}

.club_nick {
    font-size: 1.5em;
}

.club_tag {
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