<template>
    <div class="error">
        <Text class="title">{{ content }}</Text>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
defineProps(['content']);
</script>

<style scoped>
.error {
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 2em;
}
</style>