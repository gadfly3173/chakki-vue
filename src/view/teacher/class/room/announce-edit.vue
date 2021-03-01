<template>
  <div class="container">
    <div class="header">
      <div class="title">编辑通知公告</div>
    </div>
    <div class="wrapper">
      <div class="title-input">
        <label>公告标题：</label>
        <el-input size="medium" clearable v-model="title" :maxlength="60" show-word-limit autofocus></el-input>
      </div>
      <tinymce class="editor" @change="change" :defaultContent="defaultContent" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/component/base/tinymce'

export default {
  data() {
    return {
      content: '',
      title: '',
      defaultContent: '',
    }
  },
  components: {
    Tinymce,
  },
  methods: {
    change(val) {
      this.content = val
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
  }
}
</style>
