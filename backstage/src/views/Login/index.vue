<template>
  <div id="login">
    <div class="login-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <div class="title">欢迎来到后台管理系统</div>
        <el-form-item prop="account" class="item-form">
          <el-input v-model="ruleForm.account" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <el-input
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <a href="javascript:;" @click="submitForm('ruleForm')">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
              Login
             </a>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  data() {
    return {
      model: "",
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }], //trigger为验证触发方式
        password: [{ required: true, message: "请输入密码", trigger: "blur" }] //值为blur或change
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return
        login(this.ruleForm.account, this.ruleForm.password).then(res => {
          this.$message.success('登陆成功')    
          localStorage.setItem('token', res.data.data)
          setTimeout(() => {
            this.$router.push("/home")
          }, 1000)
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
    #login {
  height: 100vh;
  background: linear-gradient(
    142deg,
    rgba(63, 161, 251, 1) 0%,
    rgba(252, 70, 168, 1) 100%
  );
  overflow: hidden;
}
/* #login {
  height: 100vh;
  background: linear-gradient(
    125deg,#2c3e50,#27ae60,#2980b9, rgba(252, 70, 168, 1) 100%,#8e44ad
  );
  overflow: hidden;
  animation: animatelinear 15s linear infinite alternate;
  background-size: 200%;
}
@keyframes animatelinear {
     0% {
        background-position: 0% 50%;
     }
     100% {
        background-position: 100% 50%;
     }  
} */

.login-wrap {
  width: 330px;
  margin: auto;
  margin-top: 200px;
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
.login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width:300px;
    padding: 40px 50px 25px;
    border-radius: 10px;
    background:rgba(0,0,0,0.5);
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    .title {
      font-size: 22px;
      letter-spacing: 2px;
      margin: 10px 0 24px;
      color: #fff;
    }
    
    /deep/ .el-input__inner{ //深度选择器修改element ui组件的默认样式
        border: 0;
        border-bottom: 1px solid #fff;
        background: transparent;
        color:#fff;
    }
    .item-form {
        margin-bottom: 13px;
    }
    a {
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #03e9f4;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: .5s;
      margin-top: 40px;
      letter-spacing: 4px;
      &:hover{
          background: #03e9f4;
          color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
      }
      span {
        position: absolute;
        display: block;
        &:nth-child(1) {
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #03e9f4);
            animation: btn-anim1 1s linear infinite;
          };
        &:nth-child(2) {
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg, transparent, #03e9f4);
            animation: btn-anim2 1s linear infinite;
            animation-delay: .25s
          };
          &:nth-child(3) {
            bottom: 0;
            right: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg, transparent, #03e9f4);
            animation: btn-anim3 1s linear infinite;
            animation-delay: .5s
          };
          &:nth-child(4) {
              bottom: -100%;
              left: 0;
              width: 2px;
              height: 100%;
              background: linear-gradient(360deg, transparent, #03e9f4);
              animation: btn-anim4 1s linear infinite;
              animation-delay: .75s
            }
      }
  }
}
</style>