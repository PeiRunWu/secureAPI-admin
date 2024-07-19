export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './Login',
      },
    ],
  },
  { path: '/system', redirect: '/system/sysUser/list' },
  {
    path: '/system/sysUser/list',
    component: './System/SysUser',
  },
  {
    path: '/system/sysRole/list',
    component: './System/SysRole',
  },
  {
    path: '/system/sysMenu/list',
    component: './System/SysMenu',
  },
  {
    path: '/system/userOnline/list',
    component: './System/UserOnline',
  },
  {
    path: '/system/sysLog/list',
    component: './System/SysLog',
  },
  {
    path: '/toolbox',
    redirect: '/toolbox/dataSource/list',
  },
  {
    path: '/toolbox/dataSource/list',
    component: './Toolbox/DataSource',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
