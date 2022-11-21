<template>
    <div>
        <div class="ui top attached segment m-padded-lr-big">
			<h2 class="m-text-500" style="text-align: center">{{ about.title }}</h2>
			<meting-js server="netease" type="song" :id="about.musicId" theme="#25CCF7" v-if="about.musicId!==''"></meting-js>
			<div class="typo content m-margin-top-large" v-viewer v-html="about.content"></div>
		</div>
		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
            <Comment :page="2" :blogId="null" v-if="about.commentEnabled"/>
			<h3 class="ui header" v-else>评论已关闭</h3>
		</div>
    </div>
</template>

<script>
import Comment from '@/components/comment/Comment.vue'

export default {
    name:'About',
    components:{Comment},
    data() {
        return {
            about: {
                title: 'Hello,world!',
                musicId: '1473552803',
                content:'',
                commentEnabled: true
            }
        }
    },
}
</script>

<style>
    .content ul li {
		letter-spacing: 1px !important;
	}
</style>