<script setup>
import { reactive, watch } from "vue";

let _ = defineProps(["value", "maxvalue"]);
let __ = reactive({ width: "0%", _int: 0, maxWidth: _.maxvalue });
console.log(_.value, _.maxvalue);
watch(
  () => _.value,
  () => {
    let max = _.maxvalue;
    let val = _.value;
    __.width = Math.floor((val / max) * 100) + '%';
    console.log('update', _.value, _.maxvalue, __.width);
  }
);
</script>
<template>
  <div class="progress_bar">
    <span class="inline" :style="__"></span>
  </div>
</template>

<style>
.progress_bar {
  border: 2px solid black;
  border-radius: 5px;
  width: inherit;
  height: inherit;
  background: linear-gradient(to bottom, #420327 50%, #5a0534 50%);
  transform: skewX(-10deg);
  position: relative;
  user-select: none;
  display: inline-flex;
}

.progress_bar .inline {
  background: linear-gradient(to bottom, #e37320 50%, #cf5b40 50%);
  border-radius: 5px;
  display: inline-block;
  width: auto;
  height: 100%;
  pointer-events: none;
}
</style>
