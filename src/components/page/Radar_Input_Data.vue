<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-umplidardata"></i> 电磁波雷达数据 </el-breadcrumb-item>
                <el-breadcrumb-item>雷达图像数据可视化</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr />

        <el-card>
            <div class="view">
                <el-row :gutter="20">
                    <!-- 上传数据预览 -->
                    <el-col :span="12">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-col>

                    <!-- 处理过程预览 -->
                    <el-col :span="12">
                        <el-button type="success">
                            训练集加入扩增数据
                        </el-button>
                    </el-col>
                </el-row>
                <!-- 输入框 -->
                <!-- <div>
                <el-button type="success" id="fileImport" v-on:click="clickLoad">
                    导入雷达数据
                </el-button>
                <input type="file" id="files" ref="refFile" style="display:none" v-on:change="fileLoad" />
            </div> -->
                <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                <!-- <div id="main" class="view1"></div> -->
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
            option: [],
            fileList: []
        };
    },
    methods: {
        // 旧
        fileLoad() {
            var myChart = echarts.init(document.getElementById('main'));
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
                    // arr[3] = arr[3] * 100;
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
                        max: 10,
                        min: -20
                    },
                    visualMap: {
                        calculable: true,
                        max: 40,
                        min: 0,
                        // range: [0, 1.0],
                        // 维度的名字默认就是表头的属性名
                        // dimension: 'Life Expectancy',
                        inRange: {
                            symbolSize: 2,
                            // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                            // color: ['#abd9e9', '#74add1', '#4575b4', '#313695']
                            color: ['#abd9e9', '#74add1', '#4575b4']
                        }
                    },
                    series: [
                        {
                            type: 'scatter3D',
                            data: this.pointCloudData
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(this.option);
            };
        },
        clickLoad() {
            this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
        },

        // 新
        submitUpload() {
            // 此处调用提交
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
    background-color: #fff;
}

.view1 {
    width: 600px;
    height: 530px;
    margin: 0 auto;
    background-color: #fff;
}

/* .el-col.el-col-12 {
    text-align: center !important;
} */
</style>
