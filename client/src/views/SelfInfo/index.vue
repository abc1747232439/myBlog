<template>
  <div class="wrap flex justify-center flex-column align-center">
    <Header></Header>
    <div class="glass">
      <span>{{content}}</span>
    </div>
    <ul>
            <li>
                <a href="https://github.com/abc1747232439/myBlog"><i class="iconfont icon-github"></i></a>
            </li>
            <li>
                <a href="https://www.zhihu.com/people/xue-hai-qiu-sheng-18"><i class="iconfont icon-zhihu-circle-fill" id="zhihu"></i></a>
            </li>
        </ul>
  </div>
</template>

<script>
import { getAboutMe } from "@/api/user";

export default {
  data(){
      return {
          content:"",
      }
  },
  created(){
      this.getDetail()
  },
  methods:{
      async getDetail(){
          const result = await getAboutMe()
          this.content = result.data.data.aboutMe
      }
  }
}
</script>

<style lang="less" scoped>
@blur: 20px;
@shadow-opacity: 0.30;
@image: 'http://www.appself.top/Bg/selfbg.jpg';

.wrap {
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: url(@image);
    background-size: cover;
    background-position: center;
    font-family: 'Rajdhani', sans-serif;
}
    ul {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        li{
            position: relative;
            list-style: none;
            margin: 10px;
            a{
              position: relative;
              width: 80px;
              height: 80px;
              display: inline-block;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              color: black;
              font-size: 32px;
              border: 1px solid rgba(255,255,255,0.4);
              border-right: 1px solid rgba(255,255,255,0.2);
              border-bottom: 1px solid rgba(255,255,255,0.2);
              /* 阴影 */
              box-shadow: 0px 5px 45px rgba(0,0,0,0.1);
              animation: animate 3s linear infinite;
              /* 背景模糊 */
              backdrop-filter: blur(2px);
              /* 动画过渡 */
              transition: all 0.5s;
              overflow: hidden;
              &:hover {
              /* 鼠标移入元素沿Y轴上移 */
                  transform: translateY(-20px);
                  &::before {
                      transform: skewX(45deg) translateX(-150px);
                  }
              }
              &::before {
                  content: "";
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  width: 50px;
                  height: 100%;
                  background-color: rgba(255,255,255,0.5);
                  /* 元素沿X轴45度横切，沿X轴右移150px */
                  transform: skewX(45deg) translateX(150px);
                  /* 动画过渡 */
                  transition: all 0.5s;
              }
          }
        }
    }

*, *:before, *:after {
  box-sizing: border-box;
}
.glass {
    width: 60vw;
    height: 60vh;
    backdrop-filter: blur(38px);
    span {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 5;
      color: white;
      font-size: 1.8em;
      padding-left: 0.375em;
      padding-top: 0.0375em;
      overflow: auto;
      white-space: pre-line;   //保留原文本的\n\t等
  }
}
@media (max-width: 980px) {
  span {
      font-size: 4em;
  }
  
}
@media (max-width: 640px) {
   span {
       font-size: 2em;
   }
}
</style>