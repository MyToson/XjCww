import { formatDate } from '../scripts/formatDate';
import formatMoney from '../scripts/formatMoney';
const vfilter = {
    //时间日期格式
    formatDate: function(date, ymd) {
        try {
            return formatDate(new Date(date), ymd);
        } catch (e) {
            return date;
        }
    },
    //金额格式
    formatMoney: function(price, places, symbol, thousand, decimal) {
        try {
            return formatMoney(price, places, symbol, thousand, decimal);
        } catch (e) {
            return price;
        }
    },
    //限制字数省略号表示
    limitTitleWord: function(str, length) {
        try {
            if (str.length < length) {
                return str;
            } else {
                return str.slice(0, length) + '...';
            }
        } catch (e) {
            return str;
        }
    },
    /**
    *敏感信息隐私处理
    *@string word 需要处理的数据
    *@number startLen 开始保留的位数
    *@number starLen 展示星号*的个数
    *@number endLen 结尾展示的位数
    */
   sensitiveWord:function(word,startLen,starLen,endLen){
     let _star = new Array(starLen+1).join("*");
     return  word.substr(0, startLen - 0) + _star + word.substr(word.length - endLen, endLen);
   }

    
    
};

export default vfilter;