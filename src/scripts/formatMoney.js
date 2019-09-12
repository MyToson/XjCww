/**格式化金额
 *@param places number 保留的小位数，否则默 认保留两位
 *@param symbol string  表示前面表示的标志 默认是￥
 *@param thousand string 表示每三位隔开的符号,默认是”,“
 *@param decimal  string 表示小数点的符号,默认是”.“
 * */
function formatMoney(price, places, symbol, thousand, decimal) {
	places = !isNaN((places = Math.abs(places))) ? places : 2;
	symbol = symbol !== undefined ? symbol : '￥';
	thousand = thousand || ',';
	decimal = decimal || '.';
	var number = price,
		negative = number < 0 ? '-' : '',
		i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
		j = (j = i.length) > 3 ? j % 3 : 0;
	return (
		symbol +
		negative +
		(j ? i.substr(0, j) + thousand : '') +
		i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
		(places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
	);
	
}

export default (formatMoney = formatMoney); //金额格式匹配
