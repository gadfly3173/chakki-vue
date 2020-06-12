<template>
  <div class="container">
    <div class="title">新建班级信息</div>
    <el-row>
      <el-col :lg="16" :md="20" :sm="24" :xs="24">
        <div class="content">
          <el-form
            status-icon
            :rules="rules"
            :model="form"
            ref="form"
            label-position="right"
            label-width="100px"
            v-loading="loading"
            @submit.native.prevent
          >
            <el-form-item label="班级名称" prop="name">
              <el-input size="medium" clearable v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="班级描述" prop="info">
              <el-input size="medium" clearable v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Admin from '@/lin/model/admin'

export default {
  inject: ['eventBus'],
  data() {
    const checkName = (rule, value, callback) => {
      // eslint-disable-line
      if (!value) {
        return callback(new Error('班级名称不能为空'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        info: '',
      },
      rules: {
        name: [{ validator: checkName, trigger: ['blur', 'change'], required: true }],
        info: [],
      },
      loading: false,
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (valid) {
          let res
          try {
            this.loading = true
            res = await Admin.createOneClass(this.form.name, this.form.info, finalPermissions, this.id) // eslint-disable-line
          } catch (e) {
            this.loading = false
            console.log(e)
          }
          if (res.code < window.MAX_SUCCESS_CODE) {
            this.loading = false
            this.$message.success(`${res.message}`)
            this.eventBus.$emit('addClass', true)
            this.$router.push('/admin/class/list')
            this.resetForm('form')
          } else {
            this.loading = false
            this.$message.error(`${res.message}`)
          }
        } else {
          this.$message.error('请将信息填写完整')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .content {
    margin-top: 10px;
    padding-left: 25px;
    padding-right: 40px;
  }

  .submit {
    float: left;
  }
}
</style>
