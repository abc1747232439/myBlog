<template>
  <div class="content">
    <div class="title flex align-center">
        <div class="flex align-center"><span></span>个人信息设置</div>
    </div>
    <el-form :model="form" ref="form" class="form" label-width="80px">
        <el-form-item label="头像">
            <el-upload :action="mainUrl + '/upload'"
            :headers="token"
            class="avatar-uploader"
            :disabled="userInfo.id !== 1"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError"
            >
            <img v-if="form.avatar" :src="form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="生日">
            <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="座右铭">
            <el-input v-model="form.motto"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex' 
export default {
    data(){
        return {
            form:{
                userName: '',
                birthday: '',
                motto: '',
                avatar: '',
                id: ''
            },
            token: {
                authorization: "bearer " + localStorage.getItem('token')
            },
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{
      'userInfo':{
          immediate:true, //页面解析即调用handler，将userInfo立即传入handler
          handler(val){
              for(let key in val){
                  if(this.form.hasOwnProperty(key)){
                      this.form[key] = val[key]
                  }
              }
          }
      }
    },
    methods:{
        ...mapMutations(['setUserInfo']),
        uploadError(e){
            this.$message.error(JSON.parse(e.message).msg)
        },
         beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
            },
        handleAvatarSuccess(res){
            this.form.avatar = this.mainUrl+res.data
            this.$message.success("图片上传成功")
        },
        onSubmit(){
            updateUserInfo(this.form).then(res=>{
                 this.$message.success(res.data.msg)
                 this.setUserInfo(res.data.data)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.img-outer {
    width: 90px;
    height: 90px;
    background-color: #40a0ff59;
    border-radius: 50%;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
 .form {
     margin-top: 40px;
 }
 /deep/ .el-form-item__content {
    display: flex;
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
   .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
   .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>