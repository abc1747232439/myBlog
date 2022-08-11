export default [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "main" */ "../views/Home"),
      meta: {
        title: '漆黑月牙'
      }
    },
    {
      path: "/exhibit",
      name: "Exhibit",
      component: () => import(/* webpackChunkName: "exhibit" */ "../views/Exhibit"),
      meta: {
        title: '展览 | 漆黑月牙'
      }
    },
    {
      path: "/self",
      name: "Self",
      meta: {
        title: '关于我 | 漆黑月牙'
      },
      component: () => import(/* webpackChunkName: "other" */ "../views/SelfInfo")
    },
    {
      path: "/message",
      name: "Message",
      meta: {
        title: '留言板 | 漆黑月牙'
      },
      component: () => import(/* webpackChunkName: "article" */ "../views/MessageBoard")
    },
    {
      path: "/login",
      name: "Login",
      meta: {
        title: '登录 | 漆黑月牙'
      },
      component: () => import(/* webpackChunkName: "other" */ "../views/Login")
    },
    {
      path: "/rainy",
      name: "Rainy",
      meta:{
          title: "听雨眠 | 漆黑月牙"
      },
      component: () => import(/* webpackChunkName: "rainy" */ "../views/Rainy")
    },
    {
      path: "/articleList",
      name: "ArticleList",
      component: () => import(/* webpackChunkName: "article" */ "../views/ArticleList"),
      meta: {
        title: 'Article | 漆黑之牙'
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      props:true,
      meta:{
          title:"详情 | 漆黑之牙"
      },
      component: () => import(/* webpackChunkName: "article" */ "../views/ArticleList/detail"),
    },
  ]