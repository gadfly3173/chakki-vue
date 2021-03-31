<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">{{ className }} - 问卷项目列表</div>
      </div>
      <el-button class="create-button" type="primary" @click.stop="handleCreateQuestionnaire">发起问卷</el-button>
      <div class="wrapper">
        <!-- 表格渲染 -->
        <el-table :data="questionnaireList" style="width: 100%">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="count" label="问题数量"></el-table-column>
          <el-table-column prop="handed" label="已提交人数"></el-table-column>
          <el-table-column label="结束时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.end_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.update_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button @click.stop="handleDownloadReport(scope.row.id)" type="success" plain size="mini"
                >下载报告</el-button
              >
              <el-popconfirm
                title="确定删除该问卷吗？"
                @onConfirm="handleDeleteClick(scope.row.id)"
                style="margin-left: 10px"
              >
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          v-if="questionnaireList.length > 0"
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
import fileDownload from 'js-file-download'
import Class from '@/model/class'

export default {
  data() {
    return {
      questionnaireList: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      className: '正在获取班级名称',
      loading: false,
    }
  },
  async mounted() {
    this.getClassDetail()
    await this.getQuestionnaireList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getQuestionnaireList() {
      try {
        this.loading = true
        const res = await Class.getQuestionnaireList(this.currentClassId, this.pageSize, this.currentPage - 1)
        this.questionnaireList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.questionnaireList = []
      }
    },
    handleViewStudentClick(id) {
      this.$router.push({ path: `/teacher/class/room/questionnaire/list/${id}` })
    },
    async handleDeleteClick(id) {
      try {
        this.loading = true
        const res = await Class.deleteQuestionnaire(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success('问卷项目删除成功')
          this.getQuestionnaireList()
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    },
    handleCurrentChange() {
      this.getQuestionnaireList()
    },
    handleSizeChange() {
      this.getQuestionnaireList()
    },
    handleCreateQuestionnaire() {
      this.$router.push({ path: '/teacher/class/room/questionnaire/edit/0' })
    },
    handleEditQuestionnaire(id) {
      this.$router.push({ path: `/teacher/class/room/questionnaire/edit/${id}` })
    },
    async handleDownloadReport(id) {
      const notify = this.$notify({
        title: '提示',
        message: '文件正在后台下载中，请勿离开或刷新本页面',
        duration: 0,
      })
      try {
        const res = await Class.downloadStudentQuestionnaireReport(id)
        // 提取文件名
        const filename = res.headers['content-disposition'].match(
          /(?:.*filename\*|filename)=(?:([^'"]*)''|("))([^;]+)\2(?:[;`\n]|$)/,
        )[3]
        fileDownload(res.data, decodeURI(filename))
        notify.close()
      } catch (e) {
        notify.close()
      }
    },
    async getClassDetail() {
      const res = await Class.getClassDetail(this.currentClassId)
      this.className = res.name
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
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
