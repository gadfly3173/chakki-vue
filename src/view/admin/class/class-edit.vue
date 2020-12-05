<template>
  <div class="container">
    <div class="title">编辑 {{ this.$route.params.name }} 班级人员</div>
    <div class="content">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddButton">向班级内添加学生</el-button>
      <el-button
        type="warning"
        icon="el-icon-circle-plus-outline"
        @click="handleAddTeacherButton(1)"
        v-if="teacherData.length < 1"
        >添加教师</el-button
      >
      <el-button type="warning" icon="el-icon-circle-plus-outline" @click="handleAddTeacherButton(2)"
        >添加助教</el-button
      >
      <div class="table-title">
        教师
      </div>
      <el-table :data="teacherData" style="width: 100%;margin-top:10px">
        <el-table-column fixed prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="nickname" label="昵称/姓名"></el-table-column>
        <el-table-column prop="level" label="级别">
          <template slot-scope="scope">
            <div :class="{ 'main-teacher': isMainTeacherLevel(scope.row.level) }">
              {{ scope.row.level | teacherFilter }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleTeacherDelete(scope.row)" type="primary" plain size="mini">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-title">
        学生
      </div>
      <el-table :data="tableData" style="width: 100%;margin-top:10px">
        <el-table-column fixed prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="nickname" label="昵称/姓名"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="primary" plain size="mini">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :background="true"
          :page-size="pageCount"
          :current-page="currentPage"
          v-if="refreshPagination"
          layout="prev, pager, next, jumper"
          :total="total_nums"
        ></el-pagination>
      </div>
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <div style="padding-left:5px;margin-top: 30px;">
            <el-button @click="goBack">返回</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="向班级内添加学生"
        :append-to-body="true"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        class="classListInfoDialog"
      >
        <div style="margin-top:-25px;">
          <el-input
            placeholder="请输入内容"
            size="medium"
            prefix-icon="el-icon-search"
            v-model="searchText"
            @keyup.enter.native="handleSearch"
          ></el-input>
          <el-scrollbar class="checkbox-group">
            <el-checkbox-group v-model="checkList" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
              <el-checkbox :label="item.id" :key="item.id" v-for="item in searchResult">
                <li class="checkbox-label">{{ item.username }} - {{ item.nickname }}</li>
              </el-checkbox>
            </el-checkbox-group>
            <p v-if="infiniteLoading" class="loadingText">加载中...</p>
            <p v-if="noMore" class="loadingText">没有更多了</p>
          </el-scrollbar>
        </div>
        <div slot="footer" class="dialog-footer" style="padding-left:5px;">
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
          <el-button @click="resetForm">重 置</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="teacherLevel ? '向班级内添加教师' : '向班级内添加助教'"
        :append-to-body="true"
        :visible.sync="teacherSelectVisible"
        :before-close="handleClose"
        class="classListInfoDialog"
      >
        <div style="margin-top:-25px;">
          <el-input
            placeholder="请输入内容"
            size="medium"
            prefix-icon="el-icon-search"
            v-model="searchText"
            @keyup.enter.native="handleTeacherSearch"
          ></el-input>
          <el-scrollbar class="checkbox-group">
            <el-checkbox-group
              v-model="checkList"
              v-infinite-scroll="loadTeacher"
              :infinite-scroll-disabled="disabled"
              :max="1"
            >
              <el-checkbox :label="item.id" :key="item.id" v-for="item in searchResult">
                <li class="checkbox-label">{{ item.username }} - {{ item.nickname }}</li>
              </el-checkbox>
            </el-checkbox-group>
            <p v-if="infiniteLoading" class="loadingText">加载中...</p>
            <p v-if="noMore" class="loadingText">没有更多了</p>
          </el-scrollbar>
        </div>
        <div slot="footer" class="dialog-footer" style="padding-left:5px;">
          <el-button type="primary" @click="confirmAddTeacher">确 定</el-button>
          <el-button @click="resetForm">重 置</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Admin from '@/lin/model/admin'

export default {
  inject: ['eventBus'],
  data() {
    return {
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      tableData: [],
      teacherData: [],
      loading: false,
      class_id: 1,
      dialogFormVisible: false, // 是否弹窗
      teacherSelectVisible: false,
      searchText: '',
      checkList: [],
      searchResult: [],
      count: 0,
      searchTotal: 0,
      infiniteLoading: false,
      teacherLevel: 1,
    }
  },
  methods: {
    // 根据分组 刷新/获取班级内的用户
    async getPageStudents() {
      const currentPage = this.currentPage - 1
      try {
        this.loading = true
        const res = await Admin.getAllStudents({ class_id: this.class_id, count: this.pageCount, page: currentPage })
        this.loading = false
        this.tableData = res.items
        this.total_nums = res.total
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async getPageTeachers() {
      try {
        this.loading = true
        const res = await Admin.getAllTeachers({ class_id: this.class_id })
        this.loading = false
        this.teacherData = res.items
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      await this.getPageStudents('changePage')
      this.loading = false
    },
    handleDelete(val) {
      let res
      this.$confirm('此操作将从此班级中移除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          this.loading = true
          res = await Admin.dispatchStudentClass(val.id, [this.class_id])
        } catch (e) {
          this.loading = false
          console.log(e)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.loading = false
          if (this.total_nums % this.pageCount === 1 && this.currentPage !== 1) {
            // 判断删除的是不是每一页的最后一条数据
            this.currentPage--
          }
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        } else {
          this.loading = false
          this.$message.error(`${res.message}`)
        }
      })
    },
    handleTeacherDelete(val) {
      let res
      this.$confirm('此操作将从此班级中移除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          this.loading = true
          res = await Admin.dispatchTeacherClass(val.id, [this.class_id])
        } catch (e) {
          this.loading = false
          console.log(e)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.loading = false
          this.getPageTeachers()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        } else {
          this.loading = false
          this.$message.error(`${res.message}`)
        }
      })
    },
    handleAddButton() {
      this.dialogFormVisible = true
    },
    handleAddTeacherButton(val) {
      this.teacherSelectVisible = true
      this.teacherLevel = val
    },
    async handleSearch() {
      if (this.searchText.trim().length === 0) {
        this.searchResult = []
        this.count = 0
        return
      }
      const res = await Admin.getFreshStudentByName(this.class_id, this.searchText, this.pageCount, 0)
      this.searchResult = res.items
      this.searchTotal = res.total
      this.count = res.items.length
      this.checkList = []
    },
    async handleTeacherSearch() {
      if (this.searchText.trim().length === 0) {
        this.searchResult = []
        this.count = 0
        return
      }
      const res = await Admin.getFreshTeacherByName(this.class_id, this.searchText, this.pageCount, 0)
      this.searchResult = res.items
      this.searchTotal = res.total
      this.count = res.items.length
      this.checkList = []
    },
    async load() {
      const res = await Admin.getFreshStudentByName(
        this.class_id,
        this.searchText,
        this.pageCount,
        Math.floor(this.count / this.pageCount),
      )
      this.searchResult.push(...res.items)
      this.searchTotal = res.total
      this.count += res.items.length
    },
    async loadTeacher() {
      const res = await Admin.getFreshTeacherByName(
        this.class_id,
        this.searchText,
        this.pageCount,
        Math.floor(this.count / this.pageCount),
      )
      this.searchResult.push(...res.items)
      this.searchTotal = res.total
      this.count += res.items.length
    },
    async confirmEdit() {
      if (this.checkList.length > 0) {
        const res = await Admin.addStudentClass(this.class_id, this.checkList)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.getPageStudents()
          this.resetForm()
        }
      }
      this.dialogFormVisible = false
    },
    async confirmAddTeacher() {
      if (this.checkList.length > 0) {
        const res = await Admin.addTeacherClass(this.class_id, this.checkList, this.teacherLevel)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.getPageTeachers()
          this.resetForm()
        }
      }
      this.teacherSelectVisible = false
    },
    resetForm() {
      this.searchText = ''
      this.searchResult = []
      this.checkList = []
    },
    // 弹框 右上角 X
    handleClose(done) {
      done()
    },
    isMainTeacherLevel(val) {
      if (val === 1) {
        return true
      }
      return false
    },
    goBack() {
      this.$router.go(-1)
    },
  },
  async created() {
    this.class_id = this.$route.params.id
    await this.getPageStudents()
    await this.getPageTeachers()
  },
  computed: {
    noMore() {
      return this.count >= this.searchTotal
    },
    disabled() {
      return this.infiniteLoading || this.noMore
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .content {
    margin-top: 10px;
    padding-left: 33px;
    padding-right: 40px;
    .table-title {
      font-weight: 700;
      margin: 10px;
      padding-top: 10px;
    }
    .main-teacher {
      color: #f4516c;
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-right: -10px;
      margin-top: 15px;
    }
  }

  .submit {
    float: left;
  }
}
/deep/ .infinite-list-wrapper {
  height: 50vh;
}

/deep/ .loadingText {
  margin: 0 auto;
  text-align: center;
  color: rgb(218, 218, 218);
  font-size: 13px;
  user-select: none;
  padding-top: 15px;
}

/deep/ .el-dialog__footer {
  text-align: left;
  padding-left: 30px;
}
/deep/ .el-dialog__header {
  padding-left: 30px;
}

/deep/ .el-dialog__body {
  padding: 30px;
}

/deep/ .el-checkbox {
  width: 100%;
  margin-top: 20px;
  margin-right: 0px;
}

.checkbox-group {
  height: 35vh;
  margin: 10px 30px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .checkbox-label {
    font-size: 18px;
  }
}
</style>
