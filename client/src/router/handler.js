import router from './index'
import store from "../store" 
import Vue from 'vue'
import { Loading } from 'element-ui';

let load = ''
router.beforeEach((to, from, next) => {
    store.commit('setShowPageLoadScrollBar', true)
        load = Loading.service({
            lock: true,
            background: 'rgba(255,255,255,.8)'
        });
    next()
})
router.afterEach((to, from) => {
    setTimeout(() => {
        store.commit('setShowPageLoadScrollBar', false)
        load.close()
    }, 1000)
    document.title = to.meta.title
})


export default router