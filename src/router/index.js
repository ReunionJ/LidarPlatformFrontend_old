import Vue from 'vue';
import Router from 'vue-router';
const Lidar_AugTaskAdd = () => import(/* webpackChunkName: "donate" */ '../components/page/Lidar_AugTaskAdd.vue')
const Lidar_AugTaskList = () => import(/* webpackChunkName: "donate" */ '../components/page/Lidar_AugTaskList.vue')
const Lidar_Input_Data = () => import(/* webpackChunkName: "donate" */ '../components/page/Lidar_Input_Data.vue')

const Radar_AugTaskAdd = () => import(/* webpackChunkName: "donate" */ '../components/page/Radar_AugTaskAdd.vue')
const Radar_AugTaskList = () => import(/* webpackChunkName: "donate" */ '../components/page/Radar_AugTaskList.vue')
const Radar_Input_Data = () => import(/* webpackChunkName: "donate" */ '../components/page/Radar_Input_Data.vue')

const Image_AugTaskAdd = () => import(/* webpackChunkName: "donate" */ '../components/page/Image_AugTaskAdd.vue')
const Image_AugTaskList = () => import(/* webpackChunkName: "donate" */ '../components/page/Image_AugTaskList.vue')
const Image_Input_Data = () => import(/* webpackChunkName: "donate" */ '../components/page/Image_Input_Data.vue')

const AugmentationManage = () => import(/* webpackChunkName: "donate" */ '../components/page/AugmentationManage.vue')
const Log = () => import(/* webpackChunkName: "donate" */ '../components/page/Log.vue')
const SelfInfo = () => import(/* webpackChunkName: "donate" */ '../components/page/SelfInfo.vue')
const UserManage = () => import(/* webpackChunkName: "dashboard" */ '../components/page/User_Manage.vue')
const SystemSetting = () => import(/* webpackChunkName: "dashboard" */ '../components/page/System_Setting.vue')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },

                {
                    path: '/Lidar_Augmentation_Add',
                    component: Lidar_AugTaskAdd,
                    name:Lidar_AugTaskAdd,
                    meta: { title: '激光-添加' }
                },
                {
                    path: '/Lidar_Augmentation_Task',
                    component: Lidar_AugTaskList,
                    name:Lidar_AugTaskList,
                    meta: { title: '激光-查询' }
                },
                {
                    path: '/Lidar_Input_Data',
                    component: Lidar_Input_Data,
                    name: Lidar_Input_Data,
                    meta: { title: '激光-可视化' }
                },

                {
                    path: '/Radar_Augmentation_Add',
                    component: Radar_AugTaskAdd,
                    name:Radar_AugTaskAdd,
                    meta: { title: '电磁波-添加' }
                },
                {
                    path: '/Radar_Augmentation_Task',
                    component: Radar_AugTaskList,
                    name:Radar_AugTaskList,
                    meta: { title: '电磁波-查询' }
                },
                {
                    path: '/Radar_Input_Data',
                    component: Radar_Input_Data,
                    name: Radar_Input_Data,
                    meta: { title: '电磁波-可视化' }
                },

                {
                    path: '/Image_Augmentation_Add',
                    component: Image_AugTaskAdd,
                    name:Image_AugTaskAdd,
                    meta: { title: '电磁波-添加' }
                },
                {
                    path: '/Image_Augmentation_Task',
                    component: Image_AugTaskList,
                    name:Image_AugTaskList,
                    meta: { title: '电磁波-查询' }
                },
                {
                    path: '/Image_Input_Data',
                    component: Image_Input_Data,
                    name: Image_Input_Data,
                    meta: { title: '电磁波-可视化' }
                },

                {
                    path: '/user_manage',
                    component: UserManage,
                    name:UserManage,
                    meta: { title: '用户管理' }
                },
                {
                    path: '/augmentation_manage',
                    component: AugmentationManage,
                    name:AugmentationManage,
                    meta: { title: '生成管理' }
                },
                
                {
                    path: '/system_setting',
                    component: SystemSetting,
                    name:SystemSetting,
                    meta: { title: '系统设置' }
                },
                {
                    path: '/Log',
                    component: Log,
                    name:Log,
                    meta: { title: '日志系统' }
                },
                {
                    path: '/SelfInfo',
                    component: SelfInfo,
                    name:SelfInfo,
                    meta: { title: '个人信息' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        }
    ]
});
