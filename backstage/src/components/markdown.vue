<template>
    <div class="markDown">
        <mavon-editor @save="mkSave" @change="mkChange" @imgAdd="imgAdd" ref="md" v-model="content"></mavon-editor>
    </div>
</template>

<script>
import { uploadImg } from '@/api/user'
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['userInfo'])
    },
    data(){
        return {
            content:""
        }
    },
    methods: {
        mkSave(val){
            this.content = val
            this.$emit('contentChange',this.content)
        },
        mkChange (val, ren) {
            this.content = val
            this.$emit('contentChange', this.content)
        },
        async imgAdd(pos,$file){  //第二个参数为图片引用 pos为文件名
            if (this.userInfo.id !== 1) {
                this.$message.error('您并不是管理员哦~无法上传图片')
                return
            }
            const formdata = new FormData()  //因为后台接受的数据类型必须为multipart/formdata
            formdata.append("file",$file)//所以必须调用此API
            try{
                const result = await uploadImg(formdata)
                const url = this.mainUrl+result.data.data
                this.$refs.md.$imglst2Url([[pos, url]]) //该方法用于将pos替换为新的url，用以img跨域加载图片并展示
            }catch(e){
                
            }
        }
    },

}
</script>

<style lang="scss" scoped>
    .markDown {
        margin-top:40px;
        height: 600px;
    }
</style>