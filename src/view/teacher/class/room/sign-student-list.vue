<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ signName }} - 签到人员列表</div>
      </div>
      <div class="wrapper">
        <el-form :inline="true" :model="searchModal" class="search-bar">
          <el-form-item label="姓名/学号：">
            <el-input v-model="searchModal.username" placeholder="姓名/学号" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="签到状态：">
            <el-select v-model="searchModal.status" placeholder="签到状态" size="medium">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="已签到" :value="1"></el-option>
              <el-option label="迟到" :value="2"></el-option>
              <el-option label="未签到" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按IP排序：">
            <el-select v-model="searchModal.orderByIP" placeholder="按IP排序" size="medium">
              <el-option label="正序" :value="false"></el-option>
              <el-option label="倒序" :value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.stop="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="count-info">
          <span class="info-item danger">未签到：{{ signDetail.un_signed }}人</span>
          <span class="info-item info">已签到：{{ signDetail.signed }}人</span>
          <span class="info-item warning">迟到：{{ signDetail.late }}人</span>
          <span class="info-item danger">作废：{{ signDetail.cancel }}人</span>
        </div>
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
                v-if="scope.row.status && scope.row.status !== 3"
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
      signDetail: {},
      searchModal: {
        username: '',
        status: 0,
        orderByIP: false,
      },
    }
  },
  async mounted() {
    await this.getSignDetail()
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
          this.searchModal.status,
          this.searchModal.orderByIP,
          this.searchModal.username.trim().length > 0 ? this.searchModal.username.trim() : null,
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
    async handleSearch() {
      await this.getSignUserList()
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
        this.getSignDetail()
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
    async getSignDetail() {
      const res = await Class.getSignDetail(this.$route.params.id)
      this.signName = res.name
      this.signDetail = res
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
    .search-bar {
      margin: 20px;
      /deep/ .el-form-item__label {
        padding-right: 0;
      }
    }
    .count-info {
      margin: 20px;
      .info-item {
        margin-right: 10px;
        font-weight: 700;
        &.info {
          color: #3963bc;
        }
        &.warning {
          color: #ffcb71;
        }
        &.danger {
          color: #f4516c;
        }
      }
    }
    .table {
      .danger {
        color: #f4516c;
      }
      .warning {
        color: #ffcb71;
      }
    }
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
