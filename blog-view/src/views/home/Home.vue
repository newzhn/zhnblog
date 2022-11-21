<template>
    <div>
        <BlogList :totalPage="totalPage" :blogList="blogList"></BlogList>
    </div>
</template>

<script>
import BlogList from '@/components/blog/BlogList.vue';

export default {
    name:'Home',
    components:{BlogList},
    data() {
        return {
            totalPage:4,
            blogList:[
                {
                    id:'001',
                    title:'JavaSE笔记',
                    createTime:'2022-08-03',
                    category:{id:'001',name:'学习笔记'},
                    hits:75,
                    wordsNum:34712,
                    readTime:120,
                    outLine:'基于Java8版本的基础入门个人学习笔记，包含基础mysql的使用',
                    firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png',
                    topping:true,
                    tags:[
                        {id:'001',name:'Java',color:'orange'},
                        {id:'002',name:'笔记',color:'yellow'},
                    ]
                },
                {
                    id:'002',
                    title:'JavaSE笔记',
                    createTime:'2022-08-03',
                    category:{id:'001',name:'学习笔记'},
                    hits:75,
                    wordsNum:34712,
                    readTime:120,
                    outLine:'基于Java8版本的基础入门个人学习笔记，包含基础mysql的使用',
                    firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture07.png',
                    topping:false,
                    tags:[
                        {id:'001',name:'Java',color:'orange'},
                        {id:'002',name:'笔记',color:'yellow'},
                    ]
                },
                {
                    id:'003',
                    title:'JavaSE笔记',
                    createTime:'2022-08-03',
                    category:{id:'001',name:'学习笔记'},
                    hits:75,
                    wordsNum:34712,
                    readTime:120,
                    outLine:'基于Java8版本的基础入门个人学习笔记，包含基础mysql的使用',
                    firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture06.png',
                    topping:false,
                    tags:[
                        {id:'001',name:'Java',color:'orange'},
                        {id:'002',name:'笔记',color:'yellow'},
                    ]
                },
                {
                    id:'004',
                    title:'JavaSE笔记',
                    createTime:'2022-08-03',
                    category:{id:'001',name:'学习笔记'},
                    hits:75,
                    wordsNum:34712,
                    readTime:120,
                    outLine:'基于Java8版本的基础入门个人学习笔记，包含基础mysql的使用',
                    firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png',
                    topping:false,
                    tags:[
                        {id:'001',name:'Java',color:'orange'},
                        {id:'002',name:'笔记',color:'yellow'},
                    ]
                },
            ]
        }
    },
}
</script>

<style>

</style>