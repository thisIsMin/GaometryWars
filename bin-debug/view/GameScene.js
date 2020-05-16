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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameScene.prototype.onAddToStage = function (event) {
        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.initView();
    };
    GameScene.prototype.initView = function () {
        // var gameUIView:GameUIView=new GameUIView();
        // this.addChild(gameUIView);
        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.gameView.addEventListener(GameEvent.GAMEBACK, this.gameBack, this);
        var gameUIView = new GameUIView();
        this.addChild(gameUIView);
        gameUIView.addEventListener(RouletteChange.EVENT_ROULETTECHANGE, this.onRouChange, this);
        gameUIView.addEventListener(ChangeGaoEvent.EVENT_ROULETTECHANGE, this.onChangeGao, this);
        gameUIView.addEventListener("postSkillEvent", this.onSkillActivation, this);
    };
    GameScene.prototype.gameBack = function () {
        this.dispatchEventWith(GameEvent.GAMEBACK);
    };
    GameScene.prototype.onSkillActivation = function (event) {
        this.gameView.skillActivation();
    };
    GameScene.prototype.onChangeGao = function (event) {
        egret.log(" changegoa  GameScene :" + event.i);
        this.gameView.onChangeGao(event.i);
    };
    GameScene.prototype.onRouChange = function (event) {
        egret.log(" roulettechange  gs");
        egret.log(" roulettechange position point.x=" + event.m_position.x + "point.y=" + event.m_position.y);
        if (event.m_position.y == 0 && event.m_position.x == 0) {
            this.gameView.rouUp();
        }
        else {
            if (event.m_position.y >= 0) {
                var pos = Math.acos(event.m_position.x / Math.sqrt(Math.pow(event.m_position.x, 2) + Math.pow(event.m_position.y, 2)));
                this.gameView.rouMove(pos);
            }
            else {
                var pos = -Math.acos(event.m_position.x / Math.sqrt(Math.pow(event.m_position.x, 2) + Math.pow(event.m_position.y, 2)));
                this.gameView.rouMove(pos);
            }
        }
    };
    GameScene.prototype.onPause = function () {
        this.gameView.onPause();
    };
    GameScene.prototype.onResume = function () {
        this.gameView.onResume();
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map