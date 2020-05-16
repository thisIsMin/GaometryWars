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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.upColor = 0xdddddd;
        _this.downColor = 0x222222;
        _this.isDown = false;
        _this.text = new egret.TextField();
        _this.text.text = "BUTTON";
        _this.text.x = 10;
        _this.text.y = 5;
        _this.touchEnabled = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Button.prototype.onAddToStage = function (event) {
        this.draw();
        this.drawChild();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    // protected onTouchTap(e : egret.TouchEvent){
    // }
    // protected postClickEvent(){
    // }
    Button.prototype.drawChild = function () {
        this.addChild(this.text);
    };
    Button.prototype.draw = function () {
        var c = this.upColor;
        if (this.isDown) {
            c = this.downColor;
        }
        this.graphics.lineStyle(2, c);
        this.graphics.drawRect(0, 0, this.text.width + 20, this.text.height + 10);
        this.graphics.endFill();
        this.graphics.beginFill(c, 0.5);
        this.graphics.drawRect(0, 0, this.text.width + 20, this.text.height + 10);
        this.graphics.endFill();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    Button.prototype.setButtonText = function (text) {
        this.text.text = text;
    };
    Button.prototype.onTouchDown = function () {
        this.isDown = true;
        this.draw();
    };
    Button.prototype.onTouchUp = function () {
        this.isDown = false;
        this.draw();
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map