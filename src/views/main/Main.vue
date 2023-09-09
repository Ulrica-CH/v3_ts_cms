<template>
  <div class="main">
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constant'
import { useRouter } from 'vue-router';

const router = useRouter()
const logout = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
