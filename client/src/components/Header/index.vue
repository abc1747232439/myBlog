<template>
  <div class="nav flex align-center space-between">
    <div class="left flex align-center" @click="toHome">
        Mr.Wu
    </div>
    <div class="right flex align-center">
        <div class="options">
           <span v-if="like"><i class="iconfont" :class="isLike?' icon-xin':'icon-xin1 red'" @click="$emit('like',isLike)"></i></span>
        </div>
        <div class="avatar">
            <img :src="user.avatar" alt="" @click="toHome">
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Header',
    data(){
        return {
            user:{}
        }
    },
    props:{
        like:{
            type:Boolean,
            default:false
        },
        isLike:{
            type:Boolean,
            default:false
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem('userInfo'))
    },
    methods:{
        toHome(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
    .nav {
        position: fixed;
        top: 0;
        padding: 15px 15px;
        width: 100%;
        border-bottom: 2px solid #fff;
        z-index: 999;
        background-color: #3399cc;
        border-radius: 30%;
        .left {
            font-size: 20px;
            cursor: pointer;
        }
        .right {
            .options {
              padding: 0 15px;
              i {
                  font-size: 22px;
                  cursor: pointer;
              }
            }
            img{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
</style>