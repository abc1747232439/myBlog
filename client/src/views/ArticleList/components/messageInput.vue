<template>
    <div class="inputOuter">
        <div class="inputContent">
            <el-input v-model.trim="userName" v-if="isFill" maxlength="10" show-word-limit placeholder="用户名称" class="outerInput userName"></el-input>
            <div>
                <transition name="el-fade-in-linear">
                    <el-tag effect="dark" closable class="tag"  @close="tagClose" size="small" v-if="aiteName">@{{aiteName}}</el-tag>
                </transition>
            </div>
            <el-input type="textarea" :rows="rows" placeholder="请输入内容" maxlength="130" show-word-limit resize="none" v-model.trim="userContent"  class="userContent" ></el-input>
            <el-button type="primary" round @click="comment">提交</el-button>
        </div>
    </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import { valiFunc } from '@/utils'

export default {
    data(){
        return {
            userName:"",
            userContent:"",
            isFill:true  //是否需要用户在发表评论前填写用户名
        }
    },
    props:{
        rows:{
           type:Number,
           default:8
        },
        aiteName: {
            type: String,
            default: ''
        },
    },
    created(){
        this.isAnyUserName()
    },
    
    methods:{ 
        //判断是否需要填用户名
        isAnyUserName(){
            try {
               const userName = JSON.parse(localStorage.getItem('userInfo')).userName
                if (userName) {
                  this.userName = userName
                   this.isFill = false
                }
            }catch(e){}
        },
       async setUserNickName(){
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                await updateUserInfo({userName:this.userName,id:userInfo.id})
                localStorage.setItem('userInfo',JSON.stringify({
                    ...userInfo,
                    userName:this.userName
                }))
                this.isFill = false
            }catch(e){
            
            }
        },
        tagClose(){
            this.$emit('tagClose')
        },
        async comment(){
             const valiData = [ { data: this.userContent, msg: '留言内容不能为空'} ]
            if (!this.userName) { // 如果需要填用户名，则用户名不能为空
                valiData.push({ data: this.userName, msg: '用户名不能为空'})
            }
            const result = await valiFunc(valiData) // 验证没通过
            if (!result) return // 返回
            this.isFill&& this.setUserNickName()
            this.$emit('comment',this.userContent)
            this.userContent = ''
        }
    }
}
</script>

<style lang="less" scoped>
    .inputContent {
        border: 1px solid #eee;
        border-radius: 6px;
        padding: 15px 12px;
        transition: all 0.3s;
        font-size: 14px;
        color: #333333;
        .tag {
            margin-top: 10px;
            border-radius: 20px;
        }
        .userContent {
            width: 100%;
            margin: 10px 0;
        }
        .userName.outerInput {
            border: 1px dashed #f0f0f0;;
            /deep/ .el-input__inner {
            border: 1px dashed #f0f0f0 !important;
            &:focus {
                border-color: #008c8c !important;
            }
           }
  }
    .userName,
    .userContent {
        width: 50%;
        font-size: 14px;
        margin-right: 12px;
        transition: all 0.3s;
        border: none;
        border-radius: 4px;
        border-bottom: 1px dashed #f0f0f0;
        outline: none;
        /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px dashed #dcdff6;
        &:focus {
            border-color: #008c8c;
        }
        }
        /deep/ .el-textarea__inner {
        border: 1px dashed #dcdff6;
        &:focus {
            border-color: #008c8c;
        }
        }
    }
    .userContent {
        width: 100%;
        margin: 10px 0;
      }
   }
</style>