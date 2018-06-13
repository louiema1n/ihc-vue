<template>
  <!-- 新增/修改 -->
  <el-main style="height: calc(100vh - 60px)">

    <!-- Toolbar -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px; height: 40px">
      <el-col :span="24">
        <div style="float: right">
          <el-button type="warning" icon="el-icon-printer" @click="printOthersLabel" round>打印标签</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="12">

        <el-form :model="ihcsForm" status-icon ref="ihcsForm" label-width="100px">

          <el-form-item label="病理号" prop="number">
            <el-input placeholder="病理号" v-model="ihcsForm.number">
              <el-select v-model="ihcsForm.selectPre" slot="prepend" placeholder="前缀" style="width: 80px">
                <el-option label="" value=""></el-option>
                <el-option label="CT" value="CT"></el-option>
                <el-option label="CN" value="CN"></el-option>
                <el-option label="CL" value="CL"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="小号" prop="son">
            <el-input
              v-model="ihcsForm.son"
              auto-complete="on"
              placeholder="请输入小号。比如-01则输入1(默认)"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="细项名称" prop="item">
            <el-input
              v-model="ihcsForm.item"
              placeholder="比如：P16、Ki67，默认为HE。必须使用中文、进行分隔"></el-input>
          </el-form-item>
          <el-form-item label="打印数量" prop="total">
            <el-input-number v-model="ihcsForm.total" :min="1" :max="100" label="打印数量"></el-input-number>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </el-main>
</template>

<script>
  // import {setCookie, getCookie} from '@/assets/cookie.js'
  import {encodePwd} from '@/utils/encrypt.js'
  import {getItems} from '@/assets/items.js'
  import {addZero} from '@/utils/DateFormat.js'

  export default {
    data() {
      return {
        ihcsForm: {
          number: '',
          son: '',
          item: '',
          total: '',
          selectPre: '',
        },
      }
    },
    methods: {
      printOthersLabel() {
        if (this.ihcsForm.number == '') {
          this.$message.error("请输入病理号");
        } else {
          // 生成标签
          this.buildLabel()
        }
      },
      buildLabel() {
        // eg:18085885,-01,HE,,18085885-01.01.K2011011
        // 初始化son
        if (this.ihcsForm.son == '') {
          this.ihcsForm.son = 1
        }
        // 初始化item
        if (this.ihcsForm.selectPre == '' && this.ihcsForm.item == '') {
          this.ihcsForm.item = 'HE'
        }

        let result = ''
        let itemArr = this.ihcsForm.item.split('、')
        for (let j = 0; j < this.ihcsForm.total; j++) {
          for (let i = 0; i < itemArr.length; i++) {
            result += this.ihcsForm.selectPre +
              this.ihcsForm.number + ',-' +
              addZero(this.ihcsForm.son) + ',' +
              itemArr[i] + ',,' +
              this.ihcsForm.selectPre + this.ihcsForm.number + '-' +
              addZero(this.ihcsForm.son) + '.' + addZero(i + 1) +
              '.CODE\r\n'
          }
        }
        // 弹出提示
        this.$notify.warning({
          title: '温馨提示',
          message: '请确保玻片打印机及程序已经启动。',
          showClose: false
        });
        // 2.提交到后台服务器
        this.$http.post('/ihcs/print', {
          result
        }).then(response => {
          // success
          let res = response.data
          if (res != null) {
            this.$message({
              message: res,
              type: 'success',
              center: true
            });
          }
        }, reasonse => {
          // error
          this.$message({
            message: reasonse.message,
            center: true,
            type: 'error'
          })
        });
      },
    },

    mounted() {
      if (sessionStorage.userInfo != null) {

      } else {
        this.$router.push('/')
      }
    }

  }
</script>
