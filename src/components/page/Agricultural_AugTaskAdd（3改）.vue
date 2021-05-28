<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-grape"></i> 农业图像数据 </el-breadcrumb-item>
                <el-breadcrumb-item>添加生成任务并展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="height: 500px">
            <div class="form-box" style="width: 100%; height: 100%">
                <el-row :gutter="20">
                    <el-col :span="14">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="图像处理" name="first">
                                <el-form ref="form" :model="form" label-width="140px" size="mini">
                                    <el-form-item label="选择方法">
                                        <el-cascader
                                            v-model="method_value"
                                            :options="method_options"
                                            @change="methodHandleChange"
                                            :props="{ expandTrigger: 'hover' }"
                                        ></el-cascader>
                                    </el-form-item>

                                    <el-form-item label="数据集路径">
                                        <el-input v-model="form.data_path"></el-input>
                                    </el-form-item>
                                    <el-form-item label="保存路径">
                                        <el-input v-model="form.save_path"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 0" label="均值">
                                        <el-input v-model="params_form[0].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 0" label="方差">
                                        <el-input v-model="params_form[0].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 1" label="均值">
                                        <el-input v-model="params_form[1].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 1" label="方差">
                                        <el-input v-model="params_form[1].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 2" label="期望">
                                        <el-input v-model="params_form[2].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 3" label="噪声像素百分比">
                                        <el-input v-model="params_form[3].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 4" label="噪声像素百分比">
                                        <el-input v-model="params_form[4].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 4" label="噪声像素颜色">
                                        <el-input v-model="params_form[4].p2" placeholder="选填"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 5" label="亮度">
                                        <el-input v-model="params_form[5].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 5" label="浓度">
                                        <el-input v-model="params_form[5].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 8" label="X">
                                        <el-input v-model="params_form[8].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 8" label="Y">
                                        <el-input v-model="params_form[8].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 9" label="横向比例">
                                        <el-input v-model="params_form[9].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 9" label="纵向比例">
                                        <el-input v-model="params_form[9].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 10" label="旋转角度">
                                        <el-input v-model="params_form[10].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 10" label="x">
                                        <el-input v-model="params_form[10].p2" placeholder="选填"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 10" label="y">
                                        <el-input v-model="params_form[10].p3" placeholder="选填"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 11" label="横向比例">
                                        <el-input v-model="params_form[11].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 11" label="纵向比例">
                                        <el-input v-model="params_form[11].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 12" label="变换像素百分比">
                                        <el-input v-model="params_form[12].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 18" label="阈值">
                                        <el-input v-model="params_form[18].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 19" label="模板半径">
                                        <el-input v-model="params_form[19].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 20" label="模板半径">
                                        <el-input v-model="params_form[20].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 20" label="灰度相似性方差">
                                        <el-input v-model="params_form[20].p2"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 20" label="坐标空间的标注方差">
                                        <el-input v-model="params_form[20].p3"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 21" label="模板半径">
                                        <el-input v-model="params_form[21].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 22" label="模板半径">
                                        <el-input v-model="params_form[22].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 22" label="方差">
                                        <el-input v-model="params_form[22].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 23" label="模板半径">
                                        <el-input v-model="params_form[23].p1"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 24" label="池化窗口长">
                                        <el-input v-model="params_form[24].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 24" label="池化窗口宽">
                                        <el-input v-model="params_form[24].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 25" label="池化窗口长">
                                        <el-input v-model="params_form[25].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 25" label="池化窗口宽">
                                        <el-input v-model="params_form[25].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 26" label="池化窗口长">
                                        <el-input v-model="params_form[26].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 26" label="池化窗口宽">
                                        <el-input v-model="params_form[26].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 27" label="池化窗口长">
                                        <el-input v-model="params_form[27].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 27" label="池化窗口宽">
                                        <el-input v-model="params_form[27].p2"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 28" label="RGB信息">
                                        <el-switch class="marginRight" v-model="params_form[28].p1" active-text="R"> </el-switch>
                                        <el-switch class="marginRight" v-model="params_form[28].p2" active-text="G"> </el-switch>
                                        <el-switch class="marginRight" v-model="params_form[28].p3" active-text="B"> </el-switch>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 29" label="颜色空间">
                                        <el-cascader
                                            v-model="color_value"
                                            :options="color_options"
                                            @change="colorHandleChange"
                                            :props="{ expandTrigger: 'hover' }"
                                        ></el-cascader>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 30" label="擦除面积百分比下限">
                                        <el-input v-model="params_form[30].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 30" label="擦除面积百分比上限">
                                        <el-input v-model="params_form[30].p2"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 30" label="擦除区域横纵边长比">
                                        <el-input v-model="params_form[30].p3"></el-input>
                                    </el-form-item>

                                    <el-form-item v-if="this.form.method == 31" label="主图像权重">
                                        <el-input v-model="params_form[31].p1"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 31" label="目标图像长">
                                        <el-input v-model="params_form[31].p2" placeholder="选填"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="this.form.method == 31" label="目标图像宽">
                                        <el-input v-model="params_form[31].p3" placeholder="选填"></el-input>
                                    </el-form-item>

                                    <el-form-item label="参数说明">
                                        <el-input type="textarea" v-model="form.desc" autosize disabled></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">提交</el-button>
                                        <el-button>取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>

                            <el-tab-pane label="深度学习" name="second">
                                <el-form label-width="130px">
                                    <el-form-item label="选择方法">
                                        <el-cascader
                                            v-model="deeplearning_method_value"
                                            :options="deeplearning_options"
                                            @change="DLMethodHandleChange"
                                            :props="{ expandTrigger: 'hover' }"
                                        ></el-cascader>
                                    </el-form-item>

                                    <el-form
                                        v-if="this.deeplearning_method_value == -1"
                                        ref="dl_form_DCGAN"
                                        :model="dl_form_DCGAN"
                                        label-width="130px"
                                    >
                                        <el-form-item label="数据集路径" prop="data_path">
                                            <el-input v-model="dl_form_DCGAN.data_path"></el-input>
                                        </el-form-item>
                                        <el-form-item label="保存路径" prop="save_path">
                                            <el-input v-model="dl_form_DCGAN.save_path"></el-input>
                                        </el-form-item>

                                        <el-form-item label="epoch数量" prop="n_epoch">
                                            <div style="float: left; margin-right: 5px">
                                                <el-input v-model="dl_form_DCGAN.n_epoch"></el-input>
                                            </div>
                                            <div style="float: left; margin-right: 5px">
                                                <el-popover
                                                    placement="right-start"
                                                    title="epoch数量："
                                                    width="200"
                                                    trigger="hover"
                                                    content="训练网络时的epoch数量，数据集不同，最佳epoch数也不相同"
                                                    style="float: left"
                                                >
                                                    <i class="el-icon-info" slot="reference"></i>
                                                    <!-- <el-button slot="reference">hover 激活</el-button> -->
                                                </el-popover>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="生成图片的分辨率">
                                            <el-radio v-model="dl_form_DCGAN.img_size" label="64">64</el-radio>
                                            <el-radio v-model="dl_form_DCGAN.img_size" label="256">256</el-radio>
                                        </el-form-item>
                                        <el-form-item label="生成图片数量" prop="img_num">
                                            <el-input v-model="dl_form_DCGAN.img_num"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否使用已有模型">
                                            <div style="float: left; margin-right: 5px">
                                                <el-switch v-model="dl_form_DCGAN.use_model" active-text="是" inactive-text="否">
                                                </el-switch>
                                            </div>
                                            <div style="float: left">
                                                <el-popover
                                                    placement="right-start"
                                                    title="是否使用已有模型:"
                                                    width="200"
                                                    trigger="hover"
                                                    content="系统会保存每一类数据集在指定分辨率下最后一次训练的模型，可使用此模型继续训练或直接利用其生成更多图片，若False会重新训练网络，得出的模型会将原有模型覆盖"
                                                    style="float: left"
                                                >
                                                    <i class="el-icon-info" slot="reference"></i>
                                                    <!-- <el-button slot="reference">hover 激活</el-button> -->
                                                </el-popover>
                                            </div>

                                            <!-- <el-input v-model="dl_form_DCGAN.img_model"></el-input> -->
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit_DCGAN">提交</el-button>
                                        </el-form-item>
                                    </el-form>

                                    <el-form
                                        v-if="this.deeplearning_method_value == -2"
                                        ref="dl_form_CYCLEGAN"
                                        :model="dl_form_CYCLEGAN"
                                        label-width="130px"
                                    >
                                        <el-form-item label="数据集1路径">
                                            <el-input v-model="dl_form_CYCLEGAN.data_path1"></el-input>
                                        </el-form-item>
                                        <el-form-item label="数据集2路径">
                                            <el-input v-model="dl_form_CYCLEGAN.data_path2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="保存路径">
                                            <el-input v-model="dl_form_CYCLEGAN.save_path"></el-input>
                                        </el-form-item>

                                        <el-form-item label="epoch数量" prop="n_epoch">
                                            <div style="float: left; margin-right: 5px">
                                                <el-input v-model="dl_form_CYCLEGAN.n_epoch"></el-input>
                                            </div>
                                            <div style="float: left; margin-right: 5px">
                                                <el-popover
                                                    placement="right-start"
                                                    title="epoch数量："
                                                    width="200"
                                                    trigger="hover"
                                                    content="训练网络时的epoch数量，数据集不同，最佳epoch数也不相同"
                                                    style="float: left"
                                                >
                                                    <i class="el-icon-info" slot="reference"></i>
                                                    <!-- <el-button slot="reference">hover 激活</el-button> -->
                                                </el-popover>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="生成图片数量" prop="img_num">
                                            <el-input v-model="dl_form_CYCLEGAN.img_num"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否使用已有模型">
                                            <div style="float: left; margin-right: 5px">
                                                <el-switch v-model="dl_form_CYCLEGAN.use_model" active-text="是" inactive-text="否">
                                                </el-switch>
                                            </div>
                                            <div style="float: left">
                                                <el-popover
                                                    placement="right-start"
                                                    title="是否使用已有模型:"
                                                    width="200"
                                                    trigger="hover"
                                                    content="系统会保存每一类数据集在指定分辨率下最后一次训练的模型，可使用此模型继续训练或直接利用其生成更多图片，若False会重新训练网络，得出的模型会将原有模型覆盖"
                                                    style="float: left"
                                                >
                                                    <i class="el-icon-info" slot="reference"></i>
                                                    <!-- <el-button slot="reference">hover 激活</el-button> -->
                                                </el-popover>
                                            </div>

                                            <!-- <el-input v-model="dl_form_DCGAN.img_model"></el-input> -->
                                        </el-form-item>

                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit_CYCLEGAN">提交</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                    <el-col :span="10">
                        <div class="demo-image">
                            <div class="block" v-for="fit in fits" :key="fit">
                                <!-- <span class="demonstration">{{ fit }}</span> -->
                                <el-image style="width: 400px; height: 400px" :src="picture" :fit="fit"></el-image>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data() {
        return {
            form: {
                data_path: '',
                save_path: '',
                method: -1,
                desc: ''
            },
            activeName: 'first',
            method_value: [],
            method_options: [
                {
                    value: 'tjzs',
                    label: '添加噪声',
                    children: [
                        {
                            value: '0',
                            label: '高斯噪声'
                        },
                        {
                            value: '1',
                            label: '拉普拉斯噪声'
                        },
                        {
                            value: '2',
                            label: '泊松噪声'
                        },
                        {
                            value: '3',
                            label: '椒盐噪声'
                        },
                        {
                            value: '4',
                            label: '随机噪声'
                        },
                        {
                            value: '5',
                            label: '雾化'
                        }
                    ]
                },
                {
                    value: 'xxbh',
                    label: '线性变换',
                    children: [
                        {
                            value: '6',
                            label: '水平翻转'
                        },
                        {
                            value: '7',
                            label: '竖直翻转'
                        },
                        {
                            value: '8',
                            label: '平移'
                        },
                        {
                            value: '9',
                            label: '放缩'
                        },
                        {
                            value: '10',
                            label: '旋转'
                        },
                        {
                            value: '11',
                            label: '裁剪'
                        }
                    ]
                },
                {
                    value: 'scbh',
                    label: '色彩变化',
                    children: [
                        {
                            value: '12',
                            label: '像素通道删除'
                        },
                        {
                            value: '13',
                            label: '直方图均衡化'
                        },
                        {
                            value: '14',
                            label: '随机调整饱和度'
                        },
                        {
                            value: '15',
                            label: '随机调整对比度'
                        },
                        {
                            value: '16',
                            label: '随机调整亮度'
                        },
                        {
                            value: '17',
                            label: '随机调整锐度'
                        },
                        {
                            value: '18',
                            label: '像素反转'
                        }
                    ]
                },
                {
                    value: 'mhbh',
                    label: '模糊变化',
                    children: [
                        {
                            value: '19',
                            label: '中值模糊'
                        },
                        {
                            value: '20',
                            label: '双边模糊'
                        },
                        {
                            value: '21',
                            label: '均值模糊'
                        },
                        {
                            value: '22',
                            label: '高斯模糊'
                        },
                        {
                            value: '23',
                            label: '运动模糊'
                        }
                    ]
                },
                {
                    value: 'ch',
                    label: '池化',
                    children: [
                        {
                            value: '24',
                            label: '均值池化'
                        },
                        {
                            value: '25',
                            label: '最大值池化'
                        },
                        {
                            value: '26',
                            label: '最小值池化'
                        },
                        {
                            value: '27',
                            label: '中值池化'
                        }
                    ]
                },
                {
                    value: '28',
                    label: '通道处理'
                },
                {
                    value: '29',
                    label: '颜色空间变换'
                },
                {
                    value: '30',
                    label: '随机切除'
                },
                {
                    value: '31',
                    label: '图像合并'
                }
            ],
            color_value: ['0'],
            color_options: [
                {
                    value: '0',
                    label: '可选随机'
                },
                {
                    value: '1',
                    label: 'HSV'
                },
                {
                    value: '2',
                    label: 'Ycrcb'
                },
                {
                    value: '3',
                    label: 'HLS'
                }
            ],
            params_form: [
                // 0
                {
                    p1: 0,
                    p2: 0.05,
                    p3: 'None'
                },
                {
                    p1: 0,
                    p2: 0.01,
                    p3: 'None'
                },
                {
                    p1: 5,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 0.05,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 0.05,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 0.8,
                    p2: 0.05,
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 60,
                    p2: 60,
                    p3: 'None'
                },
                {
                    p1: 0.8,
                    p2: 0.8,
                    p3: 'None'
                },

                //10
                {
                    p1: 0,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 0.2,
                    p2: 0.2,
                    p3: 'None'
                },
                {
                    p1: 0.5,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 'None',
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 0,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 1,
                    p2: 'None',
                    p3: 'None'
                },

                // 20
                {
                    p1: 1,
                    p2: 20,
                    p3: 5
                },
                {
                    p1: 1,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1:1,
                    p2:1,
                    p3: 'None'
                },
                {
                    p1: 1,
                    p2: 'None',
                    p3: 'None'
                },
                {
                    p1: 2,
                    p2: 2,
                    p3: 'None'
                },
                {
                    p1: 2,
                    p2: 2,
                    p3: 'None'
                },
                {
                    p1: 2,
                    p2: 2,
                    p3: 'None'
                },
                {
                    p1: 2,
                    p2: 2,
                    p3: 'None'
                },
                {
                    p1: true,
                    p2: true,
                    p3: true
                },
                {
                    p1: 0,
                    p2: 'None',
                    p3: 'None'
                },

                // 30
                {
                    p1: 0.02,
                    p2: 0.4,
                    p3: 3
                },
                {
                    p1: 0.5,
                    p2: 'None',
                    p3: 'None'
                }
            ],
            info_form: [
                //0
                '在原图像中添加高斯噪声\n均值：高斯分布的均值\n方差：高斯分布的方差',
                '在原图像中添加拉普拉斯噪声\n均值：拉普拉斯分布的均值\n方差：拉普拉斯分布的方差',
                '在原图像中添加泊松噪声\n期望：泊松分布的期望',
                '在原图像中添加椒盐噪声\n噪声像素百分比：噪声像素在原图所有像素的占比',
                '在原图像中添加随机噪声点（随机像素点颜色改变）\n噪声像素百分比：噪声像素在原图所有像素的占比\n噪声像素颜色：RGB值，范围为0-255 若为None表示随机值',
                '在原图像中添加雾化效果\n亮度：雾化明亮程度\n浓度：雾化效果大小',
                '图片水平翻转',
                '图片竖直翻转',
                '图片平移\nXY为横纵坐标移动量，右上为正方向，可为负数',
                '图片放缩\n横向纵向比例：目标图像长宽与原图长宽的',

                // 10
                '图片旋转\nAngle：旋转角度\nx y：旋转中心，默认None表示绕图片中心旋转',
                '图片放缩\n横向纵向裁剪比：横向纵向删除的最大比例',
                '从图像中随机选择像素，将其RGB中某通道删除\n变换像素百分比：处理像素占所有像素的比例',
                '对图像进行直方图均衡化处理',
                '随机调整图像饱和度',
                '随机调整图像对比度',
                '随机调整图像锐度',
                '随机调整图像的锐度，突出、加强图像中景物的边缘和轮廓',
                '将图像中高于设定阈值的所有像素值反转。\n阈值：最小待处理像素值',
                '对每个像素采用周围像素中值代替\n模板半径：中心像素与周围像素棋盘距离最大值，默认为1表示核为3*3',

                // 20
                '一种非线性的滤波方法，是结合图像的空间邻近度和像素值相似度的一种折衷处理，同时考虑空域信息和灰度相似性\n模板半径：中心至邻域边界的距离，默认为1表示3*3。可为负数，此时根据space参数计算新值\n灰度相似性方差：数值越大，像素邻域内有更宽广的颜色会被混合。\n坐标空间标注方差：数值越大，越远的像素会相互影响',
                '对每个像素采用周围像素均值代替\n模板半径：中心像素与周围像素棋盘距离最大值，默认为1表示核为3*3',
                '图像与正态分布做卷积\n模板半径：中心像素与周围像素棋盘距离最大值，默认为1表示核为3*3\n方差：高斯分布的方差',
                '在已知模糊运动核的前提下，通过核线性卷积的形式对图像添加运动模糊\n模板半径：中心像素与周围像素棋盘距离最大值，默认为1表示核为3*3',
                '选择图像区域中的平均值作为该区域池化以后的值。\n池化窗口长、宽：池化窗口的尺寸',
                '选择图像区域中的最大值作为该区域池化以后的值。\n池化窗口长、宽：池化窗口的尺寸',
                '选择图像区域中的最小值作为该区域池化以后的值。\n池化窗口长、宽：池化窗口的尺寸',
                '选择的图像区域中的中值作为该区域池化以后的值。\n池化窗口长、宽：池化窗口的尺寸',
                '将未选中的颜色通道置0\nRGB信息：表示通道选择信息，默认1表示选中',
                '改变图片颜色空间\n颜色空间：可选随机、HSV、Ycrcb、HLS（对应0-3）默认为随机',

                // 30
                '随机选取一定大小的区域，对其中所有像素仅保留单通道\n擦除面积百分比范围：随机的擦除区域的面积占比最小和最大值\n擦除区域横纵边长比：随机矩形区域的形状限制，横纵边长比默认3:1，范围在1/3~3 之间',
                '将两张图片按照各自权重混合，标签继承自主图像\n主图像权重：主图像的权值，必定大于50%\n目标图像长、宽：结果图的尺寸'
            ],
            show_info: '',
            deeplearning_method_value: '-1',
            deeplearning_options: [
                {
                    value: '-1',
                    label: 'DCGAN'
                },
                {
                    value: '-2',
                    label: '风格迁移'
                }
            ],
            dl_form_DCGAN: {
                data_path: '',
                save_path: '',
                n_epoch: 1,
                img_size: '64',
                img_num: 1,
                use_model: true
            },
            dl_form_CYCLEGAN: {
                data_path1: '',
                data_path1: '',
                save_path: '',
                n_epoch: 1,
                img_num: 1,
                use_model: true
            },
            fits: ['contain'],
            url: null,
            picture: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            // DCGAN_FormRules: {
            //     data_path: [
            //         { required: true, message: '生成方法不可为空', trigger: 'blur' },
            //         { required: true, message: '生成方法不可为空', trigger: 'blur' }
            //         ],
            //     save_path: [{ required: true, message: '生成方法不可为空', trigger: 'blur' }],
            //     n_epoch: [{ required: true, message: '生成方法不可为空', trigger: 'blur' }],
            //     img_num: [{ required: true, message: '生成方法不可为空', trigger: 'blur' }]
            // }
        };
    },
    methods: {
        // 提交函数1
        async onSubmit() {
            console.log('submit!');
            if (this.form.method === -1) {
                return this.$message.error('请选择方法！');
            }
            // console.log('params:', this.params_form[this.form.method]);
            var final_form = this.params_form[this.form.method];
            console.log('this.form.method:', this.form.method);
            console.log('final_form1:', final_form);
            console.log('length:', Object.keys(final_form).length);

            for (var i in final_form) {
                console.log(i, final_form[i]);
                if (final_form[i] === '') {
                    // 如果键值对的值为空串
                    if (i !== 'W' && i !== 'H' && i !== 'x' && i !== 'y' && i !== 'noise_color') {
                        return this.$message.error('传入参数格式非法，请重新填写！');
                    } else {
                        final_form[i] = 'None';
                    }

                }
            }
            //     } else if (typeof final_form[i] !== 'number' && isNaN(final_form[i])) {
            //         for (var i in final_form) {
            //             if (final_form[i] === 'None') {
            //                 final_form[i] = '';
            //             }
            //         }
            //         return this.$message.error('传入参数格式非法，请重新填写！');
            //     } else if (final_form[i] < 0) {
            //         return this.$message.error('传入参数格式非法，请重新填写！');
            //     }
            // }
            // if (this.form.data_path === '' || this.form.save_path === '') {
            //     return this.$message.error('传入参数格式非法，请重新填写！');
            // }
            // final_form['data_path'] = this.form.data_path;
            // final_form['save_path'] = this.form.save_path;
            // for (var i in final_form) {
            //     if (typeof final_form[i] === 'number' && !isNaN(final_form[i])) {
            //         final_form[i] = final_form[i] + '';
            //     }
            // }
            for (var i in final_form) {
                if (typeof final_form[i] === 'number' && !isNaN(final_form[i])) {
                    final_form[i] = final_form[i] + '';
                }
            }
            if (this.form.data_path === '' || this.form.save_path === '') {
                return this.$message.error('请将路径填写完整！');
            }
            final_form['data_path'] = this.form.data_path;
            final_form['save_path'] = this.form.save_path;
            final_form['method_point'] = this.form.method;

            console.log('final_form2:', final_form);
            //console.log('axios.defaults.baseURL:', this.$http.defaults.baseURL);
            this.$http.defaults.baseURL = 'http://127.0.0.1/';
            console.log('axios.defaults.baseURL:', this.$http.defaults.baseURL);
            //var temp = {};
            //temp['data_path'] = this.form.data_path;
            //temp['save_path'] = this.form.save_path;
            //temp['method_point'] = this.form.method;
            //temp['p1'] = '0';
            //temp['p2'] = '0.05';
            //temp['p3'] = 'None';
            const { data: data } = await this.$http({
                        url: '/sales/orders1/',
                        data: final_form,
                        method: 'post',
                        responseType: 'blob'
                    });
            let blob = new Blob( [data], {type: 'image/png'})
            this.picture = window.URL.createObjectURL(blob);
            console.log("url:", url);
            // document.getElementById('qrCodeImage').src = url;



            console.log('data:', data);
            // var src = data;//这里也是关键,调用window的这个方法URL方法
            // const src = window.URL.createObjectURL(data);
            // this.picture = src;
            // axios.defaults.baseURL = protocol + "//" + host  +":5000";

            console.log('已发送请求');
            for (var i in final_form) {
                if (final_form[i] === 'None') {
                   final_form[i] = '';
                }
            }
        },
        // 改变级联时处理函数
        methodHandleChange(method_value) {
            console.log('method_value:', method_value);
            this.form.method = method_value[method_value.length - 1];
            console.log('this.form.method:', this.form.method);
            this.form.desc = this.info_form[this.form.method];
        },
        // 改变颜色空间时处理函数
        colorHandleChange(color_value) {
            console.log('color_value:', color_value);
            this.params_form[29].p1 = color_value[color_value.length - 1];
            console.log('point:', this.params_form[29].p1);
        },
        DLMethodHandleChange(deeplearning_method_value) {
            console.log('deeplearning_method_value:', deeplearning_method_value);
            this.deeplearning_method = deeplearning_method_value[deeplearning_method_value.length - 1];
            console.log('this.deeplearning_method:', this.deeplearning_method);
            this.form.desc = this.info_form[this.deeplearning_method];
        },
        onSubmit_DCGAN() {
            console.log('this.dl_form_DCGAN:', this.dl_form_DCGAN);
            if (this.dl_form_DCGAN.data_path === '' || this.dl_form_DCGAN.save_path === '') {
                return this.$message.error('请将路径填写完整！');
            }

            // if (
            //     typeof this.dl_form_DCGAN.n_epoch !== 'number' ||
            //     isNaN(this.dl_form_DCGAN.n_epoch) ||
            //     typeof this.dl_form_DCGAN.img_num !== 'number' ||
            //     isNaN(this.dl_form_DCGAN.img_num)
            // ) {
            //     return this.$message.error('传入参数格式非法，请重新填写！');
            // }
        },
        onSubmit_CYCLEGAN() {
            console.log('this.dl_form_CYCLEGAN:', this.dl_form_CYCLEGAN);
            if (
                this.dl_form_CYCLEGAN.data_path1 === '' ||
                this.dl_form_CYCLEGAN.data_path2 === '' ||
                this.dl_form_CYCLEGAN.save_path === ''
            ) {
                return this.$message.error('请将路径填写完整！');
            }
            for (var i in this.dl_form_CYCLEGAN) {
                if (typeof this.dl_form_CYCLEGAN[i] === 'number' && !isNaN(this.dl_form_CYCLEGAN[i])) {
                    this.dl_form_CYCLEGAN[i] = this.dl_form_CYCLEGAN[i] + '';
                }
            }
            // if (
            //     typeof this.dl_form_DCGAN.n_epoch !== 'number' ||
            //     isNaN(this.dl_form_DCGAN.n_epoch) ||
            //     typeof this.dl_form_DCGAN.img_num !== 'number' ||
            //     isNaN(this.dl_form_DCGAN.img_num)
            // ) {
            //     return this.$message.error('传入参数格式非法，请重新填写！');
            // }
        }
    },
    mounted() {},
    created() {}
};
</script>

<style scoped>
.marginRight {
    margin-right: 10px !important;
}
</style>
