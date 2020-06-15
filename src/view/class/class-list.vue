<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">已加入班级列表</div>
      </div>
      <div class="wrapper">
        <el-card class="box-card" shadow="hover" v-for="item in classList" :key="item.id" @click.native="handleClick(item.id)">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
          </div>
          <div class="text item">{{ item.info }}</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Class from '@/model/class'

export default {
  data() {
    return {
      classList: [],
      operate: [],
      editBookID: 1,
    }
  },
  async created() {
    await this.getClassList()
  },
  methods: {
    async getClassList() {
      try {
        this.loading = true
        const res = await Class.getClassList()
        this.classList = res
        this.loading = false
      } catch (e) {
        this.loading = false
        this.classList = []
      }
    },
    handleClick(id) {
      this.$router.push({ path: `/class/room/${id}` })
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editBookID = val.row.id
    },
    handleDelete() {
      // this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // }).then(async () => {
      //   const res = await book.delectBook(val.row.id)
      //   if (res.code < window.MAX_SUCCESS_CODE) {
      //     this.getBooks()
      //     this.$message({
      //       type: 'success',
      //       message: `${res.message}`,
      //     })
      //   }
      // })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getBooks()
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
  }

  .box-card:after {
    display: block;
    content: '';
    width: 300px;
    height: 0;
  }

  .wrapper {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
}
</style>
