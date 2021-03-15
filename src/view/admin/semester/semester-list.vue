<template>
  <div class="container">
    <div class="title">学期列表信息</div>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">新增学期</el-button>
    <lin-table
      :tableColumn="tableColumn"
      :tableData="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @row-click="rowClick"
      v-loading="loading"
    >
    </lin-table>
    <el-dialog
      title="学期信息"
      :append-to-body="true"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="classListInfoDialog"
    >
      <div style="margin-top:-25px;">
        <el-form
          status-icon
          v-if="dialogFormVisible"
          ref="form"
          label-width="120px"
          :model="form"
          label-position="labelPosition"
          :rules="rules"
          style="margin-left:-35px;margin-bottom:-35px;margin-top:15px;"
        >
          <el-form-item label="学期名称" prop="name">
            <el-input size="medium" clearable v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学期描述" prop="info">
            <el-input size="medium" clearable v-model="form.info"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="padding-left:5px;">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="新增学期"
      :append-to-body="true"
      :visible.sync="dialogSemesterFormVisible"
      :before-close="handleClose"
      class="classListInfoDialog"
    >
      <div style="margin-top:-25px;">
        <el-form
          status-icon
          v-if="dialogSemesterFormVisible"
          ref="create-form"
          label-width="120px"
          :model="form"
          label-position="labelPosition"
          :rules="rules"
          style="margin-left:-35px;margin-bottom:-35px;margin-top:15px;"
        >
          <el-form-item label="学期名称" prop="name">
            <el-input size="medium" clearable v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学期描述" prop="info">
            <el-input size="medium" clearable v-model="form.info"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="padding-left:5px;">
        <el-button type="primary" @click="confirmCreate('create-form')">确 定</el-button>
        <el-button @click="resetForm('create-form')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Admin from '@/lin/model/admin'
import LinTable from '@/component/base/table/lin-table'

export default {
  components: {
    LinTable,
  },
  inject: ['eventBus'],
  data() {
    return {
      id: 0, // 班级id
      tableData: [], // 表格数据
      tableColumn: [], // 表头数据
      operate: [], // 表格按键操作区
      dialogFormVisible: false, // 是否弹窗
      dialogSemesterFormVisible: false, // 是否弹窗
      labelPosition: 'right', // 设置label位置
      form: {
        // 表单信息
        name: '',
        info: '',
      },
      cacheForm: {
        // 缓存第一次的表单信息
        name: '',
        info: '',
      },
      loading: false,
      activeTab: '修改信息', // tab 标题
      rules: {
        // 表单验证规则
        name: [{ required: true, message: '请输入学期名称', trigger: 'blur' }],
        info: [],
      },
    }
  },
  methods: {
    // 获取所有班级并传给table渲染
    async getAllSemesters() {
      try {
        this.loading = true
        this.tableData = await Admin.getAllSemesters()
        this.loading = false
      } catch (e) {
        this.loading = false
        // console.log(e)
      }
    },
    async confirmEdit() {
      // 修改班级信息
      if (this.form.name === '') {
        this.$message.warning('请将信息填写完整')
        return
      }
      if (this.cacheForm.name !== this.form.name || this.cacheForm.info !== this.form.info) {
        // eslint-disable-line
        const res = await Admin.updateOneSemester(this.form.name, this.form.info, this.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.getAllSemesters()
        }
      }
      this.dialogFormVisible = false
    },
    async confirmCreate(formName) {
      // 修改班级信息
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (valid) {
          let res
          try {
            this.loading = true
            res = await Admin.createOneSemester(this.form.name, this.form.info)
          } catch (e) {
            this.loading = false
            // console.log(e)
          }
          if (res.code < window.MAX_SUCCESS_CODE) {
            this.loading = false
            this.$message.success(`${res.message}`)
            this.getAllSemesters()
            this.resetForm()
          } else {
            this.loading = false
            this.$message.error(`${res.message}`)
          }
        } else {
          this.$message.error('请将信息填写完整')
          return false
        }
      })
      this.dialogSemesterFormVisible = false
    },
    resetForm() {
      this.form = {
        name: '',
        info: '',
      }
    },
    // 获取所拥有的权限并渲染  由子组件提供
    handleEdit(val) {
      let selectedData
      // 单击 编辑按键
      if (val.index >= 0) {
        selectedData = val.row
      } else {
        // 单机 table row
        selectedData = val
      }
      this.id = selectedData.id
      this.form.name = selectedData.name
      this.form.info = selectedData.info
      this.cacheForm = { ...this.form }
      this.dialogFormVisible = true
    },
    handleCreate() {
      this.form.name = ''
      this.form.info = ''
      this.dialogSemesterFormVisible = true
    },
    handleDelete(val) {
      let res
      this.$confirm('此操作将永久删除该学期, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          this.loading = true
          res = await Admin.deleteOneSemester(val.row.id)
        } catch (e) {
          this.loading = false
          // console.log(e)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          await this.getAllSemesters()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: `${res.message}`,
          })
        }
      })
    },
    // 双击 table row
    rowClick(row) {
      this.handleEdit(row)
    },
    // 弹框 右上角 X
    handleClose(done) {
      done()
    },
    // 切换tab栏
    handleClick(tab) {
      this.activeTab = tab.name
    },
    // 监听分添加组是否成功
    async addSemester(flag) {
      if (flag === true) {
        await this.getAllSemesters()
      }
    },
  },
  async created() {
    await this.getAllSemesters()
    this.tableColumn = [
      { prop: 'name', label: '名称' },
      { prop: 'info', label: '信息' },
    ] // 设置表头信息
    this.operate = [
      { name: '信息', func: 'handleEdit', type: 'primary' },
      { name: '删除', func: 'handleDelete', type: 'danger' },
    ]
    // 监听添加班级是否成功
    this.eventBus.$on('addSemester', this.addSemester)
  },
  beforeDestroy() {
    this.eventBus.$off('addSemester', this.addSemester)
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
  }
}
.classListInfoDialog /deep/ .el-dialog__footer {
  text-align: left;
  padding-left: 30px;
}
.classListInfoDialog /deep/ .el-dialog__header {
  padding-left: 30px;
}

.classListInfoDialog /deep/ .el-dialog__body {
  padding: 30px;
}
</style>
