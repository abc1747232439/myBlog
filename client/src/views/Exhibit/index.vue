<template>
    <div class="outer">
        <GiantScreen />
        <div class="content-wrap">
            <Article :datas='requestDatas' :isLoading="isLoading" :isNext="isNext" />
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<script>
import GiantScreen from '@c/GiantScreen/index'
import Article from '@c/Article/index'
import { bottomHandle, clearBottomHandle } from '@/utils'

export default {
    name:"home",
    components:{
        GiantScreen,
        Article
    },
    data(){
        return {
            page:{
                pageSize:5,
                pageNum:1,
                isHome:true  /* 表示返回的文章列表不用按时间分组 */
            },
            requestDatas:[],  //需要加载的数据
            len:0,           //此处表示已经返回了多少条文章的数据
            isNext:true,      //表示是否还有数据需要加载
            isLoading:false
        }
    },
    created(){
        this.getArtList()
    },
    activated(){        //与keep-aclive组件配合使用，缓存组件中的数据，再次切换到该组件数据不用再加载
        bottomHandle(this.isNext,()=>{
             this.isLoading = true
             this.page.pageNum += 1
             this.getArtList()
        })
    },
    deactivated(){
        clearBottomHandle()
    },
    methods:{
       async getArtList(){
           const result = await this.$store.dispatch('getArtList',this.page);
           const {len,datas,total} = result.data.data
           datas.forEach(item=>this.$store.dispatch('dataHandle',item))
           setTimeout(()=>{
               this.requestDatas.push(...datas)
               this.len += len
               this.isNext = this.len < total
               this.isLoading = false
           },1000)
       }
    }
}
</script>

<style lang="less" scoped>
    .outer {
        overflow: hidden;
    }
    .content-wrap {
        position: relative;
        padding: 100px 0;
         &::after {
            content: '';
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            position: absolute;
            background: #eaeaea;
            z-index: 0;
            width: 1px;
            height: 100%;
        }
    }
    @media screen and (max-width: 1200px) {
  .content-wrap {
    width: 900px; 
  }
}
@media screen and (max-width: 900px) {
  .content-wrap {
    width: 100%
  }
}
</style>