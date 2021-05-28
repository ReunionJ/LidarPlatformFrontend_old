<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="padding-top: -2px !important">
                    <i class="el-icon-umplidardata"></i> 电磁波雷达数据
                </el-breadcrumb-item>
                <el-breadcrumb-item>生成任务查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 生成任务列表区域 -->
            <el-table :data="taskList" border stripe empty-text="暂无数据">
                <!-- 索引列 -->
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <el-table-column label="任务名" prop="name"></el-table-column>
                <el-table-column label="任务状态" prop="task_status"></el-table-column>
                <el-table-column label="任务生成数据数量" prop="generate_data_number">
                    <template slot-scope="scope">
                        {{ isBlank_num(scope) }}
                    </template>
                </el-table-column>
                <el-table-column label="任务数据更新时间" prop="update_datetime">
                    <template slot-scope="scope">
                        {{ scope.row.update_datetime | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="任务开始时间" prop="start_datetime">
                    <template slot-scope="scope">
                        {{ isBlank_start(scope) | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="任务结束时间" prop="fin_datetime">
                    <template slot-scope="scope">
                        {{ isBlank_end(scope) | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="任务所有者名称" prop="master_username"></el-table-column>
                <!-- 操作无具体的数据源 -->
                <el-table-column label="下载文件">
                    <template slot-scope="scope">
                        <!-- 下载原始文件按钮 -->
                        <el-tooltip
                            v-if="scope.row.task_status !== '未完成'"
                            effect="dark"
                            content="下载原始文件"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="success"
                                icon="el-icon-download"
                                size="mini"
                                plain
                                @click="originalfileDownload(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 下载生成文件按钮 -->
                        <el-tooltip
                            v-if="scope.row.task_status !== '未完成'"
                            effect="dark"
                            content="下载生成文件"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                plain
                                type="warning"
                                icon="el-icon-download"
                                size="mini"
                                @click="generatefileDownload(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页模块 -->
            <!-- <el-pagination
                @size-change="handleSizeChange_All"
                @current-change="handleCurrentChange_All"
                :current-page.sync="queryInfo_All.page"
                :page-size="10"
                layout="total, prev, pager, next"
            >
            </el-pagination> -->
        </el-card>
    </div>
</template>

<script>
import qs from 'qs';
import fileDownload from 'js-file-download';
export default {
    data() {
        return {
            // 获取生成列表的参数对象
            queryInfo_Self: {
                //   搜索关键字【query意为“询问”】
                // query: '',
                // 当前的页数
                page: 1
            },
            taskList: [],
            total_Self: 0,
            formInline_Self: {
                searchType: '',
                searchTaskInfo: ''
            },
            editDialogSelfVisible: false,
            editForm_Self: {
                task_id: 0,
                master: this.$store.getters.userId,
                name: '',
                params: '',
                file: {}
            },
            editFormSelfRules: {
                name: [{ required: true, message: '请输入任务名', trigger: 'blur' }]
            },
            // ///////////////以下为所有生成部分///////////////////////
            // 获取生成列表的参数对象
            queryInfo_All: {
                //   搜索关键字【query意为“询问”】
                // query: '',
                // 当前的页数
                page: 1
            },

            userRight: ''
        };
    },
    created() {
        this.getTaskList();
    },
    methods: {
        // 更新/获取任务列表数据的方法[本用户]
        async getTaskList() {
            // console.log('/task/self/search/' + '?page=' + this.queryInfo_Self.page);
            // 129.211.89.155:8050/showmessage
            var temp = this.$http.defaults.baseURL;
            console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
            this.$http.defaults.baseURL = 'http://129.211.89.155:8050/';
            const { data: data } = await this.$http.get('showwavemessage');
            this.$http.defaults.baseURL = temp;
            console.log('data:', data);
            // if (data.code !== 20000) {
            //     if (data.code === 40400) {
            //         return this.$message.error('本用户未添加过任务！');
            //     }
            //     console.log(data.code);
            //     return this.$message.error('获取本用户任务列表失败！');
            // }
            //   数据获取成功，保存数据到this中
            this.taskList = data.details;
            console.log('this.taskList:', this.taskList);
            // this.totalPageNum = data.data.pages;
            console.log('this.totalPageNum:');
            console.log(this.totalPageNum);
            this.total_Self = this.totalPageNum * 10;
        },

        // 监听 pagesize【当前页号】 的改变
        handleSizeChange_Self(newSize) {
            // console.log(`每页 ${newSize} 条`);
            this.queryInfo_Self.pagesize = newSize;
            this.getTaskList();
        },

        // 监听 pagenum【页码值】 的改变
        handleCurrentChange_Self(newPage) {
            // console.log(`当前页: ${newPage}`);
            this.queryInfo_Self.page = newPage;
            this.getTaskList();
        },
        // 监听 pagesize【当前页号】 的改变
        handleSizeChange_All(newSize) {
            // console.log(`每页 ${newSize} 条`);
            this.queryInfo_All.pagesize = newSize;
            this.getTaskList_All();
        },
        // 监听 pagenum【页码值】 的改变
        handleCurrentChange_All(newPage) {
            // console.log(`当前页: ${newPage}`);
            this.queryInfo_All.page = newPage;
            this.getTaskList_All();
        },

        // 原始文件下载
        async originalfileDownload(task_id) {
            // console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            // 129.211.89.155:8050/downloadwave?task_id=13&file_type=1
            var temp = this.$http.defaults.baseURL;
            console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
            this.$http.defaults.baseURL = 'http://129.211.89.155:8050/';
            // const data = await this.$http.get('downloadwave?task_id=' + task_id + '&file_type=0', {
            //     responseType: 'blob',
            //     headers: { 'Content-Type': 'application/zip; application/octet-stream' }
            // });
            const data = await this.$http.get('downloadwave?task_id=' + task_id + '&file_type=0', {
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json; application/octet-stream' }
            });
            this.$http.defaults.baseURL = temp;

            let blob = new Blob([data], { type: 'zip' });
            var zip_file = window.URL.createObjectURL(blob);
            console.log('zip_file:', zip_file);

            console.log('data:', data);
            // // console.log('headers.content-disposition:', data.headers.content - disposition);
            // // console.log('headers["content-disposition"]:', data.headers['content-disposition']);
            // var file_name2 = file_name1[file_name1.length - 1];
            // file_name2 = file_name2.slice(0, file_name2.length - 1);
            // console.log('file_name1:', 'originalfile_' + task_id);
            // console.log('file_name2:', file_name2);
            fileDownload(data.data, 'originalfile_wave_' + task_id + '.zip');
            // 'http://129.211.89.155:8001/api/task/file/?file_type=0&format=json&task_id=135'
        },

        // 生成文件下载
        async generatefileDownload(task_id) {
            var temp = this.$http.defaults.baseURL;
            console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
            this.$http.defaults.baseURL = 'http://129.211.89.155:8050/';
            const data = await this.$http.get('downloadwave?task_id=' + task_id + '&file_type=1', {
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json; application/octet-stream' }
            });
            this.$http.defaults.baseURL = temp;

            let blob = new Blob([data], { type: 'zip' });
            var zip_file = window.URL.createObjectURL(blob);
            console.log('zip_file:', zip_file);

            console.log('data:', data);
            fileDownload(data.data, 'generatefile_wave_' + task_id + '.zip');
        },

        handleClick(tab, event) {
            // console.log(tab, event);
            if (tab.index === '1') {
                this.getTaskList_All();
            }
        },

        // 表中空白格填充
        isBlank_num(scope) {
            let key = scope.column.property,
                item = scope.row[key],
                value = '-- --';
            if (item === 0 || item === false || item) {
                value = item;
            }
            return value;
        },

        isBlank_start(scope) {
            let key = scope.column.property,
                item = scope.row[key],
                value = '未开始';
            if (item === 0 || item === false || item) {
                value = item;
            }
            return value;
        },

        isBlank_end(scope) {
            let key = scope.column.property,
                item = scope.row[key],
                value = '未结束';
            if (item === 0 || item === false || item) {
                value = item;
            }
            return value;
        },

        // 切换搜索类型时更新页号
        pageReflash_All() {
            this.queryInfo_All.page = 1;
        },

        pageReflash_Self() {
            this.queryInfo_Self.page = 1;
        },

        async MethodDetail(id) {
            this.methodDialogSelfVisible = true;
            const { data: data } = await this.$http.get('/task/' + '?task_id=' + id);
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取本用户任务详情失败！');
            }
            console.log(data);
            this.methodDetail = data.data;
            console.log('this.methodDetail:');
            console.log(this.methodDetail);
        }
    },
    mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
    }
};
</script>

<style scoped>
.search {
    margin-bottom: 10px !important;
}
.right {
    margin-right: 5px !important;
}
.right10 {
    margin-right: 10px !important;
}
.user-info-list {
    padding-left: 10px;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
    color: #000;
    line-height: 25px;
}
/* .inlineBlock {
    display: inline-block;
} */

/* .fontsize16 {
    font-size: 16px !important;
} */
</style>
