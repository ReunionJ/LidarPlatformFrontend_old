<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-picture-outline-round"></i> 雷达图像数据 </el-breadcrumb-item>
                <el-breadcrumb-item>添加生成任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-row :gutter="20">
                    <el-col :span="13">
                        <el-form ref="formRef" :model="form" :rules="FormRules" label-width="80px">
                            <el-form-item label="任务名称" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>

                            <el-form-item label="参数设定" prop="params">
                                <el-input type="text" v-model="form.params"></el-input>
                            </el-form-item>

                            <el-form-item label="上传文件">
                                <input type="file" id="filetemp" prop="form.file" ref="pathClear" /><br />
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">表单提交</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="10">
                        <div class="demo-image">
                            <div class="block">
                                <el-image style="width: 400px; height: 400px" :src="picture"></el-image>
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
    name: 'baseform',
    data() {
        // var checkMethod = (rule, value, callback) => {
        //     console.log('method:' + value);
        //     if (value === '') {
        //         return callback(new Error('生成方法不能为空'));
        //     }
        // };
        return {
            form: {
                name: '',
                augmentation_method: '',
                params: '',
                master: this.$store.state.userId,
                // master: window.sessionStorage.getItem('userId'),
                // this.$localstorage.getItem('userId'),
                file: {}
            },
            FormRules: {
                // // 验证用户名是否合法
                // name: [{ required: true, message: '任务名不可为空', trigger: 'blur' }],
                // // 验证密码是否合法
                // augmentation_method: [{ required: true, message: '生成方法不可为空', trigger: 'blur' }]
            },
            // loadingMethod: false,
            methods: [],
            fileList: [],
            typeList: [],
            picture: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        };
    },
    methods: {
        // 发送添加任务申请
        onSubmit() {
            this.$refs.formRef.validate(async valid => {
                console.log(this.FormRules);
                console.log('正在预验证');
                if (valid) {
                    // if (this.form.augmentation_method === '') {
                    //     return this.$message.error('请选择生成方法!');
                    // }
                    // if (this.form.name === '') {
                    //     return this.$message.error('生成任务名不能为空!');
                    // }
                    console.log('通过预验证');
                    console.log('this.form:');
                    console.log(this.form);
                    var adddata = new FormData();
                    // adddata.append('name', this.form.name);
                    // adddata.append('augmentation_method', this.form.augmentation_method);
                    // adddata.append('master', this.form.master);
                    // if (this.form.params) {
                    //     adddata.append('params', this.form.params);
                    // }
                    this.form.file = document.getElementById('filetemp').files[0];
                    console.log(this.form.file);
                    if (this.form.file) {
                        adddata.append('file', this.form.file);
                    }
                    console.log('adddata:');
                    console.log(adddata);
                    console.log('form:');
                    console.log(this.form);
                    var temp = this.$http.defaults.baseURL;
                    console.log('this.$http.defaults.baseURL1:', this.$http.defaults.baseURL);
                    this.$http.defaults.baseURL = 'http://129.211.89.155:8050/';
                    console.log('this.$http.defaults.baseURL2:', this.$http.defaults.baseURL);
                    const { data: data } = await this.$http({
                        url:
                            '/uploadimage?augmentation_method=1&master=' +
                            this.form.master +
                            '&name=' +
                            this.form.name +
                            '&params=' +
                            this.form.params,
                        data: adddata,
                        method: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        responseType: 'blob'
                    });
                    this.$http.defaults.baseURL = temp;
                    let blob = new Blob([data], { type: 'image/png' });
                    this.picture = window.URL.createObjectURL(blob);
                    // console.log('url:', url);

                    console.log('this.$http.defaults.baseURL3:', this.$http.defaults.baseURL);

                    console.log('adddata:');
                    console.log(adddata);
                    // console.log('res:', res);
                    console.log('data:', data);
                    this.$message.success('提交成功！');
                    // 重置表单

                    console.log('重置表单');
                    this.$refs.formRef.resetFields();
                    this.form.augmentation_type = '';
                    this.form.augmentation_method = '';
                    this.form.file = {};
                    this.$refs.pathClear.value = '';
                    // this.$store.commit('storeToken', data.data.token);
                }
            });
        },
        // 改变生成类型时生成方法的二级联动
        async typeChanged(name) {
            if (name !== '') {
                this.methods = [];
                console.log('name:' + name);
                // this.loadingMethod = true;
                console.log('this.$store.getters.augTypeList:');
                console.log(this.$store.getters.augTypeList);
                var id = this.typeList.filter(item => {
                    console.log('item.name:');
                    console.log(item.name);
                    return item.name == name;
                })[0].id;
                console.log('id:');
                console.log(id);
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
                console.log(data);
                this.methods = data.data.filter(item => {
                    console.log('methodItem:');
                    console.log(item);
                    return item.augmentation_type_id === id;
                });
                console.log('this.methods:');
                console.log(this.methods);
            }
        },
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
            console.log('this.typeList:');
            console.log(this.typeList);
            // console.log('this.total:' + this.total);
        }
    },
    mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
    },
    // mounted() {
    //     console.log('augTypeList:');
    //     console.log(this.$store.getters.augTypeList);
    // },
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
