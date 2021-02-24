<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ workName }} - 作业人员列表</div>
      </div>
      <div class="wrapper">
        <el-form :inline="true" :model="searchModal" class="search-bar">
          <el-form-item label="姓名/学号：">
            <el-input v-model="searchModal.username" placeholder="姓名/学号" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="作业状态：">
            <el-select v-model="searchModal.status" placeholder="作业状态" size="medium">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="已交" :value="1"></el-option>
              <el-option label="未交" :value="2"></el-option>
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
        <el-button class="download-all-button" type="primary" @click.stop="handleDownloadAllClick"
          >下载该作业项目所有已提交的作业</el-button
        >
        <div class="count-info">
          <span class="info-item danger">未交：{{ workDetail.unhanded }}人</span>
          <span class="info-item info">已交：{{ workDetail.handed }}人</span>
        </div>
        <!-- 表格渲染 -->
        <el-table :data="workList" style="width: 100%" class="table">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="nickname" label="昵称/姓名"></el-table-column>
          <el-table-column prop="ip" label="IP地址"></el-table-column>
          <el-table-column label="分数">
            <template slot-scope="scope">
              <div
                :class="{
                  danger: scope.row.rate < 6,
                  warning: scope.row.rate >= 6 && scope.row.rate < 9,
                }"
              >
                {{ scope.row.rate }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="作业时间">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              {{ scope.row.update_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="作业状态">
            <template slot-scope="scope">
              <div
                :class="{
                  danger: !scope.row.create_time,
                }"
              >
                {{ scope.row.create_time ? '已交' : '未交' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="220">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="285"
                trigger="click"
                :ref="`popover-${scope.$index}`"
                v-if="scope.row.id"
              >
                <div style="text-align:center;margin-bottom:10px;font-size:16px">打分</div>
                <el-rate
                  v-model="rateEditValue"
                  :colors="rateEditColors"
                  :max="10"
                  show-score
                  style="text-align:center;margin-bottom:5px"
                ></el-rate>
                <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" @click.stop="handleRateClick(scope)">确定</el-button>
                </div>
                <el-button type="primary" size="mini" slot="reference">打分</el-button>
              </el-popover>
              <el-button
                @click.stop="handleDownloadClick(scope.row.id)"
                type="success"
                size="mini"
                v-if="scope.row.id"
                style="margin-left: 10px"
                >下载</el-button
              >
              <el-button @click.stop="handleDeleteClick(scope.row.id)" type="danger" size="mini" v-if="scope.row.id"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          v-if="workList.length > 0"
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
import fileDownload from 'js-file-download'

export default {
  data() {
    return {
      workList: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      workName: '正在获取作业项目名称',
      workDetail: {},
      searchModal: {
        username: '',
        status: 0,
        orderByIP: false,
      },
      rateEditValue: 0,
      rateEditColors: {
        3: '#99A9BF',
        6: '#F7BA2A',
        10: '#FF9900',
      },
    }
  },
  async mounted() {
    await this.getWorkDetail()
    await this.getWorkUserList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getWorkUserList() {
      try {
        this.loading = true
        const res = await Class.getWorkUserList(
          this.$route.params.id,
          this.searchModal.status,
          this.searchModal.orderByIP,
          this.searchModal.username.trim().length > 0 ? this.searchModal.username.trim() : null,
          this.pageSize,
          this.currentPage - 1,
        )
        this.workList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.workList = []
      }
    },
    async handleSearch() {
      await this.getWorkUserList()
    },
    isWorkStatusDanger(status) {
      if (!status || status === 3) {
        return true
      }
    },
    isWorkStatusWarning(status) {
      if (status === 2) {
        return true
      }
    },
    async handleDownloadClick(id) {
      const notify = this.$notify({
        title: '提示',
        message: '文件正在后台下载中，请勿离开或刷新本页面',
        duration: 0,
      })
      const res = await Class.getStudentWorkFile(id)
      // 提取文件名
      const filename = res.headers['content-disposition'].match(
        /(?:.*filename\*|filename)=(?:([^'"]*)''|("))([^;]+)\2(?:[;`\n]|$)/,
      )[3]
      fileDownload(res.data, decodeURI(filename))
      notify.close()
    },
    async handleDownloadAllClick() {
      const notify = this.$notify({
        title: '提示',
        message: '文件正在后台下载中，请勿离开或刷新本页面',
        duration: 0,
      })
      const res = await Class.getWorkFileZip(this.$route.params.id)
      // 提取文件名
      const filename = res.headers['content-disposition'].match(
        /(?:.*filename\*|filename)=(?:([^'"]*)''|("))([^;]+)\2(?:[;`\n]|$)/,
      )[3]
      fileDownload(res.data, decodeURI(filename))
      notify.close()
    },
    async handleRateClick(scope) {
      const res = await Class.rateStudentWork(scope.row.id, this.rateEditValue)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(res.message)
        this.$refs[`popover-${scope.$index}`].doClose()
        this.rateEditValue = 0
        return this.getWorkUserList()
      }
      return this.$message.error(res.message)
    },
    async handleDeleteClick(id) {
      const res = await Class.deleteStudentWork(id)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(res.message)
        return this.getWorkUserList()
      }
      return this.$message.error(res.message)
    },
    handleCurrentChange() {
      this.getWorkUserList()
    },
    handleSizeChange() {
      this.getWorkUserList()
    },
    async getWorkDetail() {
      const res = await Class.getWorkDetail(this.$route.params.id)
      this.workName = res.name
      this.workDetail = res
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

  .download-all-button {
    margin-left: 40px;
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
