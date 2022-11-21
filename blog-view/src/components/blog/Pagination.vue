<template>
    <el-pagination style="text-align:center"
        background layout="prev, pager, next" :page-count="totalPage" hide-on-single-page>
    </el-pagination>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        totalPage:{
            type:Number,
            required:true
        }
    }
}
</script>

<style>

</style>