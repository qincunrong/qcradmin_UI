<template>
  <section>

    <!--工具条-->
    <el-col class="head_toolbar" :span="24">
      <el-form :model="query" :inline="true">

        <el-form-item>
          <el-input v-model="query.name" placeholder="请输入要查询内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.native="doQuery">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.native="showAddDialog">新增</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click.native="onBatchDelete" :disabled="selectedUserList.length===0">批量删除
          </el-button>
        </el-form-item>

      </el-form>
    </el-col>


    <!--列表-->
    <el-table class="user_table"
              stripe
              :header-cell-style="setTableHeadCellStyle"
              :cell-style="setTableCellStyle"
              :data="userList"
              highlight-current-row
              v-loading="isDataLoading"
              @selection-change="onListSelectChanged"
              @sort-change='onListSortChanged'
              style="width: 100%;">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="60"/>
      <el-table-column prop="name" label="姓名" width="120" sortable/>
      <el-table-column prop="sex" label="性别" width="80" :formatter="formatSex" sortable/>
      <el-table-column prop="age" label="年龄" width="80" sortable/>
      <el-table-column prop="birth" label="生日" width="120" sortable/>
      <el-table-column prop="addr" label="地址" min-width="180" sortable/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click.native="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--底部工具条-->
    <el-col class="foot_toolbar" :span="24">
      <el-pagination layout="prev,pager,next" @current-change="onPageSelected" :page-size="pageSize" :total="total"
                     style="float:right;" background></el-pagination>
    </el-col>

    <!--新增对话框-->
    <el-dialog title="新增"
               :visible.sync="addFormVisible"
               :close-on-click-modal="true"
               :modal="true"
               show-close="false"
               class="addDialog">
      <el-form :model="addForm"
               label-width="80px"
               label-position="right"
               :rules="addFormRules"
               ref="addForm">
        <el-form-item label="姓名" prop="name" class="form_item">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" class="form_item">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" class="form_item">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>

        <el-form-item label="生日" class="form_item">
          <el-date-picker v-model="addForm.birth" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="地址" class="form_item">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog_footer">
        <el-button @click.native="addFormVisible=false">取消</el-button>
        <el-button @click.native="doAddForm" type="primary" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑对话框-->
    <el-dialog title="编辑"
               :visible.sync="editFormVisible"
               :close-on-click-modal="true"
               :modal="true"
               show-close="false"
               class="editDialog">
      <el-form :model="editForm"
               label-width="80px"
               label-position="right"
               :rules="editFormRules"
               ref="editForm">
        <el-form-item label="姓名" prop="name" class="form_item">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别" class="form_item">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" class="form_item">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>

        <el-form-item label="生日" class="form_item">
          <el-date-picker v-model="editForm.birth" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="地址" class="form_item">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog_footer">
        <el-button @click.native="editFormVisible=false">取消</el-button>
        <el-button @click.native="doEditForm" type="primary" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>


  </section>
</template>

<script>
  import {requestUserListPage, addUser, editUser,removeUser,batchRemoveUser} from '@/api/api'
  import Utils from '@js/util'
  import StringUtils from "@js/StringUtils"

  export default {
    name: "User.vue",

    data() {
      return {
        query: {
          name: ""
        },
        selectedUserList: [],
        userList: [],
        pageIndex: 1,
        pageSize: 15,
        total: 0,
        isDataLoading: false,

        //新增界面数据
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },

        //编辑界面数据
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },

        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
      }
    },

    methods: {
      setTableHeadCellStyle({row, column, rowIndex, columnIndex}) {
        let style = ' background:#F1F2F7 ; paddingTop: 6px ; paddingBottom: 6px ;';
        console.log("columnIndex==" + columnIndex)
        if (columnIndex != 6) {
          style += " text-align:center "
        }
        return style;

      },
      setTableCellStyle({row, column, rowIndex, columnIndex}) {
        let style = ' paddingTop: 6px ; paddingBottom: 6px ;';
        if (columnIndex != 6) {
          style += " text-align:center "
        }
        return style;

      },
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },

      onListSelectChanged(selectList) {
        this.selectedUserList = selectList
      },
      onListSortChanged(column, prop, order) {
        console.log(`onListSortChangd======${column.prop}====${column.order}`)
      },
      onPageSelected(currentPage) {
        this.pageIndex = currentPage;
        this.doRequestGetUserList()
      },
      onBatchDelete() {
        this.$confirm("确定删除选中记录吗？","提示",{
          type: 'warning'
        }).then(()=>{
          this.isDataLoading=true;
          let ids = this.selectedUserList.map(item => item.id).toString();
          let params={ids: ids}
          batchRemoveUser(params).then((res)=>{
            this.isDataLoading=false;
            this.$message.success("删除成功");
            this.doRequestGetUserList()
          })

        })
      },
      handleDelete(index, row) {
        this.$confirm("确定删除该记录吗？","提示",{
            type:'warning'
        }).then(()=>{
          this.isDataLoading=true;
          let params={id: row.id}
          removeUser(params).then((res)=>{
            this.isDataLoading=false;
            this.$message.success("删除成功");
            this.doRequestGetUserList()
          })
        })
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      doQuery() {
        this.doRequestGetUserList()
      },
      doAddForm() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm("确定要提交吗？", "提示", {}).then(() => {
              this.addLoading = true;
              let params = Object.assign({}, this.addForm);
              params.birth = StringUtils.isEmpty(params.birth) ? '' : Utils.formatDate.format(params.birth, "yyyy-MM-dd");
              addUser(params).then((res) => {
                this.addLoading = false;
                this.$message.success("提交成功")
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.doRequestGetUserList()
              })
            })
          }
        })
      },
      doEditForm() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm("确定要提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              let params = Object.assign({}, this.editForm);
              try{
                params.birth = StringUtils.isEmpty(params.birth) ? '' : Utils.formatDate.format(params.birth, "yyyy-MM-dd");
              }catch (e) {
              }
              editUser(params).then((res) => {
                this.editLoading = false;
                this.$message.success("提交成功")
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.doRequestGetUserList()
              })
            })
          }
        })
      },
      showAddDialog() {
        // alert("hh")
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }
      },
      doRequestGetUserList() {
        let params = {
          page: this.pageIndex,
          name: this.query.name,
          pageSize: this.pageSize,
        }
        this.isDataLoading = true
        requestUserListPage(params).then((res) => {
          this.total = res.data.total;
          this.userList = res.data.users;
          this.isDataLoading = false
        }).catch((msg) => {
          this.$message.error(msg);
        })
      }

    },


    mounted() {
      this.doRequestGetUserList();
    }
  }
</script>

<style scoped lang="stylus">

  .head_toolbar {
    text-align left
  }

  .user_table {

  }

  .foot_toolbar {
    margin-top 20px
    margin-bottom 40px
  }

  .addDialog {

    .form_item {
      text-align left
    }
  }
  .editDialog {

    .form_item {
      text-align left
    }
  }


</style>
