export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './user/Login' },
      { path: '/user/logout', component: './user/Login' },
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
        exact: true,
        component: './dashboard/Dashboard',
      },
      {
        path: '/dota',
        name: 'dota',
        icon: 'fire',
        routes: [
          { path: '/dota', redirect: '/dota/hero', exact: true },
          {
            path: '/dota/hero',
            name: 'hero',
            icon: 'team',
            routes: [
              { path: '/dota/hero', component: './dota/Dota', exact: true },
              { path: '/dota/hero/:name', component: './dota/hero/HeroDetail' },
              { component: './exception/404' },
            ],
          },
          {
            path: 'item',
            name: 'item',
            icon: 'gift',
          },
          { component: './exception/404' },
        ],
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      { component: './exception/404' },
    ],
  },
];
