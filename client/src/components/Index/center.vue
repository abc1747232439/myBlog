<template>
  <div id="center">
    <div class="wrapper">
        <div class="slash"></div>
        <div class="sides">
            <div class="side"></div>
            <div class="side"></div>
            <div class="side"></div>
            <div class="side"></div>
        </div>
        <div class="text">
            <div class="text--backing">Mr.Wu</div>
        <div class="text--left">
          <div class="inner">Mr.Wu</div>
        </div>
        <div class="text--right">
          <div class="inner">Mr.Wu</div>
        </div>
        </div>
    </div>
    <div class="loading">
      <span class="status online"></span>
      <span class="status offline"></span>
      <span class="status invisible"></span>
      <span class="status idle"></span>
    </div>
    <div class="navigation flex align-center justify-center flex-wrap"> <!-- 此处flex定义在style/normalize -->
      <i
        v-for="(item, index) in navigation"
        :key="index"
        @click="triggerPage(item.path)"
        :class="item.icon"
      >{{item.name}}
      </i>
      <i class="el-icon-user" v-if="!isToken" @click="triggerPage('/login')"> 登陆</i>
      <i  class="el-icon-user" v-else @click="triggerPage('/loginoff')"> 注销</i>
    </div>
    <div class="talk-method flex justify-center">
      <i class="iconfont icon-qq-circle-fill">:1747232439</i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addUser } from "@/api/user"

export default {
    name:'center',
    computed:mapState(['isToken']),
    data(){
        return {
            navigation:[
                { name:' 主页',icon:'el-icon-s-home', path:'/exhibit' },
                { name:' 文章列表',icon:'el-icon-tickets', path:'/articleList' },
                { name:' 听雨',icon:'el-icon-light-rain', path:'/Rainy' },
                { name:' 关于我',icon:'el-icon-user-solid', path:'/self' },
                { name:' 留言版',icon:'el-icon-reading', path:'/message' },
                { name:' Github',icon:'iconfont icon-github', path:'https://github.com/abc1747232439/myBlog' },
                {name:' 更新日志',icon:'el-icon-document-remove',path:'/update'}
            ]
        }
    },
    methods:{
        triggerPage(path){
            if(path === 'https://github.com/abc1747232439/myBlog'){
                window.open(path)
            }else if(path==='/loginoff') {
                this.$store.dispatch('clearToken')
                localStorage.removeItem("userInfo")
                this.$store.commit('setImportant',false)
                this.$message.success("注销成功");
                 addUser({account:Date.now()}).then((result)=>{
                  this.$store.commit('setImportant',false)
                  localStorage.setItem('userInfo',JSON.stringify(result.data.data))
                 }).catch((e)=>{
                      
                 })
            }else {
                this.$router.push(path)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    #center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        .wrapper {
            position: relative;
            text-transform: uppercase;
            font-size: 1.5rem;
            color: #fff;
            letter-spacing: .12rem;
            padding: 0.33rem 0.18rem 0.1rem 0.25rem;
            .slash {
                position: absolute;
                width: 0.075rem;
                height: 145%;
                top: 50%;
                left:50%;
                border: 3px solid black;
                transform: translate(-50%,-50%) rotate(60deg);
                background: #fff;
                -webkit-animation: slash 6s ease-in infinite;
                animation: slash 6s ease-in infinite;
                    @-webkit-keyframes slash {
                      0% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                      6% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                      }
                      13% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                      }
                      16.6% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                      100% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                    }
                    @keyframes slash {
                      0% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                      6% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                      }
                      13% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
                      }
                      16.6% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                      100% {
                        -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                        transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
                      }
                    }
            }
            .sides {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                overflow: hidden;
                .side{
                    position: absolute;
                    background: #fff;
                    &:nth-child(1){
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 0.07rem;
                        -webkit-transform: translateX(-101%);
                        transform: translateX(-101%);
                        -webkit-animation: side-top ease 6s infinite;
                        animation: side-top ease 6s infinite;
                        box-shadow: 0 0 10px #ffd700;
                    }
                    &:nth-child(2){
                        top: 0;
                        right: 0;
                        width: 0.07rem;
                        height: 100%;
                        -webkit-transform: translateY(-101%);
                        transform: translateY(-101%);
                        -webkit-animation: side-right ease 6s infinite;
                        animation: side-right ease 6s infinite;
                    }
                    &:nth-child(3){
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 0.07rem;
                        -webkit-transform: translateX(101%);
                        transform: translateX(101%);
                        -webkit-animation: side-bottom ease 6s infinite;
                        animation: side-bottom ease 6s infinite;
                    }
                    &:nth-child(4){
                        top: 0;
                        left: 0;
                        width: 0.07rem;
                        height: 100%;
                        -webkit-transform: translateY(101%);
                        transform: translateY(101%);
                        -webkit-animation: side-left ease 6s infinite;
                        animation: side-left ease 6s infinite;
                    }
                    @-webkit-keyframes side-top {
                        0%,
                        14% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                        24%,
                        55% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        65% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                        100% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                      }
                      @keyframes side-top {
                        0%,
                        14% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                        24%,
                        55% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        65% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                        100% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                      }
                      @-webkit-keyframes side-right {
                        0%,
                        14%,
                        23% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                        30%,
                        62% {
                          -webkit-transform: translateY(0);
                          transform: translateY(0);
                        }
                        72% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                        100% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                      }
                      @keyframes side-right {
                        0%,
                        14%,
                        23% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                        30%,
                        62% {
                          -webkit-transform: translateY(0);
                          transform: translateY(0);
                        }
                        72% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                        100% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                      }
                      @-webkit-keyframes side-bottom {
                        0%,
                        14%,
                        24%,
                        28% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                        37%,
                        70% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        79% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                        100% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                      }
                      @keyframes side-bottom {
                        0%,
                        14%,
                        24%,
                        28% {
                          -webkit-transform: translateX(101%);
                          transform: translateX(101%);
                        }
                        37%,
                        70% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        79% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                        100% {
                          -webkit-transform: translateX(-101%);
                          transform: translateX(-101%);
                        }
                      }
                      @-webkit-keyframes side-left {
                        0%,
                        14%,
                        24%,
                        34%,
                        35% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                        44%,
                        79% {
                          -webkit-transform: translateY(0);
                          transform: translateY(0);
                        }
                        86% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                        100% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                      }
                      @keyframes side-left {
                        0%,
                        14%,
                        24%,
                        34%,
                        35% {
                          -webkit-transform: translateY(101%);
                          transform: translateY(101%);
                        }
                        44%,
                        79% {
                          -webkit-transform: translateY(0);
                          transform: translateY(0);
                        }
                        86% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                        100% {
                          -webkit-transform: translateY(-101%);
                          transform: translateY(-101%);
                        }
                      }
                      @-webkit-keyframes text-left {
                        0% {
                          -webkit-transform: translateX(100%);
                          transform: translateX(100%);
                        }
                        10% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        58% {
                          -webkit-transform: translateX(0);
                          transform: translateX(0);
                        }
                        70% {
                          -webkit-transform: translateX(-200%);
                          transform: translateX(-200%);
                        }
                        100% {
                          -webkit-transform: translateX(-200%);
                          transform: translateX(-200%);
                        }
                      }
                }
            }
            .text {
                position: relative;
                .text--backing {
                    opacity: 0;
                }
                @keyframes text-left {
                  0% {
                    -webkit-transform: translateX(100%);
                    transform: translateX(100%);
                  }
                  10% {
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                  }
                  58% {
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                  }
                  70% {
                    -webkit-transform: translateX(-200%);
                    transform: translateX(-200%);
                  }
                  100% {
                    -webkit-transform: translateX(-200%);
                    transform: translateX(-200%);
                  }
                }
                @-webkit-keyframes text-right {
                  0% {
                    -webkit-transform: translateX(-200%);
                    transform: translateX(-200%);
                  }
                  10% {
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                  }
                  58% {
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                  }
                  70% {
                    -webkit-transform: translateX(-300%);
                    transform: translateX(-300%);
                  }
                  100% {
                    -webkit-transform: translateX(-300%);
                    transform: translateX(-300%);
                  }
                }
                @keyframes text-right {
                  0% {
                    -webkit-transform: translateX(-200%);
                    transform: translateX(-200%);
                  }
                  10% {
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                  }
                  58% {
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                  }
                  70% {
                    -webkit-transform: translateX(-300%);
                    transform: translateX(-300%);
                  }
                  100% {
                    -webkit-transform: translateX(-300%);
                    transform: translateX(-300%);
                  }
                }
                .text--left {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    .inner {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        -webkit-animation: text-left 6s ease-in-out infinite;
                        animation: text-left 6s ease-in-out infinite;
                    }
                }
                .text--right {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    .inner {
                        -webkit-transform: translateX(-200%);
                        transform: translateX(-200%);
                        -webkit-animation: text-right 6s ease-in-out infinite;
                        animation: text-right 6s ease-in-out infinite;
                    }
                }
                
            }
       }
       .loading {
           margin: 1rem 0 1rem 0;
           .status {
               position: relative;
               display: inline-block;
               width: 15px;
               height: 15px;
               border-radius: 50%;
               margin: 13px;
               &::before {
                   content: '';
                   display: block;
                   position: absolute;
                   top: -5px;
                   left: -5px;
                   width: 25px;
                   height: 25px;
                   border-radius: 50%;
                   animation: pulse 1.5s infinite ease-in;
               }
               @keyframes pulse {
                  from {
                    transform: scale(0.5);
                    opacity: 1;
                  }
                  to {
                    transform: scale(1.5);
                    opacity: 0;
                  }
                }
               &.online{
                   background: #72ff7d;
                   &::before{
                       background: #72ff7d;
                   }
               }
               &.offline{
                   background: #ff4242;
                   &::before{
                       background: #ff4242;
                   }
               }
               &.invisible{
                   background: #42e5ff;
                   &::before{
                       background: #42e5ff;
                   }
               }
               &.idle{
                   background: #ffda72;
                   &::before{
                       background: #ffda72;
                   }
               }
           }
       }
       .navigation,.talk-method {
          padding: 0.4rem 0;
          white-space: nowrap;
          font-size: 16px;
          color: white;
          i {
          color: white;
          font-size: 16px;
          transition: all 0.6s;
          cursor: pointer;
          padding: 0.2rem;
          &:hover {
            color: rgb(66, 245, 135);
            opacity: 0.8;
          }
        }
       }
    }
</style>