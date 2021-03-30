<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">{{ className }} - {{ questionnaire.title }}</div>
      </div>
      <div class="wrapper">
        <!-- <el-button @click="test">ces</el-button> -->
        <div class="questionnaire" v-for="(question, index) in questionnaire.questions" :key="`question-${index}`">
          <div class="question">
            <div class="order">{{ index + 1 }}.</div>
            <div class="question-item">
              <div class="question-title">{{ question.title }}</div>
              <!-- 简答回答 -->
              <el-input
                v-if="question.type === 1"
                class="question-answer-input"
                size="medium"
                type="textarea"
                clearable
                :autosize="{ minRows: 2 }"
                v-model="answer[index].answer"
                placeholder="请在此处输入答案"
                :maxlength="60"
                show-word-limit
              ></el-input>
              <!-- 单选 -->
              <div class="question-options" v-if="question.limit_max === 1 && question.type === 2">
                <el-radio-group v-model="answer[index].single_option_id" size="medium">
                  <div class="option" v-for="(option, order) in question.options" :key="`option-${index}-${order}`">
                    <el-radio :label="order" border>选项{{ order + 1 }}. {{ option.title }}</el-radio>
                  </div>
                </el-radio-group>
              </div>
              <!-- 多选 -->
              <div class="question-options" v-if="question.limit_max > 1 && question.type === 2">
                <el-checkbox-group v-model="answer[index].multi_option_id" :max="question.limit_max" size="medium">
                  <div class="option" v-for="(option, order) in question.options" :key="`option-${index}-${order}`">
                    <el-checkbox :label="order" border>选项{{ order + 1 }}. {{ option.title }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Class from '@/model/class'

export default {
  data() {
    return {
      questionnaire: {},
      answer: [],
      className: '正在获取班级名称',
      loading: false,
    }
  },
  async mounted() {
    await this.getClassDetail()
    await this.getQuestionnaireVO()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getQuestionnaireVO() {
      try {
        this.loading = true
        const res = await Class.getQuestionnaireVOForStudent(this.$route.params.id)
        res.questions = res.questions.sort(this.sortOrderAsc)
        // 遍历问题
        for (const [index, question] of res.questions.entries()) {
          // 排序选项
          if (question.options) question.options = question.options.sort(this.sortOrderAsc)
          // 简答题value set
          if (question.type === 1) {
            this.$set(this.answer, index, {
              answer: '',
            })
          }
          // 选择题value set
          if (question.limit_max === 1 && question.type === 2) {
            this.$set(this.answer, index, {
              single_option_id: null,
            })
          }
          if (question.limit_max > 1 && question.type === 2) {
            this.$set(this.answer, index, {
              multi_option_id: [],
            })
          }
        }
        this.questionnaire = res
        console.log(this.questionnaire)
        this.loading = false
      } catch (e) {
        this.questionnaire = {}
        this.loading = false
      }
    },
    sortOrderAsc(a, b) {
      return a.order - b.order
    },
    handleHandQuestionnaire(id) {
      this.$router.push({ path: `/class/room/questionnaire/hand/${id}` })
    },
    async getClassDetail() {
      const res = await Class.getStudentClassDetail(this.currentClassId)
      this.className = res.name
    },
    test() {
      console.log(this.answer)
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

  .wrapper {
    margin-top: 20px;
    .questionnaire {
      max-width: 900px;
      margin: 0 auto;
      .question {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 50px 10px;
        font-size: 18px;
        border-bottom: 1px dashed #d5eae6;
        .order {
          padding: 0;
        }
        .question-item {
          padding-left: 30px;
          .question-title {
            margin: 0 10px;
          }
          .question-answer-input {
            width: 600px;
            margin: 10px 0;
          }
          .question-options {
            margin: 10px 0;
            .option {
              padding-left: 20px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
