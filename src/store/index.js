import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建Vuex对象
const store = new Vuex.Store({
    state: {
        // 存放的键值对就是要管理的状态
        userId: 0,
        token: sessionStorage.getItem('token'),
        nickname: sessionStorage.getItem('nickname'),
        username: sessionStorage.getItem('username'),
        user_group_name: sessionStorage.getItem('user_group_name'),
    },
    // 一次性更新store和sessionStorage
    mutations: {
        setUserId(state, value) {
            sessionStorage.setItem('userId', value),
            state.userId = value;
        },
        setToken(state, value) {
            sessionStorage.setItem('token', value),
            state.token = value;
        },
        setNickName(state, value) {
            sessionStorage.setItem('nickname', value),
            state.nickname = value;
        },
        setUser_group_name(state, value) {
            sessionStorage.setItem('user_group_name', value),
                console.log("用户权限已更新");
            state.user_group_name = value;
        },
        setUsername(state, value) {
            sessionStorage.setItem('username', value),
                console.log("用户名已更新");
            state.username = value;
        }
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getToken(state) {
            return state.token;
        },
        getNickName(state) {
            return state.nickname;
        },
        getUser_group_name(state) {
            return state.user_group_name;
        },
        getUsername(state) {
            return state.username;
        },
    }
})

export default store
