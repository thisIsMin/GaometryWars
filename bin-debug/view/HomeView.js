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
//主页面
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        var _this = _super.call(this) || this;
        _this.startButton = new Button();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    HomeView.prototype.onAddToStage = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.draw();
    };
    HomeView.prototype.onAboutButton = function () {
        this.about();
    };
    HomeView.prototype.about = function () { };
    HomeView.prototype.draw = function () {
        this.drawChild();
    };
    HomeView.prototype.drawChild = function () {
        if (this.backGround == null) {
            this.backGround = new egret.Sprite();
        }
        this.backGround.graphics.beginFill(0x222222);
        this.backGround.graphics.drawRect(0, 0, this.width, this.height);
        this.backGround.graphics.endFill();
        this.addChild(this.backGround);
        //if(this.startButton==null){
        //this.startButton=new Button();
        this.startButton.x = this.width / 2 - this.startButton.width / 2;
        this.startButton.y = 400;
        //}
        this.startButton.setButtonText("开始游戏");
        this.addChild(this.startButton);
        if (this.aboutButton == null) {
            this.aboutButton = new Button();
            this.aboutButton.x = this.width / 2 - this.aboutButton.width / 2;
            this.aboutButton.y = 200;
            this.aboutButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAboutButton, this);
        }
        this.aboutButton.setButtonText("关于");
        this.addChild(this.aboutButton);
    };
    return HomeView;
}(egret.DisplayObjectContainer));
__reflect(HomeView.prototype, "HomeView");
//# sourceMappingURL=HomeView.js.map