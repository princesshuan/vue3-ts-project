<template>
  <div class="login-box">
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="70px" class="loginForm">
      <h1>后台管理系统</h1>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <div class="submit-btn">
          <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
          <el-button @click="resetForm(loginFormRef)">重置</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { InitData } from '../types/login'
  import { login } from '../http/api'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    setup() {
      const data = reactive(new InitData())
      const router = useRouter()
      const rules = {
        userName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 24,
            message: '账号长度在4~24之间',
            trigger: 'blur'
          },
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 24,
            message: '密码长度在4~24之间',
            trigger: 'blur'
          },
        ]
      }

      const submitForm = () => {
        data.loginFormRef?.validate(valid => {
          if (valid) {
            // alert('验证通过')
            login(data.loginForm).then(res => {
              console.log(res)
              localStorage.setItem("token", res.data.token)
              router.push('/')
            })
          }
        })
      }
      const resetForm = () => {
        data.loginFormRef?.resetFields()
      }
      return {
        ...toRefs(data),
        rules,
        submitForm,
        resetForm
      };
    }
  })
</script>
<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    background: url('../assets/bg.jpeg') no-repeat;
    box-sizing: border-box;
    padding-top: 200px;

    .loginForm {
      padding: 20px;
      width: 400px;
      // height: 200px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 20px;
    }

    .submit-btn {
      width: 200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin: 20px;
    }
  }



  .el-input {
    width: 280px;
    // height: 30pxs;
  }
</style>