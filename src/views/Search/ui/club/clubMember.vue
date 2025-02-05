<template>
    <div class="member_bg">
        <span class="header item margin">
            <span class="index">
                <Text>{{ index }}</Text>
            </span>
            <span class="info margin">
                <img class="head item" :src="head">
                <span class="player item">

                    <Text class="name" :color="color">{{ name }}</Text>

                    <span class="role">
                        <Text>{{ role }}</Text>
                        <img class="brawlpass ico" v-if="brawlpass" src="/b_assets/ticket.png">
                    </span>
                    <span class="tag item">
                        <Text color="#00A0FF">#{{ tag }}</Text>
                    </span>
                </span>
            </span>

        </span>
        <span class="footer item margin">
            <span class="icoText item">
                <img class="ico" src="/b_assets/Megapig.png">
                <Text>{{ ticket }}</Text>
            </span>
            <span class="icoText item">
                <img class="ico" src="/b_assets/megapig_wins.png">
                <Text>{{ count }}</Text>
            </span>
            <span class="icoText item">
                <img class="ico" src="/b_assets/trophy_cur.png">
                <Text>{{ cup }}</Text>
            </span>
        </span>

    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
var { color } = defineProps(['index', 'name', 'tag', 'role', 'cup', 'brawlpass', 'count', 'ticket', 'head', 'color']);
</script>


<style scoped>
.member_bg {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #756673d8;
    border: solid 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
}

.member_bg * {
    line-height: 1;
    word-break: normal;
}

.member_bg:active {
    transform: scale(0.98);
}

.member_bg .index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* padding: 0.3em 0.5em; */
    background: #675964;
    border: solid 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    font-size: 2em;
    width: 50px;
    height: 50px;
}

.head {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.info {
    display: inline-flex;
    min-width: 100px;
    align-items: center;
    flex: 1;
}

.header {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

.player {
    flex-direction: column;
    flex: 1;
}

.footer {
    min-width: 150px;
    flex-wrap: wrap;
    border-radius: 16px;

}

.header,
.footer {
    flex: 1 1 0;
    margin: 0.5em;
    min-width: 180px;
}



.item {
    display: inline-flex;
    justify-content: center;
}

.margin {
    margin-left: 0.5em;
}

.header .name {
    font-size: 1.6em;
}

.header .role {
    display: inline-flex;
    align-items: center;
    font-size: 1.3em;
    flex-wrap: wrap;
}

.player {
    min-width: 100px;
    padding: 0.5em;
}


.icoText {
    font-size: 1.6em;
    flex: 1;
    background: #5b484870;
    padding: 5px;
    margin: 5px;
    border-radius: 16px;
    border: solid 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);
    align-items: center;
}

.tag {
    font-size: 1.3em;
    flex: 1;
    justify-content: normal;
    align-items: center;
}

.ico {
    width: 30px;
    object-fit: contain;
    margin: 0;
}

.brawlpass {
    margin-left: 5px;
}

.role {
    margin: 5px 0px;
}
</style>