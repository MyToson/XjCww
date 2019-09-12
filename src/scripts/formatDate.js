/**时间日期格式
 *@param fmt string 格式 如"yy-MM-dd hh:mm:ss"
 * */
export function formatDate(date, fmt) {
    try{
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    }
    catch(e){
        console.log(e);
        return '' ;
    }
};
// 补0
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

Date.prototype.formatDate =
    Date.prototype.formatDate ||
    function (fmt) {
        return formatDate(this, fmt);
    };

Date.prototype.addDays =
    Date.prototype.addDays ||
    function (d) {
        this.setDate(this.getDate() + d);
        return this;
    };
Date.prototype.addWeeks =
    Date.prototype.addWeeks ||
    function (w) {
        this.addDays(w * 7);
        return this;
    };
Date.prototype.addMonths =
    Date.prototype.addMonths ||
    function (m) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + m);
        if (this.getDate() < d) {
            this.setDate(0);
        }
        return this;
    };
Date.prototype.addYears =
    Date.prototype.addYears ||
    function (y) {
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + y);
        if (m < this.getMonth()) {
            this.setDate(0);
        }
        return this;
    };
