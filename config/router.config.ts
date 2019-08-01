export default [
  // 404
  {
    path: '/404',
    component: './exception/404',
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './user/Login' },
      { path: '/user/logout', component: './user/Login' },
      { redirect: '/404' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'guest'],
    routes: [
      {
        path: '/',
        name: 'dashboard',
        icon: 'dashboard',
        component: './dashboard/Dashboard',
      },
      {
        path: '/dota',
        name: 'dota',
        icon: 'fire',
        routes: [
          { path: '/dota', redirect: '/dota/hero' },
          {
            path: 'hero',
            name: 'hero',
            icon: 'team',
            component: './dota/Dota',
          },
          {
            path: 'item',
            name: 'item',
            icon: 'gift',
            component: './dota/Dota',
          },
          { redirect: '/404' },
        ],
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      { redirect: '/404' },
    ],
  },
];
