import axios from "axios"; //引入 axios
import urlBase from "./config.js"; //倒入默认配置
import qs from "qs"; //序列化数据，视服务端的要求
import md5 from "js-md5";
import { isEmojiCharacter } from "../scripts/inputDataCheck";
import { MessageBox, Message, Loading } from "element-ui";
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {},
      timeout: 10000, //设置超时时间
      responseType: "JSON",
      transformResponse: [function(data) {}]
    });
    instance.interceptors.request.use(
      config => {       
        let hasEmojiCharacter = false;
        //根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (
          config.method.toLocaleLowerCase() === "post" ||
          config.method.toLocaleLowerCase() === "put" ||
          config.method.toLocaleLowerCase() === "delete"
        ) {
          for (let item in config.data) {
            if (isEmojiCharacter(config.data[item])) {
              hasEmojiCharacter = true;
              Message({
                message: "请勿在输入框输入表情符号",
                type: "warning"
              });
              return false;
            }
          }
        } else if (config.method.toLocaleLowerCase() == "get") {
          for (let item in config.params) {
            if (isEmojiCharacter(config.params[item])) {
              hasEmojiCharacter = true;
              Message({
                message: "请勿在输入框输入表情符号",
                type: "warning"
              });
              return false;
            }
          }
        }
        return config;
      },
      error => {
        //请求错误时（接口错误、超时等）
        console.log("request:", error);
        //判断请求超时
        if (
          error.code == "ECONNABORTED" &&
          error.message.indexOf("timeout") != -1
        ) {
          console.log(
            "根据你设置的 timeout 判断请求超时了，你可以在这里加入超时的处理方案"
          );
          // return service.request(originalRequest); //例如再重复请求一次
        }

        //需要重定向到错误页面
        const errorInfo = error.response;
        console.log(errorInfo);

        if (errorInfo) {
          //error = errorInfo.data //页面那边 catch 的时候就能拿到详细的错误信息，看最下边的 Promise.reject
          const errorStatus = errorInfo.status; //404 500 403 ... 等
          router.push({
            path: `/error/${errorStatus}`
          });
        }
        return Promise.reject(error); //在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    instance.interceptors.response.use(
      response => {
        let data;
        //IE9 时 response.data 是 undefined， 因此需要使用 response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        //根据返回的code值来做不同的处理(和后端约定)
        if(options.judgeCode != undefined){// 根据具体接口逻辑自行判断code
             return data;
        }else{//统一判断code 
          switch (data.code) {
            case 0:
              return data;
              break;
            case -1:
              // token失效,返回登录页;
              Message({
                message: data.msg,
                type: "warning"
              });
              window.location.href = "/login";
              break;
            default:
              Message({
                message: data.msg,
                type: "warning"
              });
              return Promise.reject();
              break;
          }
        }
        
       
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case -200:
              err.message = "服务器错误";
              break;
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权，请登录";
              break;
            case 403:
              err.message = "拒绝访问";
              break;
            case 404:
              err.message = `请求地址错误：${err.response.config.url}`;
              break;
            case 408:
              err.message = "请求超时";
              alert("请求超时，请秒后再试");
              break;
            case 500:
              err.message = "服务器内部错误";
              break;
            case 501:
              err.message = "服务未实现";
              break;
            case 502:
              err.message = "网关错误";
              break;
            case 503:
              err.message = "服务不可用";
              break;
            case 504:
              err.message = "网关超时";
              break;
            case 505:
              err.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        console.log(err);
        //此处使用 element UI 的组件提示
        // Message.error(`Error:${err}`);
        return Promise.reject(err); //返回接口返回的错误信息
      }
    );

    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        if(!error) return;
        reject(error);
      });
  });
}
