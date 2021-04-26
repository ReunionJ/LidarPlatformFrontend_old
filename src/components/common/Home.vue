<template>
    <div class="wrapper">
        <!-- 头部组件 -->
        <v-head></v-head>
        <!-- 侧边栏组件 -->
        <v-sidebar></v-sidebar>
        <!-- 主体部分 -->
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <!-- 页签组件 -->
            <v-tags></v-tags>
            <!-- 内容部分 -->
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- <keep-alive :include="Input"> -->
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
        <!-- 底部 -->
        <!-- <v-foot></v-foot> -->
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import vFoot from './Footer.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            userList: []
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags,
        vFoot
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    mounted() {
        this.getSelfInfo();
    },
    methods: {
        async getSelfInfo() {
            const { data: data } = await this.$http.get('/user/');
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('个人信息获取失败！');
            }
            //   数据获取成功，保存数据到this中
            console.log('data:');
            console.log(data);
        }
    }
};
</script>

<style scoped>
/* .content-box {
    left: 180px !important;
} */
</style>
