<template>
  <!-- 新增/修改 -->
  <el-main style="height: calc(100vh - 60px)">

    <!-- Toolbar -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px; height: 40px">
      <el-col :span="24">
        <el-button icon="el-icon-back" type="danger" circle @click="back"></el-button>
        <div style="float: right">
          <el-button type="success" icon="el-icon-check" circle @click="onSubmit('ihcsForm')"></el-button>
          <el-button type="info" icon="el-icon-close" circle @click="restForm('ihcsForm')"></el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="12">

        <el-form :model="ihcsForm" status-icon ref="ihcsForm" label-width="100px">
          <el-form-item label="病理号" prop="number">
            <el-input
              v-model="ihcsForm.number"
              auto-complete="on"
              placeholder="请输入病理号"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="小号" prop="son">
            <el-input
              v-model="ihcsForm.son"
              auto-complete="on"
              placeholder="请输入小号。比如-01则输入1(默认)"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="加做项目数" prop="total">
            <el-input
              v-model="ihcsForm.total"
              placeholder="请输入加做项目数。如:免疫组化2项则输入2(默认)"></el-input>
          </el-form-item>
          <el-form-item label="细项输入模式" prop="model">
            <el-switch
              v-model="model"
              active-text="复制"
              inactive-text="手动录入"
              @change='change'>
            </el-switch>
          </el-form-item>
          <el-form-item label="具体细项" prop="item">

            <el-select
              v-model="ihcsForm.item"
              placeholder="请选择具体细项(默认P16、Ki67)"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              v-show="showItem">
              <el-option
                v-for="item in items"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>

            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入具体细项，以、分隔。如P16、Ki67(默认)"
              v-model="ihcsForm.item"
              v-show="!showItem">
            </el-input>

          </el-form-item>
          <el-form-item label="项目" prop="prj">
            <el-input
              disabled
              v-model="ihcsForm.prj"></el-input>
          </el-form-item>
          <el-form-item label="原病理诊断" prop="results">
            <el-input
              type="textarea"
              disabled
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="ihcsForm.results">
            </el-input>
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
  import {encodePwd} from '@/utils/encrypt.js'
  import {getItems} from '@/assets/items.js'
  export default {
    data() {
      return {
        tips: '',
        model: true,
        showItem: false,
        ihcsForm: {
          id: '',
          number: '',
          son: '',
          total: '',
          item: '',
          userid: '',
          time: '',
          prj: '',
          results: '',
          state: true,
          ismatch: '',
        },
        items: getItems(),
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
        // 处理默认值
        if (this.ihcsForm.son == "") {
          this.ihcsForm.son = "01"
        }
        if (this.ihcsForm.total == "") {
          this.ihcsForm.total = 2
        }
        // 处理item
        // 手动输入
        let item = this.ihcsForm.item.toString();
        // 全部替换
        this.ihcsForm.item = item.replace(/\,/g, "、");
        if (this.ihcsForm.item == null || this.ihcsForm.item == "") {
          this.ihcsForm.item = "P16、Ki67"
        }
        // 验证输入的细项数与实际细项数
        if (this.ihcsForm.total != this.ihcsForm.item.split('、').length) {
          // 不一致, 提示并阻止提交
          this.$message.error("输入的加做项目数与实际项目数不符，请修改后重新提交。")
          return false
        }
        // 处理用户id
        this.ihcsForm.userid = (JSON.parse(sessionStorage.userInfo)).id;
        // 处理time
        this.ihcsForm.time = new Date().getTime()
        // 处理ismatch
        this.ihcsForm.ismatch = true
        // 提交表单
        let method = (this.ihcsForm.id == '' ? 'post' : 'put')
        // let method = 'post'
        this.$http({
            method: method,
            url: '/ihcs/upd',
            data: this.ihcsForm,
          }).then(response => {
          // success
          let data = response.data
          if (data > 0) {
            this.$message({
              message: '成功更新' + data + '条加做记录。',
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
      print() {
        this.$message({
          message: 'print',
          type: 'success',
          center: true
        });
      },
      change(callback) {
        this.showItem = !callback
      }
    },

    mounted() {
      if (sessionStorage.userInfo != null) {

      } else {
        this.$router.push('/')
      }
      if (this.$route.params.ihcs != ' ') {
        this.ihcsForm = this.$route.params[0];
      }
    }

  }
</script>
