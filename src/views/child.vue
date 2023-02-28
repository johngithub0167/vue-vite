<template>
  <div id="child" ref="testRef">{{ msg }}</div>
  <button @click="onChangeMsg">切换</button>
  <slot :test="name" name="child"></slot>
  <!-- <input type="text" :value="msg" @input="oninputMsg"> -->
  <div>子组件：{{ count }}</div>
  <button @click="oninputMsg">变变变</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

export type propsType = {
  msg: string;
  list: number[];
  count: number
};

const props = withDefaults(defineProps<propsType>(), {
  msg: "555",
  list: () => [1, 23],
  count: 0
});


const name = ref<string>('弥彦')

const Emits = defineEmits(['changeMsg', 'update:count'])

const onChangeMsg = () => {
  Emits('changeMsg', '黑日')
}

const oninputMsg = () => {
  Emits('update:count', props.count + 1)
}


const testRef = ref<null | HTMLElement>()


defineExpose({
  onChangeMsg,
  name,
  testRef
})




</script>
<style lang="less" scoped></style>
 