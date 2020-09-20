const classRouter = [
  {
    title: '进入班级',
    type: 'view',
    name: null,
    route: '/class/list',
    filePath: 'view/class/class-list.vue',
    inNav: true,
    icon: 'iconfont icon-erji1',
    order: null,
    permission: ['查询自己信息'],
  },
  {
    title: '进入班级（教师）',
    type: 'view',
    name: null,
    route: '/teacher/class/list',
    filePath: 'view/teacher/class/class-list.vue',
    inNav: true,
    icon: 'iconfont icon-erji1',
    order: null,
    permission: ['查询所有班级'],
  },
]

export default classRouter
