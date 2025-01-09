<script setup>
var mastery_data = [
  [0, [0, 300]],
  [1, [300, 2599]],
  [2, [2600, 10299]],
  [3, [10300, 24800]],
];
function get_mastery_number(n) {
  if ((n >= 1500 && n < 2600) || (n >= 5800 && n < 10300) || n >= 24800)
    return 3;

  if (
    (n >= 800 && n < 1500) ||
    (n >= 4000 && n < 5800) ||
    (n >= 16800 && n < 24800)
  )
    return 2;
  if (
    (n >= 300 && n < 800) ||
    (n >= 2600 && n < 4000) ||
    (n >= 10300 && n < 16800)
  )
    return 1;

  return 0;
}
function complate_image_url(n) {
  return `/ass/mastery/${n}.png`;
}
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
function get_brand(number, raw = false) {
  //   console.log("number", number);
  if (number == null) number = 0;

  let res = mastery_data.find((e) =>
    range(e[1][0], e[1][1] - 1, 1).includes(number)
  );
  if (!res) res = mastery_data[0][0];
  else res = res[0];
  //   console.log("call get_brand");
  if (number >= 24800) res = 3;
  return raw ? mastery_data[res == 0 ? 0 : res] : complate_image_url(res);
}
import Text from "../Text/Text.vue";
import { reactive, watch } from "vue";
let _ = defineProps(["number"]);
let __ = reactive({ width: "0%", _int: 0 });
let src = reactive({ src: get_brand(0), num: 0 });
function init() {
  src.src = get_brand(_.number);
  let _tmp_brand = get_brand(_.number, true);
  let max = 1000;
  let num = _.number;
  if (_tmp_brand) {
    let _min = _tmp_brand[1][0],
      _max = _tmp_brand[1][1];
    max = _max - _min;
    num = _.number == _min ? _min : _.number - _min;
  }
  __.width = (__._int = num < max ? (num / max) * 100 : 100) + "%";
  src.num = get_mastery_number(_.number);
}
watch(
  () => _.number,
  () => init()
);
init();
</script>
<style scoped>
@import url('../../assets/css/cup_progress.css');
</style>
<template>
  <span class="cup_container">
    <span class="badge">
      <img class="level" :src="src.src" />
      <span class="level_text">
        <Text>{{ src.num }}</Text>
      </span>
    </span>
    <span class="panel">
      <span class="cup_progress_bar">
        <span class="inline" :style="__"></span>
      </span>
      <span class="icon">
        <span class="cup ico_mastery"></span>
        <Text class="cup_number">{{ number }}</Text>
      </span>
    </span>
  </span>
</template>
