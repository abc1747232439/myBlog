<template>
  <div class="content">
    <div class="title">
        <div class="flex align-center"><span></span>无所谓好或不好，人生一场虚空大梦，韶华白首，不过转瞬。惟有天道恒在，往复循环，不曾更改！</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
        <el-form-item prop="title">
            <el-input v-model.trim="ruleForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="description">
            <el-input v-model="ruleForm.description" placeholder="描述"></el-input>
        </el-form-item>
    </el-form>
    <div class="imgs flex align-center">
        <el-upload class="upload" drag 
        :action="mainUrl + '/upload'"
        :headers="token"
        accept="image/*"
        :disabled="userInfo.id !== 1"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"  
        :before-upload="beforeAvatarUpload"
        :on-error="uploadError" 
        >
            <img :src="mainUrl+imgUrl" class="avatar" v-if="imgUrl">
            <i class="iconfont icon-jurassic_image" v-if="!imgUrl"></i>
            <div class="el-upload__text" v-if="!imgUrl">封面图片 (680*440)</div>
        </el-upload>
    </div>
    <Markdown @contentChange="contentChange" style="height:400px"></Markdown>
    <div class="submit flex align-center" v-if="userInfo.id===1">
        <el-button type="primary" icon="el-icon-position" class="subBtn" @click="addArticle">发布</el-button>
    </div>
  </div>
</template>

<script>
import { add } from '@/api/article'
import { mapState } from 'vuex'
import Markdown from '@c/markdown'
export default {
    data(){
        return {
            ruleForm:{
                title:"",
                description:"",
                content:""
            },
            rules: {
                title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 0, max: 20, message: '不能超过20个字', trigger: 'blur' }
                ]
            },
            imgUrl:"",
            token:{
                authorization:"bearer " + localStorage.getItem("token")
            }
        }
    },
    components:{Markdown},
    computed:{
        ...mapState(['userInfo'])
    },
    methods: {
        handleAvatarSuccess(res,file){
            this.imgUrl = res.data
            this.$message.success("图片上传成功")
        },
        beforeAvatarUpload(file){
            const isLt4M = file.size / 1024 / 1024 < 4;
            const Cortype = file.type === 'image/png' || file.type==='image/jpg'||file.type==='image/gif'
            let result = true;
            if (!isLt4M) {
                this.$message.error('上传封面图片大小不能超过 4MB!');
                result = false
            }
            if(!Cortype){
                this.$message.error("文件类型错误")
                result = false
            }
            return result;
        },
        uploadError (e) {
            this.$message.error(JSON.parse(e.message).msg)
        },
        contentChange(e){
            this.ruleForm.content = e
        },
        addArticle(){
            this.$refs.ruleForm.validate(valid=>{
                 if (!this.imgUrl) { this.$message.error('封面图片不能为空'); return }
                 if (!this.ruleForm.content) { this.$message.error('文章内容不能为空'); return }
                 const data = {
                     ...this.ruleForm,
                     imgUrl:this.imgUrl,
                     content:this.ruleForm.content
                 }
                 add(data).then(res=>{
                     this.$message.success('发表成功')
                 })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .ruleForm {
        margin-top: 40px;
    }
    .upload {
        &:first-of-type {
            margin-right: 20px;
        }
        &:hover {
          /deep/ .el-upload-dragger {
            border-color: #409EFF;
         .iconfont, .el-upload__text {
            color: #409EFF;
          }
        }
      }
      .avatar {
          width: 100%;
          height: 100%;
      }
      .iconfont {
      color: #a2a3a5;
      font-size: 34px;
      margin-bottom: 10px;
      transition: all .3s;
     }
     /deep/ .el-upload-dragger {
      width: 400px;
      height: 200px;
      transition: all .3s;
      border-color: #DCDFE6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .el-upload__text {
        color: #a2a3a5;
        transition: all .3s;
      }
      
    }
}
@media (max-width:768px){
    .imgs .upload /deep/ .el-upload-dragger {
        width: 226px;
        height: 100px;
    }
}
.submit {
        justify-content: flex-start;
        margin-top: 20px;
    }
</style>