var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var bbb = (function (_super) {
    __extends(bbb, _super);
    function bbb(i) {
        var _this = _super.call(this, i) || this;
        _this.iii = i;
        return _this;
    }
    return bbb;
}(aaa));
__reflect(bbb.prototype, "bbb");
//# sourceMappingURL=bbb.js.map