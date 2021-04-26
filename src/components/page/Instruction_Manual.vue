<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            使用手册
            <!-- <img src="../../assets/img/James.jpg" width="600" height="400" /> -->
            <!-- <canvas id="chart1" width="600" height="400">
                <img src="../../assets/img/James.jpg" width="600" height="400" />
            </canvas> -->
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.drawCanvas();
    },
    methods: {
        // 画图像
        //     1）创建一个变量用于保存画布对象，使用它的id进行识别。
        // 　　2）检查是否支持画布API的getContext()方法（从而得知他是否支持<canvas>标记）。
        // 　　3）如果支持，创建一个变量并在目标画布对象上应用getContext()方法。
        drawCanvas() {
            var theChart = document.getElementById('chart1');
            if (theChart.getContext) {
                var theContext = theChart.getContext('2d');
                //fillRect(x,y,width,height)函数绘制一个填充矩形，
                //参数前两个值用于确定矩形的左上角，后两个参数提供了尺寸，所有的值均已像素为单位
                theContext.fillRect(50, 200, 100, 200);
            } else {
                console.log('theChart.getContext 为空!');
            }
        }
    }
};
</script>

<style scoped></style>
