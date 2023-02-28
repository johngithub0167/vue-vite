<template>
  <div id='test'>
    <input type="text" :value="msg" @input="inputChange">
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"
type propsType = { 
  msg: string
}

withDefaults(defineProps<propsType>(), {
  msg: ''
})

const Emits = defineEmits(['update:msg'])



const inputChange = ($event) => {
  Emits('update:msg', $event.target.value)
}



</script>
<style lang = 'less' scoped></style>