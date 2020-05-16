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
var ChangeGaoEvent = (function (_super) {
    __extends(ChangeGaoEvent, _super);
    function ChangeGaoEvent(i) {
        var _this = _super.call(this, ChangeGaoEvent.EVENT_ROULETTECHANGE) || this;
        _this.i = 0;
        _this.i = i;
        return _this;
    }
    ChangeGaoEvent.EVENT_ROULETTECHANGE = "event_changegaoevent";
    return ChangeGaoEvent;
}(egret.Event));
__reflect(ChangeGaoEvent.prototype, "ChangeGaoEvent");
//# sourceMappingURL=ChangeGaoEvent.js.map