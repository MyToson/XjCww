import Vue from 'vue';
import App from './App';
import "babel-polyfill";
import VueRouter from 'vue-router';
import routes from '@/router/index';
Vue.use(VueRouter);
import axios from 'axios';
Vue.prototype.axios = axios;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import {MessageBox, Message} from 'element-ui';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
import 'font-awesome/css/font-awesome.css';
import G2 from '@antv/g2';
Vue.prototype.G2 = G2;
import './assets/css/base.scss'
import '@/http/mock'
// 路由
const router = new VueRouter({
  mode: 'history',
  routes
});
// 过滤器
import vfilter from '@/filter/vfilters';
Object.keys(vfilter).forEach((key) => {
    Vue.filter(key, vfilter[key]);
});

//  全局组件之间通信
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
//整理全局弹出框
Vue.prototype.alert = function (obj) {
  let str = obj.str ? obj.str : '',
      title = obj.title ? obj.title : '提示',
      btnText = obj.btnText ? obj.btnText : '确定';
  MessageBox.alert(str, title, {
      confirmButtonText: btnText,
      callback: (action) => {
          if (obj.callBack) {
              obj.callBack(action);
          }
      }
  });
};
//整理全局访问框
Vue.prototype.confirm = function (obj) {
  let str = obj.str ? obj.str : '',
      title = obj.title ? obj.title : '提示',
      btnText = obj.btnText ? obj.btnText : '确定',
      cancelText = obj.cancelText ? obj.cancelText : '取消',
      type = obj.type ? obj.type : 'warning';
  MessageBox.confirm(str, title, {
          confirmButtonText: btnText,
          cancelButtonText: cancelText,
          type: type
      })
      .then(() => {
          if (obj.callBack) {
              obj.callBack();
          }
      })
      .catch(() => {
          if (obj.cancelCallBack) {
              obj.cancelCallBack();
          }
      });
};
//整理全局错误信息
Vue.prototype.error = function (str) {
  Message({
      message: str,
      type: 'error',
      center: true,
      showClose: false,
      customClass: 'hyy-toast',
      iconClass: 'icon-danchuang-cuowu iconfont',
      duration: 1500
  })
}
//整理全局错误信息
Vue.prototype.warning = function (str) {
  Message({
      message: str,
      type: 'warning',
      center: true,
      showClose: false,
      customClass: 'hyy-toast',
      iconClass: 'icon-danchuang-jingtanhao iconfont',
      duration: 1500
  })
}
//整理全局成功信息
Vue.prototype.success = function (str) {
  Message({
      message: str,
      type: 'success',
      center: true,
      showClose: false,
      customClass: 'hyy-toast',
      iconClass: 'icon-danchuang-wancheng iconfont',
      duration: 1500
  })
}

// 升降序
Vue.prototype.sort = function (str, type) {
  return function (a, b) {
      if (type == 'up') {
          return a[str] - b[str];
      } else if (type == 'down') {
          return b[str] - a[str];
      }
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
