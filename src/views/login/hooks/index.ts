import { localCache } from '@/utils/cache'
import { ref, watch, reactive, type Ref } from 'vue'
import { ISREMPWD } from '@/global/constants'
import type { IAccount } from '@/types/index'
import type { FormRules } from 'element-plus'
import { NAME, PASSWORD } from '@/global/constants'
import { ElMessage } from 'element-plus'
import type { accountType } from '../c-cpns/login-panel.vue'
import type { loginStoreType } from '../c-cpns/pane-account.vue'
export function useIsRemPwd() {
  const isRemPwd = ref<boolean>(localCache.getCache(ISREMPWD) ?? false)
  watch(isRemPwd, (newVal) => {
    localCache.setCache(ISREMPWD, newVal)
  })
  return isRemPwd
}

export function useActiveName() {
    const activeName = ref('account')

    const onActiveChange = (newVal:string) => {
        activeName.value = newVal
    }

    return {activeName,onActiveChange}
}
export function useLogin(isRemPwd: Ref<boolean>, accountRef: accountType) {
  const {activeName} = useActiveName() 
  const handleLoginBtnClick = () => {
    if (activeName.value === 'account') {
      /** 调用子组件登录方法 */
      accountRef.value?.loginAction(isRemPwd.value)
    } else {
      console.log('用户在进行手机登录')
    }
  }
  return { activeName, handleLoginBtnClick }
}

export function useAccountForm(formRef: any,loginStore:loginStoreType) {
  // 1.定义account数据
  const account = reactive<IAccount>({
    name: localCache.getCache(NAME) ?? '',
    password: localCache.getCache(PASSWORD) ?? ''
  })

  // 2.定义校验规则
  const accountRules: FormRules = {
    name: [
      { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: '必须是6~20数字或字母组成~',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '必须输入密码信息~', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{3,}$/,
        message: '必须是3位以上数字或字母组成',
        trigger: 'blur'
      }
    ]
  }

  const loginAction = (isRemPwd: boolean) => {
    formRef.value?.validate((valid: boolean) => {
      if (valid) {
        // 1.获取用户输入的帐号和密码
        const name = account.name
        const password = account.password
        // console.log(name,password)
        // 2.向服务器发送网络请求(携带账号和密码)
        loginStore.loginAccountAction({ name, password }).then(() => {
          if (isRemPwd) {

            localCache.setCache(NAME, name)
            localCache.setCache(PASSWORD, password)
          } else {
            localCache.removeCache(NAME)
            localCache.removeCache(PASSWORD)
          }
        })
      } else {
        ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
      }
    })
  }

  return [account, accountRules, loginAction]
}
