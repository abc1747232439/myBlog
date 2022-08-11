<template>
  <div class="content">
    <div class="container" :class="move">
        <!-- sign up -->
        <div class="container_form container_signup">
            <form action="" class="form" id="form1" @submit.prevent>
                <h2 class="form_title">注册</h2>
                <input type="text" placeholder="User" class="input" v-model.trim="data.account" autocomplete="off"/>
                   <div class="code">
                    <input type="text"  placeholder="Verify" id="code" v-model.trim="data.captcha" autocomplete="off" >
                    <img :src="captcha" @click="changeCode" alt="">
                   </div>
                <input type="password" placeholder="Password" class="input" v-model.trim="data.password" autocomplete="off"  />
                <button class="btn" @click="enroll(data)">注册</button>
            </form>
        </div>

        <!-- sign-in -->
        <div class="container_form container_signin">
            <form action="" class="form " id="form2" @submit.prevent>
                <h2 class="form_title">登录</h2>
                <input type="text" placeholder="Username" class="input" v-model.trim="data.account" autocomplete="off">
                <input type="password" placeholder="Password" class="input" v-model.trim="data.password" autocomplete="off">
                <button class="btn" @click="landing(data)">登录</button>
            </form>
        </div>

        <!-- Overlay -->
        <div class="container_overlay">
            <div class="overlay">
                <div class="overlay_left overlay_panel">
                    <button class="btn" id="signIn" @click="toggle(1)">登录</button>
                </div>
                <div class="overlay_panel overlay_right">
                    <button class="btn" id="signUp" @click="toggle(0)">注册</button>
                  </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { login, addUser, whoami, registry } from '../../api/user'
import { valiFunc } from '@/utils'

export default {
    data(){
        return {
            move:{
                right_panel_active:true
            },
            data:{
               account:"",
               password:"",
               captcha:"",
            },
            captcha:`${this.mainUrl}/captcha`
        }
    },
    methods:{
        toggle(code){
            if(code === 1){      //切换类注册与登录的切换
                this.move.right_panel_active = false
            }else {
                this.move.right_panel_active = true
            }
        },
        changeCode(){  /* ?????为什么加query */
            this.captcha = `${this.mainUrl}/captcha?code=${Math.random()}`
        },
         landing ({account, password}) {
            console.log(account,password);
            login(account, password).then( async res => {
                localStorage.setItem('token', res.data.data)
                this.$store.commit("setIsToken", true)
                this.$message.success('登陆成功, 1秒后即将返回首页')
                const result = await whoami()
                localStorage.setItem('userInfo', JSON.stringify(result.data.data))
                setTimeout(() => {
                this.$router.push({ path: '/' })
                }, 1000)
            }).catch(err => {
            })
        },
            // 注册
             enroll (data) {
             data.id = JSON.parse(localStorage.getItem('userInfo')).id
                registry(data).then(res => {
                    this.$message.success('注册成功')
                    this.toggle(1)
                })
            },
            async operate(){
                const valData = [
                    {
                        data: this.data.account,
                        msg: '账号不能为空'
                    },
                    {
                        data: this.data.password,
                        msg: '密码不能为空'
                    },
                    {
                        data: this.data.captcha,
                        msg: '验证码不能为空'
                    }
                ]
                const result = await valiFunc(valData)
                if (!result) return
        }
    }
}
</script>

<style lang="less" scoped>
            /* COLORS */
            @white: #e9e9e9;
            @gray: #333;
            @blue: #0367a6;
            @lightblue: #008997;

            /* RADII */
            @button-radius: 0.7rem;

            /* SIZES */
            @max-width: 758px;
            @max-height: 446px;

           

        .content {
            justify-content: center;
            background-color: @white;
            background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            height: 100vh;
            align-items: center;
            font-size: 16px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            .container {
                background-color: @white;
                border-radius: @button-radius;
                width: 100%;
                height: @max-height;
                max-width: @max-width;
                overflow: hidden;
                position: relative;
                box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
            0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
                .btn {
                    background-color: @blue;
                    background-image: linear-gradient(90deg, @blue 0%, @lightblue 74%);
                    border-radius: 20px;
                    border: 1px solid @blue;
                    color: @white;
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: bold;
                    letter-spacing: 0.1rem;
                    padding: 0.5rem 2rem;
                    transition: transform 80ms ease-in;
                    &:active {
                        transform: scale(0.95);
                    }
                    &:focus {
                        outline: none;
                    }
                }
                .container_overlay {
                    width: 50%;
                    height: 100%;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    z-index: 100;
                    overflow: hidden;
                    transition: transform 0.6s ease-in-out;
                    .overlay {
                        width: 200%;
                        height: 100%;
                        position: relative;
                        left: -100%;
                        transition: transform 0.6s ease-in-out;
                        transform: translateX(0);
                        background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
                        background-attachment: fixed;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        .overlay_right {
                            right: 0;
                            transform: translateX(0);
                        } 
                        .overlay_panel {
                            width: 50%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            transform: translateX(0);
                            transition: transform 0.6s ease-in-out;
                        }
                    }
                }
                .container_signin {
                    width: 50%;
                    left: 0;
                    z-index: 2;
                }
                .container_signup {
                    left: 0;
                    opacity: 0;
                    width: 50%;
                    z-index: 1;
                }
                &.right_panel_active {
                    .container_signin {
                        transform: translateX(100%);
                    }
                    .container_signup {
                        animation: show 0.6s;
                        opacity: 1;
                        transform: translateX(100%);
                        z-index: 5;
                    }
                    .container_overlay {
                        transform: translateX(-100%);
                    }
                    .overlay {
                        transform: translateX(50%);
                    }
                }
                .container_form {
                    height: 100%; 
                    position: absolute;
                    top: 0;
                    transition: all 0.6s ease-in-out;
                    .form {
                        background-color: @white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 3rem;
                        height: 100%;
                        text-align: center;
                        .code {
                            display: flex;
                            justify-content: center;
                            padding: 0.7rem 0.7rem;
                            margin: 0.5rem 0;
                            transform: translate(13px);
                            #code {
                                flex: 1;
                                background-color: transparent;
                                border: none;
                                outline: none;
                                border-bottom: 1px solid #333;
                            }
                            img {
                                flex: 1;
                            }
                        }
                        .btn {
                            margin-top: 1.5rem;
                        }
                        .input {
                            padding: 0.5rem 0.5rem;
                            margin: 0.3rem 0;
                            width: 100%;
                            background-color: transparent;
                            border: none;
                            outline: none;
                            border-bottom: 1px solid #333;
                        }
                        .form_title {
                            font-weight: 700;
                            margin: 0;
                            font-size: 16px;
                            margin-bottom: 1.25rem;
                        }
                    }
                }
            }
            
        }
</style>