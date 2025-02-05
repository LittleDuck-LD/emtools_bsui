<template>
    <Panel mode="club" :data_api="api" :tag="tag"></Panel>
</template>

<script setup>
import _api from '@/data/api';
import { useRoute, useRouter } from 'vue-router';
import Panel from './panel.vue';
import { provide } from 'vue';
var route = useRoute();
var router = useRouter();
var tag = route.params.tag.toUpperCase();
var api = _api.api.club_api + tag;
provide('go_back', () => router.push('/search/club'));
</script>
