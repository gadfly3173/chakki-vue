<template>
  <div class="container" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title">批量新建用户</div>
    <div class="wrap">
      <el-row>
        <el-col :span="12" :gutter="20" class="wrapper-left">
          <div class="info">
            <p>
              请输入需要批量添加的用户名与昵称，密码会被设为123456。请以空格作为用户名与昵称的分隔，换行符作为两个用户之间的分隔。虽然对于各种换行符与空格都进行了一定的判断，但也请尽量不要出现多余的空格与空行。输入范例：
            </p>
            <p>
              f17015101 张三<br />
              f17015102 李四
            </p>
          </div>
          <el-input type="textarea" :autosize="{ minRows: 5 }" placeholder="请输入内容" v-model="textarea"></el-input>
          <el-button type="primary" class="button" @click="handleTransform">转换</el-button>
        </el-col>
        <el-col :span="12" class="wrapper-right">
          <div class="block-box">
            <i class="iconfont icon-jia plus" v-if="!list.length" @click="addContent"></i>
            <el-row class="input-row" v-for="(item, index) in list" :key="index" :gutter="20">
              <el-col :span="10"
                ><el-input
                  v-model="item.username"
                  placeholder="请输入用户名"
                  size="medium"
                  class="input-detail"
                ></el-input
              ></el-col>
              <el-col :span="10"
                ><el-input
                  v-model="item.nickname"
                  placeholder="请输入昵称/姓名"
                  size="medium"
                  class="input-detail"
                ></el-input
              ></el-col>
              <el-col :span="4" class="function">
                <i class="iconfont icon-jian1 minus" @click="removeContent(index)"></i>
                <i class="iconfont icon-jia plus" v-if="index === list.length - 1" @click="addContent"></i>
              </el-col>
            </el-row>
          </div>
          <div class="operation-box">
            <div style="margin-top: 10px">
              密码：
              <el-input
                v-model="password"
                placeholder="请输入用户默认密码"
                size="medium"
                :minlength="6"
                style="width: 200px"
              ></el-input>
            </div>
            <div style="margin-top: 10px">
              分组：
              <el-select size="medium" v-model="group" placeholder="请选择用户分组" :loading="selectLoading">
                <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </div>
            <el-button type="success" class="submit-button" @click="handleConfirm">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import User from '@/lin/model/user'
import Admin from '@/lin/model/admin'

export default {
  data() {
    return {
      textarea: '',
      list: [],
      fullscreenLoading: false,
      group: 3,
      groupList: [],
      password: '123456',
    }
  },
  methods: {
    handleTransform() {
      if (this.textarea.trim().length < 10) {
        this.$message.error('请至少输入10个字以上')
        return
      }
      const temp = this.textarea.trim().split(/[(\r\n\s)\r\n\s]+/)
      if (temp.length % 2 !== 0) {
        this.$message.error('检测到不完整的用户名与昵称的对应关系，请检查')
        return
      }
      const result = []
      for (let i = 0, len = temp.length; i < len; i += 2) {
        result.push(temp.slice(i, i + 2))
      }
      this.list = result.map(i => ({
        username: i[0],
        nickname: i[1],
        type: 'plus',
      }))
    },
    // 获取所有分组
    async getAllGroups() {
      try {
        this.selectLoading = true
        this.groupList = await Admin.getAllGroups()
        this.selectLoading = false
      } catch (e) {
        this.selectLoading = false
        // console.log(e)
      }
    },
    handleConfirm() {
      if (this.list.length === 0 || this.list[0].username.trim().length < 6) {
        this.$message({
          type: 'warning',
          message: '请至少添加一个用户',
        })
        return
      }
      const isPasswordLegal = /^[A-Za-z0-9_*&$#@]{6,22}$/.test(this.password.trim())
      if (!isPasswordLegal) {
        return this.$message({
          type: 'warning',
          message: '密码只允许大小写字母与_*&$#@，并且长度在6-22位之间',
        })
      }
      const temp = this.list.map(i => ({
        username: i.username,
        nickname: i.nickname,
        password: this.password.trim(),
        confirm_password: this.password.trim(),
        group_ids: [this.group],
      }))
      const data = { batch_users: temp }
      let res
      this.$confirm('此操作将批量注册用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          this.fullscreenLoading = true
          res = await User.createBatchUser(data)
        } catch (e) {
          this.fullscreenLoading = false
          // console.log(e)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
          this.fullscreenLoading = false
        } else {
          this.fullscreenLoading = false
          this.$message({
            type: 'error',
            message: `${res.message}`,
          })
        }
      })
    },
    addContent() {
      this.list.push({
        username: '',
        nickname: '',
        type: 'plus',
      })
    },
    removeContent(index) {
      this.list.splice(index, 1)
    },
  },
  created() {
    this.getAllGroups()
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

  .wrap {
    padding: 0px 20px;
    .wrapper-left {
      border-right: double #596c8e;
      padding-right: 15px;
    }
    .wrapper-right {
      margin-left: -5px;
    }
  }

  .info {
    font-size: 14px;
    line-height: 22px;
    color: #596c8e;
    padding: 20px;
    p {
      padding-top: 10px;
    }
  }

  .input-row {
    margin-top: 20px;
    .function {
      display: flex;
      justify-content: space-between;
      width: 60px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      font-size: 26px;
      .plus {
        color: #7289b2;
      }
      .minus {
        color: #c6848e;
      }
    }
  }

  .button {
    margin: 30px;
    padding-left: 20px;
  }

  .operation-box {
    margin: 30px;
    padding-left: 20px;
    .submit-button {
      margin: 15px;
    }
  }

  .block-box {
    margin-left: 20px;
    margin-top: 20px;
    .plus {
      color: #7289b2;
    }
    i {
      cursor: pointer;
      font-size: 26px;
    }
  }
}
</style>
