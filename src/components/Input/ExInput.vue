<template>
  <div class="input_bg">
    <div class="ex_bg">
      <div class="_holder">
        <div class="_content">
          <Text>{{ title }}</Text>
        </div>
      </div>
      <div class="content_bg">
        <input :placeholder="placeholder" v-bind="$attrs" ref="sb" class="input" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef } from "vue";
import Text from "../Text/Text.vue";
var input = useTemplateRef('sb');
defineExpose({ input });
defineProps(["title", "placeholder", "holder"]);
</script>
<style scoped>
@import url("./input.css");
</style>
<!-- <style>
.input_bg {
  border: 2px solid black;
  border-radius: 8px;
  background: #fff;
  width: auto;
  color: black;
  outline: none;
  /* padding: 0.5em; */
  height: auto;
  font-size: 2rem;
  transform: skewX(-7deg);
  box-shadow: inset 0px 0.31em #ffffff30, inset 0px 0.31em #00000030,
    0px 2px #000;
  /* filter: drop-shadow(0 0.1em 0 #333); */
}

.input_bg .content_bg {
  transform: skewX(7deg);
  margin-left: 10px;
  flex: 1;
}

.ex_bg {
  display: flex;
}

.holder {
  border-right: 2px solid black;
  padding: 0.5em;
}

.holder .content {
  transform: skewX(7deg);
}

.input_bg input {
  width: 100%;
  border: none;
  outline: none;
  font-size: inherit;
  display: inline-block;
  background: transparent;
  color: inherit;
}

.input_bg:active {
  transform: scale(0.98) skewX(-7deg);
}
</style> -->
