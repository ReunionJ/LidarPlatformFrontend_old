<template>
    <div>
        <!-- 面包屑导航区 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-s-tools"></i> 管理系统 </el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <!-- <el-row :gutter="20" class="search">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名" v-model="searchUserName" clearable @clear="getUserList">
                        <el-button slot="append" @click="FuzzySearvhchUser" size="mini"
                            ><i class="el-icon-search el-icon--right"></i
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row> -->
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20" class="search">
                <el-col :span="12">
                    <!-- :model="formInline_Self" -->
                    <el-form :inline="true" :model="formInline_Self" class="demo-form-inline">
                        <el-form-item label="查询方式">
                            <el-select v-model="formInline_Self.searchType" placeholder="请选择查询方式" prop="searchType">
                                <el-option label="用户id" value="用户id"></el-option>
                                <el-option label="用户名" value="用户名"></el-option>
                                <el-option label="用户昵称" value="用户昵称"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="查询内容">
                            <el-input placeholder="请输入内容" v-model="formInline_Self.searchTaskInfo" clearable @clear="getUserList">
                                <el-button
                                    slot="append"
                                    @click="
                                        pageReflash();
                                        SearchUser();
                                    "
                                    size="mini"
                                    ><i class="el-icon-search el-icon--right"></i
                                ></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="昵称" prop="nickname"></el-table-column>
                <el-table-column label="权限" prop="user_group_name"></el-table-column>
                <el-table-column label="加入时间" prop="join_datetime">
                    <template slot-scope="scope">
                        {{ scope.row.join_datetime | dateFormat }}
                    </template>
                </el-table-column>
                <!-- 状态的填充为按钮【bool值】 -->
                <el-table-column label="上一次登录时间" prop="last_login_datetime">
                    <template slot-scope="scope">
                        {{ isBlank_login(scope) | dateFormat }}
                    </template>
                </el-table-column>
                <!-- 操作无具体的数据源 -->
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="showEditDialog(scope.row.username)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeUserById(scope.row.username)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryInfo.page"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="total"
            >
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @closed="addDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="user_group">
                    <el-select v-model="addForm.user_group" placeholder="请选择用户权限">
                        <el-option label="普通用户" value="0"></el-option>
                        <el-option label="超级管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog title="编辑用户信息" :visible.sync="editDialogVisible" width="50%" @closed="editDialogClosed">
            <!-- 内容主体区 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="110px">
                <!-- prop为校验规则的匹配 -->
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="new_password">
                    <el-input v-model="editForm.new_password"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="new_nickname">
                    <el-input v-model="editForm.new_nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" prop="new_user_group">
                    <el-select v-model="editForm.new_user_group" placeholder="请选择用户权限">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 底部按钮区 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data() {
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                //   搜索关键字【query意为“询问”】
                // query: '',
                // 当前的页数
                page: 1
            },
            userList: [],
            total: 0,
            totalPageNum: 0,
            addDialogVisible: false,
            //   添加用户的表单数据
            addForm: {
                username: '',
                password: '',
                nickname: '',
                user_group: ''
            },
            addFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名的长度在3~10个字符之间',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 15,
                        message: '密码的长度在6~15个字符之间',
                        trigger: 'blur'
                    }
                ]
            },
            editDialogVisible: false,
            editForm: {
                username: '',
                new_password: '',
                new_nickname: '',
                new_user_group: ''
            },
            editFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名的长度在3~10个字符之间',
                        trigger: 'blur'
                    }
                ]
            },
            searchUserName: '',
            visibleSubmit: '',
            userRight: '',
            colomnHiden: true,
            value: '100',
            formInline_Self: {
                searchType: '',
                searchTaskInfo: ''
            }
        };
    },
    created() {
        this.getUserList();
        // this.userRight = window.sessionStorage.getItem('user_group_name');
        this.userRight = this.$store.state.user_group_name;
        this.colomnHiden = this.userRight === '超级管理员' ? false : true;
        // this.visibleSubmit = this.userRight === '超级管理员' ? '' : 'none';
        // console.log('this.visibleSubmit:');
        // console.log(this.visibleSubmit);
    },
    methods: {
        pageReflash() {
            this.queryInfo.page = 1;
        },
        // 查找函数[本用户]
        async SearchUser() {
            console.log('开始查询');
            if (this.formInline_Self.searchType === '') {
                return this.$message.error('请输入查询方式！');
            }
            if (this.formInline_Self.searchTaskInfo === '') {
                return this.$message.error('请输入搜索内容！');
            }
            var search_params = '';
            if (this.formInline_Self.searchType === '用户id') {
                search_params = '/user/id/admin/search/?user_id=' + this.formInline_Self.searchTaskInfo;
            } else if (this.formInline_Self.searchType === '用户名') {
                search_params = '/user/username/admin/search/?username=' + this.formInline_Self.searchTaskInfo + '&search_type=1';
            } else if (this.formInline_Self.searchType === '用户昵称') {
                search_params = '/user/nickname/admin/search/?nickname=' + this.formInline_Self.searchTaskInfo + '&search_type=1';
            }
            // console.log('search_params:' + search_params);
            console.log('search_params:', search_params);
            const { data: data } = await this.$http.get(search_params);
            if (data.code !== 20000) {
                // console.log(data.code);
                return this.$message.error('未搜索到该用户！');
            }
            console.log('data:', data);
            //   数据获取成功，保存数据到this中
            if (this.formInline_Self.searchType === '用户id') {
                this.userList = [];
                this.userList.push(data.data);
            } else {
                this.userList = data.data.details;
            }
            this.total_Self = this.userList ? this.userList.length : 0;
            this.totalPageNum = data.data.pages;
        },
        temp() {
            console.log('wdnmd');
        },
        // 更新/获取数据的方法
        async getUserList() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            console.log('window.sessionStorage.getItem("lidarPlatformToke"):' + window.sessionStorage.getItem('lidarPlatformToken'));
            const { data: data } = await this.$http.get('/user/all/admin/search/' + '?page=' + this.queryInfo.page);
            if (data.code !== 20000) {
                console.log(data.code);
                console.log(data.msg);
                return this.$message.error('获取用户列表失败！' + '错误原因：' + data.msg);
            }
            //   数据获取成功，保存数据到this中
            this.userList = data.data.details;
            this.total = data.data.pages * 10;
            console.log('data.data.details:', data.data.details);
            // console.log(data.data.details);
            // console.log('this.userList:');
            // console.log(this.userList);
            // console.log('this.total:' + this.total);
        },
        async FuzzySearvhchUser() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            if (this.searchUserName === '') {
                return this.$message.error('请输入搜索内容！');
            }
            const { data: data } = await this.$http.get(
                '/user/username/admin/search/' + '?username=' + this.searchUserName + '&search_type=1'
            );
            if (data.code !== 20000) {
                console.log(data.code);
                console.log(data.msg);
                return this.$message.error('未模糊搜索到该用户！');
            }
            console.log(data);
            //   数据获取成功，保存数据到this中
            this.userList = data.data.details;
            this.total = this.userList.length;
            this.totalPageNum = data.data.pages;
        },
        async PreciseSearchUser() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            if (this.searchUserName === '') {
                return this.$message.error('请输入搜索内容！');
            }
            const { data: data } = await this.$http.get(
                '/user/username/admin/search/' + '?username=' + this.searchUserName + '&search_type=0'
            );
            if (data.code !== 20000) {
                console.log(data.code);
                console.log(data.msg);
                return this.$message.error('未精确搜索到该用户！');
            }
            console.log(data);
            //   数据获取成功，保存数据到this中
            this.userList = [];
            this.userList.push(data.data);
            this.total = this.userList ? this.userList.length : 0;
            this.totalPageNum = data.data.pages;
        },
        // 监听 pagesize【当前页号】 的改变
        handleSizeChange(newSize) {
            console.log(`每页 ${newSize} 条`);
            this.queryInfo.pagesize = newSize;
            this.getUserList();
        },
        // 监听 pagenum【页码值】 的改变
        handleCurrentChange(newPage) {
            console.log(`当前页: ${newPage}`);
            this.queryInfo.page = newPage;
            this.getUserList();
        },
        // 删除用户
        async removeUserById(username) {
            console.log('username:' + username);
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            //   console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除');
            }

            const { data: data } = await this.$http.delete('/user/delete/' + '?username=' + username);
            if (data.code !== 20000) {
                console.log(data.code);
                console.log(data.msg);
                return this.$message.error('删除用户失败！' + '错误原因：' + data.msg);
            }
            this.$message.success('删除用户成功！');
            this.getUserList();
        },
        // 添加用户时预验证
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return;
                // 通过则发起添加用户的网络请求
                // console.log('true')
                const { data: data } = await this.$http.post('/user/register/', qs.stringify(this.addForm));
                if (data.code !== 20000) {
                    console.log(data.code);
                    console.log(data.msg);
                    return this.$message.error('添加用户失败！' + '错误原因：' + data.msg);
                }
                this.$message.success('添加用户成功！');
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        // 对话框关闭时表单重置
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 显示用户修改对话框
        async showEditDialog(username) {
            this.editForm.username = username;
            this.editDialogVisible = true;
        },
        // 对话框关闭时表单重置
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息时预验证
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                // console.log(valid)
                if (!valid) return;
                // 通过则发起添加用户的网络请求
                // console.log('true')
                console.log('this.editForm:');
                console.log(this.editForm);
                var adddata = new FormData();
                adddata.append('username', this.editForm.username);
                if (this.editForm.new_password) {
                    adddata.append('new_password', this.editForm.new_password);
                }
                if (this.editForm.new_nickname) {
                    adddata.append('new_nickname', this.editForm.new_nickname);
                }
                if (this.editForm.new_user_group) {
                    console.log('this.editForm.new_user_group:' + this.editForm.new_user_group);
                    var num = this.editForm.new_user_group === '超级管理员' ? 1 : 0;
                    adddata.append('new_user_group', num);
                }
                const { data: data } = await this.$http({
                    url: '/user/',
                    data: adddata,
                    method: 'put'
                });
                // const { data: data } = await this.$http.put('/user/', {
                //     username: this.editForm.username,
                //     new_password: this.editForm.new_password,
                //     new_nickname: this.editForm.new_nickname ? this.editForm.new_nickname : 'User',
                //     new_user_group: this.editForm.new_user_group === '超级管理员' ? 1 : 0
                // });
                if (data.code !== 20000) {
                    console.log(data.code);
                    console.log(data.msg);
                    return this.$message.error('修改用户失败！' + '错误原因：' + data.msg);
                }
                this.$message.success('修改用户成功！');
                this.editDialogVisible = false;
                this.getUserList();
            });
        },
        // 表中空白格填充
        isBlank_login(scope) {
            let key = scope.column.property,
                item = scope.row[key],
                value = '从未登录';
            if (item === 0 || item === false || item) {
                value = item;
            }
            return value;
        }
    },
    mounted() {
        this.$store.commit('setUserId', sessionStorage.getItem('userId'));
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
