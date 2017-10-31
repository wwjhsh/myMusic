<template>
    <div>
    	<div class="g-topbar">
			<div class="m-top btop">
				<div class="wrap">
					<h1 class="logo"><a href="/discover">MineMusic</a></h1>
					<ul class="m-nav">
						<li v-for="(item,index) in topnavitems" :key="item.id" class="btop" >
							<span class="btop">
								<a class="btop" :class="[{slt:isNavSelect(index)}]" :href="item.href" @click="topNavClick(item,topnavitems)">
									<em>{{item.title}}</em>
									<sub class="cor btop">&nbsp;</sub>
								</a>
							</span>
						</li>
					</ul>
					<div class="m-tophead" v-on:mouseover="topHeadLiShow()" v-on:mouseout="topHeadLiHide()" v-if="!isLogin">
						<a @click.self.prevent href="#">登陆</a>
						<ul class="th-list" v-show="thseen">
							<li @click="(loginBoxShow = true )&&(logtype ='phone')">手机号登陆</li>
							<li @click="(loginBoxShow = true )&&(logtype ='email')">邮箱登陆</li>
						</ul>
					</div>
					<div class="m-tophead" v-on:mouseover="topHeadLiShow()" v-on:mouseout="topHeadLiHide()" v-if="isLogin">
						<a @click.self.prevent href="#"><img :src="user.avatarUrl" /> <span>{{user.name}}</span></a>
						<ul class="th-list" v-show="thseen">
							<li>我的主页</li>
							<li>我的消息</li>
							<li>我的等级</li>
							<li>会员中心</li>
							<li>个人设置</li>
							<li>导入歌单</li>
							<li @click="exit()">退出</li>

						</ul>
					</div>
					<SearchBox inputId="topSrch" class="btop" id="srchbox"></SearchBox>
				</div>
			</div>
		    <div class="m-subnav m-subnav-up btop" :class="[{fhide:subNavUpHide}]"></div>
		    <div class="m-subnav btop" :class="[{fhide:subNavHide}]">
		    	<div class="wrap">
			    	<ul class="m-nav-second">
						<li v-for="(item,index) in topSecondItems" :key="item.id">
							<a class="" :class="[{slt:isSecNavSelect(index)}]" :href="item.href" @click="topNavClick(item,topSecondItems)" ref="subnav">
								<em>{{item.title}}</em>
							</a>
						</li>
					</ul>
		    	</div>
		    </div>
    	</div>
			<LoginBox :show.sync="loginBoxShow" :logtype.sync="logtype" @getLogin="setLogin()">
				<p>这是一个对话框点击遮盖层或者按 ESC 键可以关闭</p>
			</LoginBox>
    </div>
</template>

<style>
.g-topbar{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
    zoom: 1;
}
.m-top{
	position: relative;
    z-index: 1000;
    height: 70px;
    background-position: 0 -80px;
    background-repeat: repeat-x;
}
.m-top .wrap{
	width: 1000px;
	margin: 0 auto;
}
.m-top .wrap .logo{
	float: left;
	width: 150px;
	line-height:70px;
	font-size: 20px;
}
.m-top .wrap .logo a{
	color: #991111;	
}
.m-top .wrap .m-nav {
	float: left;
}
.m-top .wrap .m-nav li{
	float: left;
	height: 70px;
	line-height: 70px;
    font-size: 14px;
	position: relative;
    background-position: right -300px;
}
.m-top .wrap .m-nav li span{
	float: left;
    background-position: left -300px;
}
.m-top .wrap .m-nav li span a{
	display: block;
	height: 70px;
	position: relative;
    padding-left: 2px;
    text-align: center;
    line-height: 76px;
    background-position: left -300px;
}
.m-top .wrap .m-nav li span a.slt{
	background-position: left -155px;
}
.m-top .wrap .m-nav li span a em{
	padding: 0 20px 0 18px;
	color: white;
}
.m-top .wrap .m-nav li span a.slt sub{
	display: block;
    position: absolute;
    left: 50%;
    top: 63px;
    width: 14px;
    height: 9px;
    margin-left: -7px;
    overflow: hidden;
    background-position: -226px 0;
}
.m-top .wrap .m-tophead{
	position: relative;
	left: 20px;
	float: right;
	margin-top: 10px;
	height: 50px;
	line-height: 50px;
}
.m-top .wrap .m-tophead a{
	color: #ddd;
	font-size: 14px;
	width: 30px;
	height: 50px;
	line-height: 50px;
	text-align: center;
}
.m-top .wrap .m-tophead a img{
	position: relative;
	width: 40px;
	height: 40px;
	top:5px;
	border-radius: 20px;
}
.m-top .wrap .m-tophead a span{
	position: relative;
	top: -10px;
}
.m-top .wrap .m-tophead .th-list{
	/*display: none;*/
	position: absolute;
	top:46px;
	left: -65px;
	border-radius: 3px;
    border: 1px solid #404040;
    background: #2a2a2a;
    width: 160px;
    color: #666;
    /*padding-left: 10px;*/
}
.m-top .wrap .m-tophead .th-list li{
	color: #ddd;
	padding-left: 10px;
}
.m-top .wrap .m-tophead .th-list li:hover{
	background-color: #333;
}
.m-top .wrap .m-tophead a:hover{
	color: gray;
}
/*.m-top .wrap .m-tophead a:hover+.th-list{
	display: block;
}*/
.m-top .wrap #srchbox{
	float:right;
}
.m-top .wrap .m-srch{
	float: right;
    width: 210px;
    height: 31px;
    margin-top: 21px;
    background-position: 0 -550px;
}
.m-top .wrap .m-srch .parent{
	position: relative;
	margin: 8px 0 0 33px;
}
.m-top .wrap .m-srch input{
	/*float: right;*/
	width: 90%;
	position: absolute;
    margin: 0;
    padding: 0;
    background: transparent;
}
.m-top .wrap .m-srch label{
	display: block;
	/*width: 90%;*/
	position: absolute;
    margin: 0;
    padding: 0;
}
.m-top .wrap .m-srch .srchRstBox{
	top:30px;
	width: 250px;
}
.m-subnav{
	z-index: 90;
    height: 35px;
    background-position: 0 -230px;
    background-repeat: repeat-x;
}
.m-subnav .wrap{
	width: 850px;
	margin: 0 auto;
	padding-left: 150px;
}
.m-nav-second li{
	float: left;
	padding:6px 20px;
}
.m-nav-second li a{
	display: inline-block;
	height: 22px;
	line-height: 22px;
	padding:0 10px;
	color: #fff;
}
.m-nav-second li a:hover,.m-nav-second li a.slt{
	border-radius: 11px;
	background-color: #991111;
}
.m-subnav-up{
	height: 10px
}
</style>

<script>
import SearchBox from './SearchBox.vue'
import LoginBox from './modal/login.vue'
import {getCookie,delCookie} from '../assets/js/cookie.js'
export default {
  data () {
    return {
    	//主要菜单信息
    	topnavitems:[
    		{id:1,title:'发现音乐',href:"/discover"},
    		{id:2,title:'我的音乐',href:"/my/m/music/"}
    	],
    	//二级菜单信息
    	topSecondItems:[
    		{id:1,title:'推荐',href:"/discover"},
    		{id:2,title:'排行榜',href:"/discover/toplist"},
    		{id:3,title:'歌单',href:"/discover/playlist"},
    		{id:4,title:'主播电台',href:"/discover/djradio"},
    		{id:5,title:'歌手',href:"/discover/artist"},
    		{id:6,title:'新碟上架',href:"/discover/album"},
    	],
    	subNavHide:false,//二级菜单显隐性
    	subNavUpHide:true,//菜单装饰显隐性
    	nowlocation:window.location.pathname,//网址信息
    	thseen:false,
			isLogin:false,
			loginBoxShow:false,
			logtype:"",
			user:{
				avatarUrl:"#",
				name:"",
			}
    }
  },
  components: {SearchBox,LoginBox},
  computed:{
  },
  mounted() {
		// console.log(getCookie('username'));
		if(getCookie('userid')){
			this.setLogin();
		}
	},
	
  methods:{
  	isNavSelect:function(index){//主要菜单是否选中
			return (window.location.pathname.indexOf(this.topnavitems[index].href)>-1)||(window.location.pathname=="/"&&index==0);
		},
		isSecNavSelect:function(index){//二级菜单是否选中
			return (window.location.pathname==this.topSecondItems[index].href)||(window.location.pathname=="/"&&index==0);
		},
		topNavClick:function(item,items){//菜单被选中的事件
			if (items==this.topnavitems) {//主菜单一被选中时的事件
				if (item.id==1) {
					this.subNavHide=false;
					this.subNavUpHide=true;
				}else{
					this.subNavHide=true;
					this.subNavUpHide=false;
				}
			}
		},
		topHeadLiShow:function(){
			this.thseen=true;
		},
		topHeadLiHide:function(){
			this.thseen=false;
		},
		exit:function(){
			delCookie('userid');
			this.isLogin=false;
		},
		setLogin:function(){
			var userid=getCookie("userid");
			this.$http.get("/api/user/detail?uid="+userid).then(response =>{
				console.log(response.body);

				this.user.avatarUrl=response.body.profile.avatarUrl;
				this.user.name=response.body.profile.nickname;
				this.isLogin=true;
			},response=>{

			});
		}
  }
}
</script>
