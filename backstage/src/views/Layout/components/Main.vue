<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:"Main"
}
</script>

<style lang="scss" scoped>
      .main {
        position: absolute;
        right: 0;
        top: 0;
        width: 81vw;
        height: 100vh;
        background-color: #f8fbff;
        box-shadow: 0px 12px -2px 2px #0d80ff;
        border-radius: 30px;
        padding: 40px;
        box-sizing: border-box;
        overflow-x: hidden;/* 水平溢出裁剪，垂直溢出可滚动 */
        overflow-y: scroll;
        &::-webkit-scrollbar {
      width: 5px;           /* 设置滚动条 */
      height: 8px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #0d82ff8e; 
  }
  }
  @media (max-width:768px){
      .main {
          width: 75vw;
      }
  }
</style>