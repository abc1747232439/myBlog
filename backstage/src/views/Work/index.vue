<template>
  <div class="content flex flex-column">
    <div class="title">
      {{userInfo.motto}}
    </div>
    <div class="blocks flex flex-wrap">
      <div class="block flex align-center justify-center flex-column info">
        <div class="title">信息</div>
        <span>Hello,我是{{userInfo.userName}}</span>
      </div>
      <div class="block  article flex align-center justify-center flex-column articl">
        <div class="title">文章</div>
        <div><span>{{info.articleCount}}</span>篇</div>
        <div class="tip">{{info.articleDiff}}天前发布了一篇文章</div>
      </div>
      <div class="block flex comment align-center justify-center flex-column ">
        <div class="title">留言</div>
        <div><span>{{info.wordCount}}</span>条</div>
        <div class="tip">感谢陌生人的留言</div>
      </div>
      <div class="block flex align-center justify-center flex-column peopleNum">
        <div class="title">用户人数</div>
        <div><span>{{info.userCount}}</span>人</div>
        <div class="tips">感谢你们的支持！</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHomeInfo } from '@/api/user'
export default {
    computed:mapState(['userInfo']),
    data(){
        return {
            info:{}
        }
    },
    created(){
      this.setGui()
    },
    methods: {
      async setGui(){
          const result = await getHomeInfo()
          this.info = result.data.data
      }
    },
}
</script>

<style lang="scss" scoped>
  .content {
      justify-content: flex-start;
      .title {
      color: #248cff;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
    }
    .blocks {
        .block {
            height: 340px;
            flex: 1 0 46%;
            background-color: #fff;
            box-shadow: 0px 2px 19px 0 #248aff38;
            border-radius: 25px;
            position: relative;
            &:nth-of-type(1), &:nth-of-type(2) {
            margin-bottom: 30px;
            margin-top: 30px;
          }
          &:nth-of-type(odd) {
            margin-right: 5%;
          }
          .title {
              position: absolute;
              left: 20px;
              top: 20px;
              color: #74bcff;
              font-size: 16px;
              &::after{
                 content: '';
                  position: absolute;
                  left: 0;
                  bottom: -6px;
                  width: 20px;
                  height: 2px;
                  background: #dbe8f7;
              }
          }
          &.info {
              color: #248cff;
              font-size: 18px;
          }
          &.article, &.comment, &.peopleNum{
        span {
          color: #0d80ff;
          font-size: 40px;
          font-style: oblique;
          margin-right: 6px;
        }
        .tips {
          color: #bdc6cf;
          margin-top: 40px;
        }
      }
        }
    }
  }
</style>