<template>
    <div class="bg_level">
        <img class="level" src="/ass/level.png">
        <Text class="level_text">{{ level }}</Text>
    </div>
</template>

<script setup>
import Text from '../Text/Text.vue';
defineProps(['level']);

</script>

<style scoped>
.bg_level {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.level {
    position: absolute;
    width: 50px;
    height: 50px;
}

.level_text {
    margin: 2px;
    font-size: 1.3em;
}
</style>