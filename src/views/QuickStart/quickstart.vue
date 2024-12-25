<template>
    <div>
        <div class="example">
            <Text class="title">图例：</Text>
            <div class="example_btn">
                <Button class="primary">双服均可用</Button>
                <Button class="success">仅国服可用</Button>
                <Button class="danger">仅国际服可用</Button>
            </div>
        </div>
        <div class="list">
            <Button class="item" v-for="s in quickstart"
                :class="s.type == 1 ? 'success' : s.type == 2 ? 'danger' : 'primary'"
                @click="openQuickStart(s.args, s.type ?? 0)">{{ s.title
                }}</Button>
        </div>
    </div>
</template>

<script setup>
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
import quickstart from '@/data/quickstart';
import { inject } from 'vue';
const Dialog = inject('popup').Dialog;
const checkAppInstalled = (appScheme) => {
    let isInstalled = false;
    let msg = null;
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
        // iOS设备
        if (typeof window.webkit != "undefined") {
            // ios9以上版本支持
            isInstalled = !!window.webkit.messageHandlers[appScheme];
        } else {
            // ios9以下版本支持
            var iframe = document.createElement("iframe");
            iframe.src = appScheme + "://";
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 2000);
            isInstalled = true;
        }
    } else if (navigator.userAgent.match(/(Android|huawei|xiaomi|OPPO|VIVO|Redmi|Harmony|)/i)) {
        // Android设备
        let androidLink = document.createElement("a");
        androidLink.href = appScheme + "://";
        androidLink.style.display = "none";
        document.body.appendChild(androidLink);
        setTimeout(() => document.body.removeChild(androidLink), 2000);
        // console.log(androidLink);
        isInstalled = true;
    } else if (navigator.platform.indexOf('Win') != -1) {
        msg = "本功能不支持电脑，使用手机打开此网站使用！";
        isInstalled = false;
    }
    else msg = "未安装荒野乱斗"

    return { isInstalled, msg };
}
const openQuickStart = (link, Type = 0) => {
    //0=All,1=CN,2=Global
    let brawlstarsCnLink = "brawlstars-cn://" + link;
    let brawlstarsLink = "brawlstars://" + link;
    if (checkAppInstalled("brawlstars-cn://").isInstalled && (Type === 0 || Type === 1)) window.location.href = brawlstarsCnLink;
    else if (checkAppInstalled("brawlstars://").isInstalled && (Type === 0 || Type === 2)) window.location.href = brawlstarsLink;
    else Dialog.Info(checkAppInstalled("brawlstars://").msg)

    // 尝试打开 brawlstars:// 链接

}
</script>

<style scoped>
.example {
    display: flex;
    flex-direction: column;
    margin: 2em;
}

.example .title {
    font-size: 2em;
    margin: 0.5em;
}

.example .example_btn {
    display: flex;
}
.example .example_btn button{
    margin: 5px;
    font-size: 1.4em;
}
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 2em;
}

.item {
    flex: 1 1 auto;
    margin: 5px;
}
</style>