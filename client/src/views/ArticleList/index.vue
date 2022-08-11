<template>
  <div class="bg">
    <div class="flex flex-column align-center" v-loading.fullscreen.lock="pageLoad">
     <Header></Header>
     <div class="list">
        <ul class="monUl" v-for="(item,index) in requestDatas" :key="index">
            <li class="monTitle">{{item[0].month}},{{item[0].year}}</li>
            <router-link tag="ul" class="mContent fadeInup" :to="{name:'Detail',params:{id:thunk.id}}" v-for="thunk in item" :key="thunk.id">
                <li class="mCli flex space-between">
                    <div class="mCLeft flex align-center">
                        <img :src="mainUrl+thunk.imgUrl" alt="thunk.title" title="thunk.title">
                        <div class="mCText flex flex-column space-around">
                            <span>{{thunk.title}}</span>
                            <span>{{thunk.likeNum}} 喜欢 / {{thunk.visitsNum}}读</span>
                        </div>
                    </div>
                    <span class="mCRight" flex align-center>{{thunk.day}}</span>
                </li>
            </router-link>
        </ul>                                                               
     </div>
     <div class="footer">
        <Loader v-show="isLoading&&!pageLoad"></Loader>
        <span class="notMany" v-show="!isLoading&&!isNext">没有更多了~~O(∩_∩)O</span>
     </div>
    </div>
  </div>
</template>

<script>
import Loader from "@c/Loading"
import { WOW } from 'wowjs'
import { bottomHandle, clearBottomHandle } from '@/utils'
import Header from "@/components/Header/index.vue"

export default {
    name:'articleList',
    components:{
    Loader,
    Header
},
    activated(){
        bottomHandle(this.isNext,()=>{
            this.page.pageNum += 1
            this.getArtList()
        })
    },
    deactivated(){
        clearBottomHandle()
    },
    data(){
        return {
            page:{
               pageSize:15,
               pageNum:1
            },
            requestDatas: [],
            isLoading: false,
            isNext: true,
            len:0,
            pageLoad:false
        }
    },
    created(){
        this.getArtList()
    },
    methods:{
       async getArtList(){
          this.isLoading  = true
          const result = await this.$store.dispatch("getArtList",this.page)  
          const {len,total,datas} = result.data.data
          setTimeout(()=>{
              this.requestDatas.push(...datas)
              this.isLoading = false
              this.len += len
              this.pageLoad = false
              this.isNext = len !== total
          },500)
        }
    }
}
</script>

<style  lang="less" scoped>
    .bg {
       height: 100vh;
        background:radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%);
        overflow: hidden;
    }
    .list {
        width: 800px;
        padding: 80px 0 0;
        .monUl {
            .monTitle {
                color: #6e7ab5;
                font-weight: 400;
                font-size: 18px;
                margin: 30px 0 10px;
                list-style: none;
                position: relative;
                &::before {
                    content: "";
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #dce8ec;
                    display: inline-block;
                    border: 3px solid #afcfff;
                    margin-right: 22px;
                    box-sizing: border-box;/*去除边框与内边距对盒子宽高的影响 */
                }
            }
            .mContent {
                padding-left: 30px;
                border-left: 1px solid #f3fafd;
                margin-left: 6px;
                .mCli {
                   padding: 25px 0;
                   border-bottom: 1px solid #f3fafd;
                }
                .mCLeft {
                    img {
                        width: 45px;
                        height: 45px;
                        border-radius: 4px;
                        margin-right: 15px;
                        overflow: hidden;
                        cursor: pointer;
                        border: 1px solid #f3fafd;
                    }
                    .mCText {
                        span {
                            color: #a1a0d6;
                            font-size: 13px;
                            letter-spacing: 0;
                            &:first-of-type {
                                color: #5b6773;
                                cursor: pointer;
                                font-size: 15px;
                                padding-bottom: 10px;
                                transition: all .6s;
                                &:hover {
                                    text-decoration: none;
                                    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='blue' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%;
                                    background-size: 20px auto;
                                    animation: waveMove 1s infinite linear;
                                }
                            }
                        }
                    }
                }
                .mCRight {
                    color: black;
                    font-size: 13px;
                }
            }
        }
    }
    .footer {
        height: 40px;
        margin-bottom: 40px;
        .notMany {
            padding: 20px 0 0;
            color: #909090;
            letter-spacing: 2px;
            transition: all .3s;
            border-radius: 4px;
            text-align: center;
            display: inline-block;
            width: 100%;
        }
    }
</style>