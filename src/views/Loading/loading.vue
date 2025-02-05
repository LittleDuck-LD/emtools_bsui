<template>
    <div class="container">
        <div class="logo_container">
            <img class="logo_outside" src="/assets/image/loading/logo.png">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 定义旋转动画 */
@keyframes turn {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.logo_container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 15em;
    height: 15em;
}

.logo_outside {
    animation: turn 10s linear infinite;
    max-width: 100%;
    position: absolute;
    opacity: 0.5;
}

</style>