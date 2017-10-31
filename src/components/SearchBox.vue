<template>
  <div class="m-srch">
    <div class="parent">
      <label v-show="showLabel" for="inputId">单曲/歌手/专辑/歌单/MV/用户</label>
      <input type="text" id="inputId" class="txt" name="srchtext" spellcheck="false" v-model="srchText" @keyup="getSearch()"  @click="getSearch()"  @focus="srchFocus()" @blur="srchBlur()">
    </div>
    <div class="srchRstBox" v-show="showResult">
      <div class="srchlist">
        <p class="note"><a :href="'/search/#/?type=1002&s='+srchText">搜“{{srchText}}”相关用户</a> &gt</p>
        <div class="rap">
          <div class="itm" v-if="resorder.indexOf('songs')>-1">
            <h3><em>单曲</em></h3>
            <ul>
              <li v-for="item in resbody.result.songs" v-bind:key="item.id">
                <a href="'/song?id='item.id">{{item.name}} - {{item.artists.map(artist => {return artist.name;}).join(" &nbsp&nbsp")}}</a>
              </li>
            </ul>
          </div>
          <div class="itm" v-if="resorder.indexOf('artists')>-1">
            <h3><em>歌手</em></h3>
            <ul>
              <li v-for="item in resbody.result.artists" v-bind:key="item.id">
                <a href="'/artist?id='item.id">{{item.name}}</a>
              </li>
            </ul>
          </div>
          <div class="itm" v-if="resorder.indexOf('albums')>-1">
            <h3><em>专辑</em></h3>
            <ul>
              <li v-for="item in resbody.result.albums" v-bind:key="item.id">
                <a href="'/album?id='item.id">{{item.name}} - {{item.artist.name}}</a>
              </li>
            </ul>
          </div>
          <div class="itm" v-if="resorder.indexOf('mvs')>-1">
            <h3><em>MV</em></h3>
            <ul>
              <li v-for="item in resbody.result.mvs" v-bind:key="item.id">
                <a href="'/mv?id='item.id">{{item.name}} - {{item.artists.map(artist => {return artist.name;}).join(" ")}}</a>
              </li>
            </ul>
          </div>
          <div class="itm" v-if="resorder.indexOf('playlists')>-1">
            <h3><em>歌单</em></h3>
            <ul>
              <li v-for="item in resbody.result.playlists" v-bind:key="item.id">
                <a href="'/playlist?id='item.id">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmptyObject} from '../assets/js/common.js'
export default {
  data () {
    return {
      showResult:false,
      showLabel:true,
      srchText:"",
      resbody:"",
      resorder:""
    }
  },
  props:{
    inputId: String
  },
  methods:{
    srchFocus:function(){
      this.showLabel=false;
    },
    srchBlur:function(){
      if (this.srchText=="") {
        this.showLabel=true;
      }
      this.showResult=false;
    },
    getSearch:function(){
      if (this.srchText!="") {
        this.$http.get('/api/search/suggest?keywords='+this.srchText,{emulateJSON:true}).then( response => {
          if (isEmptyObject(response.body.result)!=true) {
            // console.log(response.body);
            // console.log(response.body.result.order);
            this.resbody=response.body;
            this.resorder=response.body.result.order;
            this.showResult=true;
          }
        },response => {
          // console.log(response.body);
        });
      }else{
        this.showResult=false;
      }
    }
  }
}
</script>

<style>
.srchRstBox{
  position: relative;
  left: 0;
  border: 1px solid gray;
  box-shadow: 0 0 3px #555;
  border-radius: 5px;
  background-color: #fff;
}
.srchRstBox .note{
  height: 17px;
  padding: 11px 10px;
  border-bottom: 1px solid #e2e2e2;
}
.srchRstBox .note a:hover{
  background-color: #eee;
}
.srchlist .itm:after{
  clear:both;
}
.srchlist .itm h3{
  float: left;
  width: 52px;
  border-right: 1px solid #e1e1e1;
  padding: 10px 0 0 10px;
  line-height: 17px;
}
.srchlist .itm ul{
    margin-left: 62px;
    margin-top: -1px;
    padding: 6px 0 5px;
    border-top: 1px solid #e2e2e2;
    border-left: 1px solid #e2e2e2;
}
.srchlist .itm:nth-child(2n) ul{
  background-color: #f8f8f8;
}
.srchlist .itm ul li{
  width: 100%;
  height: 24px;
  overflow: hidden;
}
.srchlist .itm ul li a{
  display: block;
  margin-left: 10px;
  line-height: 24px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.srchlist .itm ul li:hover{
  background-color: #e2e2e2;
}
</style>
