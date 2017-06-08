/* istanbul ignore next */


const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
NodeList.prototype.addClass = Element.prototype.hasClass = function(csName) {
  var x = this.className.split(" ") || [];
  return x.indexOf(csName)>-1;
}

NodeList.prototype.addClass = Element.prototype.classToggle = function(csName) {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    var x = item[i].className.split(" ") || [];
    var index = x.indexOf(csName);
    if(index > -1) {
      x.splice(index, 1);
    } else {
      x.push(csName);
    }
    item[i].className = x.join(" ");
  }
  return this;
}
NodeList.prototype.addClass = Element.prototype.addClass = function(csName) {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    var x = item[i].className.split(" ") || [];
    if(x.indexOf(csName) == -1) {
      x.push(csName);
    }
    item[i].className = x.join(" ");
  }
  return this;
}
NodeList.prototype.removeClass=Element.prototype.removeClass = function(csName) {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    var x = item[i].className.split(" ") || [];
    var index = x.indexOf(csName);
    if(index > -1) {
      x.splice(index, 1);
    }
    item[i].className = x.join(" ");
  }
  return this;
}
NodeList.prototype.show = Element.prototype.show = function() {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    item[i].style.display = "block";
  }
  return this;
}
NodeList.prototype.hide = Element.prototype.hide = function() {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    item[i].style.display = "none";
  }
  return this;
}
NodeList.prototype.toggle = Element.prototype.toggle = function() {
  var item = !this.length ? [this] : [].slice.call(this);
  for(var i = 0; i < item.length; i++) {
    item[i].style.display = this.css("display") == "none" ? "block" : "none";
  }
  return this;
}
Element.prototype.css = function(_style) {
  return window.getComputedStyle ? w.getComputedStyle(this, null)[_style] : this.currentStyle[_style];
}
