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
                            <input type="file" id="files" ref="refFile" style="display:none" v-on:change="fileLoad" />
                        </div>
                        <div id="main_o" class="view1"></div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-button type="success" id="fileImport_new" v-on:click="clickLoad_new" style="float:left">
                                导入生成雷达数据
                            </el-button>
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
            option1: []
        };
    },
    methods: {
        fileLoad() {
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
                console.log('e.target.result:');
                console.log(e.target.result); // 当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
                var ans = e.target.result.split('\r\n'); // 分割成二维数组，每个一维数组四个元素
                ans = e.target.result.split('\n');
                ans = e.target.result.split('\r');
                // console.log(ans);
                ans.forEach(item => {
                    // data.push(item.split(' ').slice(0, 3));
                    let arr = item.split(' ');
                    arr[3] = arr[3] * 100;
                    this.pointCloudData.push(arr);
                });
                console.log('this.pointCloudData:');
                console.log(this.pointCloudData);
                this.option = {
                    title: {
                        text: '激光雷达三维点云图'
                    },
                    grid3D: {},
                    xAxis3D: {},
                    yAxis3D: {},
                    zAxis3D: {
                        max: 50,
                        min: -50
                    },
                    visualMap: {
                        calculable: true,
                        max: 100,
                        min: 0,
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
                            type: 'scatter3D',
                            data: this.pointCloudData
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
                var ans = e.target.result.split('\r\n'); // 分割成二维数组，每个一维数组四个元素
                ans = e.target.result.split('\n');
                ans = e.target.result.split('\r');
                // console.log(ans);
                ans.forEach(item => {
                    // data.push(item.split(' ').slice(0, 3));
                    let arr = item.split(' ');
                    arr[3] = arr[3] * 100;
                    this.pointCloudData_new.push(arr);
                });
                console.log('this.pointCloudData_new:');
                console.log(this.pointCloudData_new);
                this.option1 = {
                    title: {
                        text: '激光雷达三维点云图'
                    },
                    grid3D: {},
                    xAxis3D: {},
                    yAxis3D: {},
                    zAxis3D: {
                        max: 50,
                        min: -50
                    },
                    visualMap: {
                        calculable: true,
                        max: 100,
                        min: 0,
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
                        }
                    },
                    series: [
                        {
                            type: 'scatter3D',
                            data: this.pointCloudData_new
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
    mounted() {}
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
