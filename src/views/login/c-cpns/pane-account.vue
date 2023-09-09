<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { useAccountForm } from '../hooks'
import { ref } from 'vue'
import useLoginStore from '@/stores/login/index'

const loginStore = useLoginStore()
export type loginStoreType = typeof loginStore
// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const [account, accountRules, loginAction] = useAccountForm(formRef, loginStore)
defineExpose({
  loginAction
})
</script>

<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
