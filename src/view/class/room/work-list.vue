<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ className }} - 作业列表</div>
      </div>
      <el-card class="box-card">
        <div slot="header" class="box-header">
          <span>签到</span>
          <el-button
            class="operation"
            type="primary"
            size="medium"
            round
            v-if="signDetailAval"
            @click.native.stop="handleConfirmSign"
            >进行签到</el-button
          >
        </div>
        <div class="text item">
          {{ signDetail.name }}
        </div>
      </el-card>
      <el-dialog
        title="作业详情"
        :visible.sync="workHandModalShow"
        width="600"
        v-loading="dialogLoading"
        :destroy-on-close="true"
      >
        <el-form label-position="right" label-width="auto" class="work">
          <el-form-item label="名称">
            <div class="title">{{ workHandModal.name }}</div>
          </el-form-item>
          <el-form-item label="详情">
            <div class="info">{{ workHandModal.info }}</div>
          </el-form-item>
          <el-form-item label="可上传文件大小">
            <div class="info">{{ workHandModal.file_size | byteFilter }}</div>
          </el-form-item>
          <el-form-item label="允许的扩展名">
            <div class="info">{{ workHandModal.file_extension | arrayToString }}</div>
          </el-form-item>
          <el-form-item label="发布时间">
            <div class="info">{{ workHandModal.create_time | dateTimeFormatter }}</div>
          </el-form-item>
          <el-form-item label="结束时间">
            <div class="info">{{ workHandModal.end_time | dateTimeFormatter }}</div>
          </el-form-item>
          <el-form-item label="文件">
            <el-upload
              ref="uploader"
              class="upload-demo"
              v-if="workAval(workHandModal)"
              drag
              action=""
              :limit="1"
              :auto-upload="false"
              :accept="formatExtensionList(workHandModal.file_extension)"
              :on-change="handleUploaderChange"
              :on-exceed="handleUploaderExceed"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="workAval(workHandModal)" @click.stop="handleHandWork">立即提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="wrapper">
        <!-- 表格渲染 -->
        <el-table :data="workList" style="width: 100%">
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.type === 1">课堂作业</el-tag>
              <el-tag v-else>课后作业</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="作业项目名称" width="180"></el-table-column>
          <el-table-column label="可上传文件大小">
            <template slot-scope="scope">
              {{ scope.row.file_size | byteFilter }}
            </template>
          </el-table-column>
          <el-table-column label="允许的扩展名" width="180">
            <template slot-scope="scope">
              {{ scope.row.file_extension | arrayToString }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.end_time | dateTimeFormatter }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click.stop="handleViewClick(scope.row.id)" type="primary" plain size="mini">
                {{ workAval(scope.row) ? '交作业' : '查看' }}
              </el-button>
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

export default {
  data() {
    return {
      signDetail: {
        name: '暂无可用签到',
      },
      workList: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      dialogLoading: true,
      className: '正在获取班级名称',
      workHandModal: {
        show: false,
        name: '',
        info: '',
        file_size: 0,
        file_extension: [],
        create_time: '',
        end_time: '',
      },
      workHandModalShow: false,
      fileList: [],
    }
  },
  async mounted() {
    this.getStudentClassDetail()
    this.getLatestSignDetail()
    await this.getWorkList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
    signDetailAval() {
      if (
        !this.signDetail
        || !this.signDetail.id
        || this.signDetail.signed > 0
        || new Date(this.signDetail.end_time).getTime() < new Date().getTime()
      ) {
        return false
      }
      return true
    },
  },
  methods: {
    workAval(detail) {
      if (detail.handed) return false
      if (detail.end_time && new Date(detail.end_time).getTime() <= Date.now()) return false
      return true
    },
    async getWorkList() {
      try {
        this.loading = true
        const res = await Class.getWorkListForStudentList(this.currentClassId, this.pageSize, this.currentPage - 1)
        this.workList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.workList = []
      }
    },
    async getLatestSignDetail() {
      try {
        this.loading = true
        const res = await Class.getLatestSignDetail(this.currentClassId)
        this.signDetail = res
        if (!this.signDetailAval) {
          this.signDetail = {
            id: null,
            name: '暂无可用签到',
          }
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.signDetail = {
          id: null,
          name: '暂无可用签到',
        }
      }
    },
    async handleViewClick(id) {
      try {
        this.loading = true
        const res = await Class.getWorkDetailForStudent(id)
        this.workHandModal = res
        this.workHandModalShow = true
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handleCurrentChange() {
      this.getWorkList()
    },
    handleSizeChange() {
      this.getWorkList()
    },
    async handleConfirmSign() {
      try {
        this.loading = true
        const res = await Class.postConfirmSign(this.signDetail.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(res.message)
          this.getLatestSignDetail()
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async handleHandWork() {
      try {
        this.dialogLoading = true
        const res = await Class.handWork(this.$refs.uploader.uploadFiles[0].raw, this.workHandModal.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(res.message)
          this.workHandModalShow = false
          this.getWorkList()
        } else {
          this.$message.error(res.message)
        }
        this.dialogLoading = false
      } catch (e) {
        console.log(e)
        this.dialogLoading = false
      }
    },
    handleUploaderExceed(files) {
      this.$refs.uploader.clearFiles()
      this.$refs.uploader.handleStart(files[0])
    },
    handleUploaderChange(file) {
      if (file.size >= this.workHandModal.file_size) {
        this.$message.warning('文件体积过大')
        this.$refs.uploader.clearFiles()
      }
    },
    async getStudentClassDetail() {
      const res = await Class.getStudentClassDetail(this.currentClassId)
      this.className = res.name
    },
    formatExtensionList(list) {
      return list.map(item => `.${item}`).toString()
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
    .box-header {
      span {
        font-weight: 700;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .operation {
      float: right;
      margin: 3px 0;
    }
  }

  .box-card:after {
    display: block;
    content: '';
    width: 300px;
    height: 0;
  }

  .work {
    /deep/ .el-form-item {
      margin-bottom: 0 !important;
      .el-form-item__content {
        margin-bottom: 8px !important;
        .el-upload-list {
          margin-top: -10px;
          .el-upload-list__item {
            margin-top: 0 !important;
          }
        }
      }
    }
    .title {
      color: #333333;
    }
    .info {
      color: #4b4b4b;
    }
  }

  .wrapper {
    margin-top: 20px;
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
