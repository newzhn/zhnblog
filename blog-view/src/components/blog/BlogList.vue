<template>
    <div>
        <!-- 博客列表 -->
        <BlogItem v-for="item in blogList" :key="item.id" :blogDTO="item"></BlogItem>
        <!-- 页码 -->
        <Pagination :totalPage="totalPage"></Pagination>
    </div>
</template>

<script>
import BlogItem from './BlogItem.vue';
import Pagination from './Pagination.vue';

export default {
    name:'BlogList',
    components:{BlogItem,Pagination},
    data() {
        return {
            
        }
    },
    props:{
        totalPage:{
            type:Number,
            required:true
        },
        blogList:{
            type:Array,
            required:true
        }
    }
}
</script>

<style>

</style>