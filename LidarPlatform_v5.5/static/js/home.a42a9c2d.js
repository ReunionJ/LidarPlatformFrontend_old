(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"1da1":function(t,e,s){"use strict";function n(t,e,s,n,a,i,o){try{var l=t[i](o),r=l.value}catch(c){return void s(c)}l.done?e(r):Promise.resolve(r).then(n,a)}function a(t){return function(){var e=this,s=arguments;return new Promise((function(a,i){var o=t.apply(e,s);function l(t){n(o,a,i,l,r,"next",t)}function r(t){n(o,a,i,l,r,"throw",t)}l(void 0)}))}}s.d(e,"a",(function(){return a}))},"5ebe":function(t,e,s){},6680:function(t,e,s){"use strict";s("8f38")},"7ed4":function(t,e,s){"use strict";var n=s("2b0e"),a=new n["default"];e["a"]=a},"82da":function(t,e,s){},"8a4f":function(t,e,s){t.exports=s.p+"static/img/radar.0c370ea5.png"},"8d42":function(t,e,s){"use strict";s("82da")},"8f38":function(t,e,s){},ade3:function(t,e,s){"use strict";function n(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}s.d(e,"a",(function(){return n}))},bfe9:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("v-head"),s("v-sidebar"),s("div",{staticClass:"content-box",class:{"content-collapse":t.collapse}},[s("v-tags"),s("div",{staticClass:"content"},[s("transition",{attrs:{name:"move",mode:"out-in"}},[s("keep-alive",[s("router-view")],1)],1),s("el-backtop",{attrs:{target:".content"}})],1)],1)],1)},a=[],i=(s("96cf"),s("1da1")),o=(s("7f7f"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{staticClass:"header-left"},[n("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[t.collapse?n("i",{staticClass:"el-icon-s-unfold"}):n("i",{staticClass:"el-icon-s-fold"})]),n("img",{staticClass:"lidarPic",attrs:{src:s("8a4f"),alt:""}}),n("div",{staticClass:"logo"},[t._v("智能系统软件测试数据生成平台")])]),n("div",{staticClass:"header-right"},[n("div",{staticClass:"header-user-con"},[n("div",{staticClass:"user-avator"}),n("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:t.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n                    "+t._s(t.nickname)+"\n                    "),n("i",{staticClass:"el-icon-caret-bottom"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("a",{attrs:{href:"#/SelfInfo"}},[n("el-dropdown-item",[n("i",{staticClass:"el-icon-user"}),t._v("个人信息")])],1),n("el-dropdown-item",{attrs:{divided:"",command:"logout"}},[n("i",{staticClass:"el-icon-close"}),t._v("退出登录")])],1)],1)],1)])])}),l=[],r=(s("8e6e"),s("ac6a"),s("456d"),s("ade3")),c=s("7ed4"),u=s("2f62");function d(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,n)}return s}function h(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?d(Object(s),!0).forEach((function(e){Object(r["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):d(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var m={data:function(){return{collapse:!1,fullscreen:!1,message:2}},computed:h({},Object(u["b"])(["nickname"])),methods:{handleCommand:function(t){"logout"==t&&(console.log("sessionStorage已清除"),sessionStorage.clear(),console.log(sessionStorage.getItem("token")),this.$store.commit("setToken",null),this.$store.commit("setNickName",null),this.$store.commit("setUserId",null),console.log("$store.token已清除"),console.log(this.$store.state.token),console.log(this.$store.state.nickname),console.log(this.$store.state.userId),this.$router.push("/login"))},collapseChage:function(){this.collapse=!this.collapse,c["a"].$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()},created:function(){}},f=m,g=(s("6680"),s("2877")),p=Object(g["a"])(f,o,l,!1,null,"5deaa8c1",null),v=p.exports,_=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar"},[s("el-menu",{staticClass:"sidebar-el-menu",attrs:{"active-text-color":"#20a0ff","default-active":t.onRoutes,collapse:t.collapse,"unique-opened":"",router:""}},[t._l(t.items,(function(e){return[e.subs?[s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._l(e.subs,(function(e){return[e.subs?s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[t._v(t._s(e.title))]),t._l(e.subs,(function(e,n){return s("el-menu-item",{key:n,attrs:{index:e.index}},[t._v(t._s(e.title))])}))],2):"user_manage"!==e.index||t.showUserManage?s("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v(t._s(e.title))]):t._e()]}))],2)]:[s("el-menu-item",{key:e.index,attrs:{index:e.index}},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]}))],2)],1)},b=[],w=(s("a481"),{data:function(){return{collapse:!1,items:[{icon:"el-icon-lx-home",index:"dashboard",title:"系统首页"},{icon:"el-icon-magic-stick",index:"lidardata",title:"激光雷达数据",subs:[{index:"Lidar_Augmentation_Add",title:"添加生成任务"},{index:"Lidar_Augmentation_Task",title:"生成任务查询"},{index:"Lidar_Input_Data",title:"数据可视化"}]},{icon:"el-icon-umplidardata",index:"Radardata",title:"电磁波雷达数据",subs:[{index:"Radar_Augmentation_Add",title:"添加生成任务"},{index:"Radar_Augmentation_Task",title:"生成任务查询"},{index:"Radar_Input_Data",title:"数据可视化"}]},{icon:"el-icon-picture-outline-round",index:"Imagedata",title:"雷达图像数据",subs:[{index:"Image_Augmentation_Add",title:"添加生成任务"},{index:"Image_Augmentation_Task",title:"生成任务查询"},{index:"Image_Input_Data",title:"数据可视化"}]},{icon:"el-icon-reading",index:"Log",title:"日志管理"},{icon:"el-icon-s-tools",index:"Management_System",title:"管理系统",subs:[{index:"user_manage",title:"用户管理"},{index:"augmentation_manage",title:"生成管理"},{index:"system_setting",title:"系统设置"}]}],showUserManage:!1}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}},created:function(){var t=this;c["a"].$on("collapse",(function(e){t.collapse=e,console.log("collapse:"+t.collapse),c["a"].$emit("collapse-content",e)}))},mounted:function(){console.log("user_group_name:"),console.log(window.sessionStorage.getItem("user_group_name")),console.log("this.$store.state.user_group_name1234:",this.$store.state.user_group_name),"超级管理员"===this.$store.state.user_group_name?this.showUserManage=!0:this.showUserManage=!1,console.log("this.showUserManage:"),console.log(this.showUserManage)}}),x=w,C=(s("8d42"),Object(g["a"])(x,_,b,!1,null,"45fb3edc",null)),$=C.exports,k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTags?s("div",{staticClass:"tags"},[s("ul",t._l(t.tagsList,(function(e,n){return s("li",{key:n,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[s("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v("\n                "+t._s(e.title)+"\n            ")]),s("span",{staticClass:"tags-li-icon",on:{click:function(e){return t.closeTags(n)}}},[s("i",{staticClass:"el-icon-close"})])],1)})),0),s("div",{staticClass:"tags-close-box"},[s("el-dropdown",{on:{command:t.handleTags}},[s("el-button",{attrs:{size:"mini",type:"primary"}},[t._v(" 标签选项"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown",size:"small"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"other"}},[t._v("关闭其他")]),s("el-dropdown-item",{attrs:{command:"all"}},[t._v("关闭所有")])],1)],1)],1)]):t._e()},L=[],y={data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],s=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];if(s)e.path===this.$route.fullPath&&this.$router.push(s.path),console.log(this.tagsList);else{var n={name:"dashboard",path:"/dashboard",title:"系统首页"};this.tagsList=[],this.tagsList.push(n),this.$router.push("/dashboard")}},closeAll:function(){var t={name:"dashboard",path:"/dashboard",title:"系统首页"};this.tagsList=[],this.tagsList.push(t),this.$router.push("/dashboard")},closeOther:function(){var t=this,e=this.tagsList.filter((function(e){return e.path===t.$route.fullPath}));this.tagsList=e},setTags:function(t){var e=this.tagsList.some((function(e){return e.path===t.fullPath}));e||(this.tagsList.length>=8&&this.tagsList.shift(),this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name})),c["a"].$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){var t=this;this.setTags(this.$route),c["a"].$on("close_current_tags",(function(){for(var e=0,s=t.tagsList.length;e<s;e++){var n=t.tagsList[e];if(n.path===t.$route.fullPath){e<s-1?t.$router.push(t.tagsList[e+1].path):e>0?t.$router.push(t.tagsList[e-1].path):t.$router.push("/"),t.tagsList.splice(e,1);break}}}))}},O=y,j=(s("c5f3"),Object(g["a"])(O,k,L,!1,null,null,null)),S=j.exports,F=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer"},[t._v("Copyright ©2021 Nanjing university software institute")])},P=[],I={data:function(){return{}}},R=I,T=Object(g["a"])(R,F,P,!1,null,"5ebda58d",null),A=T.exports,E={data:function(){return{tagsList:[],collapse:!1,userList:[]}},components:{vHead:v,vSidebar:$,vTags:S,vFoot:A},created:function(){var t=this;c["a"].$on("collapse-content",(function(e){t.collapse=e})),c["a"].$on("tags",(function(e){for(var s=[],n=0,a=e.length;n<a;n++)e[n].name&&s.push(e[n].name);t.tagsList=s}))},mounted:function(){this.getSelfInfo()},methods:{getSelfInfo:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/user/");case 2:if(e=t.sent,s=e.data,2e4===s.code){t.next=7;break}return console.log(s.code),t.abrupt("return",this.$message.error("个人信息获取失败！"));case 7:console.log("data:"),console.log(s);case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},q=E,D=(s("d9e2"),Object(g["a"])(q,n,a,!1,null,"cbf17d12",null));e["default"]=D.exports},c5f3:function(t,e,s){"use strict";s("5ebe")},d9e2:function(t,e,s){"use strict";s("ff98")},ff98:function(t,e,s){}}]);