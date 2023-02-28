<template>
  <div id='login'>
    <h1>登录页面</h1>
    <i class="iconfont icon-dreamgeren"></i>
    <div>
      username: <el-input v-model="username"></el-input>
      password: <el-input v-model="password"></el-input>
      <el-button @click="submit">
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from "vue"
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'


const login = () => {
  const userStroe = useUserStore()
  const username = ref<string>('')
  const password = ref<string>('')
  const router = useRouter()
  const route = useRoute()

  const submit = async () => {
    const path = route.query.redirect
    await userStroe.login({ username: username.value, password: password.value })
    router.push({
      path: (path ? path : '/') as any
    })
  }
  return {
    username,
    password,
    submit
  }
}
const { username, password, submit } = login()
</script>
<style lang = 'less' scoped></style>