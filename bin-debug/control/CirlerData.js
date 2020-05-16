var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var CirlerData = (function () {
    function CirlerData(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    CirlerData.prototype.intersects = function (cd) {
        var x = this.x - cd.x;
        var y = this.y - cd.y;
        var dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (dis <= (this.r + cd.r)) {
            return true;
        }
        return false;
    };
    return CirlerData;
}());
__reflect(CirlerData.prototype, "CirlerData");
//# sourceMappingURL=CirlerData.js.map