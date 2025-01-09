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
    width: 50px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.level {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.level_text {
    margin: 2px;
    font-size: 1.3em;
}
</style>