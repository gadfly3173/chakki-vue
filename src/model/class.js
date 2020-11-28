/* eslint-disable class-methods-use-this */
import { get, post } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Class {
  // constructor() {}

  // 类中的方法可以代表一个用户行为

  // 获取用户加入的班级列表
  async getClassList() {
    const res = await get('v1/class/list')
    return res
  }

  // 教师获取全部班级
  async getAllClassList() {
    const res = await get('v1/lesson/class/all')
    return res
  }

  // 教师获取单个班级信息
  async getClassDetail(id) {
    const res = await get(`v1/lesson/class/${id}`)
    return res
  }

  // 学生获取单个班级信息
  async getStudentClassDetail(id) {
    const res = await get(`v1/class/${id}`)
    return res
  }

  // 学生获取班级最新签到项目
  async getLatestSignDetail(class_id) {
    const res = await get('v1/class/sign/latest', {
      class_id,
    })
    return res
  }

  // 获取班级内签到项目
  async getSignList(class_id, count, page) {
    const res = await get('v1/lesson/sign/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  // 新建签到项目
  async createSign(form, class_id) {
    const res = await post('v1/lesson/sign/create', {
      class_id,
      title: form.title,
      end_minutes: form.endMinutes,
    })
    return res
  }

  // 学生进行签到
  async postConfirmSign(sign_id) {
    const res = await post(`v1/class/sign/confirm/${sign_id}`)
    return res
  }
}

export default new Class()
