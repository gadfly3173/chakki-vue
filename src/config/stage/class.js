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
    permission: ['学生进行签到'],
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
  {
    title: '班级页面',
    type: 'tab',
    name: Symbol('room'),
    route: '/class/room/work',
    filePath: 'view/class/room/work-list.vue',
    inNav: false,
    icon: null,
    children: [
      {
        route: '/class/room/work',
        type: 'view',
        name: 'workList',
        filePath: 'view/class/room/work-list.vue',
        inNav: true,
        title: '作业列表',
        icon: 'iconfont icon-kecheng',
      },
      {
        route: '/class/room/announce',
        type: 'view',
        name: 'announceList',
        filePath: 'view/class/room/announce-list.vue',
        inNav: false,
        title: '公告列表',
        icon: 'iconfont icon-fold',
      },
    ],
  },
  {
    title: '班级页面',
    type: 'tab',
    name: Symbol('teacher-room'),
    route: '/teacher/class/room/work',
    filePath: 'view/teacher/class/room/work-list.vue',
    inNav: false,
    icon: null,
    children: [
      {
        route: '/teacher/class/room/sign',
        type: 'view',
        name: 'signList',
        inNav: true,
        filePath: 'view/teacher/class/room/sign-list.vue',
        title: '签到列表',
        icon: 'iconfont icon-jiemianicon-',
        permission: ['发起签到'],
      },
      {
        route: '/teacher/class/room/work',
        type: 'view',
        name: 'workList',
        filePath: 'view/teacher/class/room/work-list.vue',
        inNav: true,
        title: '作业列表',
        icon: 'iconfont icon-kecheng',
        permission: ['发起签到'],
      },
      {
        route: '/teacher/class/room/announce',
        type: 'view',
        name: 'announceList',
        filePath: 'view/teacher/class/room/announce-list.vue',
        inNav: false,
        title: '公告列表',
        icon: 'iconfont icon-fold',
        permission: ['发起签到'],
      },
    ],
  },
  {
    title: '签到人员统计',
    type: 'view',
    name: null,
    route: '/teacher/class/room/sign/list/:id',
    filePath: 'view/teacher/class/room/sign-student-list.vue',
    inNav: false,
    icon: 'iconfont icon-huiyuanguanli',
    order: null,
    permission: ['查询单个签到项目下的所有学生'],
  },
]

export default classRouter
