<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-magic-stick"></i> 激光雷达数据 </el-breadcrumb-item>
                <el-breadcrumb-item>添加生成任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :model="form" :rules="rulesList" label-width="120px">
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入任务名称"></el-input>
                    </el-form-item>

                    <el-form-item label="任务类型" prop="augmentation_method">
                        <!-- 一级下拉列表 -->
                        <!-- <el-select
                            v-model="form.augmentation_type"
                            placeholder="请选择生成类型"
                            @change="typeChanged"
                            class="marginRight"
                            prop="augmentation_type"
                        >
                            <el-option v-for="item in this.typeList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
                        </el-select> -->

                        <!-- 二级下拉列表 -->
                        <el-select v-model="form.augmentation_method" placeholder="请选择生成方法" @change="methodChanged">
                            <el-option v-for="item in this.methods" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="原点云序号" v-if="params_id == 1 || params_id == 2 || params_id == 3" prop="aug_index">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="text" v-model="form.aug_index" placeholder="请输入原点云序号(0~7480)"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="原点云序号:"
                                width="210"
                                trigger="hover"
                                content="选取KITTI数据集中序列为0~7480的任一点云进行扩增"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item label="生成卡车类型" v-if="params_id == 1" prop="aug_object_Truck">
                        <div style="float: left; margin-right: 5px">
                            <el-select v-model="form.aug_object_Truck" placeholder="请选择生成卡车类型">
                                <el-option v-for="item in truck_options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="生成卡车类型:"
                                width="200"
                                trigger="hover"
                                content="选择不同的卡车型号作为扩增物体。不同卡车对应物体长宽高、点云数、形状均不同，目前提供三种卡车型号"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item label="生成卡车数量" v-if="params_id == 1" prop="aug_count_Truck">
                        <el-input type="text" v-model="form.aug_count_Truck" placeholder="请输入生成卡车数量"></el-input>
                    </el-form-item>

                    <el-form-item label="生成轿车类型" v-if="params_id == 1" prop="aug_object_Car">
                        <div style="float: left; margin-right: 5px">
                            <el-select v-model="form.aug_object_Car" placeholder="请选择生成轿车类型">
                                <el-option v-for="item in car_options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="生成轿车类型:"
                                width="200"
                                trigger="hover"
                                content="选择不同的轿车型号作为扩增物体。不同轿车对应物体长宽高、点云数、形状均不同，目前仅提供一种轿车型号"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item label="生成轿车数量" v-if="params_id == 1" prop="aug_count_Car">
                        <el-input type="text" v-model="form.aug_count_Car" placeholder="请输入生成轿车数量"></el-input>
                    </el-form-item>

                    <el-form-item label="生成自行车类型" v-if="params_id == 1" prop="aug_object_Cyclist">
                        <div style="float: left; margin-right: 5px">
                            <el-select v-model="form.aug_object_Cyclist" placeholder="请选择生成自行车类型">
                                <el-option v-for="item in cyclist_options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="生成自行车类型:"
                                width="200"
                                trigger="hover"
                                content="选择不同的自行车型号作为扩增物体。不同自行车对应物体长宽高、点云数、形状均不同，目前提供两种自行车型号"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item label="生成自行车数量" v-if="params_id == 1" prop="aug_count_Cyclist">
                        <el-input type="text" v-model="form.aug_count_Cyclist" placeholder="请输入生成自行车数量"></el-input>
                    </el-form-item>

                    <el-form-item label="物体旋转角度" v-if="params_id == 2" prop="angle">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.angle" placeholder="请输入物体旋转角度(-180~180)"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="物体旋转角度:"
                                width="200"
                                trigger="hover"
                                content="对场景中标签所含的所有物体进行旋转角度的选择"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 3" label="是否加入卡车">
                        <div style="float: left; margin-right: 5px">
                            <el-switch v-model="form.aug_Truck" active-text="是" inactive-text="否"> </el-switch>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="是否加入卡车:"
                                width="210"
                                trigger="hover"
                                content="选择生成的极端场景中是否包含大量卡车"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 3" label="是否加入轿车">
                        <div style="float: left; margin-right: 5px">
                            <el-switch v-model="form.aug_Car" active-text="是" inactive-text="否"> </el-switch>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="是否加入轿车:"
                                width="210"
                                trigger="hover"
                                content="选择生成的极端场景中是否包含大量轿车"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 3" label="是否加入自行车">
                        <div style="float: left; margin-right: 5px">
                            <el-switch v-model="form.aug_Cyclist" active-text="是" inactive-text="否"> </el-switch>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="是否加入自行车:"
                                width="210"
                                trigger="hover"
                                content="选择生成的极端场景中是否包含大量自行车"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" :disabled="is_available_to_submit" @click="onSubmit">表单提交</el-button>
                    </el-form-item>
                </el-form>
                <!-- <el-button type="primary" @click="test_db">数据库测试</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    name: 'baseform',
    inject: ['reload'],
    data() {
        const isNotNag_int = (rule, value, callback) => {
            // const reg = /^\-\d\.?\d*$/
            // const boolean = reg.test(value)
            const boolean = new RegExp('^[1-9][0-9]*$').test(value); // console.log(boolean)
            if (value !== '0' && !boolean) {
                callback(new Error('请输入非负整数'));
            } else {
                callback();
            }
        };
        const aug_index_rule = (rule, value, callback) => {
            if (value < 0 || value > 7480) {
                callback(new Error('只能为0~7480整数'));
            } else {
                callback();
            }
        };
        const isNum = (rule, value, callback) => {
            const age = /^[0-9]*$/;
            if (!age.test(value)) {
                callback(new Error('只能为非负数字'));
            } else {
                callback();
            }
        };
        const isNotNag = (rule, value, callback) => {
            if (value < 0) {
                callback(new Error('只能为非负数'));
            } else {
                callback();
            }
        };
        const epsilonRule = (rule, value, callback) => {
            var list = value.split(',');
            // console.log('list:', list);
            for (var i in list) {
                // console.log('list[i]:', list[i]);
                if (!typeof parseFloat(list[i]) === 'number' && !isNaN(parseFloat(list[i])) && parseFloat(list[i]) < 0) {
                    callback(new Error('请填写合理的非负数字列表'));
                } else {
                    callback();
                }
            }
        };
        const angle_rule = (rule, value, callback) => {
            console.log('angle_rule:', value);
            if (value < -180 || value > 180) {
                callback(new Error('只能为-180~180的数字'));
            } else {
                callback();
            }
        };

        return {
            form: {
                name: '',
                augmentation_method: null,
                aug_index: null,
                aug_object_Car: '1',
                aug_count_Car: null,
                aug_object_Truck: '1',
                aug_count_Truck: null,
                aug_object_Cyclist: '1',
                aug_count_Cyclist: null,

                angle: null,

                aug_Car: true,
                aug_Truck: true,
                aug_Cyclist: true,
                master: this.$store.state.userId
            },
            // loadingMethod: false,
            methods: [
                {
                    id: 1,
                    name: '添加点云物体'
                },
                {
                    id: 2,
                    name: '旋转点云物体'
                },
                {
                    id: 3,
                    name: '极端场景生成'
                }
            ],
            fileList: [],
            typeList: [],
            params_id: 0,
            is_available_to_submit: true,
            truck_options: [
                {
                    value: '1',
                    label: '类型1'
                },
                {
                    value: '2',
                    label: '类型2'
                },
                {
                    value: '3',
                    label: '类型3'
                }
            ],
            car_options: [
                {
                    value: '1',
                    label: '类型1'
                }
            ],
            cyclist_options: [
                {
                    value: '1',
                    label: '类型1'
                },
                {
                    value: '2',
                    label: '类型2'
                }
            ],
            rules1: {
                aug_index: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: aug_index_rule, trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ],
                aug_count_Car: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ],
                aug_count_Truck: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ],
                aug_count_Cyclist: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ]
            },
            rules2: {
                aug_index: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: aug_index_rule, trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ],
                angle: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '请输入正确格式,可保留两位小数'
                    },
                    { validator: angle_rule, trigger: 'blur' }
                ]
            }
            // rules3: {
            //     augmentation_method: [{ required: true, message: '不能为空', trigger: 'change' }],
            //     ite_epsilon3: [
            //         { required: true, message: '请输入数字', trigger: 'blur' },
            //         { validator: isNotNag, trigger: 'blur' }
            //     ],
            //     ite_limit: [
            //         { required: true, message: '请输入数字', trigger: 'blur' },
            //         { validator: isNum, trigger: 'blur' }
            //     ],
            //     generate_per_file: [
            //         { required: true, message: '请输入数字', trigger: 'blur' },
            //         { validator: generate_per_file_and_paramsRule, trigger: 'blur' },
            //         { validator: isNum, trigger: 'blur' }
            //     ],
            //     boundary_constraint: [
            //         { required: true, message: '请输入数字', trigger: 'blur' },
            //         { validator: isNotNag, trigger: 'blur' }
            //     ]
            // }
        };
    },
    computed: {
        rulesList: function() {
            if (this.params_id === 1) {
                return this.rules1;
            } else if (this.params_id === 2) {
                return this.rules2;
            } else {
                return this.rules3;
            }
        }
    },
    methods: {
        // 发送添加任务申请
        trim(str) {
            //删除左右两端的空格
            return str.replace(/(^s*)|(s*$)/g, '');
        },
        async test_db() {
            var temp = this.$http.defaults.baseURL;
            console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
            this.$http.defaults.baseURL = 'http://127.0.0.1:8082/augment/';
            console.log('this.$http.defaults.baseURL2:', this.$http.defaults.baseURL);
            const { data: data } = await this.$http({
                url: 'db_search_test/',
                method: 'get'
            });
            this.$http.defaults.baseURL = temp;
            console.log('data:', data);
        },
        async onSubmit() {
            console.log('进入提交');
            console.log('this.params_id:', this.params_id);
            console.log('this.rulesList:', this.rulesList);
            console.log('this.form:', this.form);
            this.form.master = this.$store.state.userId;
            this.$refs.formRef.validate(async valid => {
                console.log('开始预验证');
                console.log(this.rulesList);
                // console.log('正在预验证');
                // console.log('验证结果：', valid);
                if (valid) {
                    console.log('完成预验证');
                    if (this.form.augmentation_method === '') {
                        return this.$message.error('请选择生成方法!');
                    }
                    // if (this.form.name === '') {
                    //     return this.$message.error('生成任务名不能为空!');
                    // }
                    console.log('通过预验证');
                    console.log('this.form:', this.form);
                    var url_temp = '';
                    if (this.form.augmentation_method === 1) {
                        // console.log('this.form.epsilon.split():', this.form.params.epsilon.split(','));
                        url_temp =
                            'add_object/?master=' +
                            this.form.master +
                            '&name=' +
                            this.form.name +
                            '&aug_index=' +
                            this.form.aug_index +
                            '&aug_object_Car=' +
                            this.form.aug_object_Car +
                            '&aug_count_Car=' +
                            this.form.aug_count_Car +
                            '&aug_object_Truck=' +
                            this.form.aug_object_Truck +
                            '&aug_count_Truck=' +
                            this.form.aug_count_Truck +
                            '&aug_object_Cyclist=' +
                            this.form.aug_object_Cyclist +
                            '&aug_count_Cyclist=' +
                            this.form.aug_count_Cyclist;
                    } else if (this.form.augmentation_method === 2) {
                        url_temp =
                            'rotate_object/?master=' +
                            this.form.master +
                            '&name=' +
                            this.form.name +
                            '&aug_index=' +
                            this.form.aug_index +
                            '&angle=' +
                            this.form.angle;
                    } else if (this.form.augmentation_method === 3) {
                        url_temp =
                            'extreme_scenes/?master=' +
                            this.form.master +
                            '&name=' +
                            this.form.name +
                            '&aug_index=' +
                            this.form.aug_index +
                            '&aug_Car=' +
                            this.form.aug_Car +
                            '&aug_Truck=' +
                            this.form.aug_Truck +
                            '&aug_Cyclist=' +
                            this.form.aug_Cyclist;
                    }

                    console.log('this.form:', this.form);
                    var temp = this.$http.defaults.baseURL;
                    console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
                    this.$http.defaults.baseURL = 'http://127.0.0.1:8082/augment/';
                    console.log('this.$http.defaults.baseURL2:', this.$http.defaults.baseURL);
                    // const { data: data } = await this.$http({
                    //     url: url_temp,
                    //     method: 'get'
                    // });
                    // this.$http.defaults.baseURL = temp;

                    // // const { data: data } = await this.$http.post('/task/', qs.stringify(this.form));
                    // if (data.code !== 20000) {
                    //     console.log(data.code);
                    //     console.log(data.msg);
                    //     return this.$message.error('添加生成任务失败！' + '错误原因：' + data.msg);
                    // }
                    const { data: data } = this.$http({
                        url: url_temp,
                        method: 'get'
                    });
                    this.$http.defaults.baseURL = temp;

                    // const { data: data } = await this.$http.post('/task/', qs.stringify(this.form));
                    setTimeout(() => {
                        console.log('提交中');
                        this.$message.success('提交成功！');
                        this.reload();
                    }, 2000);
                    // console.log('adddata:');
                    // console.log(adddata);
                    // console.log('document.getElementById("filetemp").files', document.getElementById('filetemp').files);
                    // console.log('document.getElementById("filetemp").files[0]', document.getElementById('filetemp').files[0]);

                    // 重置表单
                }
            });

            // if (this.form.augmentation_method === '') {
            //     return this.$message.error('请选择生成方法!');
            // }
            // // if (this.form.name === '') {
            // //     return this.$message.error('生成任务名不能为空!');
            // // }
            // console.log('通过预验证');
            // console.log('this.form:', this.form);
            // var url_temp = '';
            // if (this.form.augmentation_method === 1) {
            //     // console.log('this.form.epsilon.split():', this.form.params.epsilon.split(','));
            //     url_temp = 'add_object/';
            // } else if (this.form.augmentation_method === 2) {
            //     url_temp = 'rotate_object/';
            // } else if (this.form.augmentation_method === 3) {
            //     url_temp = 'extreme_scenes/';
            // }
            // console.log('this.form:', this.form);
            // var temp = this.$http.defaults.baseURL;
            // console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
            // this.$http.defaults.baseURL = 'http://127.0.0.1:8082/augment/';
            // console.log('this.$http.defaults.baseURL2:', this.$http.defaults.baseURL);
            // const { data: data } = await this.$http({
            //     url:
            //         url_temp +
            //         '?master=' +
            //         this.form.master +
            //         '&name=' +
            //         this.form.name +
            //         '&aug_index=' +
            //         this.form.aug_index +
            //         '&aug_object_Car=' +
            //         this.form.aug_object_Car +
            //         '&aug_count_Car=' +
            //         this.form.aug_count_Car +
            //         '&aug_object_Truck=' +
            //         this.form.aug_object_Truck +
            //         '&aug_count_Truck=' +
            //         this.form.aug_count_Truck +
            //         '&aug_object_Cyclist=' +
            //         this.form.aug_object_Cyclist +
            //         '&aug_count_Cyclist=' +
            //         this.form.aug_count_Cyclist,
            //     method: 'get'
            // });
            // this.$http.defaults.baseURL = temp;
            // // const { data: data } = await this.$http.post('/task/', qs.stringify(this.form));
            // if (data.code !== 20000) {
            //     console.log(data.code);
            //     console.log(data.msg);
            //     return this.$message.error('添加生成任务失败！' + '错误原因：' + data.msg);
            // }
            // // console.log('adddata:');
            // // console.log(adddata);
            // // console.log('document.getElementById("filetemp").files', document.getElementById('filetemp').files);
            // // console.log('document.getElementById("filetemp").files[0]', document.getElementById('filetemp').files[0]);
            // this.$message.success('提交成功！');
            // // 重置表单

            // this.reload();
        },
        async methodChanged(method_id) {
            console.log('method_id:', method_id);
            this.params_id = method_id;
            this.form.augmentation_method = this.params_id;
            console.log('this.form.augmentation_method:', this.form.augmentation_method);
            this.is_available_to_submit = false;
        },

        clickLoad() {
            this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
        },
        // 更新/获取生成类型列表数据的方法
        async getTypeList() {
            const { data: data } = await this.$http.get('/augmentation_type/');
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取任务列表失败！');
            }
            console.log(data.data);
            //   数据获取成功，保存数据到this中
            this.typeList = data.data;
            // console.log('data.data.details:');
            // console.log(data.data.details);
            // console.log('this.typeList:');
            // console.log(this.typeList);
            // console.log('this.total:' + this.total);
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
