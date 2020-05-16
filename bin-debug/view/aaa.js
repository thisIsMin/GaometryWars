var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var a;
(function (a) {
    var aaa = (function () {
        function aaa() {
        }
        return aaa;
    }());
    __reflect(aaa.prototype, "aaa");
})(a || (a = {}));
//# sourceMappingURL=aaa.js.map