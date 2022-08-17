<template>
  <main>
    <div class="header flex row-reverse space-between">
         <router-link :to="{name: 'Home'}" tag="div" class="icon" ><i class="el-icon-s-unfold"></i></router-link>
    </div>
  <ul class="ken-burns-slideshow">
    <li class="slide" id="slide1"></li>
    <li class="slide" id="slide2"></li>
    <li class="slide" id="slide3"></li>
    <li class="slide" id="slide4"></li>
  </ul>
  <section>
    <h1 class="title">Welcome to My Blog</h1>
    <transition name="el-fade-in-linear" appear>
          <div  class="tipsText" v-if="appear">请向下滚动</div>
     </transition>
  </section>
</main>
</template>

<script>
export default {
    name: 'giantScreen',
    mounted() {
      window.addEventListener('scroll',()=>{
          this.appear = false
      })
    },
    data(){
        return {
            appear:true
        }
    }
}
</script>

<style lang="less" scoped>
@total-slides: 4;
@interval: 6s;

main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 9999;
    .header {
      padding: 0 40px;
      position: absolute;
      left: 0;
      top: 70px;
      width: 100%;
      height: auto;
      z-index: 99999;
      .icon {
          font-size: 20px;
          color: #ff3600;
          background: rgba(255, 255, 255, .8);
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 32px;
          border-radius: 2px;
          cursor: pointer;
        }
    }
    section {
      display: flex;
      position: absolute;
      flex-direction: column;
      top: 50%;
      transform: translate(-50%,-50%);
      left: 50%;
      justify-content: center;
      align-items: center;
      height: 50vh;
      color: white;
      .tipsText {
        color: #cce7f8;
        font-weight: bold;
        display: inline-block;
        animation: shinning 4s infinite;
      }
      .title {
        font-size: 250%;
        text-shadow: 0 2px 2px black;
        letter-spacing: 4px;
        color: #cce7f8;
        animation: shinning 4s infinite;
      }
    }
    .ken-burns-slideshow {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      list-style-type: none;
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transform: scale(1.2);
        animation: kenburns @total-slides * @interval linear infinite;
        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: @interval*1;
        }
        &:nth-child(3) {
            animation-delay: @interval*2;
        }
        &:nth-child(4) {
            animation-delay: @interval*3;
        }
      }
  }
}



#slide1 {
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.3),
      rgba(16, 16, 16, 0.3)
    ),
    url('http://www.appself.top/Bg/preview.jpg');
}

#slide2 {
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.3),
      rgba(16, 16, 16, 0.3)
    ),
    url("http://appself.top/Bg/preview1.jpg");
}
#slide3 {
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.3),
      rgba(16, 16, 16, 0.3)
    ),
    url("http://appself.top/Bg/preview2.jpg");
}
#slide4 {
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.3),
      rgba(16, 16, 16, 0.3)
    ),
    url("http://appself.top/Bg/preview3.jpg");
}

@keyframes kenburns {
  10% {
    opacity: 1;
  }

  25% {
    opacity: 1;
    transform: scale(1);
  }

  40% {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes shinning {
   from {
    text-shadow: 0 0 6px rgba(182, 211, 207, 0.9),
      0 0 30px rgba(182, 211, 207, 0.3), 0 0 12px rgba(15, 115, 223, 0.5),
      0 0 21px rgba(15, 115, 223, 0.9), 0 0 34px rgba(15, 115, 223, 0.8),
      0 0 54px rgba(15, 115, 223, 0.9);
  }
  to {
    text-shadow: 0 0 6px rgba(182, 211, 207, 1),
      0 0 30px rgba(182, 211, 207, 0.4), 0 0 12px rgba(15, 115, 223, 0.6),
      0 0 22px rgba(15, 115, 223, 0.8), 0 0 38px rgba(15, 115, 223, 0.9),
      0 0 60px rgba(15, 115, 223, 1);
  }
}

@media screen and (max-Width:768px) {
    main {
        section {
        .title {
                font-size: 119%;
                letter-spacing: 1px;
            }
            .tipsText {
                padding-top: 10px;
            }
        }
    }
}
@media screen and (max-Width:992px) {
    main {
        section {
        .title {
                font-size: 236%;
                letter-spacing: 2px;
            }
            .tipsText {
                font-size: 20px;
            }
        }
    }
}
</style>