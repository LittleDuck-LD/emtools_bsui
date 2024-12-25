<script setup>
import { ref, onMounted, useTemplateRef, onUpdated } from "vue";
// 定义一个ref来存储slot的内容
const randomString = (e) => {
  e = e || 32;
  let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "",
    i = 0;
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
};
const _p = defineProps(["text", 'color']);
let slotContent = ref("");
let _tmp_class = ref("text");
let rand_class;
if (_p.color) _tmp_class.value += ' c_' + (rand_class = randomString(7));
let ref_sb2 = useTemplateRef("ref_sb");
const check_emoji = (j) => {
  const try_match = (p) => {
    let emoji_exp =
      /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g;
    return p.match(emoji_exp) != null;
  };
  if (try_match(j)) _tmp_class.value += " emoji_text";
};
const filter = (e) => {
  check_emoji(e);
  return e;
};

// 使用onMounted钩子来获取slot的内容
onMounted(() => {
  // 获取slot的内容
  let _ = filter(ref_sb2.value.innerText);
  //if (_p.text != null && _) _p.text = false; //如果_p（也就是text没有字符），那就不取text
  if (_) slotContent.value = filter(_); //如果slot里面有东西
  else if (_p.text) slotContent.value = filter(_p.text); //更新data-title
  onUpdated(() => {
    if (ref_sb2.value.innerText != _) {
      //slot和text不等于
      ref_sb2.value.setAttribute(
        "data-title",
        (_ = slotContent.value = filter(ref_sb2.value.innerText))
      );
      //   console.log(ref_sb2.value, _);
    }
  });
});

// 定义props
</script>
<template>
  <span :class="_tmp_class" :data-title="slotContent" ref="ref_sb">
    <component :is="'style'" v-if="color">
      .c_{{ rand_class }}.text::before{
      content: attr(data-title);
      position: absolute;
      background: {{ color }};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0;
      display: inline-block;
      white-space: pre-line;
      word-break: break-all;
      }
    </component>
    <slot></slot>

    {{ text }}
  </span>
</template>
<style>
.text::before {
  content: attr(data-title);
  position: absolute;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0;
  display: inline-block;
  white-space: pre-line;
  word-break: break-all;

}

.emoji_text.text::before {
  -webkit-text-fill-color: #fff;
}

.emoji_text.text {
  filter: drop-shadow(0 0.05em 0 #000);
}

/* .text,
.text::before {
  line-height: 1.2em;
} */

.text {
  -webkit-text-stroke: 2px #000;
  filter: drop-shadow(0 3px 0 #000);
  display: inline-block;
  /* align-items: center; */
  white-space: pre-line;
  word-break: break-all;
  font-size: inherit;
}
</style>
