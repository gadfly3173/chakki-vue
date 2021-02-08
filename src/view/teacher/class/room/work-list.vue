<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ className }} - 作业项目列表</div>
      </div>
      <el-button class="create-button" type="primary" @click.stop="handleCreateWork">发起作业</el-button>
      <el-dialog title="编辑作业项目" :visible.sync="workEditModal.show" width="600">
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
            <el-form-item label="可上传文件数量">
              <el-input-number
                v-model="workEditForm.fileNum"
                size="small"
                :min="1"
                :max="10"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="单个可上传文件大小">
              <el-input-number
                v-model="workEditForm.fileSize"
                size="small"
                :min="1"
                :max="100"
                controls-position="right"
              ></el-input-number>
              <el-select
                v-model="workEditForm.fileSizeUnit"
                placeholder="请选择"
                size="small"
                style="width:80px;margin-left:10px"
              >
                <el-option v-for="item in fileSizeUnit" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="允许上传的文件扩展名">
              <el-select v-model="workEditForm.fileExtend" multiple filterable allow-create placeholder="请输入扩展名">
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
          <el-table-column prop="name" label="作业项目名称" width="180"></el-table-column>
          <el-table-column prop="worked" label="已交作业人数" width="120"></el-table-column>
          <el-table-column prop="file_num" label="文件数量" width="120"></el-table-column>
          <el-table-column label="文件大小" width="120">
            <template slot-scope="scope">
              {{ scope.row.file_size | byteFilter }}
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
              <el-button @click.stop="handleClick(scope.row)" type="primary" plain size="mini">编辑</el-button>
              <el-button @click.stop="handleViewStudentClick(scope.row.id)" type="success" plain size="mini"
                >人员</el-button
              >
              <el-button type="danger" size="mini" plain>删除</el-button>
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
      loading: false,
      className: '正在获取班级名称',
      workEditModal: {
        show: false,
      },
      workEditForm: {
        name: '',
        info: '',
        fileNum: 1,
        fileSize: 10,
        fileSizeUnit: '2',
        fileExtend: [],
        endTime: null,
      },
      fileSizeUnit: [
        {
          value: '0',
          label: 'B',
        },
        {
          value: '1',
          label: 'KB',
        },
        {
          value: '2',
          label: 'MB',
        },
      ],
      pickerOptions: {
        shortcuts: [
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
    handleClick(id) {
      this.$router.push({ path: `/class/room/${id}` })
    },
    handleViewStudentClick(id) {
      this.$router.push({ path: `/teacher/class/room/work/list/${id}` })
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
    async handleEditConfirm() {
      this.loading = true
      const res = await Class.createWork(this.workEditForm, this.currentClassId)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success('作业项目新建成功')
        this.workEditModal.show = false
        this.getWorkList()
      }
      this.loading = false
      this.workEditForm = {
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
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
