import { LOGIN_TOKEN } from '@/constant'
import router from '@/router'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: 0,
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await  accountLoginRequest(account)
     this.id = res.data.id
     this.name = res.data.name
     this.token = res.data.token

     localCache.setCache(LOGIN_TOKEN, this.token)
     router.push('/main')
    }
  }
})

export default useLoginStore
