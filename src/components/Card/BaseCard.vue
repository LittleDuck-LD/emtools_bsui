<template>
    <div class="base">
        <slot></slot>
    </div>
</template>


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
    font-size: 2rem;
    transform: skewX(-7deg);
    box-shadow: inset 0px 0.31em #ffffff30, inset 0px -0.31em #00000030,
        0px 3px #00000030;
    /* 黑色投影美化按钮质感 */
    /* filter: drop-shadow(0 0.1em 0 #000); */
}

.base:active {
    transform: skewX(-7deg) scale(0.9);
}

.base>* {
    transform: skewX(7deg);
}
</style>