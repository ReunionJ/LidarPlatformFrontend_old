<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-s-tools"></i> 管理系统 </el-breadcrumb-item>
                <el-breadcrumb-item>生成管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20" class="search">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="searchAugName" @clear="getAugList" clearable>
                        <el-button slot="append" size="mini" @click="PreciseSearchAug"
                            >精确<i class="el-icon-search el-icon--right"></i
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true" v-if="this.userRight === '超级管理员'"
                        >添加生成类型</el-button
                    >
                </el-col>
            </el-row>

            <!-- 生成类型列表区域 -->
            <el-table :data="augTypeList" border stripe>
                <!-- 索引列 -->
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <el-table-column label="生成类型名称" prop="name"></el-table-column>
                <el-table-column label="生成类型描述" prop="details"></el-table-column>
                <el-table-column label="数据更新时间" prop="update_datetime">
                    <template slot-scope="scope">
                        {{ scope.row.update_datetime | dateFormat }}
                    </template>
                </el-table-column>
                <!-- 操作无具体的数据源 -->
                <el-table-column label="操作" width="150px" v-if="this.userRight === '超级管理员'">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showEditDialog(scope.row.id, scope.row.name, scope.row.details)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeAugById(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

                <el-table-column label="详情" width="100px">
                    <template slot-scope="scope">
                        <!-- 查看方法按钮 -->
                        <el-tooltip effect="dark" content="查看方法" placement="top" :enterable="false">
                            <el-button
                                type="info"
                                icon="el-icon-more-outline"
                                size="mini"
                                @click="augMethodsById(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加生成类型的对话框 -->
        <el-dialog title="添加生成类型" :visible.sync="addDialogVisible" width="30%" @closed="addDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="生成类型名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生成类型描述" prop="details">
                    <el-input v-model="addForm.details"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAugType">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改生成类型的对话框 -->
        <el-dialog title="编辑生成类型信息" :visible.sync="editDialogVisible" width="50%" @closed="editDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="110px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="生成类型id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="生成类型名称" prop="new_password">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生成类型描述" prop="new_nickname">
                    <el-input v-model="editForm.details"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editAugTypeInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 显示生成方法的对话框 -->
        <el-dialog :title="' —— 生成方法'" :visible.sync="methodDialogVisible" width="90%" @closed="MethodsDialogClosed">
            <el-row :gutter="20" class="search">
                <el-col :span="4">
                    <el-button type="primary" @click="addMethodDialogVisible = true" v-if="this.userRight === '超级管理员'"
                        >添加生成方法</el-button
                    >
                </el-col>
            </el-row>
            <!-- 生成类型列表区域 -->
            <el-table :data="augMethodList" border stripe>
                <!-- 索引列 -->
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <el-table-column label="生成方法名称" prop="name"></el-table-column>
                <el-table-column label="生成方法描述" prop="details"></el-table-column>
                <el-table-column label="数据更新时间" prop="update_datetime">
                    <template slot-scope="scope">
                        {{ scope.row.update_datetime | dateFormat }}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="生成方法的类型id" prop="augmentation_type_id"></el-table-column>
                <el-table-column label="生成方法的类型名称" prop="augmentation_type_name"></el-table-column> -->
                <!-- 操作无具体的数据源 -->
                <el-table-column label="操作" width="120px" v-if="this.userRight === '超级管理员'">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showMethodEditDialog(scope.row.id, scope.row.name, scope.row.details)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeAugMethodById(scope.row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="methodDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- 添加生成方法的对话框 -->
        <el-dialog title="添加生成方法" :visible.sync="addMethodDialogVisible" width="30%" @closed="addMethodDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="addMethodForm" :rules="addMethodFormRules" ref="addMethodFormRef" label-width="70px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="生成方法名称" prop="name">
                    <el-input v-model="addMethodForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生成方法描述" prop="details">
                    <el-input v-model="addMethodForm.details"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMethodDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAugMethod">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改生成方法的对话框 -->
        <el-dialog title="编辑生成方法信息" :visible.sync="editMethodDialogVisible" width="50%" @closed="editMethodDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editMethodForm" :rules="editMethodFormRules" ref="editMethodFormRef" label-width="110px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="生成方法id">
                    <el-input v-model="editMethodForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="生成方法名称" prop="new_password">
                    <el-input v-model="editMethodForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生成方法描述" prop="new_nickname">
                    <el-input v-model="editMethodForm.details"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editMethodDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editAugMethodInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data() {
        return {
            // 生成类型部分
            id: '',
            name: '',
            augTypeList: [],
            addDialogVisible: false,
            //   添加生成类型的表单数据
            addForm: {
                name: '',
                details: ''
            },
            addFormRules: {
                name: [{ required: true, message: '请输入生成类型名', trigger: 'blur' }]
            },
            editDialogVisible: false,
            editForm: {
                id: '',
                name: '',
                details: ''
            },
            editFormRules: {
                name: [{ required: true, message: '请输入生成类型名', trigger: 'blur' }]
            },
            searchAugName: '',

            // 生成方法部分
            augMethodList: [],
            methodDialogVisible: false,
            addMethodDialogVisible: false,
            //   添加生成方法的表单数据
            addMethodForm: {
                name: '',
                details: '',
                augmentation_type: 0
            },
            addMethodFormRules: {
                name: [{ required: true, message: '请输入生成方法名', trigger: 'blur' }]
            },
            editMethodDialogVisible: false,
            editMethodForm: {
                id: '',
                name: '',
                details: '',
                augmentation_type: 0
            },
            editMethodFormRules: {
                name: [{ required: true, message: '请输入生成类型名', trigger: 'blur' }]
            },
            userRight: ''
        };
    },
    created() {
        // this.userRight = window.sessionStorage.getItem('user_group_name');
        this.userRight = this.$store.state.user_group_name;
        console.log('this.userRight:');
        console.log(this.userRight);
        this.getAugList();
    },
    methods: {
        // 更新/获取生成类型的方法
        async getAugList() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            var param = '';
            if (this.name !== '') {
                param = '?name=' + this.name;
            }

            const { data: data } = await this.$http.get('/augmentation_type/' + param);
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('获取生成类型失败！');
            }
            //   数据获取成功，保存数据到this中
            console.log(data);
            this.augTypeList = data.data;
        },
        async PreciseSearchAug() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            if (this.searchAugName === '') {
                return this.$message.error('请输入搜索内容！');
            }
            const { data: data } = await this.$http.get('/augmentation_type/?name=' + this.searchAugName);
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('未精确搜索到该生成类型！');
            }
            console.log(data);
            console.log(data.data);
            this.augTypeList = [];
            this.augTypeList.push(data.data);
        },
        // 添加生成类型时预验证
        addAugType() {
            this.$refs.addFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return;
                // 通过则发起添加生成类型的网络请求
                // console.log('true')
                if (this.addForm.details === '') {
                    this.addForm.details = '暂无';
                }
                const { data: data } = await this.$http.post('/augmentation_type/', qs.stringify(this.addForm));
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('添加生成类型失败！请检查生成类型名是否重复');
                }
                this.$message.success('添加生成类型成功！');
                this.addDialogVisible = false;
                this.getAugList();
            });
        },
        // 对话框关闭时表单重置
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 删除生成类型
        async removeAugById(id) {
            console.log('id:' + id);
            const confirmResult = await this.$confirm('此操作将永久删除该生成类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            //   console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }

            const { data: data } = await this.$http.delete('/augmentation_type/' + '?id=' + id);
            if (data.code !== 20000) {
                return this.$message.error('删除生成类型失败！');
            }
            this.$message.success('删除生成类型成功！');
            this.getAugList();
        },
        // 显示生成类型修改对话框
        async showEditDialog(id, name, details) {
            this.editForm.id = id;
            this.editForm.name = name;
            this.editForm.details = details;
            this.editDialogVisible = true;
        },
        // 对话框关闭时表单重置
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改生成类型信息时预验证
        editAugTypeInfo() {
            this.$refs.editFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return;
                // 通过则发起添加生成类型的网络请求
                // console.log('true')
                const { data: data } = await this.$http.put('/augmentation_type/', qs.stringify(this.editForm));
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('修改生成类型失败！');
                }
                this.$message.success('修改生成类型成功！');
                this.editDialogVisible = false;
                this.getAugList();
            });
        },

        // 获取生成方法
        async augMethodsById(id) {
            console.log('id:' + id);
            this.methodDialogVisible = true;
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
            this.augMethodList = data.data;
            var str = JSON.stringify(this.augMethodList);
            // window.sessionStorage.setItem('AugMethod', str);
        },
        // 对话框关闭时表单重置
        addMethodDialogClosed() {
            this.$refs.addMethodFormRef.resetFields();
        },
        async addAugMethod() {
            this.$refs.addMethodFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return;
                // 通过则发起添加生成类型的网络请求
                // console.log('true')
                if (this.addMethodForm.details === '') {
                    this.addMethodForm.details = '暂无';
                }
                this.addMethodForm.augmentation_type = this.augMethodList[0].augmentation_type_id;
                console.log('this.addMethodForm.augmentation_type:' + this.addMethodForm.augmentation_type);

                console.log('this.augMethodList.augmentation_type_id:');
                console.log(this.augMethodList[0].augmentation_type_id);

                const { data: data } = await this.$http.post('/augmentation_method/', qs.stringify(this.addMethodForm));
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('添加生成方法失败！请检查生成方法名是否重复');
                }
                this.$message.success('添加生成方法成功！');
                this.addDialogVisible = false;
                this.augMethodsById(this.augMethodList[0].augmentation_type_id);
            });
        },
        // 显示修改生成方法的对话框
        showMethodEditDialog(id, name, details) {
            this.editMethodForm.id = id;
            this.editMethodForm.name = name;
            this.editMethodForm.details = details ? details : '暂无';
            this.editMethodForm.augmentation_type = this.augMethodList[0].augmentation_type_id;
            this.editMethodDialogVisible = true;
        },
        // 修改生成方法信息时预验证
        editAugMethodInfo() {
            this.$refs.editMethodFormRef.validate(async valid => {
                console.log(valid);
                if (!valid) return;
                // 通过则发起添加生成类型的网络请求
                // console.log('true')
                console.log(this.editMethodForm);
                const { data: data } = await this.$http.put('/augmentation_method/', qs.stringify(this.editMethodForm));
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('修改生成方法失败，请添加修改！');
                }
                this.$message.success('修改生成方法成功！');
                this.editDialogVisible = false;
                this.augMethodsById(this.editMethodForm.augmentation_type);
            });
        },
        editMethodDialogClosed() {
            this.$refs.editMethodFormRef.resetFields();
        },
        // 删除生成方法
        async removeAugMethodById(id) {
            console.log('删除方法id:' + id);
            const confirmResult = await this.$confirm('此操作将永久删除该生成方法, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            //   console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }

            const { data: data } = await this.$http.delete('/augmentation_method/' + '?id=' + id);
            if (data.code !== 20000) {
                return this.$message.error('删除生成方法失败！');
            }
            this.$message.success('删除生成方法成功！');
            this.augMethodsById(this.augMethodList[0].augmentation_type_id);
        },
        MethodsDialogClosed() {
            this.augMethodList = [];
        }
    }
};
</script>

<style scoped>
.search {
    margin-bottom: 10px !important;
}
.right {
    margin-right: 5px !important;
}
</style>
