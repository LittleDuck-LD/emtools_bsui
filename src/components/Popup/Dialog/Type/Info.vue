<template>
    <BaseDialog :title="title" :closeButton="false">
        <template #content>
            <Text>{{ text }}</Text>
        </template>
        <template #actions>
            <Button v-focus class="primary" @click="close">确定</Button>
        </template>
    </BaseDialog>
</template>

<script setup>
import BaseDialog from '../BaseDialog.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
import { nextTick, onMounted, useTemplateRef } from 'vue';
defineProps(['title', 'text', 'close']);
</script>
