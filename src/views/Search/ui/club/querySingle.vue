<template>
    <div class="popup">
        <div class="info">
            <span class="item">
                <Text>玩家呢称：</Text>
                <Text>{{ name }}</Text>
            </span>
            <Text class="item">玩家标签：#{{ tag }}</Text>
        </div>
        <div class="action">
            <Button @click="query_player">查询玩家</Button>
            <Button @click="copy_tag">复制玩家标签</Button>
        </div>
    </div>
</template>

<script setup>
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
defineProps(['query_player', 'copy_tag', 'name', 'tag']);
</script>

<style scoped>
.popup {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.info {
    display: flex;
    flex-direction: column;
    margin: 5px;
}

.info .item {
    margin: 2px;
}

.action {
    margin: 5px;
}

button {
    margin: 5px;
}
</style>