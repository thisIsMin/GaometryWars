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
var RouletteChange = (function (_super) {
    __extends(RouletteChange, _super);
    function RouletteChange(type, point) {
        var _this = _super.call(this, type) || this;
        _this.m_position = point;
        return _this;
    }
    RouletteChange.EVENT_ROULETTECHANGE = "event_roulettechange";
    return RouletteChange;
}(egret.Event));
__reflect(RouletteChange.prototype, "RouletteChange");
//# sourceMappingURL=RouletteChange.js.map