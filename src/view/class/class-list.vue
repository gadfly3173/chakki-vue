<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-loading="loading">
      <div class="header">
        <div class="title">已加入班级列表</div>
      </div>
      <div class="semester-selector">
        <el-select size="medium" v-model="semesterId" placeholder="请选择学期" @change="handleSemesterSelect">
          <el-option v-for="item in semesters" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
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
      semesters: [],
      semesterId: 1,
    }
  },
  async mounted() {
    await this.getAllSemesters()
    await this.handleSemesterSelect()
  },
  methods: {
    async getAllSemesters() {
      try {
        this.loading = true
        this.semesters = await Class.getStudentAllSemesters()
        this.semesterId = this.semesters[0].id
        this.loading = false
      } catch (e) {
        this.loading = false
        // console.log(e)
      }
    },
    async handleSemesterSelect() {
      try {
        this.loading = true
        const res = await Class.getStudentClassList(this.semesterId)
        this.classList = res
        this.loading = false
      } catch (e) {
        this.loading = false
        this.classList = []
      }
    },
    handleClick(id) {
      this.setCrrentClassId(id)
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

  .semester-selector {
    margin: 20px -60px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
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
