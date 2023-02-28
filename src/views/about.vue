<template>
  <div id='about'>
    <input type="text" v-model="msg">
    <TestComp v-model:msg="msg"></TestComp>
    <br />
    <el-button @click="layout">退出</el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, onMounted } from "vue"
import { useRouter } from 'vue-router'
import TestComp from '@/components/test.vue'
import { useUserStore } from '@/store/user'

const userStroe = useUserStore()
const router = useRouter()
const msg = ref<string>('444')

const layout = async () => {
  await userStroe.logout()
  router.push('/login')
}






</script>
<style lang ='less' scoped></style>