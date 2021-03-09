/* eslint-disable class-methods-use-this */
import { post, get, put, _delete } from '@/lin/plugin/axios'

export default class Admin {
  constructor(uPage = 0, uCount = 10, gPage = 0, gCount = 5) {
    this.uPage = uPage
    this.uCount = uCount
    this.lPage = gPage
    this.gCount = gCount
  }

  async increaseUPage() {
    this.uPage += 1
  }

  async increaseGPage() {
    this.lPage += 1
  }

  async decreaseUPage() {
    this.uPage -= 1
    if (this.uPage < 0) {
      this.uPage = 0
    }
  }

  async decreaseGPage() {
    this.lPage -= 1
    if (this.lPage < 0) {
      this.lPage = 0
    }
  }

  static getAllPermissions() {
    return get('cms/admin/permission')
  }

  static async getAdminUsers({ group_id, count = this.uCount, page = this.uPage }) {
    let res
    if (group_id) {
      res = await get('cms/admin/users', {
        count,
        page,
        group_id,
      })
    } else {
      res = await get('cms/admin/users', {
        count,
        page,
      })
    }
    return res
  }

  async nextUsersPage() {
    await this.increaseUPage()
    return this.getAdminUsers({})
  }

  async preUsersPage() {
    await this.decreaseUPage()
    return this.getAdminUsers({})
  }

  async getGroupsWithPermissions({ count = this.uCount, page = this.uPage }) {
    const res = await get('cms/admin/groups', {
      count,
      page,
    })
    return res
  }

  async nextGroupsPage() {
    await this.increaseGPage()
    return this.getGroupsWithPermissions({})
  }

  async preGroupsPage() {
    await this.decreaseGPage()
    return this.getGroupsWithPermissions({})
  }

  static async getAllGroups() {
    const groups = await get('cms/admin/group/all')
    return groups
  }

  static async getOneGroup(id) {
    const group = await get(`cms/admin/group/${id}`)
    return group
  }

  static async createOneGroup(name, info, permission_ids) {
    const res = await post('cms/admin/group', {
      name,
      info,
      permission_ids,
    })
    return res
  }

  static async updateOneGroup(name, info, id) {
    const res = await put(`cms/admin/group/${id}`, {
      name,
      info,
    })
    return res
  }

  static async deleteOneGroup(id) {
    const res = await _delete(`cms/admin/class/${id}`)
    return res
  }

  async getClasses({ count = this.uCount, page = this.uPag }) {
    const res = await get('cms/admin/classes', {
      count,
      page,
    })
    return res
  }

  async nextClassesPage() {
    await this.increaseGPage()
    return this.getClasses({})
  }

  async preClassesPage() {
    await this.decreaseGPage()
    return this.getClasses({})
  }

  static async getAllClasses() {
    const groups = await get('cms/admin/class/all')
    return groups
  }

  static async getAllSemesters() {
    const groups = await get('cms/admin/semester/all')
    return groups
  }

  static async getOneClass(id) {
    const group = await get(`cms/admin/class/${id}`)
    return group
  }

  static async createOneClass(name, info, semester_id) {
    const res = await post('cms/admin/class', {
      name,
      info,
      semester_id,
    })
    return res
  }

  static async updateOneClass(name, info, id, semester_id) {
    const res = await put(`cms/admin/class/${id}`, {
      name,
      info,
      semester_id,
    })
    return res
  }

  static async deleteOneClass(id) {
    const res = await _delete(`cms/admin/class/${id}`)
    return res
  }

  static async createOneSemester(name, info) {
    const res = await post('cms/admin/semester', {
      name,
      info,
    })
    return res
  }

  static async updateOneSemester(name, info, id) {
    const res = await put(`cms/admin/semester/${id}`, {
      name,
      info,
    })
    return res
  }

  static async deleteOneSemester(id) {
    const res = await _delete(`cms/admin/semester/${id}`)
    return res
  }

  static async getAllStudents({ class_id, count = this.uCount, page = this.uPag }) {
    const students = await get('cms/admin/students', {
      count,
      page,
      class_id,
    })
    return students
  }

  static async getAllTeachers({ class_id }) {
    const teachers = await get('cms/admin/teacher/list', {
      class_id,
    })
    return teachers
  }

  static async deleteOneUser(id) {
    const res = await _delete(`cms/admin/user/${id}`)
    return res
  }

  static async deleteUserMFA(id) {
    const res = await _delete(`cms/admin/user/mfa/${id}`)
    return res
  }

  static async updateOneUser(username, nickname, group_ids, id) {
    const res = await put(`cms/admin/user/${id}`, {
      username,
      nickname,
      group_ids,
    })
    return res
  }

  static async dispatchPermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/dispatch/batch', {
      group_id,
      permission_ids,
    })
    return res
  }

  static async changePassword(new_password, confirm_password, id) {
    const res = await put(`cms/admin/user/${id}/password`, {
      new_password,
      confirm_password,
    })
    return res
  }

  static async removePermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/remove', {
      group_id,
      permission_ids,
    })
    return res
  }

  static async dispatchStudentClass(user_id, class_ids) {
    const res = await post('cms/admin/students/del', {
      user_id,
      class_ids,
    })
    return res
  }

  static async addStudentClass(class_id, user_ids) {
    const res = await post('cms/admin/students/add', {
      class_id,
      user_ids,
    })
    return res
  }

  static async getFreshStudentByName(class_id, name, count, page) {
    const res = await get('cms/admin/students/fresh_by_name', {
      class_id,
      name,
      count,
      page,
    })
    return res
  }

  static async dispatchTeacherClass(user_id, class_ids) {
    const res = await post('cms/admin/teacher/del', {
      user_id,
      class_ids,
    })
    return res
  }

  static async addTeacherClass(class_id, user_ids, level) {
    const res = await post('cms/admin/teacher/add', {
      class_id,
      user_ids,
      level,
    })
    return res
  }

  static async getFreshTeacherByName(class_id, name, count, page) {
    const res = await get('cms/admin/teacher/fresh_by_name', {
      class_id,
      name,
      count,
      page,
    })
    return res
  }
}
