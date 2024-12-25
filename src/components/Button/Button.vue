<template>
  <button class="base">
    <Text><slot></slot></Text>
  </button>
</template>

<script setup>
import Text from "../Text/Text.vue";
</script>

<style scoped>
.base {
  border: 2px solid black;
  border-radius: 8px;
  background: #353c52;
  width: auto;
  color: white;
  outline: none;
  padding: 0.5em;
  height: auto;
  font-size: 1.5rem;
  transform: skewX(-7deg);
  box-shadow: inset 0px 0.31em #ffffff30, inset 0px -0.31em #00000030,
    0px 3px #00000030;
  /* 黑色投影美化按钮质感 */
  /* filter: drop-shadow(0 0.1em 0 #000); */
}

.base:active {
  transform: scale(0.98) skewX(-7deg);
}

.base .text {
  transform: skew(7deg);
  font-style: normal;
  display: inline-flex;
  margin: 3px
}

.danger {
  background-color: #df362e;
}

.success {
  background-color: #009D00;
}

.primary {
  background-color: #2373ff;
}
</style>
