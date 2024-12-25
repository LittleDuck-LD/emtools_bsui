<template>
    <div class="author_card">
        <img class="author_head" :src="head">
        <div class="holder">
            <div class="nw_div">
                <Text class="pro_color_text">{{ name }}</Text>
                <Text color="#FE1BB8">{{ work }}</Text>
            </div>
        </div>
    </div>
</template>

<script setup>
import Text from '@/components/Text/Text.vue';
defineProps(['head', 'name', 'work']);
</script>

<style scoped>
.author_card {
    display: inline-flex;
    flex-direction: column;
    border: solid 5px black;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.726);
    margin: 5px;
}



.author_head {
    height: 100%;
    object-fit: cover;
}

.holder {
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}

.nw_div {
    background: rgba(0, 0, 0, 0.5);
    font-size: 1.5em;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
}
</style>