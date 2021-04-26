import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import * as echarts from 'echarts'
import 'echarts-gl'
import store from './store'
import qs from 'qs'
// 要想发送请求需要导入axois包，并挂载
import axios from 'axios'
import "./assets/icon/iconfont.css";

// ise内网
axios.defaults.baseURL = 'http://10.0.0.22:8001/api/';
// ise外网跳板
// axios.defaults.baseURL = 'http://129.211.89.155:8001/api/';
// 国外服务器
// axios.defaults.baseURL = 'http://172.16.100.171/api/';
Vue.prototype.$http = axios

Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
    //为请求头对象，添加token验证的Authorization字段
    config.headers.Authorization = store.state.token;
    // config.headers['Content-Security-Policy'] = upgrade-insecure-requests
    // console.log("headerToken:" + config.headers.Authorization);
    // config.headers.Authorization = window.sessionStorage.getItem('token');
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    // 固定写法，必须return config
    return config;
  })
// 在response拦截器中隐藏进度条
axios.interceptors.response.use(config => {
    console.log('response_config:', config);
    // config.headers.Authorization = store.getters.tokenInfo
    // NProgress.done()
    // 固定写法，必须return config
    return config;
  })
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
// 时间格式处理器
Vue.filter('dateFormat', function (originVal) {
    if (originVal) {
        // 化字符串
        var res = originVal + '';
        res = res.split('.')[0].replace('T',' ');
        return res
    }
  })

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转[路由守卫]
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | LidarPlatform`;
    const role = store.state.token;
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
