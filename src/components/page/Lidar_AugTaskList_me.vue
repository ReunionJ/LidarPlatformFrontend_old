<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-magic-stick"></i> 激光雷达数据 </el-breadcrumb-item>
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
                        <el-table-column type="index" width="35px"></el-table-column>
                        <el-table-column label="id" prop="id" width="42px"></el-table-column>
                        <el-table-column label="任务名" prop="name"></el-table-column>
                        <el-table-column label="任务状态" prop="task_status" width="85px"></el-table-column>

                        <el-table-column label="是否上传原型文件" prop="task_have_origin_file">
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
                                        @click="originalfileDownload(scope.row.id, 0)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>

                        <el-table-column label="是否生成生成文件" prop="task_have_generate_file" width="175px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_generate_file === true" class="right10">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_generate_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >

                                <el-tooltip
                                    content="生成文件下载"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_generate_file === true"
                                >
                                    <el-button
                                        type="success"
                                        icon="el-icon-download"
                                        size="mini"
                                        @click="generatefileDownload(scope.row.id, 0)"
                                        plain
                                    ></el-button>
                                </el-tooltip>

                                <el-tooltip
                                    content="点云对比预览"
                                    effect="dark"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_generate_file === true"
                                >
                                    <el-button
                                        type="warning"
                                        icon="el-icon-data-analysis"
                                        size="mini"
                                        @click="point_cloud_preview(scope.row.id, 0)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>

                        <el-table-column label="任务生成数据数量" prop="generate_data_number" width="75px">
                            <template slot-scope="scope">
                                {{ isBlank_num(scope) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务数据更新时间" prop="update_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ scope.row.update_datetime | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务开始时间" prop="start_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ isBlank_start(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务结束时间" prop="fin_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ isBlank_end(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <!-- 操作无具体的数据源 -->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!-- 编辑按钮 -->
                                <el-tooltip
                                    v-if="scope.row.task_status === '未开始'"
                                    effect="dark"
                                    content="编辑"
                                    placement="top"
                                    :enterable="false"
                                >
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
                        <el-table-column label="详情" width="80px">
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
                <!-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->

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
                        <el-table-column type="index" width="35px"></el-table-column>
                        <el-table-column label="id" prop="id" width="42px"></el-table-column>
                        <el-table-column label="任务名" prop="name" width="120px"></el-table-column>
                        <el-table-column label="任务状态" prop="task_status" width="85px"></el-table-column>
                        <el-table-column label="是否上传原型文件" prop="task_have_origin_file">
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
                                        @click="originalfileDownload(scope.row.id, 0)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否生成生成文件" prop="task_have_generate_file" width="175px">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.task_have_generate_file === true" class="right10">
                                    &nbsp;&nbsp;是&nbsp;&nbsp;
                                </el-tag>
                                <el-tag v-else-if="scope.row.task_have_generate_file === false" type="danger"
                                    >&nbsp;&nbsp;否&nbsp;&nbsp;</el-tag
                                >
                                <el-tooltip
                                    content="生成文件下载"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_generate_file === true"
                                >
                                    <el-button
                                        type="success"
                                        icon="el-icon-download"
                                        size="mini"
                                        @click="generatefileDownload(scope.row.id, 0)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                                <el-tooltip
                                    content="点云对比预览"
                                    effect="dark"
                                    placement="top"
                                    :enterable="false"
                                    v-if="scope.row.task_have_generate_file === true"
                                >
                                    <el-button
                                        type="warning"
                                        icon="el-icon-data-analysis"
                                        size="mini"
                                        @click="point_cloud_preview(scope.row.id)"
                                        plain
                                    ></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="任务生成数据数量" prop="generate_data_number" width="75px">
                            <template slot-scope="scope">
                                {{ isBlank_num(scope) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务数据更新时间" prop="update_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ scope.row.update_datetime | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务开始时间" prop="start_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ isBlank_start(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务结束时间" prop="fin_datetime" width="90px">
                            <template slot-scope="scope">
                                {{ isBlank_end(scope) | dateFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="任务所有者名称" prop="master_username" width="110px"></el-table-column>
                        <!-- 操作无具体的数据源 -->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!-- 编辑按钮 -->
                                <el-tooltip
                                    v-if="scope.row.task_status === '未开始'"
                                    effect="dark"
                                    content="编辑"
                                    placement="top"
                                    :enterable="false"
                                >
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
                        <el-table-column label="详情" width="80px">
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
                是否上传原型文件：
                <span>{{ methodDetail.task_have_origin_file ? '是' : '否' }}</span>
            </div>
            <div class="user-info-list">
                是否生成扩增文件：
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

        <el-dialog
            title="生成点云预览"
            :visible.sync="previewDialogVisible"
            width="1300px"
            height="630px"
            :before-close="handleClose"
            center
        >
            <div v-loading="this.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="height: 600px">
                <div class="block" v-if="!loading">
                    <span class="demonstration right">选择对比点云</span>
                    <el-cascader
                        v-model="preview_value"
                        :options="preview_options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="previewHandleChange"
                        style="width: 800px"
                    ></el-cascader>
                    <!-- <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </div> -->
                    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                    <el-carousel trigger="click" height="570px">
                        <el-carousel-item v-for="item in 2" :key="item">
                            <!-- <h3 class="small">{{ item }}</h3> -->
                            <div v-if="item == 1" id="preview" class="juzhog"></div>
                            <div v-if="item == 2">
                                <div id="preview_original" class="view1"></div>
                                <div id="preview_generate" class="view1"></div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import qs from 'qs';
import fileDownload from 'js-file-download';
import JSZip from 'jszip';
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
            mohu: true,
            fileName: '',
            preview_value: [],
            preview_options: [],
            previewDialogVisible: false,
            loading: true,
            original_files_zip: null,
            generate_files_zip: null,
            originalPointCloudData: [],
            generatePointCloudData: [],
            maxAxisValue: -10000,
            minAxisValue: 10000,
            original_is_Zip: false,
            generate_is_Zip: false,
            original_fileContent: '',
            generate_fileContent: '',
            original_blob: null,
            generate_blob: null,
            test_text: 'djshdkjdhkadh'
        };
    },
    created() {
        this.userRight = window.sessionStorage.getItem('user_group_name');
        console.log('this.userRight:');
        console.log(this.userRight);
        this.getTaskList_Self();
        // this.getTaskList_Self();
    },
    mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
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
            if (this.formInline_All.searchType === '' || this.formInline_All.searchTaskInfo === '') {
                const { data: data } = await this.$http.get('task/all/admin/search/' + '?page=' + this.queryInfo_All.page);
                if (data.code !== 20000) {
                    // console.log(data.code);
                    return this.$message.error('获取任务列表失败[所有用户]！');
                }
                // console.log('good');
                // console.log(data);
                this.taskList_All = data.data.details;
                this.totalPageNum = data.data.pages;
                // console.log('this.totalPageNum:');
                // console.log(this.totalPageNum);
                this.total_All = this.totalPageNum * 10;
            } else if (this.formInline_All.searchType === '用户id') {
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
            this.editForm_Self.master = this.$store.state.userId;
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
                for (var [a, b] of adddata.entries()) {
                    console.log(a, b);
                }
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

        async getdata(reader, self) {
            return (reader.onload = await function() {
                console.log('开始读取');
                self.fileContent = this.result;
            });
        },

        // 原始文件下载(判断是不是.zip)
        async originalfileDownload(task_id, flag) {
            this.original_fileContent = '';
            // console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            const data = await this.$http.get('/task/file/?task_id=' + task_id + '&file_type=0&format=json', {
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json; application/octet-stream' }
            });
            // console.log('respones_data:', data);
            // console.log('headers.content-disposition:', data.headers.content - disposition);
            // console.log('headers["content-disposition"]:', data.headers['content-disposition']);
            var file_name1 = data.headers['content-disposition'].split('/');
            this.fileName = file_name1[file_name1.length - 1];
            this.fileName = this.fileName.slice(0, this.fileName.length - 1);
            var dot = this.fileName.lastIndexOf('.');
            this.original_is_Zip = false;
            if (dot !== -1 && this.fileName.substr(dot) === '.zip') {
                this.original_is_Zip = true;
            } else {
                // 直接获取点云数据
                console.log('data:', data);
                console.log('data.data:', data.data);
                this.original_blob = data.data;
            }
            if (!flag) {
                fileDownload(data.data, this.fileName);
            }
            return data;
        },

        // 生成文件下载(判断是不是.zip)
        async generatefileDownload(task_id, flag) {
            // console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            const data = await this.$http.get('/task/file/?task_id=' + task_id + '&file_type=1&format=json', {
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json; application/octet-stream' }
            });
            var file_name1 = data.headers['content-disposition'].split('/');
            this.fileName = file_name1[file_name1.length - 1];
            this.fileName = this.fileName.slice(0, this.fileName.length - 1);
            console.log('generate_fileName:', this.fileName);
            var dot = this.fileName.lastIndexOf('.');
            this.generate_is_Zip = false;
            if (dot !== -1 && this.fileName.substr(dot) === '.zip') {
                this.generate_is_Zip = true;
            } else {
                // 直接获取点云数据
                console.log('data:', data);
                console.log('data.data:', data.data);
                this.generate_blob = data.data;
            }
            if (!flag) {
                fileDownload(data.data, this.fileName);
            }
            return data;
        },

        // 流程
        // 1、获得文件列表，处理级联并展示在级联下拉框上
        // 2、选定级联列表触发改动函数
        // 3、按格式解压数据
        // 4、展示点云预览
        // 获取点云预览的压缩文件列表
        async point_cloud_preview(task_id) {
            // 先获取压缩文件
            this.previewDialogVisible = true;
            var preview_options = [];
            // console.log('preview_options:', preview_options);
            var original_res = await this.originalfileDownload(task_id, 1);
            console.log('original_res:', original_res);

            if (this.original_is_Zip) {
                // console.log('original_pointcloud.data:', original_res.data);
                let original_files_zip = new window.File([original_res.data], this.fileName, { type: 'zip' });
                console.log('original_files_zip123:', original_files_zip);
                let original_files = new JSZip();
                // 取出original文件名列表
                var orignal_names = [];
                this.original_files_zip = original_files_zip;
                let me = this;
                await original_files.loadAsync(this.original_files_zip).then(function(zip) {
                    // console.log('original_files:', original_files);
                    console.log('original_files.files456:', original_files.files);
                    // console.log('preview_options:', preview_options);
                    for (var i in original_files.files) {
                        var temp_object = {};
                        orignal_names.push(i);
                        temp_object['value'] = i;
                        temp_object['label'] = i;
                        temp_object['children'] = [];
                        preview_options.push(temp_object);
                    }
                    // console.log('orignal_names:', orignal_names);
                    console.log('preview_options:', preview_options);
                    me.original_files_zip = original_files_zip;
                });
            } else {
                var temp_object = {};
                temp_object['value'] = this.fileName;
                temp_object['label'] = this.fileName;
                temp_object['children'] = [];
                preview_options.push(temp_object);
            }

            // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

            var generate_res = await this.generatefileDownload(task_id, 1);
            // console.log('generate_pointcloud.data:', generate_res.data);
            if (this.generate_is_Zip) {
                let generate_files_zip = new window.File([generate_res.data], this.fileName, { type: 'zip' });
                // console.log('generate_files_zip:', generate_files_zip);
                var generate_files = new JSZip();
                var generate_names = [];

                var original_is_Zip = this.original_is_Zip;
                await generate_files.loadAsync(generate_files_zip).then(function(generate_files_zip) {
                    console.log('generate_files123:', generate_files);
                    for (var i in generate_files.files) {
                        console.log('i:', i);
                        generate_names.push(i);
                    }
                    console.log('here1');
                    console.log('generate_original_is_Zip:', original_is_Zip);
                    console.log('here2');
                    // 二者都是.zip
                    if (original_is_Zip) {
                        for (var i in orignal_names) {
                            // 找到匹配字符串 i:原始，j:生成
                            for (var j in generate_names) {
                                if (generate_names[j].search(orignal_names[i]) != -1) {
                                    // console.log(generate_names[j], orignal_names[i]);
                                    var temp_object = {};
                                    temp_object['value'] = generate_names[j];
                                    temp_object['label'] = generate_names[j];
                                    console.log('在这卡住了？');
                                    preview_options[i].children.push(temp_object);
                                    console.log('还是在这卡住了？');
                                }
                            }
                        }
                    } else {
                        for (var j in generate_names) {
                            // console.log(generate_names[j], orignal_names[i]);
                            console.log('preview_options:', preview_options);
                            var temp_object = {};
                            temp_object['value'] = generate_names[j];
                            temp_object['label'] = generate_names[j];
                            preview_options[0].children.push(temp_object);
                        }
                    }

                    // console.log('generate_names:', generate_names);
                    console.log('preview_options:', preview_options);
                });
                this.generate_files_zip = generate_files_zip;
            } else {
                console.log('preview_options:', preview_options);
                var temp_object = {};
                temp_object['value'] = this.fileName;
                temp_object['label'] = this.fileName;
                preview_options[0].children.push(temp_object);
            }

            this.$message.success('已获取文件列表，请选择需预览的文件！');
            this.preview_options = preview_options;
            // for (var i in this.preview_options) {
            //     // console.log('开始排序：');
            //     // // console.log('this.preview_options[i]:', this.preview_options[i]);
            //     // console.log('before_children:', this.preview_options[i].children);
            //     this.preview_options[i].children = this.preview_options[i].children.sort(function(obj1, obj2) {
            //         // console.log('obj1.value:', obj1.value);
            //         // console.log('obj2.value:', obj2.value);
            //         // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            //         if (obj1.value == obj2.value) {
            //             return obj1.label > obj2.label;
            //         }
            //         // console.log('obj1.value > obj2.value:', obj1.value > obj2.value);
            //         return obj1.value > obj2.value;
            //     });
            //     // console.log('after.children:', this.preview_options[i].children);
            // }

            console.log('this.preview_options:', this.preview_options);

            this.loading = false;
        },

        // 按格式处理解压后的数据（格式化生成三维或四维的数据）
        make_format_data(points_name, pointscloud, flag) {
            // console.log('points_name:', points_name);
            // console.log('pointscloud:', pointscloud);
            var format_data = null;
            var dot = points_name.lastIndexOf('.');
            if (dot === -1) {
                console.log('数据无后缀-直接分每一列即可');
                format_data = pointscloud.split('\n');
                format_data.forEach(item => {
                    let arr = item.split(' ');
                    for (var k in arr) {
                        if (parseFloat(arr[k]) > this.maxAxisValue) {
                            this.maxAxisValue = parseFloat(arr[k]);
                            console.log('arr:', arr);
                        }
                        if (parseFloat(arr[k]) < this.minAxisValue) {
                            this.minAxisValue = parseFloat(arr[k]);
                        }
                    }
                    if ((arr.length === 3 || arr[3] === '') && !flag) {
                        if (arr.length === 3) {
                            arr.push('0');
                        } else if (arr[3] === '') {
                            arr[3] = '0';
                        }
                    } else if ((arr.length === 3 || arr[3] === '') && flag) {
                        if (arr.length === 3) {
                            arr.push('50');
                        } else if (arr[3] === '') {
                            arr[3] = '50';
                        }
                    }
                    // console.log('arr:', arr);
                    if (!flag) {
                        this.originalPointCloudData.push(arr);
                    } else {
                        this.generatePointCloudData.push(arr);
                    }
                });
                console.log('this.originalPointCloudData:', this.originalPointCloudData);
                return;
            }

            var data_type = points_name.substr(dot);
            if (data_type === '.ply') {
                console.log('.ply数据-分为每一列后去掉head');
                format_data = pointscloud.split('\n');
                // console.log('format_data1:', format_data);
                var end_header_index = -1;
                for (var i in format_data) {
                    if (format_data[i] === 'end_header') {
                        end_header_index = i;
                    }
                }
                console.log('end_header_index:', end_header_index);
                console.log('去掉end_header');
                console.log('format_data.length:', format_data.length);

                format_data = format_data.splice(parseInt(end_header_index) + 1, format_data.length - parseInt(end_header_index) - 1);
                // console.log('format_data2:', format_data);
                format_data.forEach(item => {
                    let arr = item.split(' ');
                    for (var k in arr) {
                        if (parseFloat(arr[k]) > this.maxAxisValue) {
                            console.log('arr:', arr);
                            this.maxAxisValue = parseFloat(arr[k]);
                        }
                        if (parseFloat(arr[k]) < this.minAxisValue) {
                            this.minAxisValue = parseFloat(arr[k]);
                        }
                    }
                    if ((arr.length === 3 || arr[3] === '') && !flag) {
                        if (arr.length === 3) {
                            arr.push('0');
                        } else if (arr[3] === '') {
                            arr[3] = '0';
                        }
                    } else if ((arr.length === 3 || arr[3] === '') && flag) {
                        if (arr.length === 3) {
                            arr.push('50');
                        } else if (arr[3] === '') {
                            arr[3] = '50';
                        }
                    }
                    if (!flag) {
                        this.originalPointCloudData.push(arr);
                    } else {
                        this.generatePointCloudData.push(arr);
                    }
                });
            } else if (data_type === '.txt') {
                console.log('.txt数据-直接分每一列即可');
            } else if (data_type === '.bin') {
                console.log('.bin数据-抱歉我还不知道咋处理');
            }
            console.log('this.generatePointCloudData:', this.generatePointCloudData);
        },

        // 开始加载点云预览图像
        get_preview() {
            var myChart = echarts.init(document.getElementById('preview'));
            this.option = {
                title: {
                    text: '点云生成预览'
                },
                tooltip: {
                    show: true,
                    showCcontant: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                legend: {
                    // 就是显示哪些东西
                    type: 'plain',
                    data: ['original_data', 'generate_data'],
                    top: '10%'
                },
                grid3D: {
                    containLabel: true,
                    viewControl: {
                        // 使用正交投影。
                        projection: 'orthographic'
                    }
                },
                xAxis3D: {
                    type: 'value',
                    // boundaryGap: true,
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                yAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                zAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                visualMap: {
                    calculable: true,
                    max: 50,
                    min: -0,
                    range: [-200, 200],
                    // 维度的名字默认就是表头的属性名
                    // dimension: 'Life Expectancy',
                    inRange: {
                        symbolSize: 2,
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                        // color: ['#abd9e9', '#74add1', '#4575b4', '#313695', '#a50026']
                        // color: ['#abd9e9', '#74add1', '#4575b4']
                    }
                },
                series: [
                    {
                        name: 'original_data',
                        type: 'scatter3D',
                        data: this.originalPointCloudData,
                        encode: {
                            // 维度的名字默认就是表头的属性名
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        name: 'generate_data',
                        type: 'scatter3D',
                        data: this.generatePointCloudData,
                        encode: {
                            // 维度的名字默认就是表头的属性名
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    }
                ]
            };
            myChart.setOption(this.option);

            var myChart_original = echarts.init(document.getElementById('preview_original'));
            this.option_original = {
                title: {
                    text: '原始图'
                },
                tooltip: {
                    show: true,
                    showCcontant: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid3D: {
                    containLabel: true,
                    viewControl: {
                        // 使用正交投影。
                        projection: 'orthographic'
                    }
                },
                xAxis3D: {
                    type: 'value',
                    // boundaryGap: true,
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                yAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                zAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                visualMap: {
                    calculable: true,
                    max: 50,
                    min: -0,
                    range: [-200, 200],
                    // 维度的名字默认就是表头的属性名
                    // dimension: 'Life Expectancy',
                    inRange: {
                        symbolSize: 2,
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                        // color: ['#abd9e9', '#74add1', '#4575b4', '#313695', '#a50026']
                        // color: ['#abd9e9', '#74add1', '#4575b4']
                    }
                },
                series: [
                    {
                        name: 'original_data',
                        type: 'scatter3D',
                        data: this.originalPointCloudData,
                        encode: {
                            // 维度的名字默认就是表头的属性名
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    }
                ]
            };
            myChart_original.setOption(this.option_original);

            var myChart_generate = echarts.init(document.getElementById('preview_generate'));
            this.option_generate = {
                title: {
                    text: '生成图'
                },
                tooltip: {
                    show: true,
                    showCcontant: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid3D: {
                    containLabel: true,
                    viewControl: {
                        // 使用正交投影。
                        projection: 'orthographic'
                    }
                },
                xAxis3D: {
                    type: 'value',
                    // boundaryGap: true,
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                yAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                zAxis3D: {
                    type: 'value',
                    max: this.maxAxisValue,
                    min: this.minAxisValue
                },
                visualMap: {
                    calculable: true,
                    max: 50,
                    min: -0,
                    range: [-200, 200],
                    // 维度的名字默认就是表头的属性名
                    // dimension: 'Life Expectancy',
                    inRange: {
                        symbolSize: 2,
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                        // color: ['#abd9e9', '#74add1', '#4575b4', '#313695', '#a50026']
                        // color: ['#abd9e9', '#74add1', '#4575b4']
                    }
                },
                series: [
                    {
                        name: 'generate_data',
                        type: 'scatter3D',
                        data: this.generatePointCloudData,
                        encode: {
                            // 维度的名字默认就是表头的属性名
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    }
                ]
            };
            myChart_generate.setOption(this.option_generate);
        },

        // 级联列表选择需展示的点云后获取其文本内容
        async previewHandleChange() {
            this.originalPointCloudData = [];
            this.generatePointCloudData = [];
            // console.log('this.preview_value:', this.preview_value);
            // 解压文件获取点云;
            var original_points_name = this.preview_value[0];
            var generate_points_name = this.preview_value[1];
            var original_pointscloud = null;
            var generate_pointscloud = null;
            // console.log('original_points_name:', original_points_name);
            // console.log('generate_points_name:', generate_points_name);
            if (this.original_is_Zip) {
                var original_files = new JSZip();

                await original_files.loadAsync(this.original_files_zip).then(async function(file) {
                    // console.log('file:', file);
                    // 此处是压缩包中的testTXT.txt文件，以string形式返回其内容，此时已经可以获取zip中的所有文件了
                    await original_files
                        .file(original_points_name)
                        .async('string')
                        .then(function(content) {
                            original_pointscloud = content;
                            // console.log('original_pointscloud:', original_points_name);
                            // console.log('content:', content);
                            // console.log('获取原始点云数据：', original_pointscloud);
                        });
                });
                this.make_format_data(original_points_name, original_pointscloud, 0);
                var generate_files = new JSZip();
                await generate_files.loadAsync(this.generate_files_zip).then(async function(generate_files_zip) {
                    // 此处是压缩包中的testTXT.txt文件，以string形式返回其内容，此时已经可以获取zip中的所有文件了
                    await generate_files
                        .file(generate_points_name)
                        .async('string')
                        .then(function(content) {
                            generate_pointscloud = content;
                            // console.log('original_pointscloud:', generate_points_name);
                            // console.log('content:', content);
                            // console.log('获取生成点云数据：', generate_pointscloud);
                        });
                });
                this.make_format_data(generate_points_name, generate_pointscloud, 1);
            } else {
                // origanl为非zip-直接读取
                var reader = new FileReader(); // 这里是核心！！！读取操作就是由它完成的。
                reader.readAsText(this.original_blob);
                let me = this;
                console.log('开始读取1');
                reader.onload = async function() {
                    // console.log('me.test_text:', me.test_text);
                    console.log('开始读取2');
                    var original_content = this.result;
                    console.log('original_content:', original_content);
                    console.log('me.preview_options[0].value:', me.preview_options[0].value);
                    me.make_format_data(me.preview_options[0].value, original_content, 0);
                    console.log('me.originalPointCloudData:', me.originalPointCloudData);
                    // generate是zip
                    if (me.generate_is_Zip) {
                        var generate_files = new JSZip();
                        await generate_files.loadAsync(me.generate_files_zip).then(async function(generate_files_zip) {
                            // 此处是压缩包中的testTXT.txt文件，以string形式返回其内容，此时已经可以获取zip中的所有文件了
                            await generate_files
                                .file(generate_points_name)
                                .async('string')
                                .then(function(content) {
                                    generate_pointscloud = content;
                                    // console.log('original_pointscloud:', generate_points_name);
                                    // console.log('content:', content);
                                    // console.log('获取生成点云数据：', generate_pointscloud);
                                });
                        });
                        me.make_format_data(generate_points_name, generate_pointscloud, 1);
                        console.log('me.generatePointCloudData:', me.generatePointCloudData);
                        me.get_preview();
                    }
                    // generateb不是zip
                    else {
                        var reader2 = new FileReader(); // 这里是核心！！！读取操作就是由它完成的。
                        reader2.readAsText(this.generate_blob);
                        console.log('开始读取1');
                        reader2.onload = async function() {
                            var generate_content = this.result;
                            me.make_format_data(me.preview_options[0].children.value, generate_content, 1);
                            console.log('me.generatePointCloudData:', me.generatePointCloudData);
                        };
                    }
                };
            }

            this.get_preview();
        },

        // 关闭预览
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.previewDialogVisible = false;
                    this.fileName = '';
                    this.preview_value = [];
                    this.preview_options = [];
                    this.previewDialogVisible = false;
                    this.loading = true;
                    this.original_files_zip = null;
                    this.generate_files_zip = null;
                    this.originalPointCloudData = [];
                    this.generatePointCloudData = [];
                    this.maxAxisValue = -10000;
                    this.minAxisValue = 10000;
                })
                .catch(_ => {});
        },

        // 切换本用户和所有用户的tab响应
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
    }
};
</script>

<style scoped>
.juzhog {
    width: 600px;
    height: 530px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -265px;
    background-color: #fff;
}

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
.el-input__inner {
    width: 600px !important;
}

.view1 {
    width: 600px;
    height: 530px;
    margin: 0 10px 0 0;
    background-color: #fff;
    float: left;
}

.el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
/* .inlineBlock {
    display: inline-block;
} */
</style>
