<template>
    <div class="list">
        <Text class="title">{{ title }}</Text>
        <div class="words_list">
            <span class="cue_word" v-for="item in words" @click="callback && callback(item)">
                <Text>{{ showkey ? item[showkey] : item }}</Text>
            </span>
        </div>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
defineProps(['words', 'title', 'callback', 'showkey']);
</script>

<style scoped>
.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1em;
    align-items: center;
}

.list .title {
    font-size: 1.5em;
    margin: 5px;
}

.words_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.cue_word {
    font-size: 1.3em;
    background: rgb(0 0 0 / 16%);
    border: solid 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);
    padding: 8px 10px;
    border-radius: 16px;
    margin: 5px;
    user-select: none;
    display: inline-flex;
    align-items: center;
}

.cue_word:active {
    transform: scale(0.95);
}
</style>