let domain = document.domain;
let urlBase = "";
let agreement = location.protocol;
switch (domain) {
  case "127.0.0.1"://本地
    urlBase = "http://v.juhe.cn";
    break;
  // case "":
  //   urlBase = agreement + "//"; //线上环境服务器
  //   break;
  // case "":
  //   urlBase = agreement + "//"; //测试环境服务器
  //   break;
  // case "":
  //   urlBase = agreement + "//"; //开发环境服务器
  //   break;
  default:
    urlBase = agreement + "//";
}
export default urlBase;
