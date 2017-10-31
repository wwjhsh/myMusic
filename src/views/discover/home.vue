<template>
    <div>
        <div class="page-top">123</div>
        <div class="banner" :style="{background:'url('+backgroundImg+')',backgroundRepeat:'no-repeat',backgroundSize:'cover'}">
            <!-- <div class="page-container" :style="{background:'url('+backgroundImg+')',backgroundRepeat:'no-repeat',backgroundSize:'cover'}"> -->
            <div class="page-container">
                <img :src="backgroundImg" :style="bannerStyle"/>
                <a class="banner-left" ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABrUlEQVR4Xu3b4U3EMAwFYL8JYASYDNiADeA2YAOOze4mgA2MLIFUVer1pHPs5yT9f23fFycnOSlk8AuD55cJMCtgcIE5BQYvAP5FUFXfROT1b6A+ABw8B416Cqjqp4g8rwIfALx7IdACbIS33CcAj10DXAhvuc8AHroF2AlvufudAleE/wKwXhNuKgaaNSAjvMlRAGSFpwDIDJ8OkB0+FYAhfBoAS/gUAKbw4QBs4UMBGMOHAbCGDwFgDt8cgD18U4AK4ZsBVAnfBKBSeHeAauFdASqGdwNQVevSWvt663Lv5NzUBlr82KUhoqrfInK/8VK04T0r4EdE7jYAjgBevEbM+z5eFbA3BWgRXABsVFT1KCJPF0aIEsENoCqCK0BFBHeAaghNACohNAOogtAUoAJCcwB2hBAAZoQwAFaEUABGhHAANoQUACaENAAWhFQABoR0gGwECoBMBBqALAQqgCsR+j0o+d9O22mv9X9WeKcS+j4rvGyqblRC/1NghWAtd/tgwvYerLPs9q2A28aI92ZF5P3o/gUiw88KYDktHj3qy+fNKZCpz/Ds4SvgF4XV+0EannhHAAAAAElFTkSuQmCC"/></a>
                <a class="banner-right"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACUklEQVR4Xu2a61HDQAyEVxVAB9ABlBA6oANIBYQKCBUAFRAqACqAEqACoAOoQMzOOEwm48fFOekU7Pvt1363Wp91Fgx8yMD1YwQwOmDgBMYSGLgBxhDMXgKqug/gBsB55a5bANci8h3RbRYAHgGcrol9A3ASEYIFAG2Y6ZAQLADQ6nu7AsECAGv+oqXeQzkhOwAKV9UFgLMWCHQJM4Ewig4TALsEwQzArkAwBbALEMwBVBC4KLrvyIRLEWF2uA4XAIkQeNjUG4IbgKgQXAFEhOAOoILAbwXWe9OKkYfNROTOOhCKAKggHAN47YCwEJGpJYRiAKJAKAogAoTiAFYgPAE4aLG7STmEAFBBYCeJmXDk+SUZBkApCKEAlIAQDoA3hJAAViCwu9TWWHkWkfUG7EbLhrAAliq6uksispWGrU7eCHWPg1WVq8UXAHxD1I0vETnscem/U8ICSBBPEewhsEx6j5AAEsU/iMhy9+n/APAUT2qhHJAoPmvXKAyAEuLDOEBVJwC4qdqU9nzWrDO/DI3iDlDVro6xmfjiDigtviiACOKLAUgQ/1M1Rc03StwzIFH8xGvn2BVANPGuJaCqVwDmLWtW2t5t5l1fg6rKjdG2dXsR8S4OiCzeHEB08aYAEsS/839CEfns/S2b4USTt0CieAZe8b9HswNQVSY9E79pcOZDiDcpAVX9ANDUpwsl3goAa7pujy+ceCsAdSUQUrwJAF60yoFZFQL8oJlHCLy6UMoeghneTK6XGAG44g54s9EBASfF9ZFGB7jiDnizwTvgF3UcC1CIOVnkAAAAAElFTkSuQmCC"/></a>
                <ul class="banner-points">
                    <li v-for="item,index in bannerData" :class="{choosed:choosedBannerIdx==index}" @click="pointClick(index)"></li>
                </ul>
            </div>
        </div>
        <div class="discover-main">
            <div class="discover-left">123</div>
            <div class="discover-right">123</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                bannerData:[],
                choosedBannerIdx:2,
                timeOutId:"",
                timeOutFun:"",
                bannerStyle:""
            }
        },
        created(){
            var _this=this;
            // this.timeOutId=setTimeout(timeOutFun,2000);
            (function timeOutFun(){
                _this.timeOutFun=timeOutFun;
                _this.choosedBannerIdx++;
                if(_this.choosedBannerIdx<_this.bannerData.length){
                    _this.timeOutId=setTimeout(timeOutFun,2000);
                }else{
                    _this.choosedBannerIdx=0
                    _this.timeOutId=setTimeout(timeOutFun,2000);                    
                }
            })();
        },
        mounted(){
            this.$http.get("/api/banner").then(response=>{
                this.bannerData=response.body.banners;
                console.log(this.bannerData)
            })
        },
        computed:{
            backgroundImg: function(){
                if (this.bannerData[this.choosedBannerIdx]!=undefined) {
                    return this.bannerData[this.choosedBannerIdx].pic;
                }else{
                    return "http://p3.music.126.net/s25q2x5QyqsAzilCurD-2w==/7973658325212564.jpg"
                }
            }
        },
        methods:{
            pointClick:function (index) {
                this.choosedBannerIdx=index;
                clearTimeout(this.timeOutId);
                setTimeout(this.timeOutFun,2000);
            }
        }
    }
</script>
<style>
    .page-top{
        height: 105px;
        width:100%;
        
    }
    .banner{
        height:336px;
        width:100%;
        /* background:red; */
    }
    .page-container{
        position:relative;
        width:982px;
        height:100%;
        margin:0 auto;
    }
    .page-container>img{
        width:100%;
        height:100%;
    }
    .banner-left,.banner-right{
        position:absolute;
        height:60px;
        width:30px;
        line-height:60px;
        display:inline-block;
        top:138px;
    }
    .banner-left:hover,.banner-right:hover{
        background:rgba(66,66,66,0.3);
    }
    .banner-left img,.banner-right img{
        position:relative;
        height:40px;
        width:40px;
        top:10px;
        left:-5px;
    }
    .banner-left{
        left:-68px;
    }
    .banner-right{
        right:-68px;
    }
    .banner ul{
        position:absolute;
        margin:auto;
		left: 50%;
		top:90%;
		transform:translateX(-50%);
    }
    .banner ul li{
        float:left;
        height:6px;
        width:6px;
        background-color:gray;
        border-radius:3px;
        margin:0 8px;
    }
    .banner ul li:hover,.banner ul li.choosed{
        background-color:red;
    }   
    .discover-main{
        width:980px;
        min-height:700px;
        margin:0 auto;
        background-color:#fff;
        border: 1px solid #d3d3d3;
        border-width: 0 1px;
    } 
    .discover-left{
        float:left;
        width:100%;
        /* height:1400px; */
        margin-right:-250px;

    }
    .discover-right{
        float:right;
        width:249px;
        /* min-height:700px;       */
        border-left:1px solid #d3d3d3;
    }
</style>