import Vue from 'vue'
import VueRouter from 'vue-router'
import getPageTitle from '@/util/get-page-title'

Vue.use(VueRouter)

//定义路由
const routes = [
    {
        path:'/',
        component:() => import('@/views/Index'),
        redirect:'home',
        children:[
            {
                name:'home',
                path:'/home',
                component:() => import('@/views/home/Home'),
                meta:{title:'首页'},
            },
            {
                name:'blog',
                path:'/blog/:blogId',
                component:() => import('@/views/blog/Blog'),
                meta:{title:'博客'},
            },
            {
                name:'category',
                path:'/category/:categoryName',
                component:() => import('@/views/category/Category'),
                meta:{title:'分类'},
            },
            {
                name:'tag',
                path:'/tag/:tagName',
                component:() => import('@/views/tag/Tag'),
                meta:{title:'标签'},
            },
            {
                name:'archives',
                path:'/archives',
                component:() => import('@/views/archives/Archives'),
                meta:{title:'归档'},
            },
            {
                name:'moments',
                path:'/moments',
                component:() => import('@/views/moments/Moments'),
                meta:{title:'动态'},
            },
            {
                name:'friends',
                path:'/friends',
                component:() => import('@/views/friends/Friends'),
                meta:{title:'友链'},
            },
            {
                name:'about',
                path:'/about',
                component:() => import('@/views/about/About'),
                meta:{title:'关于我'},
            },
        ]
    }
]

//创建路由实例
const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
	document.title = getPageTitle(to.meta.title)
	next()
})

export default router