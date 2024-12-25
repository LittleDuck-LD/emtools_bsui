<template>
    <BaseDialog :title="title" :closeButton="false">
        <template #content>
            <div class="sub_content" v-if="inputs" v-for="i in inputs">
                <Text v-if="i.title">{{ i.title }}</Text>
                <Input :placeholder="i.sub_title" :oninput="(e) => i.text = e.target.value" />
            </div>
        </template>
        <template #actions>
            <Button class="danger" @click="callback(false)">取消</Button>
            <Button class="primary" @click="callback(true, inputs.map(e => e.text ?? false))">确定</Button>
        </template>
    </BaseDialog>
</template>

<script setup>
import BaseDialog from '../BaseDialog.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
import Input from '@/components/Input/Input.vue';
var a = defineProps(['title', 'text', 'inputs', 'callback']);
console.log(a.inputs);

</script>
<style scoped>
.sub_content {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
