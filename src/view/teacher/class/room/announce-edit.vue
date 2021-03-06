<template>
  <div class="container" v-loading="loading">
    <div class="header">
      <div class="title">{{ $route.params.id === '0' ? '新建' : '编辑' }}通知公告</div>
      <div class="deploy-button"><el-button type="primary" @click.stop="deploy">发布</el-button></div>
    </div>
    <div class="wrapper">
      <div class="title-input">
        <label>公告标题：</label>
        <el-input size="medium" clearable v-model="title" :maxlength="60" show-word-limit autofocus></el-input>
      </div>
      <tinymce class="editor" @change="change" :defaultContent="defaultContent" />
      <div class="attachment">
        <div class="title">
          附件：
          <span class="hint"
            >附件只能设置一个文件，限制100MB以内，添加新的文件并发布会覆盖原有的附件，不添加文件则不会改动已有的文件。</span
          >
        </div>
        <div class="container">
          <el-upload
            ref="uploader"
            class="uploader"
            drag
            action=""
            :limit="1"
            :auto-upload="false"
            :on-change="handleUploaderChange"
            :on-exceed="handleUploaderExceed"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
          </el-upload>
          <div class="attachment-list">
            <div class="title">
              已发布的附件：
              <span v-if="filename" class="filename"><i class="el-icon-download"></i>{{ filename }}</span>
              <span v-else class="filename">无</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Class from '@/model/class'
import Tinymce from '@/component/base/tinymce'

export default {
  data() {
    return {
      content: '',
      title: '',
      defaultContent: '',
      filename: null,
      loading: false,
    }
  },
  components: {
    Tinymce,
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    change(val) {
      this.content = val
      console.log(this.content)
    },
    async getAnnouncementVO() {
      const res = await Class.getAnnouncementVO(this.$route.params.id)
      this.defaultContent = res.content
      this.title = res.title
      this.filename = res.filename
    },
    handleUploaderExceed(files) {
      this.$refs.uploader.clearFiles()
      this.$refs.uploader.handleStart(files[0])
    },
    handleUploaderChange(file) {
      if (file.size >= 100 * 1024 ** 2) {
        this.$message.warning('文件体积过大，超过100MB')
        this.$refs.uploader.clearFiles()
      }
    },
    async deploy() {
      try {
        this.loading = true
        if (this.$route.params.id === '0') {
          // 发布正文
          const res = await Class.createAnnouncement(this.title, this.content, this.currentClassId)
          // 无文件直接返回
          if (this.$refs.uploader.uploadFiles.length === 0) {
            this.loading = false
            return this.$message.success('公告发布成功')
          }
          // 发布文件
          const res2 = await Class.updateAnnouncementAttachment(res, this.$refs.uploader.uploadFiles[0].raw)
          if (res2.code < window.MAX_SUCCESS_CODE) {
            this.$message.success('公告发布成功')
          } else {
            this.$message.error(res2.message)
          }
        } else {
          // 更新正文
          const res = await Class.updateAnnouncement(this.$route.params.id, this.title, this.content)
          if (res.code < window.MAX_SUCCESS_CODE) {
            // 无文件直接返回
            if (this.$refs.uploader.uploadFiles.length === 0) {
              this.loading = false
              return this.$message.success('公告修改成功')
            }
            // 发布文件
            const res2 = await Class.updateAnnouncementAttachment(
              this.$route.params.id,
              this.$refs.uploader.uploadFiles[0].raw,
            )
            if (res2.code < window.MAX_SUCCESS_CODE) {
              this.$message.success('公告修改成功')
            } else {
              this.$message.error(res2.message)
            }
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
      this.getAnnouncementVO()
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;
  color: #596c8e;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dae1ec;
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
    margin-top: 20px;
    .title-input {
      display: flex;
      padding: 0 20px;
      label {
        width: 120px;
        line-height: 36px;
      }
    }
    .editor {
      margin-top: 20px;
    }
    .attachment {
      margin-top: 20px;
      .title {
        width: 900px;
        line-height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #dae1ec;
        .hint {
          font-size: 14px;
          color: #8c98ae;
        }
      }
      .container {
        display: flex;
        .uploader {
          width: 420px;
          margin-top: 10px;
          margin-left: 30px;
          margin-bottom: 30px;
          /deep/ .el-upload-list {
            .el-upload-list__item {
              margin-top: 0 !important;
            }
          }
        }
        .attachment-list {
          margin-top: 20px;
          .title {
            font-size: 14px;
            border-bottom: none;
          }
          .filename {
            color: #8c98ae;
            cursor: pointer;
            &:hover {
              color: #596c8e;
            }
          }
        }
      }
    }
  }
}
</style>
