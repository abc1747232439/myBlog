<template>
  <div class="wrap">
    <div class="flex flex-column align-center">
    <Header :like="important&&true" :isLike="detail.isLike" @like="likeChange"></Header>
    <el-backtop></el-backtop>
    <div class="detail">
        <h1 class="title">{{detail.title}}</h1>
        <div class="status flex align-center">
            <span>{{detail.month}} {{detail.day}}, {{detail.year}}</span>
            <span>阅读：{{detail.visitsNum}}</span>
            <span>字数：{{detail.textLen}}</span>
            <span>评论：{{commentList.total}}</span>
            <span>喜欢: {{detail.likeNum}}</span>
        </div>
        <div class="content markdown-body">
            <div v-html="content" v-highlight></div>
        </div>
        <div id="hash">
            <messageInput @comment="comment" :rows="rows" :aiteName="aiteName" @tagClose="tagClose" v-if="important"></messageInput>
            <div v-else class="block">
                <router-link to="{name:'/login'}">登录</router-link>或<router-link to="{name:'/login'}">注册</router-link> 发表评论
            </div>
            <messageList @reply="reply" :lists="commentList" :isLoading="isLoading" :isNext="isNext"></messageList>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import { add, list } from "@/api/articleWord"
import { detail, setLike } from "@/api/article";
import { bottomHandle } from '@/utils'
import { mapState } from "vuex";
import messageInput from "./components/messageInput.vue";
import messageList from "./components/messageList.vue";

export default {
    name:'detail',
    props:['id'],
    components:{
        messageInput,
        messageList
    },
    computed:mapState(['important']),
    data(){
        return {
            detail:{},
            page:{
                pageSize:10,
                pageNum:1
            },
            commentList:[],
            isNext:true,
            isLoading:false,
            content:'',
            rows:6,
            len:0,
            aiteName:''
        }
    },
    async created(){
        await this.getDetail(this.id,JSON.parse(localStorage.getItem('userInfo')).id)
        await this.markdownRender() // markdown 加载
    },
     mounted() {
         this.getComData()         
         bottomHandle(this.isNext,()=>{
              this.isLoading = true
              this.page.pageNum += 1
              this.getComData()
         })
    },
    methods:{
      async likeChange(e){
         if(!e){
            const data = {
                articleId: this.detail.id,
                userId: JSON.parse(localStorage.getItem('userInfo')).id
            }
            const result = await setLike(data)
            this.$message({ type: 'success', message: '相识虽浅,似是经年', offset: 60 })
            this.$set(this.detail, 'isLike', true)
            this.$set(this.detail, 'likeNum', this.detail.likeNum + 1)
         }else {
            this.$message({ type: 'error', message: '您已经喜欢过这篇文章啦~~', offset: 60 })
        }
       },
       reply(data){
         this.aiteName = data.userName
         this.floorId = data.parentId
       },
       // 清楚掉aite后 删除艾特信息
        tagClose () {
            this.aiteName = ''
            this.floorId = ''
        },
        async getDetail(id,userId){
            const result = await detail(id,userId)
            /* 此处为什么用await??? */
            const data = await this.$store.dispatch('dataHandle',result.data.data)
            document.title = data.title
            this.detail = data
        },
        async comment(content){
            const data = {
                articleId:this.id,
                userId:JSON.parse(localStorage.getItem('userInfo')).id,
                content:`@${this.aiteName} ${content}`
            }
            this.floorId && (data.floorId = this.floorId)
            try {
                const reqResult = await add(data)
                this.getComData()
                this.$message({
                    type: 'success',
                    message: '评论成功~~',
                    offset: 60
                })
            }catch(e){
            
            }
        },

        async getComData() {
            const data = {
                ...this.page,
                articleId:this.id
            }
            const result = await list(data)
            const { len, total } = result.data.data
            setTimeout(() => {
                this.commentList = result.data.data
                this.len += len
                this.isNext = this.len < total
                this.isLoading = false
            }, 1000)
        },

        markdownRender (){
            marked.setOptions({
                renderer: new marked.Renderer(),
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            })
            this.content = marked(this.detail.content)
        }
    }

}
</script>

<style lang="less" scoped>
.wrap {
    background-color: #fff;
       background-size: 10px 10px;
       background-image: linear-gradient(
      90deg,
      #eef1f4 10%,
      transparent 10%
    ),
    linear-gradient(#eef1f4 10%, transparent 10%);
    height: 100vh;
}
    .detail {
        width: 800px;
        .title {
            font-size: 30px;
            padding: 130px 0 22px;
            color: #333;
        }
        .status {
            color: #6a737d;
            position: relative;
            line-height: 22px;
            span {
                font-size: 13px;
                margin-right: 10px;
            }
            &::before {
                content: "";
                width: 100%;
                height: 1px;
                background: #eaeaeaa6;
                position: absolute;
                left: 0;
                bottom: -30px;
            }
        }
        .content {
            padding-top: 100px;
            margin-bottom: 100px;
            font-size: 14px;
        }
        #hash {
            margin-bottom: 100px;
            .block {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    @media screen and (max-width: 800px) {
  .detail {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .detail {
    .content {
      padding-top: 30px;
    }
    .title {
      font-size: 26px;
      padding-top: 88px;
    }
    .status {
      span {
        font-size: 12px;
      }
    }
  }
}
</style>