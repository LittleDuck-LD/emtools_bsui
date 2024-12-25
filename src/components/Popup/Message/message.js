import "./message.css";
export default class Message {
  constructor() {
    this.containerEl = document.createElement("div");
    this.containerEl.id = this.containerEl.className = "popup_container";
    this.messages = [];
    document.body.appendChild(this.containerEl);
  }
  static _container = { init: false, obj: {} };
  static init() {
    if (!Message._container.init) {
      Message._container.init = true;
      Message._container.obj = new Message();
    }
  }
  static show(msg, time = 2000, id = null) {
    Message.init();
    return Message._container.obj.show({ text: msg, duration: time, id });
  }
  static close(id) {
    Message.init();
    let res = Message._container.obj.messages.find((e) => e.id == id);
    if (res) Message._container.obj.close(res.messageEl);
  }
  static closeAll() {
    Message.init();
    Message._container.obj.messages.forEach((e) => {
      Message._container.obj.close(e.messageEl);
    });
    return (Message._container.obj.messages = []);
  }
  show({ text = "", duration = 2000, id }) {
    if (!id) id = Message.randomString(7);
    // 创建一个Element对象
    let messageEl = document.createElement("div");
    messageEl.id = id;
    // 设置消息class，这里加上move-in可以直接看到弹出效果
    messageEl.className = "float_text mi";
    // 消息内部html字符串
    messageEl.innerHTML = `<span class="text t" data-title="${text}">${text}</span>`;

    // 追加到message-container末尾
    // this.containerEl属性是我们在构造函数中创建的message-container容器
    this.containerEl.appendChild(messageEl);
    this.messages.push({ id, messageEl });
    // 只有当duration大于0的时候才设置定时器，这样我们的消息就会一直显示
    if (duration > 0) {
      // 用setTimeout来做一个定时器
      setTimeout(() => {
        this.close(messageEl);
      }, duration);
    }
    return { messageEl, id };
  }
  static randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = "",
      i = 0;
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
  }
  /**
   * 关闭某个消息
   * 由于定时器里边要移除消息，然后用户手动关闭事件也要移除消息，所以我们直接把移除消息提取出来封装成一个方法
   * @param {Element} messageEl
   */
  close(messageEl) {
    // 首先把move-in这个弹出动画类给移除掉，要不然会有问题，可以自己测试下
    messageEl.className = messageEl.className.replace("mi", "");
    // 增加一个move-out类
    messageEl.className += "mo";

    // 这个地方是监听动画结束事件，在动画结束后把消息从dom树中移除。
    // 如果你是在增加move-out后直接调用messageEl.remove，那么你不会看到任何动画效果
    messageEl.addEventListener("animationend", () => {
      // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
      messageEl.remove();
    });
  }
}
