import { Message } from 'element-ui'

export function bottomHandle(isScroll,callback){
    window.addEventListener('scroll',throttleScroll(isScroll,callback))
}
export function clearBottomHandle(){
    window.removeEventListener('scroll',throttleScroll)
}
export async function valiFunc(arr) {
  let res = true
  for (let item of arr) {
    if (!item.data || item.data.length === 0) {
      res = false
      Message({
        message: item.msg,
        type: 'error',
        offset: 60
      })
      break
    }
  }
  return res
}
export function throttle(fn, delay) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < interval) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(th, args);
        }, interval);
      } else {
        last = now;
        fn.apply(th, args);
      }
    }
  }
function scrollChange (isScroll, callback) {
    if (!isScroll) return
    //以下用||的都代表同一个意思，这样写是为了考虑兼容性
    const scrollTop = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || window.scrollHeight
    if (scrollTop + windowHeight >= scrollHeight) {  //
      callback()    
    }
}

const throttleScroll = (isScroll, callback) => throttle(scrollChange.bind(null, isScroll, callback), 200)