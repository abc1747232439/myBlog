<template>
  <div id="app">
    <transition name="el-fade-in">
       <router-view></router-view>
    </transition>
  </div>
</template>



<style lang="scss">
  #app {
  font-family:  Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
