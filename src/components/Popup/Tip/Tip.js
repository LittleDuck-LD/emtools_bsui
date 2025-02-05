import { h, render } from "vue";
import Tip from "./Tip.vue";
import Text from "../../Text/Text.vue";
var config = {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
};
var last_div = false;
const eval_tooltip = ({
  x,
  y,
  el_width,
  el_height,
  width,
  height,
  padding = 0,
  top_padding = 0,
  margin = 0,
  top_margin = 0,
  center = false,
}) => {
  let filter_x = (x) => (x <= 0 ? 0 : x >= width ? width : x); //最后过滤宽度，防止超出
  let filter_y = (y) => (y <= 0 ? 0 : y >= height ? height : y); //最后过滤高度，防止超出
  let left = 0,
    top = 0,
    big_left = false;
  if (margin) x = x + margin;
  if (top_margin) y = y + top_margin;
  if (x + el_width < width) {
    //坐标X+元素宽度小于宽度
    left = x - (center ? el_width / 2 : 0);
  } else {
    left = width - el_width;
    big_left = true;
  }
  if (y + el_height < height) {
    //坐标Y+元素宽度小于高度
    top = y;
  } else {
    top = height - el_height;
  }
  if (padding) {
    //计算padding
    if (big_left) left = left - padding;
  }
  if (top_padding) {
    top = top - top_padding;
  }
  left = filter_x(left); //这里判断是否居中函数
  top = filter_y(top); //高度不用居中
  //最后过滤高度和宽度防止超出
  return { x: left, y: top, css_x: left + "px", css_y: top + "px" };
};
document.addEventListener("mousedown", (e) => {
  config.height = window.innerHeight;
  config.width = window.innerWidth;
  config.x = e.clientX;
  config.y = e.clientY;
});
function removeLast() {
  if (last_div) {
    try {
      document.body.removeChild(last_div);
    } catch { }
    last_div = false;
  }
}
function Show(content) {
  let div = document.createElement("div");
  render(
    h(Tip, () => content),
    div
  );
  last_div = div = div.firstChild;
  div.firstChild.className += " tip_show";
  document.body.appendChild(div);
  let remove = () => {
    div.remove();
  };
  div.onclick = () => {
    div.firstChild.classList.replace("tip_show", "tip_hide");
    div.addEventListener("animationend", () => remove());
    setTimeout(() => {
      if (div) remove();
    }, 1000);
  };

  let { x, y } = eval_tooltip({
    x: config.x,
    y: config.y,
    height: config.height,
    width: config.width,
    el_height: div.firstChild.clientHeight,
    el_width: div.firstChild.clientWidth,
    center: true,
    top_margin: 10,
    padding: 10,
    top_padding: 50,
  });
  div.firstChild.style.left = x + "px";
  div.firstChild.style.top = y + "px";
  console.log(x, y, config, div.clientHeight, div.clientWidth);
}
export default { Show, ShowText: (e) => Show(h(Text, () => e)) };
