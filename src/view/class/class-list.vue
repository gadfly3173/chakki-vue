<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">已加入班级列表</div>
      </div>
      <div class="wrapper">
        <!-- 循环渲染 -->
        <el-card
          class="box-card"
          shadow="hover"
          v-for="item in classList"
          :key="item.id"
          @click.native.stop="handleClick(item.id)"
        >
          <div slot="header" class="clearfix">
            <span class="box-header">{{ item.name }}</span>
          </div>
          <div class="text item">{{ item.info }}</div>
        </el-card>
        <!-- 无内容显示 -->
        <el-card class="box-card box-card-empty" shadow="hover" v-show="classList.length == 0">
          <div slot="header" class="clearfix">
            <span class="box-header">暂未加入任何班级</span>
          </div>
          <div class="text item">请联系教师或管理员</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Class from '@/model/class'

export default {
  data() {
    return {
      classList: [],
      loading: false,
    }
  },
  async mounted() {
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
      this.setCrrentClassId = id
      this.$router.push({ path: '/class/room/work' })
    },
    ...mapMutations({
      setCrrentClassId: 'SET_CURRENT_CLASS_ID',
    }),
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

  .box-card-empty {
    color: #9c9c9c;
  }

  .wrapper {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
}
</style>
