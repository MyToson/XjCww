export const checkMobile = function(str) {      //验证手机号
	return new RegExp('^0?(13|15|16|18|14|17|19)[0-9]{9}$').test(str);
};
export const checkMobileStrict = function(str){ //验证手机号（严格）
    let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return reg.test(str);
}
export const checkPhoneNumber = function(str) { //验证座机（区号-号码-分机）
	return new RegExp(
		'(^$)|(^(0\\d{2})-(\\d{8})$)|(^(0\\d{3})-(\\d{7,8})$)|(^(0\\d{2})-(\\d{8})-(\\d+)$)|(^(0\\d{3})-(\\d{7,8})-(\\d+)$)'
	).test(str);
};

export const isIdCard = function(str) { //验证身份证号(简)
    // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	return reg.test(str);
};
export const validateIdCard = function (idCard) { //验证身份证号(严格)
	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
			var idCardWiSum = 0;
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}
			var idCardMod = idCardWiSum % 11;
			var idCardLast = idCard.substring(17);
			if (idCardMod == 2) {
				if (idCardLast == 'X' || idCardLast == 'x') {
					return true;
				} else {
					return false;
				}
			} else {
				if (idCardLast == idCardY[idCardMod]) {
					return true;
				} else {
					return false;
				}
			}
		}
	} else {
		return false;
	}
};
export const isChineseName = function (str) { //验证是否为中文
    // var reg = /^[\u4E00-\u9FA5]{2,4}$/;
    var reg = /[\u4E00-\u9FA5]/ ; 
	return reg.test(str);
};
export const isIncludeChinese = function(str){ //检验是否包含中文
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(str);
}
export const checkEmail = function(str) { //验证邮箱格式
    // var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return reg.test(str);
};

export const userNamePattern = function (str) { //验证用户名规则 4到16位（字母，数字，下划线，减号)
    var reg = /^[a-zA-Z0-9_-]{6,20}$/;
    return reg.test(str);
}
export const checkPassword = function(str){ //验证密码
    var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    return reg.test(str);
}

export const passwordStrong = function (str) { //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return reg.test(str);
}

/****
 * 数字验证处理
 */
export const posPatten = function(str){ //验证正整数
    var reg = /^\d+$/;
    return reg.test(str) ; 
}
export const negPattern = function(str){//负整数正则
    var reg = /^-\d+$/;
    return reg.test(str);
}
export const numberPattern = function (str) { //整数正则
    var reg = /^-?\d+$/; 
    return reg.test(str);
}

export const urlPattern = function(str){ //URL匹配
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(str);
}

export const ip4Pattern = function(str){    //IP4匹配
    var reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return reg.test(str);
}

export const isEmojiCharacter = function (substring) {
    if (substring) {
        substring = substring.toString();
        for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
                    hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
                    hs == 0x2b50) {
                    return true;
                }
            }
        }
    }
};

//日期正则，简单判定,未做月份及日期的判定
var dP1 = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/;
//日期正则，复杂判定
var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
//车牌号正则
var cPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;  


