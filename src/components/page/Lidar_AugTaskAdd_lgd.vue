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
                        <el-input v-model="form.name"></el-input>
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
                    <el-form-item v-if="params_id == 1 || params_id == 2 || params_id == 3" label="紧急等级" prop="urgency_level">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="text" v-model="form.urgency_level"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="紧急等级:"
                                width="200"
                                trigger="hover"
                                content="任务的紧急程度，系统会根据紧急等级对任务进行调度"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="params_id == 1" label="扰动幅度" prop="epsilon">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="text" v-model="form.epsilon"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="扰动幅度:"
                                width="200"
                                trigger="hover"
                                content="表示攻击中对点云参数的扰动值(此处可以','间隔输入多个数字)"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="params_id == 2" label="单步扰动幅度" prop="ite_epsilon2">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.ite_epsilon2"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="单步扰动幅度:"
                                width="200"
                                trigger="hover"
                                content="表示迭代攻击中每步对点云参数的扰动值"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="params_id == 3" label="单步扰动幅度" prop="ite_epsilon3">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.ite_epsilon3"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="单步扰动幅度:"
                                width="200"
                                trigger="hover"
                                content="表示迭代攻击中每步对点云参数的扰动值"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="params_id == 2 || params_id == 3" label="扰动次数上限" prop="ite_limit">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.ite_limit"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="扰动次数上限:"
                                width="200"
                                trigger="hover"
                                content="表示可对点云单步扰动的最大次数"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="params_id == 1 || params_id == 2 || params_id == 3" label="是否旋转">
                        <div style="float: left; margin-right: 5px">
                            <el-switch v-model="form.whether_to_rotate" active-text="是" inactive-text="否"> </el-switch>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="是否旋转:"
                                width="200"
                                trigger="hover"
                                content="表示是否允许点云旋转"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 1" label="单文件生成数量及参数" prop="generate_per_file_and_params">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.generate_per_file_and_params"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="单文件生成数量及参数:"
                                width="200"
                                trigger="hover"
                                content="表示每个参数及点云所期望生成的点云数量"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 2 || params_id == 3" label="单文件生成数量" prop="generate_per_file">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.generate_per_file"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="单文件生成数量:"
                                width="200"
                                trigger="hover"
                                content="表示每个文件所期望的扩增数量"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 3" label="边界约束" prop="boundary_constraint">
                        <div style="float: left; margin-right: 5px">
                            <el-input type="number" v-model="form.boundary_constraint"></el-input>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="边界约束:"
                                width="200"
                                trigger="hover"
                                content="表示点云能扰动的最大比例"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 1 || params_id == 2 || params_id == 3" label="严格模式">
                        <div style="float: left; margin-right: 5px">
                            <el-switch v-model="form.strict_mode" active-text="是" inactive-text="否"> </el-switch>
                        </div>
                        <div style="float: left">
                            <el-popover
                                placement="right-start"
                                title="严格模式:"
                                width="200"
                                trigger="hover"
                                content="表示是否是严格模式(1代表是，表示生成结果必须使得模型做出错误判断才算扩增数据，0代表否，表示直接经过参数设定生成的数据即视为扩增数据)"
                                style="float: left"
                            >
                                <i class="el-icon-info" slot="reference"></i>
                                <!-- <el-button slot="reference">hover 激活</el-button> -->
                            </el-popover>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="params_id == 1 || params_id == 2 || params_id == 3" label="上传文件">
                        <input type="file" id="filetemp" prop="form.file" ref="pathClear" /><br />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" :disabled="is_available_to_submit" @click="onSubmit">表单提交</el-button>
                    </el-form-item>
                </el-form>
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
        const generate_per_file_and_paramsRule = (rule, value, callback) => {
            if (value < 1) {
                callback(new Error('只能为大于等于1整数'));
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

        // var checkMethod = (rule, value, callback) => {
        //     console.log('method:' + value);
        //     if (value === '') {
        //         return callback(new Error('生成方法不能为空'));
        //     }
        // };
        return {
            form: {
                name: '',
                augmentation_method: null,
                // params: {
                //     // 这个数组参数先用string接收，发送或校验时化为数组 —— string.split(',');
                //     epsilon: '',
                //     ite_epsilon2: null,
                //     ite_epsilon3: null,
                //     ite_limit: null,
                //     whether_to_rotate: false,
                //     generate_per_file_and_params: null,
                //     generate_per_file: null,
                //     boundary_constraint: null,
                //     strict_mode: false
                // },
                epsilon: '',
                ite_epsilon2: null,
                ite_epsilon3: null,
                ite_limit: null,
                whether_to_rotate: false,
                generate_per_file_and_params: null,
                generate_per_file: null,
                boundary_constraint: null,
                strict_mode: false,
                master: this.$store.state.userId,
                urgency_level: '0',
                file: {}
            },
            // loadingMethod: false,
            methods: [],
            fileList: [],
            typeList: [],
            params_id: 0,
            is_available_to_submit: true,
            rules1: {
                augmentation_method: [{ required: true, message: '不能为空', trigger: 'change' }],
                epsilon: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: epsilonRule, trigger: 'blur' }
                ],
                generate_per_file_and_params: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: generate_per_file_and_paramsRule, trigger: 'blur' },
                    { validator: isNum, trigger: 'blur' }
                ],
                urgency_level: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNotNag_int, trigger: 'blur' }
                ]
            },
            rules2: {
                augmentation_method: [{ required: true, message: '不能为空', trigger: 'change' }],
                ite_epsilon2: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNotNag, trigger: 'blur' }
                ],
                ite_limit: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNum, trigger: 'blur' }
                ],
                generate_per_file: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: generate_per_file_and_paramsRule, trigger: 'blur' },
                    { validator: isNum, trigger: 'blur' }
                ]
            },
            rules3: {
                augmentation_method: [{ required: true, message: '不能为空', trigger: 'change' }],
                ite_epsilon3: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNotNag, trigger: 'blur' }
                ],
                ite_limit: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNum, trigger: 'blur' }
                ],
                generate_per_file: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: generate_per_file_and_paramsRule, trigger: 'blur' },
                    { validator: isNum, trigger: 'blur' }
                ],
                boundary_constraint: [
                    { required: true, message: '请输入数字', trigger: 'blur' },
                    { validator: isNotNag, trigger: 'blur' }
                ]
            }
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

        onSubmit() {
            (this.form.master = this.$store.state.userId),
                this.$refs.formRef.validate(async valid => {
                    console.log(this.rulesList);
                    // console.log('正在预验证');
                    // console.log('验证结果：', valid);
                    if (valid) {
                        if (this.form.augmentation_method === '') {
                            return this.$message.error('请选择生成方法!');
                        }
                        // if (this.form.name === '') {
                        //     return this.$message.error('生成任务名不能为空!');
                        // }
                        console.log('通过预验证');
                        console.log('this.form:', this.form);
                        var adddata = new FormData();
                        if (this.form.name) {
                            adddata.append('name', this.form.name);
                        }
                        adddata.append('augmentation_method', this.form.augmentation_method);
                        adddata.append('master', this.form.master);
                        adddata.append('urgency_level', this.form.urgency_level);
                        // if (this.form.params) {
                        //     adddata.append('params', this.form.params);
                        // }
                        // params参数调整》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》。
                        var temp_params = {};
                        if (this.form.augmentation_method === 1) {
                            // console.log('this.form.epsilon.split():', this.form.params.epsilon.split(','));
                            temp_params = {
                                epsilon: '[' + this.form.epsilon + ']',
                                whether_to_rotate: this.form.whether_to_rotate,
                                generate_per_file_and_params: this.form.generate_per_file_and_params,
                                strict_mode: this.form.strict_mode
                            };
                            // for (var i in temp_params.epsilon) {
                            //     temp_params.epsilon[i] = parseFloat(this.trim(temp_params.epsilon[i]));
                            // }
                        } else if (this.form.augmentation_method === 2) {
                            temp_params = {
                                ite_epsilon: this.form.ite_epsilon2,
                                ite_limit: this.form.ite_limit,
                                whether_to_rotate: this.form.whether_to_rotate,
                                generate_per_file: this.form.generate_per_file,
                                strict_mode: this.form.strict_mode
                            };
                        } else if (this.form.augmentation_method === 3) {
                            temp_params = {
                                ite_epsilon: this.form.ite_epsilon3,
                                ite_limit: this.form.ite_limit,
                                whether_to_rotate: this.form.whether_to_rotate,
                                generate_per_file: this.form.generate_per_file,
                                boundary_constraint: this.form.boundary_constraint,
                                strict_mode: this.form.strict_mode
                            };
                        }
                        temp_params.whether_to_rotate = this.form.whether_to_rotate ? '1' : '0';
                        temp_params.strict_mode = this.form.strict_mode ? '1' : '0';
                        console.log('temp_params:', temp_params);
                        temp_params = JSON.stringify(temp_params);
                        adddata.append('params', temp_params);

                        // console.log('document.getElementById("filetemp")', document.getElementById('filetemp').file);

                        // console.log(this.form.file);
                        // if (document.getElementById('filetemp').file) {
                        //     this.form.file = document.getElementById('filetemp').files[0];
                        //     adddata.append('file', this.form.file);
                        // }

                        this.form.file = document.getElementById('filetemp').files[0];
                        console.log('this.form.file:', this.form.file);
                        if (this.form.file) {
                            adddata.append('file', this.form.file);
                        } else {
                            return this.$message.error('请上传文件！');
                        }

                        console.log('adddata:', adddata);
                        for (var [a, b] of adddata.entries()) {
                            console.log(a, b);
                        }

                        // console.log('this.form:', this.form);

                        const { data: data } = await this.$http({
                            url: '/task/',
                            data: adddata,
                            method: 'post'
                        });
                        // const { data: data } = await this.$http.post('/task/', qs.stringify(this.form));
                        if (data.code !== 20000) {
                            console.log(data.code);
                            console.log(data.msg);
                            return this.$message.error('添加生成任务失败！' + '错误原因：' + data.msg);
                        }
                        // console.log('adddata:');
                        // console.log(adddata);
                        // console.log('document.getElementById("filetemp").files', document.getElementById('filetemp').files);
                        // console.log('document.getElementById("filetemp").files[0]', document.getElementById('filetemp').files[0]);
                        this.$message.success('提交成功！');
                        // 重置表单

                        // console.log('重置表单');
                        // var temp_method = this.form.augmentation_method;
                        // this.$refs.formRef.resetFields();
                        // // this.form.augmentation_type = '';
                        // this.form.augmentation_method = temp_method;
                        // this.form.name = '';
                        // this.form.file = {};
                        // // this.form.params = {
                        // //     epsilon: '',
                        // //     ite_epsilon: null,
                        // //     ite_limit: null,
                        // //     whether_to_rotate: false,
                        // //     generate_per_file_and_params: null,
                        // //     generate_per_file: null,
                        // //     boundary_constraint: null,
                        // //     strict_mode: false
                        // // };
                        // this.$refs.pathClear.value = '';
                        // // document.getElementById('filetemp').files[0] = {};
                        // this.is_available_to_submit = true;
                        // // this.$store.commit('storeToken', data.data.token);
                        // this.methodChanged(temp_method);
                        this.reload();
                    }
                });
        },
        async methodChanged(method_id) {
            console.log('method_id:', method_id);
            this.params_id = method_id;
            this.form.augmentation_method = this.params_id;
            console.log('this.form.augmentation_method:', this.form.augmentation_method);
            this.is_available_to_submit = false;
            // this.form.params = {
            //     epsilon: '',
            //     ite_epsilon: null,
            //     ite_limit: null,
            //     whether_to_rotate: false,
            //     generate_per_file_and_params: null,
            //     generate_per_file: null,
            //     boundary_constraint: null,
            //     strict_mode: false
            // };
        },
        // 改变生成类型时生成方法的二级联动
        // async typeChanged(name) {
        //     if (name !== '') {
        //         this.methods = [];
        //         console.log('name:' + name);
        //         // this.loadingMethod = true;
        //         console.log('this.$store.getters.augTypeList:');
        //         console.log(this.$store.getters.augTypeList);
        //         var id = this.typeList.filter(item => {
        //             console.log('item.name:');
        //             console.log(item.name);
        //             return item.name == name;
        //         })[0].id;
        //         this.params_id = id;
        //         console.log('id:', id);
        //         const { data: data } = await this.$http.get('/augmentation_method/?augmentation_type=' + id);
        //         if (data.code === 45000) {
        //             console.log(data.code);
        //             return this.$message.error('该生成类型暂无方法！');
        //         }
        //         if (data.code !== 20000) {
        //             console.log(data.code);
        //             return this.$message.error('查询生成方法失败！');
        //         }
        //         //   数据获取成功，保存数据到this中
        //         console.log(data);
        //         this.methods = data.data.filter(item => {
        //             console.log('methodItem:');
        //             console.log(item);
        //             return item.augmentation_type_id === id;
        //         });
        //         console.log('this.methods:');
        //         console.log(this.methods);
        //     }
        // },
        // 上传文件[this.form.file赋值]
        fileLoad() {
            const selectedFile = this.$refs.refFile.files[0]; // 获取读取的File对象
            console.log('this.$refs.refFile.files:');
            console.log(this.$refs.refFile.files);
            var name = selectedFile.name; // 读取选中文件的文件名
            var size = selectedFile.size; // 读取选中文件的大小
            // var fileurl = selectedFile.url;
            console.log('文件名:' + name + '大小：' + size);
            this.form.file = selectedFile;
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
    async mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
        console.log('this.$store.state.userId:', this.$store.state.userId);
        // console.log('augTypeList:');
        // console.log(this.$store.getters.augTypeList);
        var id = 1;
        const { data: data } = await this.$http.get('/augmentation_method/?augmentation_type=' + id);
        if (data.code === 45000) {
            console.log(data.code);
            return this.$message.error('该生成类型暂无方法！');
        }
        if (data.code !== 20000) {
            console.log(data.code);
            return this.$message.error('查询生成方法失败！');
        }
        //   数据获取成功，保存数据到this中
        // console.log(data);
        this.methods = data.data.filter(item => {
            // console.log('methodItem:');
            console.log(item);
            return item.augmentation_type_id === id;
        });
        // console.log('this.methods:');
        console.log(this.methods);
    },
    created() {
        this.getTypeList();
    }
};
</script>

<style scoped>
.marginRight {
    margin-right: 10px !important;
}
</style>
