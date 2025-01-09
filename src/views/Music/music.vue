<template>
    <div class="music">
        <div class="music_list">
            <Button v-for="(music, index) in music_list" @click="SetTheme(music.id)">{{ music.title
                }}</Button>
        </div>
        <div class="music_panel">
            <audio controls @ended="ControlAudio(true)" @canplay="setAudioInfo" @timeupdate="updateAudio"
                ref="PlayingAudio" style="display: none;">
                <source :src="music_obj.AudioLink" type="audio/mpeg">
                <source :src="music_obj.MP3AudioLink" type="audio/mpeg">
            </audio>
            <div class="music_progress">
                <div class="theme">
                    <div class="info">
                        <Text class="colorful_text">{{ music_obj.CurrentTheme }}</Text>
                        <Text class="colorful_text">{{ music_obj.PlayList.id + 1 }} / {{ music_obj.PlayList.list.length
                            }}</Text>
                    </div>
                    <div class="vol">
                        <div>
                            <Button @click="ControlAudio(false)" class="primary">上一首</Button>
                            <Button @click="playOrStopAudio()"
                                :class="{ [music_obj.PlayInfo.playing ? 'danger' : 'success']: true }">{{
                                    music_obj.PlayInfo.playing ? '暂停' : "播放" }}</Button>
                            <Button @click="ControlAudio(true)" class="primary">下一首</Button>
                        </div>
                        <div>

                            <Button @click="ControlTheme(false)" class="primary">上一主题</Button>
                            <Button @click="ControlTheme(true)" class="primary">下一主题</Button>
                        </div>
                    </div>

                </div>
                <div class="index">
                    <div class="vol">
                        <Text>音量：{{ Math.floor(music_obj.PlayInfo.volume * 100) }} %</Text>
                        <input type="range" :value="music_obj.PlayInfo.volume"
                            @input="(e) => music_obj.PlayInfo.volume = e.target.value" min="0" step="0.01" max="1">
                    </div>
                    <div class="number">
                        <Text>{{ music_obj.PlayInfo.time }}</Text>
                        <Text>{{ music_obj.PlayInfo.max_time }}</Text>
                    </div>
                    <Progress :value="music_obj.PlayInfo.value" :maxvalue="music_obj.PlayInfo.max_value"
                        class="progress" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
                        @mouseup="handleMouseUp" @touchmove="handleTouchMove" @touchstart="handleTouchDown"
                        @touchend="handleTouchUp"></Progress>
                </div>
            </div>
            <!-- <div class="controls">

                <Button @click="ControlTheme(false)" class="primary">上一主题</Button>
                <Button @click="ControlTheme(true)" class="primary">下一主题</Button>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { GetJson } from '@/assets/js/util';
import Text from '@/components/Text/Text.vue';
import Button from '@/components/Button/Button.vue';
import Progress from '@/components/Progress/Progress.vue';
import { nextTick, onMounted, reactive, ref, useTemplateRef, watchEffect } from 'vue';

var PlayingAudio = useTemplateRef('PlayingAudio');
var music_url = '/res/musics.json';
var music_list = ref([]);
var _default_theme = {
    AudioLink: "/music/love_swamp_menu_01.ogg",
    MP3AudioLink: "/music/mp3/love_swamp_menu_01.mp3",
    PlayList: { id: 0, list: ["/music/love_swamp_menu_01.ogg", "/music/love_swamp_menu_02.ogg"] },
    CurrentTheme: "恋爱沼泽",
    CurrentThemeID: 90,
    PlayInfo: {
        value: 0,
        max_value: 100,
        time: '00:00',
        max_time: '00:00',
        playing: false,
        volume: 1
    }
};
var music_obj = reactive(_default_theme);
const formatTime = (sec) => ((minutes, seconds) => `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`)(Math.floor(sec / 60), Math.floor(sec - Math.floor(sec / 60) * 60));
const updateAudio = () => {
    if (drag) return;
    let audio = PlayingAudio.value;
    music_obj.PlayInfo.time = formatTime(audio.currentTime);
    music_obj.PlayInfo.value = parseInt(audio.currentTime);
}
const setAudioInfo = () => {
    let duration = PlayingAudio.value.duration;
    music_obj.PlayInfo.max_time = formatTime(duration);
    music_obj.PlayInfo.max_value = parseInt(duration);
};
var drag = false;

const _tmp = (e) => {
    console.log(e.type, e);
}
const handleTouchDown = (e) => {
    handleMouseDown({ ...e, layerX: e.touches[0].clientX, target: e.srcElement });
}
const handleTouchUp = (e) => {
    handleMouseUp();
}
const handleTouchMove = (e) => {
    //console.log(e);
    handleMouseMove({ ...e, layerX: e.touches[0].clientX, target: e.srcElement });
}
const handleMouseUp = () => {
    //console.log(music_obj.PlayInfo.value);
    setAudioProgress(music_obj.PlayInfo.value);
    //console.log(music_obj.PlayInfo.value)
    drag = false;
}
const handleMouseMove = (e) => {
    //console.log(e.type, e);
    if (drag)
        handleAudioDrop(e.layerX, e.target);

};
const handleMouseDown = (e) => {
    // console.log(e.type, e);
    if (!drag) {
        stopAudio();
        handleAudioDrop(e.layerX, e.target);
    }
    drag = true;

};

const handleAudioDrop = (x, ele) => {
    //console.log(ele);
    let width = ele.clientWidth;
    let res = (x / width);
    if (x >= width) res = 0.99;
    if (x < 0) res = 0;
    let tmp_v = Math.floor(res * music_obj.PlayInfo.max_value);
    if (tmp_v >= music_obj.PlayInfo.max_value - 1) tmp_v += 1;
    music_obj.PlayInfo.value = tmp_v;
    music_obj.PlayInfo.time = formatTime(tmp_v);
    //console.log('handleDrag', res, x, width, ele);
};


const reloadAudio = () => {
    console.log(PlayingAudio);
    PlayingAudio.value.load();
    PlayingAudio.value.play();
    music_obj.PlayInfo.playing = true;
};
const playAudio = (audio = PlayingAudio.value) => {
    music_obj.PlayInfo.playing = true;
    audio.paused ? audio.play().catch((w) => {
        if (audio.paused)
            music_obj.PlayInfo.playing = false;
    }) : false;


}
const stopAudio = (audio = PlayingAudio.value) => {
    audio.paused ? false : audio.pause();
    music_obj.PlayInfo.playing = false;
}
const setAudioProgress = (v) => {
    stopAudio();
    let audio = PlayingAudio.value;
    audio.currentTime = v;
    playAudio();
}
const SetAudio = (a) => {
    music_obj.AudioLink = a;
    music_obj.MP3AudioLink = a.replace("music/", "music/mp3/").replace(".ogg", ".mp3");
    reloadAudio();
};
const playOrStopAudio = () => {
    music_obj.PlayInfo.playing ?
        stopAudio() : playAudio();
};
const ControlAudio = (pushOrDel) => {
    let id = pushOrDel ? music_obj.PlayList.id + 1 : music_obj.PlayList.id - 1;
    if (id < 0) id = music_obj.PlayList.list.length - 1;
    if (id >= music_obj.PlayList.list.length) id = 0;
    console.log(id);
    music_obj.PlayList.id = id;
    SetAudio(music_obj.PlayList.list[id]);
};
const ControlTheme = (pushOrDel) => SetTheme(pushOrDel ? music_obj.CurrentThemeID + 1 : music_obj.CurrentThemeID - 1);
const SetTheme = (id) => {
    if (id >= music_list.value.length)
        id = 0;
    if (id < 0)
        id = music_list.value.length - 1;
    let res = music_list.value.find(e => e.id == id);
    music_obj.PlayList.id = 0;
    music_obj.PlayList.list = res.music;
    music_obj.CurrentTheme = res.title;
    music_obj.CurrentThemeID = id;
    SetAudio(res.music[0]);
};
onMounted(async () => {
    music_list.value = (await GetJson(music_url)).map(e => {
        if (e[1].includes('&')) {
            let res = e[1].split('&&');
            e[1] = res[0];
            e[2] = res[1];
        }
        return e;
    }).map((e, i) => ({ id: i, title: e[0], music: e.slice(1) }));

    console.log(music_list);
    watchEffect(() => {
        try {
            PlayingAudio.value.volume = music_obj.PlayInfo.volume;
        }
        catch { }
    });
});


</script>

<style scoped>
.music {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.music_list {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
}

.music_panel {
    padding: 10px;
    display: flex;
    margin: 1em;
    flex-direction: column;
    /* border: solid 5px rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.4); */
    border-radius: 10px;
    border: solid 4px #0000005e
}

.music_panel .controls {
    display: flex;
    flex-wrap: wrap;
}

.music_panel .controls button {
    flex: 1 1 auto;
    margin: 10px;
}

.music_progress {
    display: flex;
    flex-direction: column;
}

.music_progress .theme {
    font-size: 1.5em;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px;
}

.music_progress .theme .info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.music_progress .theme .vol {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    margin: 5px;
    max-width: 500px;
}

.music_progress .theme .vol div {
    flex: 1;
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
}

.music_progress .theme .vol button {
    margin: 5px;
    flex: 1;
}

.music_progress .index {
    display: inline-flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
}

.music_progress .index .number {
    font-size: 1.3em;
    display: inline-flex;
    justify-content: space-between;
}

.music_progress .index .vol {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 1.3em;
}

.music_progress .index .vol input {
    flex: 1;
    max-width: 100%;
}

.music_progress .index .progress {
    width: 100%;
    height: 25px;
    margin: 5px 0px;
}

.music_list button {
    margin: 5px 10px;
    flex-basis: 20%;
    min-width: 150px;
    flex-grow: 1;
}

[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 5px;
    outline: 0;
    border-radius: 10px;
    background-color: #410327;
}


input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 8px;
    background: #E37320;
    cursor: pointer;
}

input[type='range']::-moz-range-thumb {
    height: 7px;
    width: 7px;
    border-radius: 8px;
    background: #E37320;
    cursor: pointer;
}
</style>