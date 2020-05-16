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
var GameUIView = (function (_super) {
    __extends(GameUIView, _super);
    function GameUIView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameUIView.prototype.onAddToStage = function (event) {
        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.initView();
    };
    GameUIView.prototype.initView = function () {
        var roulette = new Roulette();
        this.addChild(roulette);
        roulette.addEventListener(RouletteChange.EVENT_ROULETTECHANGE, this.onRouChange, this);
        this.changeGaoView = new ChangeGaoView();
        this.changeGaoView.addEventListener(ChangeGaoEvent.EVENT_ROULETTECHANGE, this.onChangeGao, this);
        this.changeGaoView.addEventListener("postSkillEvent", this.onSkillActivation, this);
        this.addChild(this.changeGaoView);
    };
    GameUIView.prototype.onSkillActivation = function (event) {
        this.dispatchEvent(event);
    };
    GameUIView.prototype.onChangeGao = function (event) {
        egret.log(" changegoa  vi");
        this.dispatchEvent(event);
    };
    GameUIView.prototype.onRouChange = function (event) {
        this.dispatchEvent(event);
        egret.log(" roulettechange  vi");
    };
    return GameUIView;
}(egret.DisplayObjectContainer));
__reflect(GameUIView.prototype, "GameUIView");
//# sourceMappingURL=GameUIView.js.map