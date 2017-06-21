var $localStorage=false,$sessionStorage = false,
  _localStorage = window.localStorage,
  _sessionStorage = window.sessionStorage;


if (!window.localStorage) {
  console.log("不浏览器支持");
} else {
  $localStorage = {
    set: function (key, val) {
      return _localStorage.setItem(key, val)
    }, get: function (key, val) {
      return _localStorage.getItem(key)
    }, has: function (key) {
      return this.get(key) !== undefined
    },
    remove: function (key) {
      return _localStorage.removeItem(key)
    }, clear: function () {
      return _localStorage.clear();
    }
  }
}
;
if (!window.sessionStorage) {
  console.log("不浏览器支持");
} else {
  $sessionStorage = {
    set: function (key, val) {
      return _sessionStorage.setItem(key, val)
    }, get: function (key, val) {
      return _sessionStorage.getItem(key)
    },
    has: function (key) {
      return this.get(key) !== undefined
    },
    remove: function (key) {
      return _sessionStorage.removeItem(key)
    }, clear: function () {
      return _sessionStorage.clear();
    }
  }
}
function cookieMethods(){
}
export  {$localStorage,$sessionStorage} ;
