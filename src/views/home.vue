<template>
  <div id="home">x:{{ x }} y:{{ y }}</div>
  <!-- <input type="text" v-model="msg"> -->
  <div> {{ count }}</div>
  <Child :list="[1, 2, 3]" v-model:count="count" :msg="msg" ref="child">
    <template #child="{ test }">
      <div>{{ test }}</div>
    </template>
  </Child>
  <!-- <button @click="getChildRef">获取子组件内容</button> -->
</template>

<script setup lang="ts">
import {
  ref,
  toRef,
  reactive,
  toRefs,
  onBeforeUnmount,
  onMounted,
  computed,
  watch,
  getCurrentInstance,
  nextTick
} from "vue";
import Child from "./child.vue";

const msg = ref<string>('333')
const count = ref<number>(0)
const usePosition = () => {
  const position = reactive({
    x: 0,
    y: 0,
  });
  // 绑定鼠标移动事件
  const onMouseMove = (event) => {
    position.x = event.x;
    position.y = event.y;
  };

  const obj = {
    name: "qfd ",
    age: 4513,
  };

  watch(
    () => obj.name,
    (newVal, oldVal) => {
      // console.log(newVal);
    },
    {
      immediate: true,
    }
  );

  onMounted(() => {
    window.addEventListener("mousemove", onMouseMove);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove);
  });

  return toRefs(position);
};

// const count = ref<number>(0);
const { x, y } = usePosition();

// const test = computed(() => count.value + 1);



// const childChange = (value) => {
//   // console.log(value);
// }


const child = ref<InstanceType<typeof Child> | null>(null)
nextTick(() => {
  // console.log('父组件', child.value?.testRef);
})

// const testNew = getCurrentInstance()
// console.log(testNew);


</script>
<style lang="less" scoped></style>
