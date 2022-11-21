export default {
	//站点说明
	siteInfo:{
		webTitleSuffix:" - zhn's Blog"
	},
    //可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
	},
	//个人信息
	introduction: {
		avatar: 'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/avatar.jpg',
		name: 'zhn',
		rollText: ['今天比昨天好，这就是希望','失败总是贯穿始终，这就是生活'],
		favorites:[
			{title:'最喜欢的游戏',content:'LoL'},
			{title:'最喜欢的电影',content:'头号玩家'},
			{title:'最喜欢的音乐',content:'暗号'},
		],
		github:'https://github.com/newzhn',
		qq:'https://wpa.qq.com/msgrd?v=3&uin=2571469810&site=qq&menu=yes&jumpflag=1',
		bilibili:'https://space.bilibili.com/513633633',
		wangyiyun:'https://music.163.com/#/user/home?id=500589318',
		email:'zhanhaonan1@163.com'
	},
	// 文章渲染完成标记
	isBlogRenderComplete:false,
	// 专注模式标记
	focusMode:false,
	// 父级评论的初始id
	parentCommentId: -1,
	// 评论数据接收
	commentForm: {
		content: '',
		nickname: '',
		email: '',
		website: '',
		notice: true
	},
	// 用于后端判断该评论所在页面类型(文章、友链、关于我)
	commentQuery: {
		page: 0,
		blogId: null,
		pageNum: 1,
		pageSize: 5
	},
}