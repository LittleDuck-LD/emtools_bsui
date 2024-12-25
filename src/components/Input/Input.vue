<template>
  <div class="input_bg ex">
    <div
      :class="{
        bg: true,
        top: holder?.top,
        left: holder?.left,
      }"
    >
      <span v-if="title" class="title">
        <Text>{{ title }}</Text>
      </span>
      <input :placeholder="placeholder" v-bind="$attrs" class="input" />
    </div>
  </div>
</template>
<script setup>
import Text from "../Text/Text.vue";
defineProps(["title", "placeholder", "holder"]);
</script>
<style scoped>
@import url("./input.css");
</style>
