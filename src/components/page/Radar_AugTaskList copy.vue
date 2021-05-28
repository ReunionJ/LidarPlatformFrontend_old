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
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="本用户" name="self">
                    <!-- 搜索与添加区域 -->
                    <el-row :gutter="20" class="search">
                        <el-col :span="20">
                            <el-form :inline="true" :model="formInline_Self" class="demo-form-inline">
                                <el-form-item label="查询方式">
                                    <el-select
                                        v-model="formInline_Self.searchType"
                                        placeholder="请选择查询方式"
                                        class="marginRight"
                                        prop="searchType"
                                    >
                                        <el-option label="生成方法id" value="生成方法id"></el-option>
                                        <el-option label="生成类型id" value="生成类型id"></el-option>
                                        <el-option label="任务名称" value="任务名称"></el-option>
                                        <el-option label="任务id" value="任务id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="查询内容">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="formInline_Self.searchTaskInfo"
                                        clearable
                                        @clear="getTaskList_Self"
                                    >
                                        <el-button
                                            slot="append"
                                            @click="
                                                pageReflash_Self();
                                                SearchTask_Self();
                                            "
                                            size="mini"
                                            ><i class="el-icon-search el-icon--right"></i
                                        ></el-button>
                                    </el-input>
                                </el-form-item>
                                <!-- <el-switch
                            v-model="FuzzySearch"
                            active-text="模糊搜索"
                            inactive-text="精确搜索"
                            style="padding-top:6px;"
                        ></el-switch> -->
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- 生成列表区域 -->
                    <el-table :data="taskList_Self" border stripe>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="id" prop="id" width="50px"></el-table-column>
                        <el-table-column label="任务名" prop="name"></el-table-column>
                        <el-table-column label="任务状态" prop="task_status" width="100px"></el-table-column>
                        <el-table-column label="任务是否上传原型文件" prop="task_have_origin_file" width="150px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_origin_file === true" class="right10">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_origin_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >

                                <el-tooltip
                                    content="原始文件下载"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_origin_file === true"
                                >
                                    <el-button
                                        type="success"
                                        icon="el-icon-download"
                                        size="mini"
                                        @click="originalfileDownload(scope.row.id)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="任务是否生成生成文件" prop="task_have_generate_file" width="150px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_generate_file === true">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_generate_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >
                            </template>
                        </el-table-column>
                        <el-table-column label="任务生成数据数量" prop="generate_data_number" width="120px">
                            <template slot-scope="scope">
                                {{ isBlank_num(scope) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务数据更新时间" prop="update_datetime">
                            <template slot-scope="scope">
                                {{ scope.row.update_datetime | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务开始时间" prop="start_datetime" width="100px">
                            <template slot-scope="scope">
                                {{ isBlank_start(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务结束时间" prop="fin_datetime" width="100px">
                            <template slot-scope="scope">
                                {{ isBlank_end(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <!-- 操作无具体的数据源 -->
                        <el-table-column label="操作" width="120px">
                            <template slot-scope="scope">
                                <!-- 编辑按钮 -->
                                <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        size="mini"
                                        @click="showEditDialog(scope.row.id, scope.row.name, scope.row.params)"
                                    ></el-button>
                                </el-tooltip>
                                <!-- 删除按钮 -->
                                <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        @click="removeTaskById(scope.row.id)"
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="详情" width="65px">
                            <template slot-scope="scope">
                                <!-- 查看方法按钮 -->
                                <el-tooltip effect="dark" content="方法详情" placement="top" :enterable="false">
                                    <el-button
                                        type="info"
                                        icon="el-icon-more-outline"
                                        size="mini"
                                        @click="MethodDetail(scope.row.id)"
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页模块 -->
                    <el-pagination
                        @size-change="handleSizeChange_Self"
                        @current-change="handleCurrentChange_Self"
                        :current-page.sync="queryInfo_Self.page"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total_Self"
                    >
                    </el-pagination>
                </el-tab-pane>

                <el-tab-pane label="所有用户" name="all" v-if="this.userRight === '超级管理员'">
                    <!-- 搜索与添加区域 -->
                    <el-row :gutter="20" class="search">
                        <el-col :span="20">
                            <el-form :inline="true" :model="formInline_All" class="demo-form-inline">
                                <el-form-item label="查询方式">
                                    <el-select
                                        v-model="formInline_All.searchType"
                                        placeholder="请选择查询方式"
                                        class="marginRight"
                                        prop="searchType"
                                    >
                                        <el-option label="生成方法id" value="生成方法id"></el-option>
                                        <el-option label="生成类型id" value="生成类型id"></el-option>
                                        <el-option label="任务名称" value="任务名称"></el-option>
                                        <el-option label="任务id" value="任务id"></el-option>
                                        <el-option label="用户id" value="用户id"></el-option>
                                        <el-option label="用户名" value="用户名"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="查询内容">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="formInline_All.searchTaskInfo"
                                        clearable
                                        @clear="getTaskList_All"
                                    >
                                        <el-button
                                            slot="append"
                                            @click="
                                                pageReflash_All();
                                                getTaskList_All();
                                            "
                                            size="mini"
                                            ><i class="el-icon-search el-icon--right"></i>所有用户</el-button
                                        >
                                    </el-input>
                                </el-form-item>
                                <!-- <el-switch
                            v-model="FuzzySearch"
                            active-text="模糊搜索"
                            inactive-text="精确搜索"
                            style="padding-top:6px;"
                        ></el-switch> -->
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- 生成任务列表区域 -->
                    <el-table :data="taskList_All" border stripe empty-text="暂无数据">
                        <!-- <template slot="empty">
                            <span>暂无数据</span>
                        </template> -->
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="id" prop="id" width="50px"></el-table-column>
                        <el-table-column label="任务名" prop="name"></el-table-column>
                        <el-table-column label="任务状态" prop="task_status"></el-table-column>
                        <el-table-column label="任务是否上传原型文件" prop="task_have_origin_file" width="150px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_origin_file === true" class="right10">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_origin_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >

                                <el-tooltip
                                    content="原始文件下载"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_origin_file === true"
                                >
                                    <el-button
                                        type="success"
                                        icon="el-icon-download"
                                        size="mini"
                                        @click="originalfileDownload(scope.row.id)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="任务是否生成生成文件" prop="task_have_generate_file" width="150px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_generate_file === true">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_generate_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >
                            </template>
                        </el-table-column>
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
                        <el-table-column label="操作" width="120px">
                            <template slot-scope="scope">
                                <!-- 编辑按钮 -->
                                <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        size="mini"
                                        @click="showEditDialog(scope.row.id, scope.row.name, scope.row.params)"
                                    ></el-button>
                                </el-tooltip>
                                <!-- 删除按钮 -->
                                <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        @click="removeTaskById(scope.row.id)"
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="详情" width="65px">
                            <template slot-scope="scope">
                                <!-- 查看方法按钮 -->
                                <el-tooltip effect="dark" content="方法详情" placement="top" :enterable="false">
                                    <el-button
                                        type="info"
                                        icon="el-icon-more-outline"
                                        size="mini"
                                        @click="MethodDetail(scope.row.id)"
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页模块 -->
                    <el-pagination
                        @size-change="handleSizeChange_All"
                        @current-change="handleCurrentChange_All"
                        :current-page.sync="queryInfo_All.page"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total_All"
                    >
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- 修改生成的对话框 -->
        <el-dialog title="编辑任务信息" :visible.sync="editDialogSelfVisible" width="50%" @closed="editDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editForm_Self" :rules="editFormSelfRules" ref="editFormRef" label-width="110px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="任务id">
                    <el-input v-model="editForm_Self.task_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="任务名" prop="name">
                    <el-input v-model="editForm_Self.name"></el-input>
                </el-form-item>
                <el-form-item label="任务参数" prop="params">
                    <el-input v-model="editForm_Self.params"></el-input>
                </el-form-item>

                <el-form-item label="重新上传文件" prop="file">
                    <input type="file" id="filetemp" prop="editForm_Self.file" /><br />
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogSelfVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTaskInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 任务详情对话框 -->
        <el-dialog
            title="生成任务详情"
            :visible.sync="methodDialogSelfVisible"
            width="50%"
            body-style="background-color: rgba(255, 255, 255, 0.6);"
        >
            <!-- 内容主体区 -->
            <div class="user-info-list">
                任务id：
                <span>{{ methodDetail.id }}</span>
            </div>
            <div class="user-info-list">
                任务名称：
                <span>{{ methodDetail.name }}</span>
            </div>
            <div class="user-info-list">
                任务参数：
                <span>{{ methodDetail.params ? methodDetail.params : '暂无' }}</span>
            </div>
            <div class="user-info-list">
                任务状态：
                <span>{{ methodDetail.task_status }}</span>
            </div>
            <div class="user-info-list">
                任务是否上传原型文件：
                <span>{{ methodDetail.task_have_origin_file ? '是' : '否' }}</span>
            </div>
            <div class="user-info-list">
                任务是否生成扩增文件：
                <span>{{ methodDetail.task_have_generate_file ? '是' : '否' }}</span>
            </div>
            <div class="user-info-list">
                任务扩增数据数量：
                <span>{{ methodDetail.generate_data_number ? methodDetail.generate_data_number : '暂无' }}</span>
            </div>
            <div class="user-info-list">
                任务数据更新时间：
                <span>{{ methodDetail.update_datetime | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                任务开始时间：
                <span>{{ methodDetail.start_datetime ? methodDetail.start_datetime : '未开始' | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                任务结束时间：
                <span>{{ methodDetail.fin_datetime ? methodDetail.start_datetime : '未结束' | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                任务所有者id：
                <span>{{ methodDetail.master_id }}</span>
            </div>
            <div class="user-info-list">
                任务所有者username：
                <span>{{ methodDetail.master_username }}</span>
            </div>
            <div class="user-info-list">
                任务所有者nickname：
                <span>{{ methodDetail.master_nickname }}</span>
            </div>
            <div class="user-info-list">
                任务所有者用户组：
                <span>{{ methodDetail.master_user_group }}</span>
            </div>
            <div class="user-info-list">
                任务所有者加入时间：
                <span>{{ methodDetail.master_join_datetime | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                任务所有者最近一次登录时间：
                <span>{{ methodDetail.master_last_login_datetime | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                任务所有者信息更新时间：
                <span>{{ methodDetail.master_update_datetime | dateFormat }}</span>
            </div>
            <div class="user-info-list">
                扩增方法id：
                <span>{{ methodDetail.augmentation_method_id }}</span>
            </div>
            <div class="user-info-list">
                扩增方法名称：
                <span>{{ methodDetail.augmentation_method_name }}</span>
            </div>
            <div class="user-info-list">
                扩增方法的细节、介绍等：
                <span>{{ methodDetail.augmentation_method_details }}</span>
            </div>
            <div class="user-info-list">
                扩增类型id：
                <span>{{ methodDetail.augmentation_type_id }}</span>
            </div>
            <div class="user-info-list">
                扩增类型名称：
                <span>{{ methodDetail.augmentation_type_name }}</span>
            </div>
            <div class="user-info-list">
                扩增类型的细节、介绍等：
                <span>{{ methodDetail.augmentation_type_details }}</span>
            </div>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="methodDialogSelfVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
import fileDownload from 'js-file-download';
import Lidar_AugTaskList from './Lidar_AugTaskList_me.vue';
export default {
    name: 'Radar_AugTaskList',
    extends: Lidar_AugTaskList,
    data() {
        return {
            // 获取生成列表的参数对象
            queryInfo_Self: {
                //   搜索关键字【query意为“询问”】
                // query: '',
                // 当前的页数
                page: 1
            },
            taskList_Self: [],
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
            taskList_All: [],
            total_All: 0,
            formInline_All: {
                searchType: '',
                searchTaskInfo: ''
            },
            editDialogAllVisible: false,
            editForm_All: {
                task_id: 0,
                master: this.$store.state.userId,
                name: '',
                params: '',
                file: {}
            },
            editFormAllRules: {
                name: [{ required: true, message: '请输入任务名', trigger: 'blur' }]
            },

            FuzzySearch: true,
            activeName: 'self',
            taskList_All: [],
            userRight: '',
            methodDialogSelfVisible: false,
            methodDetail: [],
            mohu: true
        };
    },
    created() {
        this.userRight = window.sessionStorage.getItem('user_group_name');
        console.log('this.userRight:');
        console.log(this.userRight);
        this.getTaskList_Self();
        // this.getTaskList_Self();
    },
    methods: {
        // 更新/获取任务列表数据的方法[本用户]
        async getTaskList_Self() {
            console.log('/task/self/search/' + '?page=' + this.queryInfo_Self.page);
            const { data: data } = await this.$http.get('/task/self/search/' + '?page=' + this.queryInfo_Self.page);
            if (data.code !== 20000) {
                if (data.code === 40400) {
                    return this.$message.error('本用户未添加过任务！');
                }
                console.log(data.code);
                return this.$message.error('获取本用户任务列表失败！');
            }
            //   数据获取成功，保存数据到this中
            this.taskList_Self = data.data.details;
            console.log('data:');
            console.log(data);
            this.totalPageNum = data.data.pages;
            console.log('this.totalPageNum:');
            console.log(this.totalPageNum);
            this.total_Self = this.totalPageNum * 10;
            // console.log('data.data.details:');
            // console.log(data.data.details);
            // console.log('this.taskList_Self:');
            // console.log(this.taskList_Self);
            // console.log('this.total_Self:' + this.total_Self);
        },

        // 查找函数[本用户]
        async SearchTask_Self() {
            if (this.formInline_Self.searchType === '') {
                return this.$message.error('请输入查询方式！');
            }
            if (this.formInline_Self.searchTaskInfo === '') {
                return this.$message.error('请输入搜索内容！');
            }
            var search_params = '';
            if (this.formInline_Self.searchType === '生成方法id') {
                search_params = '/task/augmentation_method/search/?augmentation_method=' + this.formInline_Self.searchTaskInfo;
            } else if (this.formInline_Self.searchType === '生成类型id') {
                search_params = '/task/augmentation_type/search/?augmentation_type=' + this.formInline_Self.searchTaskInfo;
            } else if (this.formInline_Self.searchType === '任务名称') {
                search_params = '/task/name/search/?task_name=' + this.formInline_Self.searchTaskInfo + '&search_type=1';
            } else {
                // 根据任务id生成
                search_params = '/task/id/search/?task_id=' + this.formInline_Self.searchTaskInfo;
            }
            // console.log('search_params:' + search_params);
            const { data: data } = await this.$http.get(search_params);
            if (data.code !== 20000) {
                // console.log(data.code);
                return this.$message.error('未搜索到该任务！');
            }
            // console.log(data);
            //   数据获取成功，保存数据到this中
            if (this.formInline_Self.searchType === '任务id') {
                this.taskList_Self = [];
                this.taskList_Self.push(data.data);
            } else {
                this.taskList_Self = data.data.details;
            }
            this.total_Self = this.taskList_Self ? this.taskList_Self.length : 0;
            this.totalPageNum = data.data.pages;
        },

        // 更新/获取任务列表数据的方法[所有用户]
        async getTaskList_All() {
            console.log('this.formInline_All:');
            console.log(this.formInline_All);
            if (
                this.formInline_All.searchType === '' ||
                this.formInline_All.searchType === '用户id' ||
                this.formInline_All.searchTaskInfo === ''
            ) {
                // this.queryInfo_All.page = 1;
                const { data: data } = await this.$http.get(
                    '/task/master/admin/search/' +
                        '?page=' +
                        this.queryInfo_All.page +
                        '&user_id=' +
                        window.sessionStorage.getItem('userId')
                );
                if (data.code !== 20000) {
                    // console.log(data.code);
                    return this.$message.error('获取任务列表失败[用户id]！');
                }
                // console.log('good');
                // console.log(data);
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                // console.log('this.totalPageNum:');
                // console.log(this.totalPageNum);
                this.total_All = this.totalPageNum * 10;
                // console.log('data.data.details:');
                // console.log(data.data.details);
                // console.log('this.taskList_All:');
                // console.log(this.taskList_All);
                // console.log('this.total_All:' + this.total_All);
            } else if (this.formInline_All.searchType === '任务名称') {
                console.log(
                    '/task/name/admin/search/' + '?page=' + this.queryInfo_All.page + '&task_name=' + this.formInline_All.searchTaskInfo
                );
                const { data: data } = await this.$http.get(
                    '/task/name/admin/search/' + '?page=' + this.queryInfo_All.page + '&task_name=' + this.formInline_All.searchTaskInfo
                );
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('获取查询列表失败[任务名称]！');
                }
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                this.total_All = this.totalPageNum * 10;
            } else if (this.formInline_All.searchType === '任务id') {
                const { data: data } = await this.$http.get(
                    '/task/id/admin/search/' + '?page=' + this.queryInfo_All.page + '&task_id=' + this.formInline_All.searchTaskInfo
                );
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('获取查询列表失败[任务id]！');
                }
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                this.total_All = this.totalPageNum * 10;
            } else if (this.formInline_All.searchType === '生成类型id') {
                const { data: data } = await this.$http.get(
                    '/task/augmentation_type/admin/search/' +
                        '?page=' +
                        this.queryInfo_All.page +
                        '&augmentation_type=' +
                        this.formInline_All.searchTaskInfo
                );
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('获取查询列表失败[生成类型]！');
                }
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                this.total_All = this.totalPageNum * 10;
            } else if (this.formInline_All.searchType === '生成方法id') {
                const { data: data } = await this.$http.get(
                    '/task/augmentation_method/admin/search/' +
                        '?page=' +
                        this.queryInfo_All.page +
                        '&augmentation_method=' +
                        this.formInline_All.searchTaskInfo
                );
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('获取查询列表失败[生成方法]！');
                }
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                this.total_All = this.totalPageNum * 10;
            } else if (this.formInline_All.searchType === '用户名') {
                // this.queryInfo_All.page = 1;
                const { data: data } = await this.$http.get(
                    '/task/master/admin/search/' + '?page=' + this.queryInfo_All.page + '&username=' + this.formInline_All.searchTaskInfo
                );
                if (data.code !== 20000) {
                    // console.log(data.code);
                    return this.$message.error('获取任务列表失败[用户名]！');
                }
                // console.log('good');
                // console.log(data);
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                // console.log('this.totalPageNum:');
                // console.log(this.totalPageNum);
                this.total_All = this.totalPageNum * 10;
                // console.log('data.data.details:');
                // console.log(data.data.details);
                // console.log('this.taskList_All:');
                // console.log(this.taskList_All);
                // console.log('this.total_All:' + this.total_All);
            }
            //   数据获取成功，保存数据到this中
        },

        // 监听 pagesize【当前页号】 的改变

        handleSizeChange_Self(newSize) {
            // console.log(`每页 ${newSize} 条`);
            this.queryInfo_Self.pagesize = newSize;
            this.getTaskList_Self();
        },

        // 监听 pagenum【页码值】 的改变
        handleCurrentChange_Self(newPage) {
            // console.log(`当前页: ${newPage}`);
            this.queryInfo_Self.page = newPage;
            this.getTaskList_Self();
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
        // 删除任务
        async removeTaskById(task_id) {
            // console.log('task_id:' + task_id);
            const confirmResult = await this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            //   // console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }

            const { data: data } = await this.$http.delete('/task/?task_id=' + task_id);
            if (data.code !== 20000) {
                // console.log(data.code);
                // console.log(data.msg);
                return this.$message.error('删除任务失败！');
            }
            this.$message.success('删除任务成功！');
            this.getTaskList_Self();
        },
        // 显示生成修改对话框
        async showEditDialog(task_id, name, params) {
            this.editForm_Self.task_id = task_id;
            this.editForm_Self.name = name;
            this.editForm_Self.params = params;
            this.editDialogSelfVisible = true;
        },
        // 对话框关闭时表单重置
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改生成信息时预验证
        editTaskInfo() {
            this.$refs.editFormRef.validate(async valid => {
                // // console.log(valid)
                if (!valid) return;
                // 通过则发起添加生成的网络请求
                // // console.log('true')
                var adddata = new FormData();
                // console.log('old_adddata:');
                // console.log(adddata);
                adddata.append('task_id', this.editForm_Self.task_id);
                // console.log(adddata);
                adddata.append('name', this.editForm_Self.name);
                adddata.append('master', this.editForm_Self.master);
                if (this.editForm_Self.params) {
                    adddata.append('params', this.editForm_Self.params);
                }
                this.editForm_Self.file = document.getElementById('filetemp').files[0];
                // console.log('this.editForm_Self.file:');
                // console.log(this.editForm_Self.file);
                if (this.editForm_Self.file) {
                    adddata.append('file', this.editForm_Self.file);
                }
                // console.log('adddata:');
                // console.log(adddata);
                const { data: data } = await this.$http({
                    url: '/task/',
                    data: adddata,
                    method: 'put'
                });
                if (data.code !== 20000) {
                    // console.log(data.code);
                    return this.$message.error('修改任务失败！');
                }
                this.$message.success('修改任务成功！');
                this.editDialogSelfVisible = false;
                // 重置表单
                // console.log('重置表单');
                this.$refs.editFormRef.resetFields();
                this.editForm_Self.augmentation_type = '';
                this.editForm_Self.augmentation_method = '';
                this.editForm_Self.file = {};
                this.getTaskList_Self();
            });
        },
        // 原始文件下载
        async originalfileDownload(task_id) {
            // console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            const { data: data } = await this.$http.get('/task/file/?task_id=' + task_id + '&file_type=0');
            // console.log(data);
            // fileDownload(data, 'data.txt');
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
