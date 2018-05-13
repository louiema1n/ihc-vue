<template>
  <!-- content -->
  <el-main style="height: calc(100vh - 60px)">

    <!-- Toolbar -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px; height: 40px">
      <el-col :span="24">
        <!--<el-button icon="el-icon-search" circle></el-button>-->
        <div style="float: right;">
          <el-button type="success" icon="el-icon-plus" circle @click="add"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="edit"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del"></el-button>
        </div>
      </el-col>
    </el-row>

    <!-- Table -->
    <el-row type="flex" justify="center" id="print">
      <el-col :span="24">

        <!-- Table -->
        <el-table
          id="tableUser"
          :data="tableUser"
          ref="tableUser"
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
            prop="username"
            align="center"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nick"
            label="昵称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
        tableUser: [],
        multiSelectionData: [],
        searchNo: '',
      }
    },
    methods: {
      add() {
        this.$router.push('/userForm/ ')
      },
      singleRow(row, event, column) {
        this.$refs.tableUser.toggleRowSelection(row);
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
            this.$http.delete('/user/upd',
              {
                data: data
              }
            ).then(response => {
              // success
              let res = response.data
              if (res > 0) {
                this.$message({
                  message: '成功删除' + res + '条用户记录。',
                  type: 'success',
                  center: true
                });
                // 从表格列表中移除
                this.tableUser.forEach((ihc, index) => {
                  if (ihc == data) {
                    this.tableUser.splice(index, 1)
                  }
                })
                // this.tableUser.splice(0, 1)
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
          this.$router.push('/userForm/' + JSON.stringify(this.multiSelectionData))
        } else {
          this.$message.info("请选择需要修改的那1条数据")
        }
      },
      getDataSources() {
        let data = []
        this.$http({
          url: '/user/all',
          method: 'get',
        }).then(respose => {
          for (let i = 0; i < respose.data.length; i++) {
            var obj = {}
            obj.id = respose.data[i].id
            obj.username = respose.data[i].username
            obj.nick = respose.data[i].nick
            obj.email = respose.data[i].email
            obj.remark = respose.data[i].remark
            obj.password = respose.data[i].password
            obj.state = respose.data[i].state
            data[i] = obj
          }
          this.tableUser = data
        }, response => {
          this.$message.error('服务器繁忙，请稍后再试')
        });
      },
    },
    created: function () {
      this.getDataSources()
    },
    mounted() {
      if (sessionStorage.userInfo != null) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        this.username = (JSON.parse(sessionStorage.userInfo)).nick;
        let usr = (JSON.parse(sessionStorage.userInfo)).username;
        if (usr != 'admin') {
          this.$router.push('/content');
        }
      } else {
        this.$router.push('/')
      }
    }
  }
</script>

<style>

</style>
