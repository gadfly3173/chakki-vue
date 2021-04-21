<template>
  <div class="container" v-loading="loading">
    <div class="header">
      <div class="title">{{ $route.params.id === '0' ? '新建' : '编辑' }}问卷</div>
      <div class="deploy-button"><el-button type="primary" @click.stop="deploy">发布</el-button></div>
    </div>
    <div class="wrapper">
      <div class="title-input">
        <label>问卷标题：</label>
        <el-input size="medium" clearable v-model="title" :maxlength="60" show-word-limit></el-input>
      </div>
      <div class="info-input">
        <label>问卷简介：</label>
        <el-input
          size="medium"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
          v-model="info"
          :maxlength="255"
          show-word-limit
        ></el-input>
      </div>
      <div class="questions">
        <el-row>
          <el-col :span="6" class="toolbar">
            <div class="add-button">
              <el-button type="text" class="button" icon="el-icon-circle-plus-outline" @click="addTextQuestion"
                >新建简答题</el-button
              >
            </div>
            <div class="add-button">
              <el-button type="text" class="button" icon="el-icon-circle-plus-outline" @click="addSelectQuestion"
                >新建选择题</el-button
              >
            </div>
          </el-col>
          <el-col :span="18" class="right-col">
            <el-scrollbar key="scrollbar" class="scrollbar">
              <div class="mask top-mask"></div>
              <div class="end-time-input">
                结束时间：
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :editable="false"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <div v-if="!list || list.length === 0" class="hint-box">
                点击左侧按钮新建题目
              </div>
              <draggable
                v-else
                class="list-group"
                tag="ul"
                v-model="list"
                v-bind="dragOptions"
                handle=".handle"
                @start="drag = true"
                @end="drag = false"
              >
                <transition-group type="transition" name="flip-list">
                  <li class="list-group-item" v-for="(element, index) in list" :key="`question-${index}`">
                    <i class="anticon icon-bars handle"
                      ><span class="order">{{ index + 1 }}.</span></i
                    >
                    <div class="question">
                      <span class="question-title">
                        <div class="label">
                          问题：
                        </div>
                        <el-input
                          class="title-input"
                          placeholder="请输入标题"
                          size="medium"
                          v-model="element.title"
                          :maxlength="60"
                          clearable
                          show-word-limit
                        >
                        </el-input>
                      </span>
                      <div class="question-type">
                        类型：{{ element.type | questionTypeFilter }}
                        <span v-if="element.type === 2" class="limit">
                          选项可选数量上限：
                          <el-input-number
                            class="limit-max-input"
                            v-model="element.limit_max"
                            size="mini"
                            controls-position="right"
                            :step-strictly="true"
                            :min="1"
                            :max="10"
                          ></el-input-number>
                        </span>
                      </div>
                      <!-- 选择题选项 -->
                      <div class="question-options" v-if="element.type === 2">
                        <i class="iconfont icon-jia plus" v-if="!element.options.length" @click="addOption(index)"></i>
                        <el-row class="option-row" v-for="(item, key) in element.options" :key="key">
                          <div class="option-hint">选项{{ key + 1 }}</div>
                          <el-input
                            v-model="item.title"
                            :maxlength="60"
                            show-word-limit
                            clearable
                            placeholder="请输入选项"
                            size="medium"
                            class="option-input"
                          ></el-input>
                          <div class="function">
                            <i class="iconfont icon-jian1 minus" @click="removeOption(index, key)"></i>
                            <i
                              class="iconfont icon-jia plus"
                              v-if="key === element.options.length - 1 && element.options.length < 10"
                              @click="addOption(index)"
                            ></i>
                          </div>
                        </el-row>
                      </div>
                    </div>
                    <i class="el-icon-close" @click="removeQuestion(index)"></i>
                  </li>
                </transition-group>
              </draggable>
              <div class="mask bottom-mask"></div>
            </el-scrollbar>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Class from '@/model/class'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      title: '',
      info: '',
      endTime: null,
      loading: false,
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
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
      list: [],
    }
  },
  components: {
    draggable,
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    addTextQuestion() {
      this.list.push({
        title: '',
        type: 1,
      })
    },
    addSelectQuestion() {
      this.list.push({
        title: '',
        type: 2,
        limit_max: 1,
        options: [],
      })
    },
    addOption(index) {
      this.list[index].options.push({
        title: '',
      })
    },
    removeOption(index, key) {
      this.list[index].options.splice(key, 1)
    },
    removeQuestion(index) {
      this.list.splice(index, 1)
    },
    async getQuestionnaireVO() {
      // TODO 编辑问卷
      const res = await Class.getQuestionnaireVO(this.$route.params.id)
      this.title = res.title
    },
    async deploy() {
      try {
        this.loading = true
        if (this.$route.params.id === '0') {
          // 发布问卷
          const res = await Class.createQuestionnaire(
            this.title,
            this.info,
            this.currentClassId,
            this.end_time,
            this.list,
          )
          if (res.code < window.MAX_SUCCESS_CODE) {
            this.loading = false
            this.$message.success('问卷发布成功')
          }
        } else {
          // 更新问卷
          const res = await Class.updateQuestionnaire(this.$route.params.id, this.title, this.content)
          if (res.code < window.MAX_SUCCESS_CODE) {
            this.loading = false
            this.$message.success('问卷修改成功')
          } else {
            this.$message.error(res.message)
          }
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
  },
  created() {
    if (this.$route.params.id !== '0') {
      this.getQuestionnaireVO()
    }
  },
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.flip-list-enter-active {
  transition: opacity 0.5s;
}
.flip-list-enter {
  opacity: 0;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.container {
  padding: 0 30px;
  color: #596c8e;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dae1ec;
    height: 59px;
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
    }
    .deploy-button {
      margin: 0 40px;
    }
  }

  .wrapper {
    height: calc(100% - 80px);
    .title-input {
      display: flex;
      padding: 20px 20px 0;
      label {
        width: 120px;
        line-height: 36px;
      }
    }
    .info-input {
      display: flex;
      padding: 20px;
      border-bottom: 1px dashed #dae1ec;
      label {
        width: 120px;
        line-height: 36px;
      }
    }
    .questions {
      height: calc(100% - 150px);
      /deep/ .el-row {
        height: 100%;
      }
      .toolbar {
        border-right: 1px solid #dae1ec;
        height: 100%;
        text-align: right;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: center;
        .add-button {
          margin: 10px 20px;
          .button {
            font-size: 20px;
          }
        }
      }
      .scrollbar {
        height: 100%;
        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
      .right-col {
        height: 100%;
      }
      .end-time-input {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #dae1ec;
        /deep/ .el-input__inner {
          cursor: pointer;
        }
      }
      .hint-box {
        text-align: center;
        padding: 20vh 0;
        color: #dcdfe6;
      }
      .mask {
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 50px;
        pointer-events: none;
        &.top-mask {
          top: 0;
          background: linear-gradient(rgb(249, 250, 251), rgba(249, 250, 251, 0));
        }
        &.bottom-mask {
          bottom: 0;
          background: linear-gradient(rgba(249, 250, 251, 0), rgb(249, 250, 251));
        }
      }
      .list-group {
        min-height: 20px;
        width: 90%;
        padding: 0 20px;
        margin: 0 auto;
        .list-group-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 15px 0;
          padding-bottom: 10px;
          border-bottom: 1px dashed #d5eae6;
          .handle {
            font-size: 20px;
            font-weight: 700;
            cursor: move;
            padding: 20px 0;
            &:hover {
              transform: scale(1.2);
            }
          }
          .order {
            margin: 0 10px;
          }
          .el-icon-close {
            font-weight: 700;
            cursor: pointer;
            padding: 5px;
            color: #c7485b;
            font-size: 20px;
            &:hover {
              transform: scale(1.2);
            }
          }
          .question-title {
            display: flex;
            align-items: center;
            margin: 10px 0;
            .label {
              width: 50px;
            }
            .title-input {
              width: 350px;
              padding: 0;
            }
          }
          .question-type {
            font-size: 14px;
            margin: 10px 0;
            .limit {
              padding-left: 30px;
              .limit-max-input {
                width: 80px;
              }
            }
          }
          .question-options {
            padding-top: 10px;
            .iconfont {
              cursor: pointer;
              font-size: 20px;
              font-weight: 700;
              &.plus {
                color: #3765b6;
              }
              &.minus {
                font-size: 22px;
                color: #c7485b;
              }
            }
            .option-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 400px;
              margin-bottom: 10px;
              .option-hint {
                width: 60px;
              }
              .option-input {
                width: 300px;
                margin-right: 5px;
              }
              .function {
                display: flex;
                justify-content: space-between;
                width: 60px;
                height: 36px;
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
