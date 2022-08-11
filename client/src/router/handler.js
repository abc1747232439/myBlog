import router from './index'
import store from "../store" 
import Vue from 'vue'
import { Loading } from 'element-ui';

let load = ''
router.beforeEach((to, from, next) => {
    store.commit('setShowPageLoadScrollBar', true)
    if(to.name !== 'Home'){
        load = Loading.service({
            lock: true,
            background: 'rgba(255,255,255,.8)'
        });
    }
    next()
})
router.afterEach((to, from) => {
    setTimeout(() => {
        load.close()
        store.commit('setShowPageLoadScrollBar', false)
    }, 1000)
    document.title = to.meta.title
})


export default router