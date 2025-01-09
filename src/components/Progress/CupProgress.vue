<script setup>
var cup_data = [
  [0, [0, 80]],
  [1, [80, 180]],
  [2, [180, 280]],
  [3, [280, 380]],
  [4, [380, 480]],
  [5, [480, 580]],
  [6, [580, 680]],
  [7, [680, 780]],
  [8, [780, 880]],
  [9, [880, 980]],
  [10, [980, 1000]],
];
function complate_image_url(n) {
  return `/ass/brand/${n >= 9 ? 9 : n}.png`;
}
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
function get_brand(number, raw = false) {
  //   console.log("number", number);
  if (number == null) number = 0;
  let _____ = 0;
  let res = cup_data.find((e) =>
    (_____ = range(e[1][0], e[1][1] - 1, 1)).includes(number)
  );
  if (!res) res = cup_data[0][0];
  else res = res[0];
  //   console.log("call get_brand");
  if (number >= 1000) res = 9;
  return raw ? cup_data[res == 0 ? 0 : res] : complate_image_url(res);
}
import Text from "../Text/Text.vue";
import { reactive, watch } from "vue";
let _ = defineProps(["number", "limit_show"]);
let __ = reactive({ width: "0%", _int: 0 });
let src = reactive({ src: get_brand(0), num: 0 });
let need_limit_max = false;
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
  let _num_ = Math.floor(_.number / 20);
  src.num = (need_limit_max = _num_ > 50 && _.limit_show == true)
    ? "最高"
    : _num_;
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
        <Text :class="{ limit_max: need_limit_max }">{{ src.num }}</Text>
      </span>
    </span>
    <span class="panel">
      <span class="cup_progress_bar">
        <span class="inline" :style="__"></span>
      </span>
      <span class="icon">
        <span class="cup ico_cup"></span>
        <Text class="cup_number">{{ number }}</Text>
      </span>
    </span>
  </span>
</template>
