var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var TimePathData = (function () {
    function TimePathData(time, pos) {
        this.time = time;
        this.position = pos;
    }
    return TimePathData;
}());
__reflect(TimePathData.prototype, "TimePathData");
//# sourceMappingURL=TimePathData.js.map