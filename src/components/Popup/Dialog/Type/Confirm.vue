<template>
    <BaseDialog :title="title" :closeButton="false">
        <template #content>
            <Text>{{ text }}</Text>
        </template>
        <template #actions>
            <Button class="danger" @click="callback(false)">{{ cannel_text ?? '取消' }}</Button>
            <Button class="primary" @click="callback(true)">{{
                ok_text ?? '确定' }}</Button>
        </template>
    </BaseDialog>
</template>

<script setup>
import BaseDialog from '../BaseDialog.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
defineProps(['title', 'text', 'callback', 'cannel_text', 'ok_text']);
</script>