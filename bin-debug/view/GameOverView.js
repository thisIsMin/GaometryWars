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
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView(resultText) {
        var _this = _super.call(this) || this;
        _this.width = 800;
        _this.height = 500;
        _this.resultText = new egret.TextField();
        _this.resultText.text = resultText;
        _this.resultText.x = 400 - _this.resultText.width / 2;
        _this.resultText.y = 200;
        _this.backButton = new Button();
        _this.backButton.setButtonText("返回");
        _this.backButton.x = 200;
        _this.backButton.y = 400;
        _this.newButton = new Button();
        _this.newButton.setButtonText("重新开始");
        _this.newButton.x = 600;
        _this.newButton.y = 400;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        _this.newButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        return _this;
    }
    GameOverView.prototype.onTouchTap = function (event) {
        if (event.target == this.backButton) {
            this.postGameBack();
        }
        else if (event.target == this.newButton) {
            this.postGameNewStart();
        }
    };
    GameOverView.prototype.onAddToStage = function (event) {
        this.draw();
        this.childDraw();
    };
    GameOverView.prototype.postGameBack = function () {
        this.dispatchEventWith(GameEvent.GAMEBACK);
    };
    GameOverView.prototype.postGameNewStart = function () {
        this.dispatchEventWith(GameEvent.GAMENEWSTART);
    };
    GameOverView.prototype.draw = function () {
        this.graphics.beginFill(0x222222);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0xdddddd);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
    };
    GameOverView.prototype.childDraw = function () {
        this.addChild(this.resultText);
        this.addChild(this.backButton);
        this.addChild(this.newButton);
    };
    return GameOverView;
}(egret.Sprite));
__reflect(GameOverView.prototype, "GameOverView");
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameEvent.GAMEBACK = "gameback";
    GameEvent.GAMENEWSTART = "gamenewstart";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameOverView.js.map