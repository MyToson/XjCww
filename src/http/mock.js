import Mock from 'mockjs';
import { Random } from 'mockjs';
Mock.setup({
  timeout:1000
});
const getdata = function(option){
  let datalist = []
  for (let i = 0; i < 20; i += 1) {
    const o = {
      recipeId: Random.guid(),
      billId: Random.string(10),
      orgId: Random.string('number', 8, 10),
      Date:Random.date('yyyy-MM-dd'),
      time:Random.time('A HH:mm:ss'),
      adress:Random.county(),
      viewName: Random.cword(4, 16),
      personName: Random.cname(),
      reason: Random.csentence(10, 32),
    }
    datalist.push(o)
  }
  return{
    data:datalist
  }
}
Mock.mock('/user', /post|get/i,getdata)