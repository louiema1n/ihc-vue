<template>

    <div class="login-wrap">
      <!-- logo -->
      <img src="@/assets/logo.png"/>
      <h3>登录</h3>
      <p>{{tips}}</p>
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-form :model="form" ref="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input
                placeholder="用户名"
                v-model="form.username"
                autofocus="true"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                v-model="form.password"
                type="password"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span>没有账号？</span>
      <a href="#">马上注册</a>
    </div>
</template>

<style scoped>
  .login-wrap {
    vertical-align: middle;
    text-align: center;
  }

  p {
    color: red;
  }

  a:hover {
    color: #41b883;
  }
</style>

<script>
  // import {setCookie, getCookie} from '@/assets/cookie.js'
  import {encodePwd} from '@/utils/encrypt.js'
  export default {
    data() {
      return {
        tips: '',
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ],
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('login', {
              username: this.form.username,
              password: encodePwd(this.form.username, this.form.password)
            }).then(response => {
              // success
              let data = response.data;
              switch (data.status) {
                case 0:
                  // 密码错误
                  this.tips = '密码错误'
                  break
                case 1:
                  // 成功
                  this.tips = ''
                  // setCookie('ihc', this.form.username)
                  this.$router.push('/index')

                  // 将用户信息存入sessionStorage
                  sessionStorage.setItem('userInfo', JSON.stringify(data.user))

                  break
                case 2:
                  // 用户名不存在
                  this.tips = '用户名不存在'
                  break
              }
            }, reasonse => {
              // error
              this.$message({
                message: reasonse.message,
                center: true,
                type: 'error'
              })
            })
          } else {
            // 验证失败
            return false;
          }
        })
      },
    },

    mounted() {
      if (sessionStorage.userInfo != null) {
        this.$router.push('/index')
      } else {
        this.$router.push('/')
      }
    }

  }


</script>
