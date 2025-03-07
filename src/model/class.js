/* eslint-disable class-methods-use-this */
import { get, post, download, postfile } from '@/lin/plugin/axios'

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
      file_size: form.fileSize,
      file_extension: form.fileExtension,
      end_time: form.endTime,
      type: form.type,
    })
    return res
  }

  // 删除作业项目
  async deleteWork(id) {
    const res = await post(`v1/lesson/work/delete/${id}`)
    return res
  }

  // 获取班级内作业项目
  async getWorkList(class_id, count, page) {
    const res = await get('v1/lesson/work/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  // 学生获取班级内作业项目
  async getWorkListForStudentList(class_id, count, page) {
    const res = await get('v1/class/work/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  // 学生获取作业详情
  async getWorkDetailForStudent(id) {
    const res = await get(`v1/class/work/${id}`)
    return res
  }

  // 新建作业项目
  async updateWork(form) {
    const res = await post('v1/lesson/work/update', {
      id: form.id,
      name: form.name,
      info: form.info,
      file_size: form.fileSize,
      file_extension: form.fileExtension,
      end_time: form.endTime,
      type: form.type,
    })
    return res
  }

  // 交作业上传文件
  async handWork(file, workId) {
    const res = await postfile(`v1/class/work/hand/${workId}`, {
      file,
    })
    return res
  }

  // 教师获取单个作业项目信息
  async getWorkDetail(id) {
    const res = await get(`v1/lesson/work/${id}`)
    return res
  }

  // 教师获取单个作业提交的文件
  async getStudentWorkFile(id) {
    const res = await download(`cms/file/lesson/work/student/download/${id}`)
    return res
  }

  // 下载指定作业项目的全部文件
  async getWorkFileZip(id) {
    const res = await download(`cms/file/lesson/work/download/${id}`)
    return res
  }

  // 获取作业项目的签到人员
  async getWorkUserList(work_id, work_status, order_by_IP, username, count, page) {
    const res = await get(`v1/lesson/work/students/query/${work_id}`, {
      work_status,
      order_by_IP,
      username,
      count,
      page,
    })
    return res
  }

  // 给学生作业打分
  async rateStudentWork(id, rate) {
    const res = await post(`v1/lesson/work/student/rate/${id}`, {
      rate,
    })
    return res
  }

  // 删除学生作业
  async deleteStudentWork(id) {
    const res = await post(`v1/lesson/work/student/delete/${id}`)
    return res
  }

  // 删除学生作业
  async deleteAnnounce(id) {
    const res = await post(`v1/lesson/announcement/delete/${id}`)
    return res
  }

  // 获取班级内通知公告
  async getAnnounceList(class_id, count, page) {
    const res = await get('v1/lesson/announcement/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  async getStudentAnnounceList(class_id, count, page) {
    const res = await get('v1/class/announcement/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  // 获取指定通知公告
  async getStudentAnnouncementVO(id) {
    const res = await get(`v1/class/announcement/${id}`)
    return res
  }

  // 获取指定通知公告
  async getAnnouncementVO(id) {
    const res = await get(`v1/lesson/announcement/${id}`)
    return res
  }

  // 发布通知公告
  async createAnnouncement(title, content, class_id) {
    const res = await post('v1/lesson/announcement/create', {
      title,
      content,
      class_id,
    })
    return res
  }

  // 修改指定通知公告
  async updateAnnouncement(id, title, content) {
    const res = await post(`v1/lesson/announcement/update/${id}`, {
      title,
      content,
    })
    return res
  }

  // 修改公告文件
  async updateAnnouncementAttachment(id, file) {
    const res = await postfile(`v1/lesson/announcement/attachment/${id}`, {
      file,
    })
    return res
  }

  // 下载公告附件
  async downloadAnnouncementFile(id) {
    const res = await download(`cms/file/lesson/announcement/download/${id}`)
    return res
  }

  async downloadStudentAnnouncementFile(id) {
    const res = await download(`cms/file/class/announcement/download/${id}`)
    return res
  }

  async deleteQuestionnaire(id) {
    const res = await post(`v1/lesson/questionnaire/delete/${id}`)
    return res
  }

  async getQuestionnaireList(class_id, count, page) {
    const res = await get('v1/lesson/questionnaire/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  // 发布问卷
  async createQuestionnaire(title, info, class_id, end_time, questions) {
    const res = await post('v1/lesson/questionnaire/create', {
      title,
      info,
      class_id,
      end_time,
      questions,
    })
    return res
  }

  // 获取指定问卷
  async getQuestionnaireVOForStudent(id) {
    const res = await get(`v1/class/questionnaire/${id}`)
    return res
  }

  async getQuestionnaireListForStudent(class_id, count, page) {
    const res = await get('v1/class/questionnaire/list', {
      class_id,
      count,
      page,
    })
    return res
  }

  async handStudentQuestionnaire(id, answer) {
    const res = await post(`v1/class/questionnaire/${id}`, answer)
    return res
  }

  async downloadStudentQuestionnaireReport(id) {
    const res = await download(`cms/file/lesson/questionnaire/download/${id}`)
    return res
  }
}

export default new Class()
