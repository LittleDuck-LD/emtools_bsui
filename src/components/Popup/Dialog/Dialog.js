import { h, render } from "vue";
import Info from "./Type/Info.vue";
import Input from "./Type/Input.vue";
import Confirm from "./Type/Confirm.vue";
function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "",
    i = 0;
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
export default class Dialog {
  constructor() {
    this.dialog_list = [];
  }
  static _obj = { init: false, obj: null };
  static default_title = '提示';
  static get_obj() {
    if (!this._obj.init) {
      this._obj.init = true;
      this._obj.obj = new Dialog();
    }
    return this._obj.obj;
  }
  static PopupWindow(content) { }
  static InputCustom({ title, inputs, callback = () => { } }) {
    // inputs = [{title:"输入框标题",sub_title:"输入框提示"}]
    this.get_obj().Show((e) => h(Input, { title, inputs, callback: callback ? (o, p) => { callback(o, p); e(); } : e }));
  }
  static InputOne({ title = this.default_title, s_title = "", sub_title = "", placeholder = "", callback }) {
    Dialog.InputCustom({ title, inputs: [{ title: s_title, sub_title: sub_title }], callback });
  }
  static Confirm({ text, title = this.default_title, callback = () => { } }) {
    this.get_obj().Show((e) => h(Confirm, { title, text, callback: callback ? (j) => { callback(j); e(); } : e }));
  }
  static Info({ text, title = this.default_title, callback = () => { } }) {
    this.get_obj().Show((e) => h(Info, { title, text, close: callback ? () => { callback(); e(); } : e }));
  }
  static CreateObject() {
    let id = randomString(7);
    let div = document.createElement("div");
    div.id = id;
    let obj = {
      id, obj: div, close: () => div.remove(), _render: (c) =>
        render(
          c,
          div
        )

    };
    return obj;
  }
  Show(o) {
    let tmp = Dialog.CreateObject();
    tmp._render(o(tmp.close));
    this.dialog_list.push(tmp);
    document.body.appendChild(tmp.obj);
  }
  Close(id) {
    this.dialog_list.map((e) => {
      if (e.id == id) e.close();
    });
  }
  CloseAll() {
    this.dialog_list.map((e) => e.close());
  }
}
