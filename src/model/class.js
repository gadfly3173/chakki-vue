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

  // 教师获取本学期所属班级
  async getTeacherClassList(semester_id) {
    const res = await get('v1/lesson/class/list', {
      semester_id,
    })
    return res
  }

  // 学生获取本学期所属班级
  async getStudentClassList(semester_id) {
    const res = await get('v1/class/class/list', {
      semester_id,
    })
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

  // 获取签到项目的签到人员
  async getSignUserList(sign_id, sign_status, order_by_IP, username, count, page) {
    const res = await get(`v1/lesson/sign/students/query/${sign_id}`, {
      sign_status,
      order_by_IP,
      username,
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

  // 修改学生签到记录
  async updateSignRecord(signId, user_id, sign_status) {
    const res = await post(`v1/lesson/sign/record/update/${signId}`, {
      user_id,
      sign_status,
    })
    return res
  }

  // 学生进行签到
  async postConfirmSign(sign_id) {
    const res = await post(`v1/class/sign/confirm/${sign_id}`)
    return res
  }

  // 教师获取单个签到项目信息
  async getSignDetail(id) {
    const res = await get(`v1/lesson/sign/${id}`)
    return res
  }

  async getStudentAllSemesters() {
    const semester = await get('v1/class/semester/all')
    return semester
  }

  async getTeacherAllSemesters() {
    const semester = await get('v1/lesson/semester/all')
    return semester
  }

  // 新建作业项目
  async createWork(form, class_id) {
    const res = await post('v1/lesson/work/create', {
      class_id,
      name: form.name,
      info: form.info,
      file_num: form.fileNum,
      file_size: form.fileSize,
      file_extend: form.fileExtend,
      end_time: form.endTime,
      type: form.type,
    })
    return res
  }
}

export default new Class()
