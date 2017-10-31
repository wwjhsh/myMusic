<template>
  <div class="outer"
    v-show="mShow">
    <transition name="log-fade">
      <div class="log-content">
        <div class="log-head">登陆</div>
        <div class="log-body">
          <div class="log-page log-phone" v-if="logtype=='phone'">
            <a href="javascript:;" @click="(logtp='email')&&(showTishi=false)">使用邮箱登陆 》</a>
            <p v-show="showTishi">{{tishi}}</p> 
            <input type="text" placeholder="请输入手机号" v-model="phoneName"></input>
            <input type="password" placeholder="密码" v-model="phonePassword"></input>
            <button @click="phoneLogin()">登陆</button>
          </div>
          <div class="log-page log-email" v-if="logtype=='email'">
            <a href="javascript:;" @click="(logtp='phone')&&(showTishi=false)">使用手机号登陆 》</a>   
            <p v-show="true">我被和谐了！</p>         
            <input type="text" placeholder="请输入邮箱号" v-model="emailName"></input>
            <input type="password" placeholder="密码" v-model="emailPassword"></input>
            <button @click="emailLogin()">登陆</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
  .outer {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    width: 40%;
    min-width:400px;
    height:300px;
    border:1px solid gray;
    background:#ddd;
  }

  .log-content {
    /* background: #fff; */
    /* border-radius: 8px; */
    /* padding: 20px; */
    /* text-align: center; */
  }
  .log-head{
    height:40px;
    line-height:40px;
    background:#333;
    padding-left:10px;
    color:white;
    font-size:14px;
  }
  .log-page{
    height:260px;
    width:100%;
    text-align: center;
  }
  .log-page a{
    position: absolute;
    left: 0px;
    right: 0px;
    top:270px;
  }
  .log-page p{
    position: absolute;
    left: 0px;
    right: 0px;
    top:50px;
    color:red;
  }
  .log-page input{
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 30px;
    border: 1px solid gray;
    margin-top: 40px;
  }
  .log-page button{
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 30px;
    border: 1px solid gray;
    background: #449966;
    margin-top: 30px;
  }
  .log-fade-transition {
    transition: opacity .3s linear;
  }

  .log-fade-enter,
  .log-fade-leave {
    opacity: 0;
  }
</style>

<script>
import Popup from './overlay'
import {setCookie} from '../../assets/js/cookie.js'
export default {
  mixins: [Popup],
  data(){
    return{
      logtp:this.logtype,
      phoneName:"",
      phonePassword:"",
      emailName:"",
      emailPassword:"",
      tishi:"123",
      showTishi:false
    }
  },
  props:{
    logtype :String
  },
  computed:{
    
  },
  watch:{
    logtp(val){
      this.$emit('update:logtype',val);
    },
    logtype(val){
      this.logtp=val;
    }
  },
  methods: {
    // 响应 overlay事件
    overlayClick () {
      this.mShow = false
      // console.log(Popup);
    },
    // 响应 esc 按键事件
    escPress () {
      this.mShow = false
    },
    phoneLogin () {
      if(this.phoneName==""){
        this.tishi="手机号不能为空";
        this.showTishi=true;
      }else if (this.phonePassword==""){
        this.tishi="密码不能为空";
        this.showTishi=true;
      }else{
        this.$http.get("/api/login/cellphone?phone="+this.phoneName+"&password="+this.phonePassword).then(response =>{
          console.log(response.body);
          if(response.body.code==400){
            this.tishi="用户名或密码不正确";
            this.showTishi=true;   
          }else if(response.body.code==200){
            this.tishi="登陆成功";
            this.showTishi=true;  
            setCookie('userid',response.body.account.id,1000*60)
            this.$emit("getLogin");
            this.mShow = false;
          }
        },response =>{
          this.tishi="服务器请求失败";
          this.showTishi=true; 

        });
      }
    },
/*
 *一个被和谐掉的功能
 */
    emailLogin(){
      if(this.emailName==""){
        this.tishi="手机号不能为空";
        this.showTishi=true;
      }else if (this.emailPassword==""){
        this.tishi="密码不能为空";
        this.showTishi=true;
      }else{
        this.$http.get("/api/login?email="+this.emailName+"&password="+this.emailPassword).then(response =>{
          if(response.body.code==400){
            this.tishi="用户名或密码不正确";
            this.showTishi=true;   
          }else if(response.body.code==200){
            this.tishi="登陆成功";
            this.showTishi=true; 
            setCookie('username',this.emailName,1000*60)

          }
        },response =>{
          this.tishi="服务器请求失败";
          this.showTishi=true;  
        });
      }
    }
  }
}
</script>