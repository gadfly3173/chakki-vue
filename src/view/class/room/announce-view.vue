<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">{{ className }} - {{ announce.title }}</div>
      </div>
      <div class="wrapper">
        <div id="tinymce" class="mce-content-body" v-html="announce.content"></div>
        <div class="attachment">
          <div class="title">
            已发布的附件：
            <span v-if="announce.filename" class="filename" title="点击下载文件" @click="handleDownloadClick($route.params.id)">
              <i class="el-icon-download"></i>
              {{ announce.filename }} - {{ announce.filesize | byteFilter }}
            </span>
            <span v-else class="filename">无</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileDownload from 'js-file-download'
import Class from '@/model/class'

export default {
  data() {
    return {
      announce: {},
      className: '正在获取班级名称',
      loading: false,
    }
  },
  async created() {
    this.getClassDetail()
    await this.getAnnounceVO()
  },
  computed: {
    currentClassId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    async getAnnounceVO() {
      try {
        this.loading = true
        const res = await Class.getStudentAnnouncementVO(this.$route.params.id)
        this.announce = res
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async getClassDetail() {
      const res = await Class.getStudentClassDetail(this.currentClassId)
      this.className = res.name
    },
    async handleDownloadClick(id) {
      const notify = this.$notify({
        title: '提示',
        message: '文件正在后台下载中，请勿离开或刷新本页面',
        duration: 0,
      })
      const res = await Class.downloadStudentAnnouncementFile(id)
      // 提取文件名
      const filename = res.headers['content-disposition'].match(
        /(?:.*filename\*|filename)=(?:([^'"]*)''|("))([^;]+)\2(?:[;`\n]|$)/,
      )[3]
      fileDownload(res.data, decodeURI(filename))
      notify.close()
    },
  },
  watch: {
    announce() {
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        Prism.highlightAll()
      })
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

  .wrapper {
    margin-top: 20px;
    .mce-content-body {
      min-width: 768px;
      width: 90%;
      margin: 0 auto;
    }
    .attachment {
      margin-top: 20px;
      border-top: 1px solid #dae1ec;
      .title {
        margin-top: 20px;
        margin-left: 40px;
        font-size: 16px;
        border-bottom: none;
        color: $parent-title-color;
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
</style>
