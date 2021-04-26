<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>雷达数据</el-breadcrumb-item>
            <el-breadcrumb-item>数据生成</el-breadcrumb-item>
        </el-breadcrumb>
        <hr />

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20" class="search">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="searchUserName" clearable @clear="getUserList">
                        <el-button slot="append" @click="FuzzySearvhchUser" size="mini"
                            >模糊<i class="el-icon-search el-icon--right"></i
                        ></el-button>

                        <el-button slot="append" @click="PreciseSearchUser" type="primary"
                            >精确<i class="el-icon-search el-icon--right"></i
                        ></el-button>
                        <!-- <el-button slot="append" icon="el-icon-search" @click="getUserList">精确</el-button> -->
                    </el-input>
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
                <el-table-column label="加入时间" prop="join_datetime"></el-table-column>
                <!-- 状态的填充为按钮【bool值】 -->
                <el-table-column label="上一次登录时间" prop="last_login_datetime"> </el-table-column>
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
                    <el-input v-model="addForm.user_group"></el-input>
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
                <el-form-item label="密码（新）" prop="new_password">
                    <el-input v-model="editForm.new_password"></el-input>
                </el-form-item>
                <el-form-item label="用户名称（新）" prop="new_nickname">
                    <el-input v-model="editForm.new_nickname"></el-input>
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
                new_nickname: ''
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
                ],
                new_password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 15,
                        message: '密码的长度在6~15个字符之间',
                        trigger: 'blur'
                    }
                ]
            },
            searchUserName: ''
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        // 更新/获取数据的方法
        async getUserList() {
            console.log('this.$store.getters.tokenInfo:' + this.$store.getters.tokenInfo);
            const { data: data } = await this.$http.get('/user/all/admin/search/' + '?page=' + this.queryInfo.page);
            if (data.code !== 20000) {
                console.log(data.code);
                return this.$message.error('删除用户失败！');
            }
            //   数据获取成功，保存数据到this中
            this.userList = data.data.details;
            this.total = this.userList.length;
            this.totalPageNum = data.data.pages;
            // console.log('data.data.details:');
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
        // 显示用户修改对话框
        showEditDialog(id) {
            console.log('id:' + id);
        },
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
                return this.$message.error('删除用户失败！');
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
                    return this.$message.error('添加用户失败！');
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
                const { data: data } = await this.$http.put('/user/', {
                    username: this.editForm.username,
                    new_password: this.editForm.new_password,
                    new_nickname: this.editForm.new_nickname ? this.editForm.new_nickname : 'User'
                });
                if (data.code !== 20000) {
                    console.log(data.code);
                    return this.$message.error('修改用户失败！');
                }
                this.$message.success('修改用户成功！');
                this.editDialogVisible = false;
                this.getUserList();
            });
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
