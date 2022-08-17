import Vue from "vue";
import Vuex from "vuex";
import { list } from "@/api/article"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isToken:!!localStorage.getItem('token'), //有没有token，！！是为了把得到的值强制转换为布尔值
        showPageLoadScrollBar:false,
        important:false  //用户是否已注册
    },
    actions:{
        clearToken({commit}){
            localStorage.removeItem('token')
            commit('setIsToken',false)
        },
        async getArtList(state,page){
             return await list(page)
        },
         dataHandle(state, result) {
            const arr = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            let [y, m, other] = result.createdAt.split("-")
            const d = other.split(" ")[0]
            m = arr[parseInt(m)]
            const resultDate = [y, m, d]
            const keys = ['year', 'month', 'day']
            resultDate.forEach((item, index) => result[keys[index]] = resultDate[index])
            return result
          }
    },
    mutations:{
        setIsToken(state,data){
            state.isToken = data
        },
        setShowPageLoadScrollBar(state,data){
            state.showPageLoadScrollBar = data
        },
        setImportant(state,data){
            state.important = data
        }
    }
})