<template>
    <div class="bg">
        <Text class="desc_title" v-if="title">{{ title }}</Text>
        <slot></slot>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
defineProps(['title']);
</script>

<style scoped>
.bg {
    /* width: 300px;
    height: 100px; */
    position: relative;
    background: rgb(0 0 0 / 27%);
    border-radius: 7px;
    display: flex;
    font-size: inherit;
    justify-content: center;
    padding: 0.8em;
    box-sizing: content-box;
    margin-top: 10px;
}

.desc_title {
    position: absolute;
    top: 0;
    margin: -10px;
}
</style>
