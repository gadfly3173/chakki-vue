<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ signName }} - 签到人员列表</div>
      </div>
      <div class="wrapper">
        <!-- 表格渲染 -->
        <el-table :data="signList" style="width: 100%" class="table">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="nickname" label="昵称/姓名"></el-table-column>
          <el-table-column prop="ip" label="IP地址"></el-table-column>
          <el-table-column label="签到时间">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="签到状态">
            <template slot-scope="scope">
              <div
                :class="{
                  danger: isSignStatusDanger(scope.row.status),
                  warning: isSignStatusWarning(scope.row.status),
                }"
              >
                {{ scope.row.status | signStatusFilter }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.stop="handleUpdateClick(scope.row.user_id, 1)"
                type="primary"
                size="mini"
                v-if="scope.row.status !== 1"
                >签到</el-button
              >
              <el-button
                @click.stop="handleUpdateClick(scope.row.user_id, 2)"
                type="warning"
                size="mini"
                v-if="scope.row.status !== 2"
                >迟到</el-button
              >
              <el-button
                @click.stop="handleUpdateClick(scope.row.user_id, 3)"
                type="danger"
                size="mini"
                v-if="scope.row.status || scope.row.status === 3"
                >作废</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          v-if="signList.length > 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Class from '@/model/class'

export default {
  data() {
    return {
      signList: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      signName: '正在获取签到项目名称',
      signEditModal: {
        show: false,
      },
      signEditForm: {
        title: '',
        endMinutes: 1,
      },
    }
  },
  async mounted() {
    this.getSignDetail()
    await this.getSignUserList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getSignUserList() {
      try {
        this.loading = true
        const res = await Class.getSignUserList(
          this.$route.params.id,
          this.signStatus,
          this.pageSize,
          this.currentPage - 1,
        )
        this.signList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.signList = []
      }
    },
    isSignStatusDanger(status) {
      if (!status || status === 3) {
        return true
      }
    },
    isSignStatusWarning(status) {
      if (status === 2) {
        return true
      }
    },
    async handleUpdateClick(userId, status) {
      const res = await Class.updateSignRecord(this.$route.params.id, userId, status)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(res.message)
        return this.getSignUserList()
      }
      return this.$message.error(res.message)
    },
    handleCurrentChange() {
      this.getSignUserList()
    },
    handleSizeChange() {
      this.getSignUserList()
    },
    handleCreateSign() {
      this.signEditModal.show = true
    },
    async getSignDetail() {
      const res = await Class.getSignDetail(this.$route.params.id)
      this.signName = res.name
    },
    async handleEditConfirm() {
      this.loading = true
      const res = await Class.createSign(this.signEditForm, this.currentClassId)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success('签到项目新建成功')
        this.signEditModal.show = false
        this.getSignList()
      }
      this.loading = false
      this.signEditForm = {
        title: '',
        endMinutes: 1,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  color: #596c8e;

  .header {
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
      border-bottom: 1px solid #dae1ec;
    }
  }

  .create-button {
    margin-top: 20px;
    margin-left: 40px;
  }

  .text {
    font-size: 14px;
    word-break: break-all;
  }

  .item {
    margin-bottom: 18px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    margin: 20px;
    width: 300px;
    user-select: none;
    cursor: pointer;
    .box-header {
      font-weight: 700;
    }
  }

  .box-card:after {
    display: block;
    content: '';
    width: 300px;
    height: 0;
  }

  .wrapper {
    margin-top: 20px;
    .table {
      .danger {
        color: #f56c6c;
      }
      .warning {
        color: #e6a23c;
      }
    }
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
