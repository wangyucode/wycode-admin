export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './user/Login' },
      {
        component: './exception/404',
      },
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
        component: './dota/Dota',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './exception/404',
      },
    ],
  },
  {
    component: './exception/404',
  },
];
