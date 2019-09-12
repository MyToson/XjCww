const routes = [
  {
      path: '/',
      name: 'index',
      meta:{
          title:'首页'
      },
      component: resolve => require(['../page/index'], resolve),
  }
]
export default routes







