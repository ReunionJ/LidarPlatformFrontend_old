<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-magic-stick"></i> 激光雷达数据 </el-breadcrumb-item>
                <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr />

        <el-card>
            <div class="view">
                <!-- 输入框 -->
                <el-row>
                    <el-col :span="12">
                        <div>
                            <el-button type="success" id="fileImport" v-on:click="clickLoad" style="float:left">
                                导入原雷达数据
                            </el-button>
                            <!-- v-if="len(this.originalPointCloudData) !== 0" -->
                            <el-button v-if="original_buttom" type="primary" @click="changeAxios_xz">交换xz坐标</el-button>
                            <el-button v-if="original_buttom" type="primary" @click="changeAxios_xy">交换xy坐标</el-button>
                            <el-button v-if="original_buttom" type="primary" @click="changeAxios_yz">交换yz坐标</el-button>
                            <input type="file" id="files" ref="refFile" style="display:none" v-on:change="fileLoad" />
                        </div>
                        <div id="main_o" class="view1"></div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-button type="success" id="fileImport_new" v-on:click="clickLoad_new" style="float:left">
                                导入生成雷达数据
                            </el-button>
                            <el-button v-if="generate_buttom" type="primary" @click="changeAxios_xz_new">交换xz坐标</el-button>
                            <el-button v-if="generate_buttom" type="primary" @click="changeAxios_xy_new">交换xy坐标</el-button>
                            <el-button v-if="generate_buttom" type="primary" @click="changeAxios_yz_new">交换yz坐标</el-button>
                            <input type="file" id="files_new" ref="refFile_new" style="display:none" v-on:change="fileLoad_new" />
                        </div>
                        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                        <div id="main_g" class="view1"></div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
    data() {
        return {
            fileList: [],
            pointCloudData: [],
            pointCloudData_new: [],
            option: [],
            option1: [],
            originalPointCloudData: [],
            generatePointCloudData: [],
            maxAxisValue: -10000,
            minAxisValue: 10000,
            maxLightValue: -10000,
            minLightValue: 10000,
            original_buttom: false,
            generate_buttom: false
        };
    },
    methods: {
        // 按格式处理解压后的数据（格式化生成三维或四维的数据）【输出均为n*4的数组】
        make_format_data(points_name, pointscloud, flag) {
            // console.log('points_name:', points_name);
            // console.log('pointscloud:', pointscloud);
            var is_3d_data = 0;
            var format_data = null;
            var dot = points_name.lastIndexOf('.');
            if (dot === -1) {
                console.log('数据无后缀-直接分每一列即可');
                format_data = pointscloud.split('\n');
                // 一行一行处理
                format_data.forEach(item => {
                    let arr = item.split(' ');
                    for (var k in arr) {
                        if (k < 3 && parseFloat(arr[k]) > this.maxAxisValue) {
                            this.maxAxisValue = parseFloat(arr[k]);
                            console.log('arr:', arr);
                        }
                        if (k < 3 && parseFloat(arr[k]) < this.minAxisValue) {
                            this.minAxisValue = parseFloat(arr[k]);
                        }
                    }
                    if ((arr.length === 3 || arr[3] === '') && !flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('0');
                        } else if (arr[3] === '') {
                            arr[3] = '0';
                        }
                    } else if ((arr.length === 3 || arr[3] === '') && flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('100');
                        } else if (arr[3] === '') {
                            arr[3] = '100';
                        }
                    }
                    // console.log('arr:', arr);
                    if (!flag) {
                        this.originalPointCloudData.push(arr);
                    } else {
                        this.generatePointCloudData.push(arr);
                    }

                    if (parseFloat(arr[3]) > this.maxLightValue) {
                        this.maxLightValue = parseFloat(arr[3]);
                    }
                    if (parseFloat(arr[3]) < this.minLightValue) {
                        this.minLightValue = parseFloat(arr[3]);
                    }
                });
                console.log('this.originalPointCloudData:', this.originalPointCloudData);
                return is_3d_data;
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
                        if (k < 3 && parseFloat(arr[k]) > this.maxAxisValue) {
                            this.maxAxisValue = parseFloat(arr[k]);
                        }
                        if (k < 3 && parseFloat(arr[k]) < this.minAxisValue) {
                            this.minAxisValue = parseFloat(arr[k]);
                        }
                    }
                    if ((arr.length === 3 || arr[3] === '') && !flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('0');
                        } else if (arr[3] === '') {
                            arr[3] = '0';
                        }
                    } else if ((arr.length === 3 || arr[3] === '') && flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('100');
                        } else if (arr[3] === '') {
                            arr[3] = '100';
                        }
                    }
                    if (!flag) {
                        this.originalPointCloudData.push(arr);
                    } else {
                        this.generatePointCloudData.push(arr);
                    }
                    if (parseFloat(arr[3]) > this.maxLightValue) {
                        this.maxLightValue = parseFloat(arr[3]);
                    }
                    if (parseFloat(arr[3]) < this.minLightValue) {
                        this.minLightValue = parseFloat(arr[3]);
                    }
                });
            } else if (data_type === '.txt') {
                console.log('.txt数据-直接分每一列即可');
                format_data = pointscloud.split('\n');
                format_data.forEach(item => {
                    let arr = item.split(' ');
                    for (var k in arr) {
                        if (k < 3 && parseFloat(arr[k]) > this.maxAxisValue) {
                            this.maxAxisValue = parseFloat(arr[k]);
                        }
                        if (k < 3 && parseFloat(arr[k]) < this.minAxisValue) {
                            this.minAxisValue = parseFloat(arr[k]);
                        }
                    }
                    if ((arr.length === 3 || arr[3] === '') && !flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('0');
                        } else if (arr[3] === '') {
                            arr[3] = '0';
                        }
                    } else if ((arr.length === 3 || arr[3] === '') && flag) {
                        // 三维数据
                        is_3d_data = 1;
                        if (arr.length === 3) {
                            arr.push('100');
                        } else if (arr[3] === '') {
                            arr[3] = '10';
                        }
                    }
                    // console.log('arr:', arr);
                    if (!flag) {
                        this.originalPointCloudData.push(arr);
                    } else {
                        this.generatePointCloudData.push(arr);
                    }
                    if (parseFloat(arr[3]) > this.maxLightValue) {
                        this.maxLightValue = parseFloat(arr[3]);
                    }
                    if (parseFloat(arr[3]) < this.minLightValue) {
                        this.minLightValue = parseFloat(arr[3]);
                    }
                });
            } else if (data_type === '.bin') {
                console.log('.bin数据-抱歉我还不知道咋处理');
            }
            console.log('this.generatePointCloudData:', this.generatePointCloudData);
            return is_3d_data;
        },
        changeAxios_yz() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.originalPointCloudData) {
                [this.originalPointCloudData[i][1], this.originalPointCloudData[i][2]] = [
                    this.originalPointCloudData[i][2],
                    this.originalPointCloudData[i][1]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart = echarts.init(document.getElementById('main_o'));
            this.option = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.originalPointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.option);
        },
        changeAxios_xz() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.originalPointCloudData) {
                [this.originalPointCloudData[i][0], this.originalPointCloudData[i][2]] = [
                    this.originalPointCloudData[i][2],
                    this.originalPointCloudData[i][0]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart = echarts.init(document.getElementById('main_o'));
            this.option = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.originalPointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.option);
        },
        changeAxios_xy() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.originalPointCloudData) {
                [this.originalPointCloudData[i][0], this.originalPointCloudData[i][1]] = [
                    this.originalPointCloudData[i][1],
                    this.originalPointCloudData[i][0]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart = echarts.init(document.getElementById('main_o'));
            this.option = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.originalPointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.option);
        },

        changeAxios_yz_new() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.generatePointCloudData) {
                [this.generatePointCloudData[i][1], this.generatePointCloudData[i][2]] = [
                    this.generatePointCloudData[i][2],
                    this.generatePointCloudData[i][1]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart1 = echarts.init(document.getElementById('main_g'));
            this.option1 = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.generatePointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(this.option1);
        },
        changeAxios_xy_new() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.generatePointCloudData) {
                [this.generatePointCloudData[i][0], this.generatePointCloudData[i][1]] = [
                    this.generatePointCloudData[i][1],
                    this.generatePointCloudData[i][0]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart1 = echarts.init(document.getElementById('main_g'));
            this.option1 = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.generatePointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(this.option1);
        },
        changeAxios_xz_new() {
            console.log('>>>>>>>>>>>>>>>>>>>>切换坐标轴>>>>>>>>>>>>>>>>>>>>>>>>>');
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            for (var i in this.generatePointCloudData) {
                [this.generatePointCloudData[i][0], this.generatePointCloudData[i][2]] = [
                    this.generatePointCloudData[i][2],
                    this.generatePointCloudData[i][0]
                ];
                // console.log('this.originalPointCloudData[i][1]:', this.originalPointCloudData[i][1]);
                // console.log('this.originalPointCloudData[i][2]:', this.originalPointCloudData[i][2]);
                // break;
            }
            // console.log('this.originalPointCloudData:', this.originalPointCloudData);
            var myChart1 = echarts.init(document.getElementById('main_g'));
            this.option1 = {
                title: {
                    text: '激光雷达三维点云（原始图）'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid3D: {},
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
                    max: this.maxLightValue,
                    min: this.minLightValue,
                    // max: 3,
                    // min: 0,
                    // range: [0, 100],
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
                        type: 'scatter3D',
                        data: this.generatePointCloudData
                    }
                ]
            };
            console.log('??????');
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(this.option1);
        },
        fileLoad() {
            this.originalPointCloudData = [];
            // if (this.originalPointCloudData.length === 0) {
            //     this.original_buttom = false;
            // }
            this.maxAxisValue = -10000;
            this.minAxisValue = 10000;
            this.maxLightValue = -10000;
            this.minLightValue = 10000;
            console.log('echarts.version:', echarts.version);
            if (this.pointCloudData.length) {
                this.pointCloudData = [];
            }
            var myChart = echarts.init(document.getElementById('main_o'));
            const selectedFile = this.$refs.refFile.files[0]; // 获取读取的File对象
            console.log('selectedFile:');
            console.log(selectedFile);
            var name = selectedFile.name; // 读取选中文件的文件名
            var size = selectedFile.size; // 读取选中文件的大小
            console.log('文件名:' + name + '大小：' + size);
            var reader = new FileReader(); // 这里是核心！！！读取操作就是由它完成的。
            reader.readAsText(selectedFile); // 读取文件的内容
            reader.onload = e => {
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                // console.log('rot:', rot);
                // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

                console.log(e.target.result); // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
                console.log('e.target.result:');
                var is_3d_data = this.make_format_data(name, e.target.result, 0);
                console.log('is_3d_data:', is_3d_data);
                console.log('originalPointCloudData:', this.originalPointCloudData);
                console.log('this.maxAxisValue:', this.maxAxisValue);
                console.log('this.minAxisValue:', this.minAxisValue);
                console.log('this.maxAxisValue:', this.maxLightValue);
                console.log('this.minAxisValue:', this.minLightValue);
                if (is_3d_data) {
                    this.maxLightValue = 100;
                }
                // var ans = e.target.result.split('\r\n'); // 分割成二维数组，每个一维数组四个元素
                // ans = e.target.result.split('\n');
                // ans = e.target.result.split('\r');
                // console.log(ans);
                // this.originalPointCloudData.forEach(item => {
                //     // data.push(item.split(' ').slice(0, 3));
                //     let arr = item.split(' ');
                //     arr[3] = arr[3] * 100;
                //     this.pointCloudData.push(arr);
                // });
                console.log('this.pointCloudData:');
                console.log(this.pointCloudData);
                if (this.originalPointCloudData.length !== 0) {
                    this.original_buttom = true;
                }
                this.option = {
                    title: {
                        text: '激光雷达三维点云（原始图）'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid3D: {},
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
                        max: this.maxLightValue,
                        min: this.minLightValue,
                        // max: 3,
                        // min: 0,
                        // range: [0, 100],
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
                            type: 'scatter3D',
                            data: this.originalPointCloudData
                        }
                    ]
                };
                console.log('??????');
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(this.option);
            };
        },

        // >>>>>>>>>>>>>>>>>
        fileLoad_new() {
            this.generatePointCloudData = [];
            this.maxAxisValue = -10000;
            this.minAxisValue = 10000;
            this.maxLightValue = -10000;
            this.minLightValue = 10000;
            console.log('echarts.version:', echarts.version);
            if (this.pointCloudData_new.length) {
                this.pointCloudData_new = [];
            }
            var myChart1 = echarts.init(document.getElementById('main_g'));
            const selectedFile = this.$refs.refFile_new.files[0]; // 获取读取的File对象
            console.log('selectedFile:');
            console.log(selectedFile);
            var name = selectedFile.name; // 读取选中文件的文件名
            var size = selectedFile.size; // 读取选中文件的大小
            console.log('文件名:' + name + '大小：' + size);
            var reader = new FileReader(); // 这里是核心！！！读取操作就是由它完成的。
            reader.readAsText(selectedFile); // 读取文件的内容
            reader.onload = e => {
                console.log('e.target.result:');
                console.log(e.target.result); // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
                this.make_format_data(name, e.target.result, 1);

                var is_3d_data = this.make_format_data(name, e.target.result, 0);
                console.log('is_3d_data:', is_3d_data);
                console.log('originalPointCloudData:', this.originalPointCloudData);
                console.log('this.maxAxisValue:', this.maxAxisValue);
                console.log('this.minAxisValue:', this.minAxisValue);
                console.log('this.maxAxisValue:', this.maxLightValue);
                console.log('this.minAxisValue:', this.minLightValue);
                if (this.maxLightValue === 0 && this.minLightValue === 0) {
                    this.maxLightValue = 100;
                }
                console.log('generatePointCloudData:', this.generatePointCloudData);
                if (this.generatePointCloudData.length !== 0) {
                    this.generate_buttom = true;
                }
                this.option1 = {
                    title: {
                        text: '激光雷达三维点云（生成图）'
                    },
                    grid3D: {},
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
                        // max: 1,
                        // min: 0,
                        // range: [1, 0],
                        max: this.maxLightValue,
                        min: this.minLightValue,
                        // 维度的名字默认就是表头的属性名
                        // dimension: 'Life Expectancy',
                        inRange: {
                            symbolSize: 2,
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                        // outOfRange: {
                        //     symbolSize: 2,
                        //     color: ['#313695']
                        // }
                    },
                    series: [
                        {
                            type: 'scatter3D',
                            data: this.generatePointCloudData
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart1.setOption(this.option1);
            };
        },
        clickLoad() {
            this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
        },
        clickLoad_new() {
            this.$refs.refFile_new.dispatchEvent(new MouseEvent('click'));
        }
    },
    // 此时页面上元素已经渲染完毕
    mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
    }
};
</script>

<style scoped>
.view {
    width: 1300px;
    height: 580px;
    margin: auto;
    float: left;
    background-color: #fff;
}

.view1 {
    width: 600px;
    height: 530px;
    margin: 0 10px 0 0;
    background-color: #fff;
    float: left;
}
</style>
