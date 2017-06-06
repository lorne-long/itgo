var store = {},
  _localStorage= window.localStorage||window.sessionStorage;
if(!window.localStorage){
  console.log("不浏览器支持");
}else{
  store.set = function(key, val) {
    return _localStorage.setItem(key,val)
  }
  store.get = function(key, val) {
    return _localStorage.getItem(key)
  }
  store.has = function(key) {
    return store.get(key) !== undefined
  }
  store.remove = function(key) {
    return  _localStorage.removeItem(key)
  }
  store.clear = function() {
    return _localStorage.clear();
  }
}
export default  store;
