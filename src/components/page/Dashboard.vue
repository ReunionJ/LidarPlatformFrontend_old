<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num" :title="OnlineUsersNum">{{ OnlineUsersNum }}</div>
                                    <div>在线用户</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }" style>
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-document-copy grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ TextDataNum }}</div>
                                    <div>激光雷达数据生成</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-orange grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ StructuredDataNum }}</div>
                                    <div>电磁波雷达数据生成</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-4">
                                <i class="el-icon-picture-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ EmergencyDataNum }}</div>
                                    <div>雷达图像数据生成</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-card shadow="hover" style="height:403px;">
                            <div slot="header" class="clearfix" style="font-size: 700">
                                <span>快捷方式</span>
                            </div>
                            <el-row :gutter="20" style="margin-left: 10px; margin-right: 10px">
                                <el-col :span="6"
                                    ><div>
                                        <!-- <a href="#/input"> -->
                                        <a href="#/dashboard" style="margin-left: 0px !important;">
                                            <el-button type="info" icon="el-icon-s-home" plain :style="selfstyle"
                                                ><br /><span style="margin-left: 0px !important; font-size: 14px">主页</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/Lidar_Input_Data">
                                            <el-button
                                                type="info"
                                                icon="el-icon-s-marketing"
                                                plain
                                                style="font-size: 35px; width: 100% ; height: 125px"
                                                ><br /><span style="font-size: 14px">数据可视化</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/Lidar_Augmentation_Add">
                                            <el-button
                                                type="info"
                                                icon="el-icon-data-analysis"
                                                plain
                                                style="font-size: 35px; width: 100% ; height: 125px"
                                                ><br /><span style="font-size: 14px">添加数据生成</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/Log">
                                            <el-button
                                                type="info"
                                                icon="el-icon-s-claim"
                                                plain
                                                style="font-size: 35px; width: 100% ; height: 125px"
                                                ><br /><span style="font-size: 14px">日志管理</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                            </el-row>
                            <el-row :gutter="20" style="margin-left: 10px; margin-right: 10px">
                                <el-col :span="6"
                                    ><div>
                                        <el-button
                                            type="info"
                                            icon="el-icon-s-data"
                                            plain
                                            style="font-size: 35px; width: 100%; height: 125px"
                                            ><br /><span style="font-size: 14px">进度条</span></el-button
                                        >
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/augmentation_manage">
                                            <el-button
                                                type="info"
                                                icon="el-icon-set-up"
                                                plain
                                                style="font-size: 35px; width: 100%; height: 125px"
                                                ><br /><span style="font-size: 14px">生成管理</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/user_manage">
                                            <el-button
                                                type="info"
                                                icon="el-icon-user"
                                                plain
                                                style="font-size: 35px; width: 100%; height: 125px"
                                                ><br /><span style="font-size: 14px">用户管理</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                                <el-col :span="6"
                                    ><div>
                                        <a href="#/system_setting">
                                            <el-button
                                                type="info"
                                                icon="el-icon-setting"
                                                plain
                                                style="font-size: 35px; width: 100%; height: 125px"
                                                ><br /><span style="font-size: 14px">系统设置</span></el-button
                                            >
                                        </a>
                                    </div></el-col
                                >
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" style="height:403px;">
                            <div slot="header" class="clearfix .body3">
                                <span>正在运行的各生成任务</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                            </div>
                            <el-table style="width:100%; margin-top:-20px; font-size:15px" :data="RunningTask_final" stripe>
                                <el-table-column prop="name" label="方法名" width="200"> </el-table-column>
                                <el-table-column prop="num" label="数量" width="73"> </el-table-column>
                            </el-table>
                            <!-- <el-table :show-header="false" :data="todoList" style="width:100%;">
                                <el-table-column width="40">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.status"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">{{ scope.row.title }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column width="60">
                                    <template>
                                        <i class="el-icon-edit"></i>
                                        <i class="el-icon-delete"></i>
                                    </template>
                                </el-table-column>
                            </el-table> -->
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20" style="height:155px;">
                    <!-- <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt style="height:80px; width:80px" />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录记录：
                        <span>2021-01-09</span>
                        <span>南京</span>
                    </div> -->
                    <div
                        style="
                  margin: 0 auto;
                  width: 100%;
                  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px,
                    rgba(0, 0, 0, 0.04) 0px 0px 6px;
                "
                    >
                        <el-table :data="tableData" style="width: 100%; margin: 0 auto; font-size:13px" :show-header="false">
                            <el-table-column prop="key" width="70" style="font-weight: 700"> </el-table-column>
                            <el-table-column prop="value" width="203"> </el-table-column>
                        </el-table>

                        <el-table :data="tableButtonData" style="width: 100%; margin: 0 auto; font-size:13px" :show-header="false">
                            <el-table-column prop="action" width="80"> </el-table-column>
                            <el-table-column>
                                <template>
                                    <el-button size="mini" type="success" plain>获取授权</el-button>
                                    <el-button size="mini" type="warning" plain>慕测官网</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>

                <el-card shadow="hover" style="height:142px; margin-bottom:20px;" body-style="el-card__body1">
                    <div class="el-card__header1">
                        <span>数据生成报告</span>
                    </div>
                    转化率 <el-progress :percentage="ConversionRate"></el-progress>
                    合格率
                    <el-progress :percentage="PassRate"></el-progress>
                </el-card>

                <el-card shadow="hover" style="height:182px;" body-style="el-card__body1 el-card__body2">
                    <div class="el-card__header1">
                        <span>系统报告</span>
                    </div>
                    CPU使用率 <el-progress :percentage="systemStatusData.CPUStatus" color="#42b983"></el-progress>
                    GPU使用率
                    <el-progress :percentage="systemStatusData.GPUStatus" color="#f1e05a"></el-progress>
                    内存占用率 <el-progress :percentage="systemStatusData.memoryStatus"></el-progress>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <!-- 生成数据监控 -->

            <el-col :span="24" style="padding-left: 25px;">
                <el-card shadow="hover">
                    <div v-if="activeName == 'first'" id="main1" style="width: 95%; height:300px; margin: 0 auto;"></div>
                    <div id="main2" style="width: 95%; height:300px; margin: 0 auto;"></div>
                    <div id="main3" style="width: 95%; height:300px; margin: 0 auto;"></div>
                    <!-- <div id="main" style="width: 95%;height:300px; margin: 0 auto;"></div> -->
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import * as echarts from 'echarts';
export default {
    name: 'dashboard',
    data() {
        return {
            activeName: 'first',
            selfstyle: {
                marginLeft: '0px !important',
                fontSize: '35px',
                width: '100%',
                height: '125px'
            },
            tableData: [
                {
                    key: '平台名',
                    value: '智能系统软件测试数据生成平台'
                },
                {
                    key: '版本号',
                    value: 'Ver1.0'
                }
            ],
            tableButtonData: [
                {
                    action: '获取设置'
                }
            ],
            name: sessionStorage.getItem('ms_username'),
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options2: {
                type: 'line',
                title: {
                    text: '近几个月各类数据生成趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '激光雷达数据生成',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '电磁波雷达数据生成',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '紧急数据生成',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            },
            systemStatusData: {
                // CPU使用率
                CPUStatus: 0,
                GPUStatus: 0,
                // 内存占用率
                memoryStatus: 0
            },
            // 生成任务显示的数据
            // 激光雷达数据生成
            StructuredDataNum: -1,
            // 电磁波雷达数据生成
            TextDataNum: -1,
            // 紧急数据生成
            EmergencyDataNum: -1,
            // 在线用户数量
            OnlineUsersNum: 0,
            // 转化率
            ConversionRate: 0,
            // 合格率
            PassRate: 0,
            RunningTask: {},
            RunningTask_name: [],
            RunningTask_num: [],
            RunningTask_final: [],
            i: 0,
            logShow_new_two: [],
            dates: [],
            methods: [],
            datas_ran: [],
            datas_finish: [],
            datas_generate: [],
            tmep_series_ran: [],
            tmep_series_finish: [],
            tmep_series_generate: [],
            myChart: null,
            myChart2: null,
            myChart3: null
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    // 可以判断如果定时器还在运行就关闭 或者直接关闭
    destroyed() {
        clearInterval(this.timer);
        // console.log('关闭定时器');
    },
    async created() {
        console.log('created:');
        const { data: data } = await this.$http.get('/user/');
        console.log('user:');
        console.log(data);
    },
    // 此时页面上元素已经渲染完毕
    mounted() {
        console.log('mounted:');
        this.getPerformance();
        this.getOnlineUser();
        this.getRunningTask();
        this.getECharts();
        this.timer = setInterval(() => {
            this.getPerformance();
            this.getOnlineUser();
            this.getRunningTask();
            this.getECharts();
            // this.i++;
        }, 1000 * 60);
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        handleClick() {
            console.log('this.activeName:', this.activeName);
            this.getTwo();
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        async getPerformance() {
            // console.log('sessionStorageToken:' + window.sessionStorage.getItem('token'));
            const { data: data } = await this.$http.get('/system_status/performance/');
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取当前系统性能失败！');
            }
            this.systemStatusData.CPUStatus = parseInt(data.data.cpu);
            this.systemStatusData.memoryStatus = parseInt(data.data.memory);
            console.log('当前系统性能:', data.data);
            // console.log('this.i:', this.i);
            // console.log(data);
        },
        async getOnlineUser() {
            // console.log('headerToken:' + window.sessionStorage.getItem('token'));
            const { data: data } = await this.$http.get('/system_status/online_user/');
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取在线人数失败！');
            }
            this.OnlineUsersNum = data.data.online_user;
            // this.OnlineUsersNum = data.data.online_user + this.i;
            // console.log('当前在线人数:', data.data);
            // console.log('data:');
            // console.log(data);
        },
        async getRunningTask() {
            // // console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            // console.log('headerToken:' + window.sessionStorage.getItem('token'));
            const { data: data } = await this.$http.get('/system_status/running_task/');
            if (data.code !== 20000) {
                // console.log(data.code);
                return this.$message.error('获取正在运行各生成任务失败！');
            }
            // console.log('当前正在运行各生成任务:', data.data);
            this.RunningTask = data.data;
            // console.log('RunningTask:');
            // console.log(this.RunningTask);
            this.RunningTask_name = Object.keys(this.RunningTask);
            this.RunningTask_num = Object.values(this.RunningTask);
            // console.log(this.RunningTask_name);
            // console.log(this.RunningTask_num);
            this.RunningTask_final = [];
            for (var i = 0; i < this.RunningTask_name.length; i++) {
                var x = {};
                x.name = this.RunningTask_name[i];
                x.num = this.RunningTask_num[i];
                this.RunningTask_final.push(x);
            }
            // console.log(this.RunningTask_final);
        },
        getECharts() {
            console.log('刷新图表');

            // 准备指定图表的配置项和数据
            console.log('getTwo');
            this.getTwo();
        },
        async getTwo() {
            console.log('getTwo');
            const { data: data } = await this.$http.get('log/recent_fifteen_days/');
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取近15日系统日志数据失败！');
            }
            this.logData = data.data;
            console.log('this.logData:', this.logData);
            this.showData();
            // this.logDownload = JSON.stringify(this.logData);
        },
        showData() {
            console.log('刷新数组');
            this.dates = [];
            this.methods = [];
            this.datas_ran = [];
            this.datas_finish = [];
            this.datas_generate = [];
            this.tmep_series_ran = [];
            this.tmep_series_finish = [];
            this.tmep_series_generate = [];
            var flag = true;
            for (var date in this.logData) {
                this.dates.push(date);
                for (var method in this.logData[date]) {
                    if (flag) {
                        this.methods.push(method);
                        console.log('numbers:', JSON.parse(JSON.stringify(this.logData[date][method]['ran_task_number'])));
                    }
                }
                flag = false;
            }
            console.log('dates:', this.dates);
            console.log('methods:', this.methods);
            for (var method in this.methods) {
                var temp_ran = [];
                var temp_finish = [];
                var temp_generate = [];
                for (var date in this.dates) {
                    // console.log('date:', date);
                    // console.log('method:', method);
                    temp_ran.push(this.logData[this.dates[date]][this.methods[method]]['ran_task_number']);
                    temp_finish.push(this.logData[this.dates[date]][this.methods[method]]['finish_task_number']);
                    temp_generate.push(this.logData[this.dates[date]][this.methods[method]]['generate_data_number']);
                    // console.log('temp_ran:', temp_ran);
                }
                this.datas_ran.push(temp_ran);
                this.datas_finish.push(temp_finish);
                this.datas_generate.push(temp_generate);
            }
            console.log('dates:', this.dates);
            console.log('methods:', this.methods);
            console.log('datas_ran:', this.datas_ran);
            console.log('datas_finish:', this.datas_finish);
            console.log('datas_generate:', this.datas_generate);

            console.log('getone:', getone);
            console.log('this.methods.length:', this.methods.length);
            for (var i = 0; i < this.methods.length; i++) {
                var getone = {};
                getone.type = 'line';
                getone.stack = '总量';
                getone.areaStyle = {};
                getone.name = this.methods[i];
                getone.data = this.datas_ran[i];
                this.tmep_series_ran.push(getone);
                console.log('getone.name:', getone.name);
                console.log('getone:', getone);
                console.log('this.tmep_series_ran:', this.tmep_series_ran);
            }
            // console.log('this.tmep_series:', this.tmep_series);
            // console.log('加载option');
            if (this.myChart != null && this.myChart != '' && this.myChart != undefined) {
                this.myChart.dispose();
            }
            this.myChart = echarts.init(document.getElementById('main1'));
            var option = {
                title: {
                    text: '运行任务数监控',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    // data: ['1型数据生成', '2型数据生成', '3型数据生成', '4型数据生成', '5型数据生成'],
                    data: this.methods,
                    top: '8%'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.dates.reverse()
                        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.tmep_series_ran
                // series: [
                //     {
                //         name: '1型数据生成',
                //         type: 'line',
                //         stack: '总量',
                //         areaStyle: {},
                //         data: [120, 132, 101, 134, 90, 230, 210]
                //     },
                //     {
                //         name: '2型数据生成',
                //         type: 'line',
                //         stack: '总量',
                //         areaStyle: {},
                //         data: [220, 182, 191, 234, 290, 330, 310]
                //     },
                //     {
                //         name: '3型数据生成',
                //         type: 'line',
                //         stack: '总量',
                //         areaStyle: {},
                //         data: [150, 232, 201, 154, 190, 330, 410]
                //     },
                //     {
                //         name: '4型数据生成',
                //         type: 'line',
                //         stack: '总量',
                //         areaStyle: {},
                //         data: [320, 332, 301, 334, 390, 330, 320]
                //     },
                //     {
                //         name: '5型数据生成',
                //         type: 'line',
                //         stack: '总量',
                //         label: {},
                //         areaStyle: {},
                //         data: [820, 932, 901, 934, 1290, 1330, 1320]
                //     }
                // ]
            };

            // 使用刚指定的配置项和数据显示图表。
            if (option && typeof option === 'object') {
                this.myChart.setOption(option, true);
            }

            // 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》

            for (var i = 0; i < this.methods.length; i++) {
                var getone = {};
                getone.type = 'line';
                getone.stack = '总量';
                getone.areaStyle = {};
                getone.name = this.methods[i];
                getone.data = this.datas_finish[i];
                this.tmep_series_finish.push(getone);
                console.log('getone.name:', getone.name);
                console.log('getone:', getone);
                console.log('this.tmep_series_finish:', this.tmep_series_finish);
            }
            // console.log('this.tmep_series:', this.tmep_series);
            // console.log('加载option');
            if (this.myChart2 != null && this.myChart2 != '' && this.myChart2 != undefined) {
                this.myChart2.dispose();
            }
            this.myChart2 = echarts.init(document.getElementById('main2'));
            var option2 = {
                title: {
                    text: '完成任务数监控',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    // data: ['1型数据生成', '2型数据生成', '3型数据生成', '4型数据生成', '5型数据生成'],
                    data: this.methods,
                    top: '8%'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.dates
                        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.tmep_series_finish
            };

            // 使用刚指定的配置项和数据显示图表。
            if (option2 && typeof option2 === 'object') {
                this.myChart2.setOption(option2, true);
            }

            // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            for (var i = 0; i < this.methods.length; i++) {
                var getone = {};
                getone.type = 'line';
                getone.stack = '总量';
                getone.areaStyle = {};
                getone.name = this.methods[i];
                getone.data = this.datas_generate[i];
                this.tmep_series_generate.push(getone);
                console.log('getone.name:', getone.name);
                console.log('getone:', getone);
                console.log('this.tmep_series_generate:', this.tmep_series_generate);
            }
            // console.log('this.tmep_series:', this.tmep_series);
            // console.log('加载option');
            if (this.myChart3 != null && this.myChart3 != '' && this.myChart3 != undefined) {
                this.myChart3.dispose();
            }
            this.myChart3 = echarts.init(document.getElementById('main3'));
            var option3 = {
                title: {
                    text: '生成数据量监控',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    // data: ['1型数据生成', '2型数据生成', '3型数据生成', '4型数据生成', '5型数据生成'],
                    data: this.methods,
                    top: '8%'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: this.dates
                        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.tmep_series_generate
            };

            // 使用刚指定的配置项和数据显示图表。
            if (option3 && typeof option3 === 'object') {
                this.myChart3.setOption(option3, true);
            }
        }
    }
};
</script>

<style scoped>
.el-card {
    border-radius: 3%;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 70px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: #e6a23c;
}

.grid-con-3 .grid-num {
    color: #e6a23c;
}

.grid-con-4 .grid-con-icon {
    background: #f56c6c;
}

.grid-con-4 .grid-num {
    color: #f56c6c;
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 10px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 25px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.el-card__header1 {
    padding: 0px 10px 10px 10px !important;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.el-card__body1 {
    padding: 10px !important;
}

.el-card__body2 {
    padding-top: 10px;
}

.body3 {
    padding-top: 0 !important;
}

.el-button--info.is-plain {
    border-color: #f4f4f5 !important;
}

.el-button [class*='el-icon-'] + span {
    margin-left: 0 !important;
}
</style>
