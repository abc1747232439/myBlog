<template>
 <div class="content">
    <div class="intro">
        <div class="container">
            <h1>更新日志</h1>
        </div>
    </div>
    <section class="timeline">
        <span class="check" v-if="appear">
          <i class="el-icon-bottom"></i>
        </span>
        <ul>
          <li class="in_view">
              <div>
              <time>2022/8/10</time> 项目正式上线
            </div>
          </li>
          <li v-for="(list,index) in lists" :key="index" ref="index" v-move="isElementInViewPort">
            <div>
              <time>{{list.time}}</time>{{list.content}}
            </div>
          </li>
        </ul>
  </section>
</div>
</template>

<script>
export default {
    name:'Update',
    data(){
        return {
            lists:[
                {time:'2022/8/11',content:"上传至GitHub"},
                {time:'2022/8/16',content:"新增更新日志界面"},
                {time:'2022/8/17',content:"新增用户权限、评论折叠功能"}
            ],
            visibleDia:false,
            form:{
              time:'',content:""
            },
            appear:true
        }
    },
    mounted() {
      window.addEventListener('scroll',()=>{
          this.appear = false
      })
    },
    directives:{       //逻辑为:凡是在ViewPort内的li都添加in_view类 因为涉及DOM操作故采用自定义指令
        move:{
            inserted(el,binding) {
                let cb = binding.value
                window.addEventListener('scroll',()=>{
                    cb(el)
                })
                window.addEventListener('load',()=>{
                    cb(el)
                })
                window.addEventListener('resize',()=>{
                    cb(el)
                })
            }
        }
    },
    methods: {
        isElementInViewPort(el) {
            let rect = el.getBoundingClientRect()
            let result = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            if(result) {
                el.classList.add('in_view')
            }
        },
        pushList(){
          this.lists.push(this.form)
          this.visibleDia = false
        },
         handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.visibleDia = false
          })
          .catch(_ => {});
      }
    },
}
</script>

<style lang="less" scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  font: normal 16px/1.5 "Helvetica Neue", sans-serif;
  background: #456990;
  color: #fff;
  overflow-x: hidden;
  padding-bottom: 50px;
  .intro {
      background: #f45b69;
      padding: 100px 0;
      .container {
          text-align: center;
          margin: 0  auto;
          width: 90%;
          max-width: 1200px;
          h1 {
              font-size: 2.5rem;
          }
      }
  }
  .timeline {
      position: relative;
      .check {
          font-size: 1.5rem;
          position: absolute;
          left: 50px;
          top: 0;
          transition: all 1s;
          animation: jump 1s infinite;
      }
      ul {
         padding: 50px 0;
         li {
            position: relative;
            width: 6px;
            margin: 0 auto;
            padding-top: 50px;
            background: #fff;
            &.in_view::after {    // 带有.in_view的li其中元素会发生动画效果 会使用JS对li addclassList(in_view) 
                background-color: #f45b69;
            }
            &:nth-child(odd) div {
                left: 45px;
                translate: 200px;
                &::before {
                    left: -15px;
                    border-width: 8px 16px 8px 0;
                    border-color: transparent #f45b69 transparent transparent;
                }
            }
            &:nth-child(even) div{
                left: -439px;
                translate: -200px;
                &::before {
                    right: -15px;
                    border-width: 8px 0 8px 16px;
                    border-color: transparent transparent transparent #f45b69;
                }
            }
            &.in_view div {
                translate: none;
                visibility: visible;
                opacity: 1;
            }
            &::after {
                content: "";
                width: 30px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                height: 30px;
                border-radius: 50%;
                bottom: 0;
                background-color:inherit;
                transition: background 0.5s ease-in-out;
            }
            div {
                position: relative;
                bottom: 0;
                width: 400px;
                padding: 15px;
                background: #f45b69;
                visibility: hidden;
                opacity: 0;
                transition: all 0.5s ease-in-out;
                &::before {
                  content: "";
                  position: absolute;
                  width: 0;
                  height: 0;
                  bottom: 7px;
                  border-style: solid;  
                }
                time {
                    display: block;
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
            }
         }
      }
  }
}
@keyframes jump {
    50% {
        top: 15px;
    }
    100% {
        top: 0;
    }
}
@media screen and (max-width: 900px) {
  .content .timeline ul li div {
    width: 250px;
  }
  .content .timeline ul li:nth-child(even) div {
    left: -289px;
    /*250+45-6*/
  }
}

@media screen and (max-width: 600px) {
  .content .timeline ul li {
    margin-left: 20px;
  }
  .content .timeline ul li div {
    width: calc(100vw - 91px);
  }
  .content .timeline ul li:nth-child(even) div {
    left: 45px;
  }
  .content .timeline ul li:nth-child(even) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent #f45b69 transparent transparent;
  }
}
</style>