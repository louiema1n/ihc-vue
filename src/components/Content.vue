<template>
  <!-- content -->
  <el-main style="height: calc(100vh - 60px)">

    <!-- Toolbar -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px; height: 40px">
      <el-col :span="24">
        <!-- 日期时间选择 -->
        <div style="float: left">
          <el-date-picker
            v-model="valueDateTime"
            type="datetimerange"
            align="right"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="handleTime"
            :default-time="['16:00:00', '15:59:59']">
          </el-date-picker>
        </div>

        <div style="float: left; margin-left: 10px;">
          <el-input
            placeholder="请输入病理号搜索"
            prefix-icon="el-icon-search"
            v-model="searchNo"
            autofocus
            ref="searchNo"
            @keyup.enter.native="onblur"
            @blur="blur"
            clearable>
          </el-input>
        </div>


        <!--<el-button icon="el-icon-search" circle></el-button>-->
        <div style="float: right;">
          <el-tag type="success">{{this.sucTotal}}</el-tag>
          <el-tag type="danger">{{this.errTotal}}</el-tag>
          <el-upload style="float: right; margin-left: 10px"
                     action="/ihcs/upload"
                     name="fileIhcs"
                     :on-success="uploadFileSuccess"
                     :on-error="uploadFileError"
                     :show-file-list="false"
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <el-button icon="el-icon-upload" round>导入</el-button>
          </el-upload>
          <el-button type="success" icon="el-icon-plus" circle @click="add"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="edit"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del"></el-button>
          <el-button-group>
            <el-button type="warning" icon="el-icon-printer" @click="printLabel" round>标签</el-button>
            <el-button type="info" icon="el-icon-printer" @click="printTab" round>加做单</el-button>
          </el-button-group>

        </div>
      </el-col>
    </el-row>

    <!-- Table -->
    <el-row type="flex" justify="center" id="print">
      <el-col :span="24">

        <!-- Table -->
        <el-table
          id="tableIhc"
          :data="tableIhc"
          ref="tableIhc"
          height="calc(100vh - 160px)"
          stripe
          border
          @row-click="singleRow"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="#"
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="number"
            label="病理号"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="son"
            label="小号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="item"
            label="加做项目"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="细项数"
            sortable
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            prop="prj"
            label="项目"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ismatch"
            label="备注"
            sortable
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>原诊断结果:</p>
                <pre>{{ scope.row.results }}</pre>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" :type="scope.row.ismatch ? 'success' : 'danger'">{{ scope.row.ismatch ? "成功" : "失败"}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="timeP"
            label="加做时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="nick"
            label="加做人"
            align="center"
            width="110">
          </el-table-column>
          <el-table-column
            label="打印HE"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="tableIhc[scope.$index].defaultHE"
                active-color="#67C23A">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import {timestamp2String, addZero} from '@/utils/DateFormat.js'
  import {printIhcsTable} from '@/utils/Print.js'

  export default {
    data() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      return {
        tableIhc: [],
        valueDateTime: [new Date(year, month, day - 1, 16, 0, 0), new Date(year, month, day, 15, 59, 59)],
        multiSelectionData: [],
        searchNo: '',
        sucTotal: 0,
        errTotal: 0,
      }
    },
    methods: {
      add() {
        this.$router.push('/ihcsForm/ ')
      },
      singleRow(row, event, column) {
        this.$refs.tableIhc.toggleRowSelection(row);
      },
      handleSelectionChange(selection) {
        this.multiSelectionData = selection
      },
      del() {
        let multiSelectionData = this.multiSelectionData
        if (multiSelectionData.length > 0) {
          multiSelectionData.forEach(data => {
            // 处理state
            data.state = 0
            // 提交表单
            this.$http.delete('/ihcs/upd',
              {
                data: data
              }
            ).then(response => {
              // success
              let res = response.data
              if (res > 0) {
                this.$message({
                  message: '成功删除' + res + '条加做记录。',
                  type: 'success',
                  center: true
                });
                // 从表格列表中移除
                this.tableIhc.forEach((ihc, index) => {
                  if (ihc == data) {
                    this.tableIhc.splice(index, 1)
                  }
                })
                // this.tableIhc.splice(0, 1)
              }
            }, reasonse => {
              // error
              this.$message({
                message: reasonse.message,
                center: true,
                type: 'error'
              })
            });
          });
        } else {
          this.$message.info("请选择需要删除数据")
        }
      },
      edit() {
        if (this.multiSelectionData.length == 1) {
          this.$router.push({name: 'ihcsForm', params: this.multiSelectionData})
        } else {
          this.$message.info("请选择需要修改的那1条数据")
        }
      },
      handleTime() {
        this.getDataSources()
      },
      getDataSources() {
        var data = []
        // get传参用params
        let dataTime = this.valueDateTime
        // 格式化begin, end, searchNo
        let begin, end, searchNo
        if (dataTime == null) {
          begin = '';
          end = '';
        } else {
          begin = timestamp2String(new Date(this.valueDateTime[0]).getTime())
          end = timestamp2String(new Date(this.valueDateTime[1]).getTime())
        }
        searchNo = this.searchNo == "" ? 0 : this.searchNo
        this.$http({
          url: '/ihcs/all',
          method: 'get',
          params: {
            begin: begin,
            end: end,
            searchNo: searchNo,
          }
        }).then(respose => {
          for (let i = 0; i < respose.data.length; i++) {
            var obj = {}
            obj.number = respose.data[i].number
            obj.id = respose.data[i].id
            let son = respose.data[i].son
            obj.son = son < 10 ? '0' + son : son
            obj.total = respose.data[i].total
            obj.item = respose.data[i].item
            obj.time = respose.data[i].time
            obj.timeP = respose.data[i].timeP
            obj.remark = respose.data[i].remark
            obj.nick = respose.data[i].user == null ? respose.data[i].confirm : respose.data[i].user.nick
            obj.userid = sessionStorage.userInfo.id
            obj.state = respose.data[i].state
            obj.prj = respose.data[i].prj
            obj.ismatch = respose.data[i].ismatch
            obj.results = respose.data[i].results
            obj.defaultHE = true
            data[i] = obj
            // 统计
            if (obj.ismatch) {
              this.sucTotal++
            } else {
              this.errTotal++
            }
          }
          this.tableIhc = data
        }, response => {
          this.$message.error('服务器繁忙，请稍后再试')
        });
      },
      blur(event) {
        this.getDataSources()
      },
      // 打印加做清单
      printTab() {
        let data = this.multiSelectionData
        if (data == 0) {
          // 未选择则打印全部
          data = this.tableIhc
        }
        let html = printIhcsTable(data, (JSON.parse(sessionStorage.userInfo)).nick); // 需要打印的内容
        let newWin = window.open('', '', '')  // 打开新页面
        // let newWin = window.open('', '_self', '')  // 在当前页面新打开页面
        newWin.document.write(html)
        newWin.print()
        newWin.close() // 关闭新打开窗口
        // newWin.location.reload() // 重新加载使窗口恢复到打印前状态
      },
      // 打印标签
      printLabel() {
        // 1.根据选择的内容生成标签所需数据，eg:18085885,-01,HE,,18085885-01.01.K2011011
        let data = this.multiSelectionData
        if (data == 0) {
          // 未选择则打印全部
          data = this.tableIhc
        }
        let result = ''
        // 遍历
        data.forEach((ihcs, indexIhcs) => {
          // 初始化items
          let ihcLabel = ''
          let items = ihcs.item.split('、')
          // 第一张打印是否默认he
          if (ihcs.defaultHE) {
            ihcLabel += ihcs.number + ',-' + ihcs.son + ',HE,,' + ihcs.number + '-' + ihcs.son + '.' + addZero(1) + '.CODE\r\n';
          }
          items.forEach((item, indexItem) => {
            ihcLabel += ihcs.number + ',-' + ihcs.son + ',' + item + ',,' + ihcs.number + '-' + ihcs.son + '.' + addZero(indexItem + 2) + '.CODE\r\n';
          })
          result += ihcLabel
        })
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
      onblur() {
        this.$refs['searchNo'].blur()
      },
      // 上传文件成功
      uploadFileSuccess(response, file, fileList) {
        this.$message.success(file.name + " 上传成功")
        this.getDataSources()
      },
      // 上传失败
      uploadFileError(err, file, fileList) {
        this.$message.error(err)
      }
    },
    created: function () {
      this.getDataSources()
    },
    mounted() {

    }

  }
</script>

<style>

</style>
