<template>
  <!-- 新增/修改 -->
  <el-main style="height: calc(100vh - 60px)">

    <!-- Toolbar -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px; height: 40px">
      <el-col :span="24">
        <el-button icon="el-icon-back" type="danger" circle @click="back"></el-button>
        <div style="float: right">
          <el-button type="success" icon="el-icon-check" circle @click="onSubmit('userForm')"></el-button>
          <el-button type="info" icon="el-icon-close" circle @click="restForm('userForm')"></el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="12">

        <el-form :model="userForm" status-icon ref="userForm" label-width="100px" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="userForm.username"
              auto-complete="on"
              placeholder="请输入用户名，不能重复"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userForm.password"
              auto-complete="on"
              type="password"
              placeholder="请输入用户密码"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nick">
            <el-input
              v-model="userForm.nick"
              auto-complete="on"
              placeholder="请输入用户昵称"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="userForm.email"
              placeholder="请输入用户邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="userForm.remark"
              placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </el-main>
</template>

<style scoped>

</style>

<script>
  // import {setCookie, getCookie} from '@/assets/cookie.js'
  export default {
    data() {
      return {
        userForm: {
          id: '',
          username: '',
          password: '',
          nick: '',
          email: '',
          remark: '',
          state: 1,
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
            // 成功
            this.save()
          } else {
            // 验证失败
            return false;
          }
        })
      },
      restForm(formName) {
        this.$refs[formName].resetFields()
      },
      back() {
        this.$router.go(-1)
      },
      save() {
        // 提交表单
        let method = (this.userForm.id == '' ? 'post' : 'put')
        // let method = 'post'
        this.$http({
            method: method,
            url: '/user/upd',
            data: this.userForm,
          }).then(response => {
          // success
          let data = response.data
          if (data > 0) {
            this.$message({
              message: '成功更新' + data + '条用户记录。',
              type: 'success',
              center: true
            });
            this.$router.go(-1)
          }
        }, reasonse => {
          // error
          this.$message({
            message: reasonse.message,
            center: true,
            type: 'error'
          })
        })
      },
    },

    mounted() {
      if (sessionStorage.userInfo != null) {

      } else {
        this.$router.push('/')
      }
      if (this.$route.params.ihcs != ' ') {
        this.userForm = JSON.parse(this.$route.params.user)[0];
      }
    }

  }
</script>
