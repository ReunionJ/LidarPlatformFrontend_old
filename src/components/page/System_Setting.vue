<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-s-tools"></i> 管理系统 </el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-button v-if="this.userRight === '超级管理员'" @click="resetService" type="danger" style="margin-bottom: 10px"
                >重置所有微服务</el-button
            >
            <!-- 用户列表区域 -->
            <el-table :data="micro_service_List" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="微服务名称" prop="micro_service_name"></el-table-column>
                <el-table-column label="IP与端口" prop="IP_and_port"></el-table-column>
                <el-table-column label="状态" prop="state"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            micro_service_List: [],
            userRight: ''
        };
    },
    created() {
        this.userRight = window.sessionStorage.getItem('user_group_name');
    },
    methods: {
        async resetService() {
            this.$confirm('!警告：该操作不可逆，是否重置所有微服务？')
                .then(async _ => {
                    console.log('确定');
                    const { data: data } = await this.$http({
                        url: '/micro_service/',
                        method: 'post'
                    });
                    if (data.code !== 20000) {
                        console.log(data.code);
                        console.log(data.msg);
                        return this.$message.error('重置微服务失败！' + '错误原因：' + data.msg);
                    }
                    this.$message.success('重置微服务成功！');
                })
                .catch(_ => {
                    console.log('取消');
                });
        }
    },
    async mounted() {
        this.micro_service_List = [];
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
        const { data: data } = await this.$http.get('/micro_service/');
        console.log('data:', data);
        if (data.code !== 20000) {
            console.log(data.code);
            console.log(data.msg);
            return this.$message.error('获取微服务信息失败！' + '错误原因：' + data.msg);
        }
        for (var i in data.data) {
            var temp = {};
            // console.log('i:', i);
            temp['micro_service_name'] = i;
            for (var j in data.data[i]) {
                console.log('j:', j);
                temp['IP_and_port'] = j;
                // console.log('data.data[i][j]:', data.data[i][j]);
                if (data.data[i][j]) {
                    temp['state'] = '空闲';
                } else {
                    temp['state'] = '忙碌';
                }
            }
            console.log('temp:', temp);
            this.micro_service_List.push(temp);
        }
        var temp = {};
        temp['IP_and_port'] = '10.0.0.22:8005';
        temp['micro_service_name'] = '添加扩增点云生成';
        temp['state'] = '空闲';
        this.micro_service_List.push(temp);
        var temp2 = {};
        temp2['IP_and_port'] = '10.0.0.22:8006';
        temp2['micro_service_name'] = '点云物体旋转生成';
        temp2['state'] = '空闲';
        this.micro_service_List.push(temp2);
        var temp3 = {};
        temp3['IP_and_port'] = '10.0.0.22:8007';
        temp3['micro_service_name'] = '极端场景点云生成';
        temp3['state'] = '空闲';
        this.micro_service_List.push(temp3);
        console.log('this.micro_service_List:', this.micro_service_List);
    }
};
</script>

<style scoped></style>
