<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" active-text-color="#20a0ff" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <!-- 循环展示一级列表 -->
            <template v-for="item in items">
                <!-- 如果以一级列表有二级列表则展示 -->
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <!-- 循环展示二级列表 -->
                        <template v-for="subItem in item.subs">
                            <!-- 如果以二级列表有三级列表则展示 -->
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <!-- 如果以二级列表没有三级列表 -->
                            <el-menu-item
                                v-else-if="subItem.index !== 'user_manage' || showUserManage"
                                :index="subItem.index"
                                :key="subItem.index"
                                >{{ subItem.title }}</el-menu-item
                            >
                        </template>
                    </el-submenu>
                </template>
                <!-- 如果以一级列表没有二级列表 -->
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-magic-stick',
                    index: 'lidardata',
                    title: '激光雷达数据',
                    subs: [
                        {
                            index: 'Lidar_Augmentation_Add',
                            title: '添加生成任务'
                        },
                        {
                            index: 'Lidar_Augmentation_Task',
                            title: '生成任务查询'
                        },
                        {
                            index: 'Lidar_Input_Data',
                            title: '数据可视化'
                        }
                    ]
                },
                {
                    icon: 'el-icon-umplidardata',
                    index: 'Radardata',
                    title: '电磁波雷达数据',
                    subs: [
                        {
                            index: 'Radar_Augmentation_Add',
                            title: '添加生成任务'
                        },
                        {
                            index: 'Radar_Augmentation_Task',
                            title: '生成任务查询'
                        },
                        {
                            index: 'Radar_Input_Data',
                            title: '数据可视化'
                        }
                    ]
                },
                {
                    icon: 'el-icon-picture-outline-round',
                    index: 'Imagedata',
                    title: '雷达图像数据',
                    subs: [
                        {
                            index: 'Image_Augmentation_Add',
                            title: '添加生成任务'
                        },
                        {
                            index: 'Image_Augmentation_Task',
                            title: '生成任务查询'
                        },
                        {
                            index: 'Image_Input_Data',
                            title: '数据可视化'
                        }
                    ]
                },
                {
                    icon: 'el-icon-reading',
                    index: 'Log',
                    title: '日志管理'
                },
                {
                    icon: 'el-icon-s-tools',
                    index: 'Management_System',
                    title: '管理系统',
                    subs: [
                        {
                            index: 'user_manage',
                            title: '用户管理'
                        },
                        {
                            index: 'augmentation_manage',
                            title: '生成管理'
                        },
                        {
                            index: 'system_setting',
                            title: '系统设置'
                        }
                    ]
                }
            ],
            showUserManage: false
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            console.log('collapse:' + this.collapse);
            bus.$emit('collapse-content', msg);
        });
    },
    mounted() {
        console.log('user_group_name:');
        console.log(window.sessionStorage.getItem('user_group_name'));
        console.log('this.$store.state.user_group_name1234:', this.$store.state.user_group_name);
        // window.sessionStorage.getItem
        if (this.$store.state.user_group_name === '超级管理员') {
            this.showUserManage = true;
        } else {
            this.showUserManage = false;
        }
        console.log('this.showUserManage:');
        console.log(this.showUserManage);
    }
};
</script>

<style scoped>
.el-menu {
    background-color: #ecf5ff;
}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    margin-bottom: -15px;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 180px;
}

.sidebar > ul {
    height: 100%;
}
</style>
