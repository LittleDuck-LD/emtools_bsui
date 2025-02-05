<template>
    <div class="tip_mask">
        <div class="tip_container" ref="_tip">
            <div class="content_">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTemplateRef } from "vue";
var _ = useTemplateRef("_tip");
defineExpose({
    tip: _,
});
</script>

<style scoped>
.tip_mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;

    /* background: #333333ad; */
}

.tip_container {
    background: #756673d8;
    border: solid 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 0 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 0.5em;
    position: absolute;
    font-size: 1.5em;
    width: fit-content;
    max-width: 420px;
    overflow-y: auto;
}

.tip_container .content_ {
    max-width: 420px;
    max-height: 420px;
    overflow-wrap: anywhere;
    overflow-y: auto;
}

.tip_container .content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 5px;
}

@keyframes slow_to_big {
    from {
        transform: scale(0);
        opacity: 0.5;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes slow_to_small {
    from {
        transform: scale(1);
        opacity: 1;
    }

    to {
        transform: scale(0);
        opacity: 0.5;
    }
}

.tip_show {
    animation: slow_to_big 0.3s cubic-bezier(0.4, 0, 0.34, 1.16);
}

.tip_hide {
    animation: slow_to_small 0.3s cubic-bezier(0.4, 0, 0.34, 1.16);
    /* 让动画结束后保持结束状态 */
    animation-fill-mode: forwards;
}
</style>
