<template>
  <div id="app">
    <pageLoadScrollBar></pageLoadScrollBar>
    <transition class="change" name="fade" mode="out-in" appear>
      <keep-alive :exclude="['detail','articleList']">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import pageLoadScrollBar from "@c/pageLoadScrollBar"
export default {
  components:{
    pageLoadScrollBar,
  }
}
</script>

<style lang="less">
#app {
  font-family: eafont,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: transparent;
}
.fade-leave-active {
  transition: all .6s ease-out;
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-active {
  transition: all .5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
</style>
