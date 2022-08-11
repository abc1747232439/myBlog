<template>
  <div>
    <Markdown @contentChange="contentChange"></Markdown>
    <div class="submit flex align-center" v-if="userInfo.id===1">
        <el-button class="subBtn" type="primary" icon="el-icon-position" @click="saveAboutMe">保存</el-button>
    </div>
  </div>
</template>

<script>
import Markdown from '@c/markdown'
import { updateUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex' 
export default {
    data(){
        return {
            info:{
                aboutMe:"",
                id:1
            }
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    watch:{
        'userInfo':{
        deep:true,
            handler(val){
                for(let key in this.info){
                    if(val.hasOwnProperty(key)){
                        this.info[key]  =  val[key]
                    }
                }
            }
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        contentChange(e){
            this.info.aboutMe = e
        },
        saveAboutMe(){
           if (!this.info.aboutMe) {
                this.$message.error('内容不能为空的~')
                return
            }
            updateUserInfo(this.info).then(res=>{
                this.$message.success("保存成功")
                this.setUserInfo(res.data.data)
            })
        }
    },
    components:{
        Markdown
    }
}
</script>

<style lang="scss" scoped>
.submit {
    justify-content: flex-start;
    margin-top: 20px;
  }
</style>