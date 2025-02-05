<template>
    <BaseDialog :title="title" :closeButton="false">
        <template #content>
            <Text>{{ text }}</Text>
        </template>
        <template #actions>
            <Button v-focus class="primary" @click="close">{{ close_text ?? '确定' }}</Button>
        </template>
    </BaseDialog>
</template>

<script setup>
import BaseDialog from '../BaseDialog.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
defineProps(['title', 'text', 'close', 'close_text']);
</script>
