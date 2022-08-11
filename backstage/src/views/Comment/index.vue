<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>评论列表 ({{total}})</div>
    </div>
    <div class="tables">
        <el-table :data="tableData" v-loading="loading" stripe>
            <el-table-column v-for="(item,index) in tableColumn" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
            <el-table-column label="操作" v-if="userInfo.id === 1"> <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="total" size="10" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { list, deleteWord } from '@/api/word'
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['userInfo'])
    },
    created() {
        this.getList()
    },
    methods:{
        async getList(){
            this.loading = true
            const result = await list(this.page)
            this.tableData = result.data.data.datas
            this.total = result.data.data.total
            this.loading = false
        },
        async handleDelete(i,{id}){
            const result = await deleteWord({id})
            if(result){
                this.$message.success("删除成功")
                this.getList()
            }
        },
        currentChange(e){
            this.page.pageNum = e
            this.getList()
        }
    },
    data(){
        return {
            tableData:[],
            loading:false,
            page:{
                pageSize:10,
                pageNum:1
            },
            total:0,
            tableColumn:[
               { prop: 'user.userName', label: '姓名' },
                { prop: 'content', label: '内容' },
                { prop: 'createdAt', label: '日期' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .tables {
        margin-top: 40px;
    }
    .pagi {
        margin-top: 40px;
    }
</style>