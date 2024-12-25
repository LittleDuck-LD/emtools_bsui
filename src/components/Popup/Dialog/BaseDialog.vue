<template>
    <div class="model_prompt_mask">
        <div class="model_prompt">
            <div class="header">
                <div class="tt">
                    <Text class="title">{{ title }}</Text>
                </div>
                <Button class="danger close_btn" v-if="closeButton" @click="closeButton">
                    <svg class="ico" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 130 140">
                        <path
                            d="M45.99,120.06c-2.01-.93-4.09-1.33-5.36-2.57-8.32-8.17-16.66-16.35-24.6-24.89-4.94-5.31-4.03-13.8,1.47-18.72,2.28-2.04,4.9-3.67,7.25-5.64,4.83-4.04,4.88-4.65.89-9.26-2.01-2.32-4.15-4.54-6.28-6.75-7.35-7.65-7.12-15.2.98-22.14,5.88-5.04,12-9.8,18.03-14.66.43-.34,1.04-.47,1.45-.82,3.49-3.05,6.68-7.99,11.9-5.79,4.09,1.72,7.52,5.32,10.88,8.46,3.03,2.83,5.61,6.16,8.32,9.33,2.25,2.64,4.41,2.65,7.17.57,6.19-4.65,12.59-9.02,18.85-13.59,6.1-4.45,7.56-4.17,12.07,1.79,3.86,5.1,8.11,9.9,11.99,14.99,2.01,2.63,3.94,5.44,5.3,8.44,3.84,8.53,3.09,11.18-4.19,17.36-14.33,12.17-11.67,9.32-1.15,21.04,1.12,1.25,2.26,2.49,3.28,3.81,5.42,6.98,5.13,13.6-1.45,19.24-8.03,6.89-16.3,13.53-24.7,19.96-5.3,4.06-11.14,3.15-15.68-1.81-3.02-3.29-5.88-6.73-8.99-9.93-5.14-5.29-5.19-5.21-10.58-.53-3.37,2.93-6.67,5.96-10.23,8.65-1.91,1.45-4.28,2.27-6.62,3.47ZM46.72,108.29c1.51-1.12,2.9-2,4.11-3.09,3.95-3.55,7.8-7.21,11.74-10.78,5.66-5.13,6.33-5.15,11.5.23,4.26,4.44,8.43,8.97,12.58,13.51,2.68,2.94,5.52,3.62,8.75.94,8.18-6.76,16.31-13.6,24.59-20.24,3.2-2.56,3.25-4.58.3-7.42-5.43-5.24-10.46-10.89-15.9-16.12-2.9-2.79-2.98-4.76.16-7.4,5.34-4.5,10.33-9.42,15.64-13.95,2.94-2.5,3.35-4.89.92-7.89-4.92-6.08-9.84-12.17-14.68-18.31-2.27-2.89-4.33-3.66-7.64-1.08-6.57,5.14-13.52,9.78-20.24,14.73-4.53,3.33-4.57,3.51-8.74-.69-5.72-5.75-11.29-11.65-16.88-17.52-2.2-2.31-4.26-3.29-7.06-.69-7.36,6.82-14.98,13.34-22.26,20.24-4.73,4.48-4.7,4.84-.4,9.45,3.01,3.23,6.39,6.15,9.85,8.91,9.41,7.5,9.23,11.07-.91,17.29-3.77,2.31-7.26,5.1-10.93,7.59-3.42,2.32-3.33,4.68-.51,7.48,7.5,7.44,14.89,14.98,22.38,22.42.94.93,2.24,1.48,3.63,2.38Z" />
                        <path
                            d="M46.72,108.29c-1.39-.89-2.69-1.45-3.63-2.38-7.49-7.44-14.88-14.98-22.38-22.42-2.83-2.8-2.92-5.16.51-7.48,3.67-2.49,7.15-5.28,10.93-7.59,10.13-6.22,10.32-9.78.91-17.29-3.46-2.75-6.84-5.68-9.85-8.91-4.3-4.61-4.33-4.98.4-9.45,7.28-6.9,14.9-13.43,22.26-20.24,2.8-2.6,4.86-1.62,7.06.69,5.59,5.87,11.16,11.77,16.88,17.52,4.17,4.19,4.21,4.02,8.74.69,6.72-4.95,13.67-9.59,20.24-14.73,3.31-2.59,5.37-1.81,7.64,1.08,4.84,6.15,9.75,12.23,14.68,18.31,2.42,2.99,2.01,5.38-.92,7.89-5.31,4.53-10.3,9.45-15.64,13.95-3.14,2.64-3.06,4.61-.16,7.4,5.44,5.23,10.47,10.88,15.9,16.12,2.94,2.84,2.9,4.86-.3,7.42-8.28,6.64-16.4,13.48-24.59,20.24-3.24,2.67-6.07,2-8.75-.94-4.15-4.54-8.32-9.07-12.58-13.51-5.17-5.38-5.84-5.37-11.5-.23-3.93,3.57-7.79,7.22-11.74,10.78-1.21,1.09-2.6,1.96-4.11,3.09Z"
                            style="fill: #fff" />
                    </svg>
                </Button>
            </div>
            <div class="split"></div>
            <div class="mix_content">
                <div class="content">
                    <slot name="content"></slot>
                </div>
                <div class="actions">
                    <slot name="actions"></slot>
                </div>
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>

<script setup>
import Button from "../../Button/Button.vue";
import Text from "../../Text/Text.vue";
defineProps(["title", "closeButton", "content", "actions"]);
</script>

<style>
/* html {
  font-size: 15px;
} */

.model_prompt_mask {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #333333ad;
}

.model_prompt {
    margin: 0.5em;
    background: #105de5;
    color: white;
    z-index: 1000;
    max-width: 800px;
    margin: 25px;
    box-shadow: 1px 1px 14px 0px black;
}

.model_prompt,
.model_prompt .header {
    border-radius: 5px 5px 0px 0px;
}

.model_prompt .header {
    background: #248ef6;
    padding: 1.5em;
    position: relative;
}

.model_prompt .tt {
    display: flex;
    align-items: center;
    justify-content: center;
}

.model_prompt .split {
    height: 1em;
    background: #0000001f;
    border-bottom: solid 0.2em #0000003d;
}

.model_prompt .header .title {
    margin: 0;
    padding: 0;
    font-size: 1.8em;
    font-weight: 500;
}

.model_prompt .header .ico {
    width: 50px;
    height: 40px;
    /* transform: skewX(10deg); */
}

.model_prompt .header .close_btn {
    margin: 0;
    padding: 0;
    position: absolute;
    top: -2px;
    right: -10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* display: none; */
}

.model_prompt .content {
    padding: 1em 3.5em;
    font-size: 1.4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 320px;
    overflow-y: auto;
    overflow-wrap: anywhere;
}

.model_prompt .content .input_bg {
    margin: 0.5em;
}

.model_prompt .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.model_prompt .actions button {
    /* width: 40%; */
    margin: 10px;
    font-size: 1.5em;
    flex: 1 1 auto;
    padding: 15px 40px;
}

.mix_content {
    margin: 0em 1em;
}

.model_prompt .actions button:first-child:last-child {
    padding: 15px 70px;
}

@media screen and (max-width: 400px) {
    .model_prompt .actions button {
        margin: 5px;
    }

    .model_prompt .actions button:first-child:last-child {
        padding: 15px 40px;
    }

    .model_prompt {
        margin: 5px;
    }

    .model_prompt .footer {
        margin-top: 5px;
    }

    .model_prompt .header .close_btn {
        top: 0px;
        right: 0px;
        width: 35px;
        height: 35px;
    }

    .model_prompt .header .ico {
        width: 35px;
        height: 25px;
        /* transform: skewX(10deg); */
    }
}

@media screen and (max-width: 800px) {
    .model_prompt .content {
        padding: 1em 2em;
    }
}
@media screen and (max-width: 400px) {
    .model_prompt .content {
        padding: 0.5em 2em;
    }
}

.model_prompt .footer {
    background: #248ef6;
    height: 1em;
    border-top: solid 0.2em #0000003d;
}
</style>
