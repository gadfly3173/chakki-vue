<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">{{ className }} - 签到项目列表</div>
      </div>
      <el-button class="create-button" type="primary" @click.stop="handleCreateSign">发起签到</el-button>
      <el-dialog title="编辑签到项目" :visible.sync="signEditModal.show" width="600">
        <div>
          <el-form label-position="right" label-width="80px">
            <el-form-item label="项目名称">
              <el-input v-model="signEditForm.title" maxlength="60" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input-number
                v-model="signEditForm.endMinutes"
                size="small"
                :min="1"
                :max="100"
                controls-position="right"
              ></el-input-number>
              分钟
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click.stop="signEditModal.show = false">取 消</el-button>
          <el-button type="primary" @click.stop="handleEditConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <div class="wrapper">
        <!-- 表格渲染 -->
        <el-table :data="signList" style="width: 100%">
          <el-table-column prop="name" label="签到项目名称" width="180"></el-table-column>
          <el-table-column prop="signed" label="已签到人数" width="120"></el-table-column>
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
      className: '正在获取班级名称',
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
    this.getClassDetail()
    await this.getSignList()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getSignList() {
      try {
        this.loading = true
        const res = await Class.getSignList(this.currentClassId, this.pageSize, this.currentPage - 1)
        this.signList = res.items
        this.loading = false
        this.totalNum = res.total
      } catch (e) {
        this.loading = false
        this.signList = []
      }
    },
    handleClick(id) {
      this.$router.push({ path: `/class/room/${id}` })
    },
    handleViewStudentClick(id) {
      this.$router.push({ path: `/teacher/class/room/sign/list/${id}` })
    },
    handleCurrentChange() {
      this.getSignList()
    },
    handleSizeChange() {
      this.getSignList()
    },
    handleCreateSign() {
      this.signEditModal.show = true
    },
    async getClassDetail() {
      const res = await Class.getClassDetail(this.currentClassId)
      this.className = res.name
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
    .pagination {
      margin: 10px 30px;
    }
  }
}
</style>
