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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Map.prototype.onAddToStage = function (event) {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.draw();
    };
    Map.prototype.draw = function () {
        this.graphics.beginFill(0x222222, 1);
        this.graphics.drawRect(0, 0, this.width * 10, this.height);
        this.graphics.endFill();
        var line = new egret.Sprite();
        line.graphics.lineStyle(2, 0xffffff);
        for (var i = 0; i * this.width <= this.width * 10; i++) {
            line.graphics.moveTo(i * this.width / 2, 0);
            line.graphics.lineTo(i * this.width / 2, this.height);
        }
        line.graphics.endFill();
        this.addChild(line);
    };
    return Map;
}(egret.Sprite));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map