var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
//自增ID
var IdUitl = (function () {
    function IdUitl() {
    }
    IdUitl.getId = function () {
        IdUitl.curId++;
        return IdUitl.curId.toString();
    };
    IdUitl.curId = 10000;
    return IdUitl;
}());
__reflect(IdUitl.prototype, "IdUitl");
//# sourceMappingURL=IdUitl.js.map