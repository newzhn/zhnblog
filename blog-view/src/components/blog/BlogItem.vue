<template>
    <div class="ui padded attached segment m-padded-tb-large m-padded-lr m-margin-bottom-small m-box">
        <!--置顶图标-->
        <a v-if="blogDTO.topping" class="ui red mini right corner label">
            <i class="arrow alternate circle up icon"></i>
        </a>
        <div class="ui middle aligned mobile reversed stackable grid">
            <!--博客梗概-->
            <div class="ten wide column">
                <div class="ui grid m-margin-left">
                    <!--title-->
                    <div class="row m-padded-tb-small" style="padding-top: 1.5em !important;">
                        <h3 class="ui header m-scaleup">
                            <a class="m-black ">{{blogDTO.title}}</a>
                        </h3>
                    </div>
                    <!--文章简要信息-->
                    <div class="row m-padded-tb-samll">
                        <div class="ui mini horizontal link list">
                            <!--发布日期-->
                            <div class="item m-align m-datetime">
                                <i class="calendar icon m-align"></i><strong class="m-align">2022-7-16</strong>
                            </div>
                            <!--博客分类-->
                            <div class="item m-align">
                                <i class="folder open icon m-align"></i><strong><a class="m-align">学习笔记</a></strong>
                            </div>
                            <!--阅读量-->
                            <div class="item m-align m-views">
                                <i class="eye icon m-align"></i><strong class="m-align">2342</strong>
                            </div>
                            <!--字数-->
                            <div class="item m-align m-common-black">
                                <i class="pencil alternate icon m-align"></i><strong class="m-align">{{blogDTO.wordsNum}}字</strong>
                            </div>
                            <!--阅读时长-->
                            <div class="item m-align m-common-black">
                                <i class="clock icon m-align"></i><strong class="m-align">阅读时长≈{{blogDTO.readTime}}分</strong>
                            </div>
                        </div>
                    </div>
                    <!--文章描述-->
                    <div class="row m-padded-tb-small">
                        <p class="m-text">{{blogDTO.outLine}}</p>
                    </div>
                    <!--横线-->
                    <div class="ui section divider m-margin-lr-no"></div>
                    <!--阅读全文按钮和文章标签-->
                    <div class="row m-padded-tb-mini">
                        <div class="row m-padded-tb-small">
                            <div class="column m-padding-left-no">
                                <div class="ui mini tag labels">
                                    <router-link :to="`/tag/${tag.name}`" class="ui label" :class="tag.color" v-for="tag in blogDTO.tags" :key="tag.id">
                                        {{tag.name}}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <router-link :to="`/blog/${blogDTO.id}`" class="color-btn m-margin-right">阅读全文</router-link>
                    </div>
                </div>
            </div>
            <!--博客配图-->
            <div class="six wide column">
                <a >
                    <img :src="blogDTO.firstPicture" alt="" class="ui rounded image m-center">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'BlogItem',
    props:{
        blogDTO:{
            type:Object,
            required:true
        }
    },
    computed:{
		...mapState(['clientSize'])
	},
}
</script>

<style scoped>
    .m-padded-tb-samll {
        padding-top: 1em !important;
        padding-bottom: 1em !important;
    }
    
    .m-margin-left {
        margin-left: 1.5em !important;
    }
    .m-margin-right {
        margin-right: 1.0em !important;
    }
    .m-margin-bottom-small {
        margin-bottom: 1.3em !important;
    }
    .m-text {
        font-weight: 300 !important;
        letter-spacing: 1px !important;
        line-height: 1.8 !important;
        opacity: 0.8 !important;
    }
    .m-align {
        vertical-align: middle !important;
    }
</style>