<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">{{ className }} - 作业项目列表</div>
      </div>
      <el-button class="create-button" type="primary" @click.stop="handleCreateWork">发起作业</el-button>
      <el-dialog title="编辑作业项目" :visible.sync="workEditModal.show" width="600" @close="resetForm">
        <div>
          <el-form label-position="right" label-width="auto">
            <el-form-item label="项目名称">
              <el-input
                v-model="workEditForm.name"
                maxlength="60"
                show-word-limit
                @blur="workEditForm.name = workEditForm.name.trim()"
              ></el-input>
            </el-form-item>
            <el-form-item label="详情">
              <el-input
                v-model="workEditForm.info"
                type="textarea"
                :autosize="{ minRows: 2 }"
                maxlength="255"
                show-word-limit
                @blur="workEditForm.info = workEditForm.info.trim()"
              ></el-input>
            </el-form-item>
            <el-form-item label="可上传文件大小">
              <el-input-number
                v-model="workEditForm.fileSize"
                size="small"
                :min="1"
                :max="1024"
                controls-position="right"
              ></el-input-number>
              <el-select
                v-model="workEditForm.fileSizeUnit"
                placeholder="请选择"
                size="small"
                style="width:80px;margin-left:10px"
              >
                <el-option v-for="item in fileSizeUnitList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="允许上传的文件扩展名">
              <el-select
                v-model="workEditForm.fileExtension"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请输入扩展名"
                @change="formatExtension"
              >
                <el-option v-for="item in fileExtensionList" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
              <el-tooltip effect="dark" placement="right">
                <div slot="content">在左侧直接输入想要添加的扩展名，大小写随意，不用输入句点符号'.'</div>
                <i class="el-icon-info" style="margin-left:10px"></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="workEditForm.endTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :editable="false"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="作业类型">
              <el-switch
                v-model="workEditForm.type"
                inactive-color="#13ce66"
                active-text="课后作业"
                inactive-text="课堂作业"
              >
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click.stop="workEditModal.show = false">取 消</el-button>
          <el-button type="primary" @click.stop="handleEditConfirm">确 定</el-button>
        </div>
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
          <el-table-column prop="handed" label="已交作业人数" width="120"></el-table-column>
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
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button @click.stop="handleEditClick(scope.row)" type="primary" plain size="mini">编辑</el-button>
              <el-button @click.stop="handleViewStudentClick(scope.row.id)" type="success" plain size="mini">
                人员
              </el-button>
              <el-popconfirm
                v-if="scope.row.id"
                title="确定删除该作业吗？"
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
      workList: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      className: '正在获取班级名称',
      loading: false,
      dialogLoading: false,
      workEditModal: {
        show: false,
      },
      workEditForm: {
        id: null,
        name: '',
        info: '',
        fileSize: 10,
        fileSizeUnit: 2,
        fileExtension: [],
        endTime: null,
        type: false,
      },
      fileSizeUnitList: [
        {
          value: 0,
          label: 'B',
        },
        {
          value: 1,
          label: 'KB',
        },
        {
          value: 2,
          label: 'MB',
        },
      ],
      fileExtensionList: [
        'JPG',
        'PNG',
        'JPEG',
        'BMP',
        'JAVA',
        'C',
        'CPP',
        'HTML',
        'HTM',
        'JS',
        'TXT',
        'MD',
        'EXE',
        'ZIP',
        '7Z',
        'RAR',
      ],
      fileExtensionOpt: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '五分钟后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 5 * 60 * 1000)
              picker.$emit('pick', date)
            },
          },
          {
            text: '十分钟后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 10 * 60 * 1000)
              picker.$emit('pick', date)
            },
          },
          {
            text: '十五分钟后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 15 * 60 * 1000)
              picker.$emit('pick', date)
            },
          },
          {
            text: '三十分钟后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 30 * 60 * 1000)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一小时后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000)
              picker.$emit('pick', date)
            },
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '三天后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
        disabledDate(date) {
          return date.getTime() <= new Date().getTime() - 3600 * 1000 * 24
        },
      },
    }
  },
  async mounted() {
    this.getClassDetail()
    await this.getWorkList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getWorkList() {
      try {
        this.loading = true
        const res = await Class.getWorkList(this.currentClassId, this.pageSize, this.currentPage - 1)
        this.workList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.workList = []
      }
    },
    handleEditClick(detail) {
      this.workEditForm = {
        id: detail.id,
        name: detail.name,
        info: detail.info,
        fileSize: this.fileSizeCompute(detail.file_size),
        fileSizeUnit: this.fileSizeUnitCompute(detail.file_size),
        fileExtension: detail.file_extension,
        endTime: detail.end_time ? new Date(detail.end_time) : null,
        type: detail.type === 2,
      }
      this.handleCreateWork()
    },
    fileSizeCompute(value) {
      if (value === null || value === '') {
        return 0
      }
      const srcsize = parseFloat(value)
      const index = Math.floor(Math.log(srcsize) / Math.log(1024))
      const size = srcsize / 1024 ** index
      return Math.round(size)
    },
    fileSizeUnitCompute(value) {
      if (value === null || value === '') {
        return 0
      }
      const srcsize = parseFloat(value)
      const index = Math.floor(Math.log(srcsize) / Math.log(1024))
      return index
    },
    handleViewStudentClick(id) {
      this.$router.push({ path: `/teacher/class/room/work/list/${id}` })
    },
    async handleDeleteClick(id) {
      try {
        this.loading = true
        const res = await Class.deleteWork(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success('作业项目删除成功')
          this.getWorkList()
          this.loading = false
        }
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
    handleCreateWork() {
      this.workEditModal.show = true
    },
    async getClassDetail() {
      const res = await Class.getClassDetail(this.currentClassId)
      this.className = res.name
    },
    formatExtension() {
      if (!this.workEditForm.fileExtension.length) {
        return
      }
      const index = this.workEditForm.fileExtension.length - 1
      const tmpStr = this.workEditForm.fileExtension[index].replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
      const tmpStrIndex = this.workEditForm.fileExtension.indexOf(tmpStr)
      if (tmpStrIndex === index) {
        this.workEditForm.fileExtension[index] = tmpStr
      } else {
        this.workEditForm.fileExtension.splice(index, 1)
      }
    },
    async handleEditConfirm() {
      this.dialogLoading = true
      const form = JSON.parse(JSON.stringify(this.workEditForm))
      form.fileSize *= 1024 ** form.fileSizeUnit
      form.type = form.type ? 2 : 1
      try {
        let res
        if (!form.id) {
          res = await Class.createWork(form, this.currentClassId)
        } else {
          res = await Class.updateWork(form)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.dialogLoading = false
          this.$message.success(res.message)
          this.workEditModal.show = false
          this.getWorkList()
          this.resetForm()
        }
      } catch (e) {
        this.dialogLoading = false
      }
    },
    resetForm() {
      this.workEditForm = {
        id: null,
        name: '',
        info: '',
        fileSize: 10,
        fileSizeUnit: 2,
        fileExtension: [],
        endTime: null,
        type: false,
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
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
