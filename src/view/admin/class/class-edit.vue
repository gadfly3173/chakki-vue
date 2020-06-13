<template>
  <div class="container">
    <div class="title">编辑班级人员</div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="username" label="学号" width="200"></el-table-column>
        <el-table-column prop="nickname" label="姓名"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">移除</el-button>
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
            <el-button type="primary" @click="confirmEdit">确 定</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
        </el-col>
      </el-row>
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
      loading: false,
    }
  },
  methods: {
    // 根据分组 刷新/获取班级内的用户
    async getPageStudents() {
      let res
      const currentPage = this.currentPage - 1
      try {
        this.loading = true
        res = await Admin.getAllStudents({ class_id: this.class_id, count: this.pageCount, page: currentPage }) // eslint-disable-line
        this.loading = false
        this.tableData = this.shuffleList(res.items)
        this.total_nums = res.total
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async confirmEdit() {
      let addRes = 0
      let delRes = 0
      // 判断是否更改了班级班级
      if (this.permissions.sort().toString() !== this.cachePermissions.sort().toString()) {
        const deletePermissions = this.cachePermissions
          .concat(this.permissions)
          .filter(v => !this.permissions.includes(v))
        const addPermissions = this.cachePermissions
          .concat(this.permissions)
          .filter(v => !this.cachePermissions.includes(v))

        if (addPermissions.length > 0) {
          addRes = await Admin.dispatchPermissions(this.$route.query.id, addPermissions)
        }
        if (deletePermissions.length > 0) {
          delRes = await Admin.removePermissions(this.$route.query.id, deletePermissions)
        }
        if (addRes.code < window.MAX_SUCCESS_CODE || delRes.code < window.MAX_SUCCESS_CODE) {
          this.$message.success('班级修改成功')
        }
      }
    },
    shuffleList(users) {
      const list = []
      users.forEach(element => {
        const groups = []
        element.groups.forEach(item => {
          groups.push(item.name)
        })
        element.groupNames = groups.join(',')
        list.push(element)
      })
      return list
    },
    // 下拉框选择分组
    async handleChange() {
      this.currentPage = 1
      this.loading = true
      await this.getPageStudents()
      this.loading = false
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
          res = await Admin.deleteOneUser(val.row.id)
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
          await this.getAdminUsers()
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
    goBack() {
      this.$router.go(-1)
    },
  },
  async created() {
    this.class_id = this.$route.query.id
    await this.getPageStudents()
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
  }

  .submit {
    float: left;
  }
}
</style>
