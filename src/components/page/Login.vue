<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智能系统软件测试数据生成平台</div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="loginForm.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button
                        type="primary"
                        @click="submitForm()"
                        :loading="loading"
                        element-loading-spinner="el-icon-loading"
                        element-loading-text="登录中"
                        >登录</el-button
                    >
                </div>
                <p class="login-tips">Tips : 本系统暂未开放注册功能。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data: function() {
        return {
            // loginForm为登录表单的数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            // 表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [{ required: true, message: '账号不可为空', trigger: 'blur' }],
                // 验证密码是否合法
                password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
            },
            loading: false,
            flag: true
        };
    },
    methods: {
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /
        submitForm() {
            this.loading = true;
            this.$refs.loginFormRef.validate(async valid => {
                console.log('this.loginFormRules:');
                console.log(this.loginFormRules);
                // // console.log('正在预验证');
                if (valid) {
                    // // console.log('通过预验证');
                    console.log(this.loginForm);
                    if (this.flag === true) {
                        this.flag = false;
                        const { data: data } = await this.$http.post('/user/login/', qs.stringify(this.loginForm));
                        console.log('login-data');
                        console.log(data);
                        if (data.code !== 20000) {
                            console.log(data.code);
                            this.loginForm.password = '';
                            this.loading = false;
                            return this.$message.error('登录失败,请检查用户名或密码是否正确');
                        } else {
                            // window.sessionStorage.clear();
                            // console.log('sessionStorage已清除');
                            this.$store.commit('setToken', null);
                            console.log('$store.token已清除');
                            // window.sessionStorage.setItem('token', data.data.token);
                            // console.log(window.sessionStorage.getItem('token'));
                            window.sessionStorage.setItem('username', this.loginForm.username);
                            window.sessionStorage.setItem('password', this.loginForm.password);
                            // window.sessionStorage.setItem('userId', data.data.profile.id);
                            this.$store.commit('setUserId', data.data.profile.id);
                            console.log('this.$store.state.userId' + this.$store.state.userId);

                            this.$store.commit('setToken', data.data.token);

                            this.$store.commit('setUser_group_name', data.data.profile.user_group_name);
                            this.getUserRight();

                            // setTimeout(function() {}, 1000);
                            this.$message.success('登录成功');
                            this.$router.push('/dashboard');
                            this.loading = false;
                            this.flag = true;
                        }
                    }
                }
                this.loading = false;
            });
        },
        async getUserRight() {
            const { data: data } = await this.$http.get('/user/');
            console.log('getUserRight-user1:');
            console.log(data);
            // console.log("window.sessionStorage.getItem('token'):" + window.sessionStorage.getItem('token'));
            // console.log('this.$store.state.token):' + this.$store.state.token);
            // window.sessionStorage.setItem('user_group_name', data.data.user_group_name);
            // console.log('data.data.nickname:' + data.data.nickname);

            // 一次性更新store和sessionStorage
            this.$store.commit('setNickName', data.data.nickname);
            console.log("window.sessionStorage.getItem('nickname'):" + window.sessionStorage.getItem('nickname'));
            console.log('this.$store.state.token:' + this.$store.state.token);
            console.log('this.$store.state.nickname:' + this.$store.state.nickname);
            // this.$store.commit('setUser_group_name', data.data.user_group_name);
            console.log(window.sessionStorage.getItem('user_group_name') + data.data.username);
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/bgi1.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
