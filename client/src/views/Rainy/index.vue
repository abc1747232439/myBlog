<template>
  <div class="rain">
    <img class="rain-bg" src="https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load 150w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load 300w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load 400w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load 600w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load 800w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load 1200w, https://images.pexels.com/photos/11566128/pexels-photo-11566128.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load 1600w" draggable="false">
    <img class="words" src="@img/rain/words.png" draggable="false">
    <div class="header flex">
         <router-link :to="{name: 'Home'}" tag="div" class="icon" ><i class="el-icon-s-unfold"></i></router-link>
    </div>
    <ul class="option flex">
      <li v-for="(item,index) in rainIcon" :key="index">
          <span @click="music(index,item.active)">
            <img :src="item.on" alt="" v-if="item.active">
            <img :src="item.off" alt="" v-else>
          </span>
          <audio class="music" loop preload="auto">
             <source type="audio/mpeg" :src="item.music">
          </audio>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:"Rainy",
    data(){
        return {
           audioDom:[],                                                                                                                  
           rainIcon: [
                {
                    on: require('@img/rain/rain_off.png'),//off与on相反的原因 放在页面上由于背景的原因会导致不清晰
                    off: require('@img/rain/rain_on.png'),
                    music: 'https://downsc.chinaz.net/Files/DownLoad/sound1/202207/y1046.mp3',
                    active: false
                },
                {
                    on: require('@img/rain/rain2_off.png'),
                    off: require('@img/rain/rain2_on.png'),
                    music: 'https://downsc.chinaz.net/Files/DownLoad/sound1/201904/11461.mp3',
                    active: false
                },
                {
                    on: require('@img/rain/rain3_off.png'),
                    off: require('@img/rain/rain3_on.png'),
                    music: 'https://downsc.chinaz.net/Files/DownLoad/sound1/202207/y1015.mp3',
                    active: false
                },
                {
                    on: require('@img/rain/rain4_off.png'),
                    off: require('@img/rain/rain4_on.png'),
                    music: 'https://www.xzmp3.com/down/010aca74b8ba.mp3',
                    active: false
                }
            ], 
        }
    },
    methods:{
        music(type,active){
            this.$set(this.rainIcon[type], 'active', !active)
            !active ? this.audioDom[type].play() : this.audioDom[type].pause()
        },
        userToast(){
            const h = this.$createElement;
            this.$notify({
              title: '提示',
              message: h('span', { style: 'color: #008c8c'}, '请点击一次页面开始聆听雨声哦！也可以在右下角关闭或者打开其他声音。点击左上角可以回到首页')
            });
        }
    },
    activated(){
        this.audioDom = document.getElementsByClassName("music");
        this.userToast()
    },
    deactivated(){
        this.rainIcon.forEach(item => this.$set(item, 'active', false))
    }
}
</script>

<style lang="less" scoped>
    .rain {
         width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        box-sizing: border-box;
    }
    .rain-bg {
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .words {
        position: fixed;
        top: 80px;
        right: 80px;
    }
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
    .option {
        position: absolute;
        height: 70px;
        width: auto;
        bottom: 0;
        right: 0;
        text-align: center;
        li {
            display: inline-block;
            cursor: pointer;
            &:last-child {
                width: 108px;
                height: 70px;
                line-height: 70px;
                img {
                    width: 50px;
                    height: 30px;
                    vertical-align: middle;
                }
            }
        }
    }
    @media screen and (max-width: 480px){
    .rain{
        .words{
            top: 30%;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50% );
        }
        .rain-bg {
            position: absolute;
            left: 60%;
            top: 50%;
            transform: translate(-50%,-50%);
            height: 100%;
            width: auto;
        }
        .option{
            width: auto;
            right: 20px;
            li{
                width: 60px;
                overflow: hidden;
                span{
                    display: flex;
                    justify-content: center;
                }
                &:last-child {
                    width: 60px;
                    height: 63px;
                    line-height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: auto;
                        height: 30px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}

</style>