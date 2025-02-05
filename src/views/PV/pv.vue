<template>
    <div class="data">
        <Text id="_site_pv"> 本站总访问量{{ data.page_pv || 0 }}次</Text>
        <Text id="_site_uv"> 本站总用户量{{ data.site_uv || 0 }}位</Text>
        <Text id="_page_pv"> 本板块访问量{{ data.page_uv || 0 }}位</Text>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
import { inject, onMounted, ref } from 'vue';
const get_pv = inject('get_pv');
const data = ref({});
onMounted(() => {
    get_pv().then(e => data.value = e);
});
</script>

<style scoped>
.data{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
}
</style>