<template>
    <div class="login-wrap">
        <!-- <div class="ms-login "> -->
        <div class="box">
            <div class="ms-title">智能系统软件测试数据生成平台</div>

            <!-- <h2>智能系统软件测试数据生成平台</h2> -->
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

        <!-- <div class="box">
            <h2>智能系统软件测试数据生成平台</h2>
            <el-form>
                <div class="inputBox">
                    <input type="text" name="loginForm.username" required="" />
                    <label>Username</label>
                </div>
                <div class="inputBox">
                    <input type="password" name="loginForm.password" required="" />
                    <label>password</label>
                </div>
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
        </div> -->
    </div>
</template>

<script>
import qs from 'qs';
import { setInterval, clearInterval } from 'timers';
export default {
    inject: ['reload'],
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
            flag: true,
            lastTime: new Date().getTime(), // 最后一次点击的时间
            currentTime: new Date().getTime(), // 当前点击的时间
            timeOut: 10 * 1000, // 设置超时时间:15秒
            last_time_upgrade: true
        };
    },
    mounted() {
        /* 定时器  间隔1秒检测是否长时间未操作页面  */
        this.timer = setInterval(
            function() {
                var that = this;
                this.currentTime = new Date().getTime(); //更新当前时间
                if (this.last_time_upgrade == true) {
                    this.lastTime = new Date().getTime(); //更新上次时间
                }
                console.log('当前时间：', that.currentTime);
                console.log('上次时间：', that.lastTime);
                // console.log('超时时间：', that.timeOut);
                console.log('已过时间：', this.currentTime - this.lastTime);
                console.log('this.last_time_upgrade:', this.last_time_upgrade);
                console.log('this.loading:', this.loading);
                if (this.currentTime - this.lastTime > this.timeOut) {
                    //判断是否超时
                    console.log('超时');
                    this.last_time_upgrade = true;
                    this.loading = false;
                    this.flag === true;
                    this.reload();
                    return this.$message.error('登录超时,请检查网络并刷新');
                }
            }.bind(this),
            5000
        );
    },
    //销毁前清除定时器
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /
        cancelRequest() {
            if (typeof this.source === 'function') {
                this.source('终止请求');
            }
        },
        submitForm() {
            var that = this;
            var CancelToken = this.$http.CancelToken;
            var source = CancelToken.source();
            this.loading = true;
            console.log('this.loading', this.loading);
            this.$refs.loginFormRef.validate(async valid => {
                console.log('this.loginFormRules:');
                console.log(this.loginFormRules);
                // // console.log('正在预验证');
                if (valid) {
                    // // console.log('通过预验证');
                    console.log(this.loginForm);
                    if (this.flag === true) {
                        this.flag = false;

                        this.last_time_upgrade = false; // 开始计时
                        console.log('开始计时');
                        this.cancelRequest();
                        console.log('取消请求');
                        const { data: data } = await this.$http.post('/user/login/', qs.stringify(this.loginForm), {
                            cancelToken: new this.$http.CancelToken(function executor(c) {
                                that.source = c;
                            })
                        });

                        console.log('login-data');
                        console.log(data);
                        if (data.code !== 20000) {
                            console.log(data.code);
                            this.loginForm.password = '';
                            this.loading = false;
                            // this.lastTime = new Date().getTime(); //更新操作时间
                            // this.currentTime = new Date().getTime(); // 记录这次点击的时间
                            this.last_time_upgrade = true; // 取消计时
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
                            this.$store.commit('setUserId', data.data.profile.id);
                            console.log('this.$store.state.userId' + this.$store.state.userId);
                            this.$store.commit('setToken', data.data.token);
                            this.$store.commit('setUsername', this.loginForm.username);
                            console.log('this.$store.state.username' + this.$store.state.username);
                            console.log('this.$store.state.token登录' + this.$store.state.token);
                            this.$store.commit('setUser_group_name', data.data.profile.user_group_name);
                            this.getUserRight();

                            // setTimeout(function() {}, 1000);
                            this.$message.success('登录成功');
                            console.log('data.data.token:', data.data.token);

                            this.$router.push('/dashboard');
                            this.loading = false;
                            this.flag = true;
                        }
                    }
                }
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
    font-size: 22px;
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
    padding: 30px 0px;
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
    line-height: 10px;
    color: #fff;
}

body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: url(../../assets/img/bgi1.png);
    background-size: cover;
}
.box {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px 40px 20px 40px;
    background: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}
.box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 22px;
}
.box .inputBox {
    position: relative;
}
.box .inputBox input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    letter-spacing: 1px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}
.box .inputBox label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    letter-spacing: 1px;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
}
.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label {
    top: -18px;
    left: 0;
    color: #03a9f4;
    font-size: 12px;
}
.box input[type='submit'] {
    background: transparent;

    border: none;
    outline: none;
    color: #fff;
    background: #03a9f4;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
}

.login-wrap[data-v-3a8bfd4e] {
    position: relative;
    width: 1600px;
    height: 800px;
    background-size: 100%;
}
</style>
