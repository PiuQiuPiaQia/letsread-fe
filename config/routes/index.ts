import { IRoute } from 'umi-types';
const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/RobotTableLayout',
    routes: [
      {
        path: '/login',
        component: '@/pages/Login/index',
      },
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        component: '@/pages/Home/index',
      },
      {
        path: '/robot_markdown',
        component: '@/pages/DashboardCommon/RobotMarkdown/index',
      },
      { path: '*', component: '@/components/404' },
    ],
  },
];
export default routes;
