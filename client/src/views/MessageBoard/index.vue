<template>
  <div class="wrap">
    <div class="flex flex-column align-center" v-loading.fullscreen.lock="pageLoad">
    <Header></Header>
    <div class="content">
      <MessageInput @comment="comment" :rows="5" :hiddenOuter="true" v-if="!pageLoad" />
      <MessageList :datas="commentList" :isLoading="isLoading" :pageLoad="pageLoad" :isNext="isNext" />
    </div>
  </div>
  </div>
</template>

<script>
import MessageInput from '../ArticleList/components/messageInput'
import MessageList from "./components/messageList"
import { add, list } from '@/api/myWord'
import { bottomHandle, clearBottomHandle } from '@/utils'

export default {
  components: { MessageInput, MessageList },
  data () {
    return {
      commentList: [],
      isLoading: false,
      isNext: true,
      pageLoad: false,
      len: 0,
      page: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created () {
    this.getComData()
  },
  activated () {
    bottomHandle(this.isNext, () => {
      this.page.pageNum += 1
      this.getComData()
    })
  },
  deactivated () {
    clearBottomHandle()
  },
  methods: {
    async comment (content) {
      const data = {
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        content
      }
      try {
        const result = await add(data)
        result.data.data.user = JSON.parse(localStorage.getItem('userInfo'))
        this.commentList.unshift(result.data.data)
        this.$message({
          type: 'success',
          message: '留言成功~~',
          offset: 60
        })
      } catch (e) {}
    },
    // 获取评论列表
    async getComData () {
      try {
        this.isLoading = true
        this.page.pageNum === 1 ? (this.pageLoad = true) : ''
        const data = { ...this.page }
        const result = await list(data)
        const { len, total, datas } = result.data.data
        setTimeout(() => {
          this.commentList.push(...datas)
          this.len += len
          this.isNext = this.len < total
          console.log(this.isNext)
          this.isLoading = false
          this.page.pageNum === 1 ? (this.pageLoad = false) : ''
        }, 1000)
      } catch (e) {
        this.pageLoad = false
      }
    },
  }
}
</script>

<style lang="less" scoped>
/* --cursor-1-bg: #ffffff;
--cursor-1-bg-line: #eef1f4; */
   .wrap {
       height: 100vh;
       background-color: #fff;
       background-size: 10px 10px;
       background-image: linear-gradient(
      90deg,
      #eef1f4 10%,
      transparent 10%
    ),
    linear-gradient(#eef1f4 10%, transparent 10%);
   }
   .content {
    width: 800px;
    padding: 90px 0 0;
  }
  @media screen and (max-width: 800px) {
  .content {
    width: 90%;
  }
}
</style>