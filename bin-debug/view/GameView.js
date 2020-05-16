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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.lastGameTime = 0;
        _this.gc = new GameControl(_this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    GameView.prototype.onAddToStage = function (event) {
        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.init();
        this.start();
        //this.initView();
    };
    GameView.prototype.init = function () {
        GameView.speed = 30;
        this.x = 0;
    };
    GameView.prototype.start = function () {
        this.gc.initGame();
        this.lastGameTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.gc.gameStart();
    };
    GameView.prototype.onEnterFrame = function () {
        var gameTime = egret.getTimer();
        var pass = gameTime - this.lastGameTime;
        this.lastGameTime = gameTime;
        this.gameViewMove(pass);
        this.gc.gameRun(pass);
        //this.gameViewMove(pass);
        //egret.log("gameview on ef pass" +pass);
    };
    GameView.prototype.gameOver = function (isWin) {
        GameView.speed = 0;
        var reString;
        if (isWin) {
            reString = "WIN";
        }
        else {
            reString = "LOST";
        }
        var gov = new GameOverView(reString);
        gov.x = (0 - this.x) + (this.stage.stageWidth - gov.width) / 2;
        gov.y = (this.stage.stageHeight - gov.height) / 2;
        this.addChild(gov);
        gov.addEventListener(GameEvent.GAMEBACK, this.onGameBack, this);
        gov.addEventListener(GameEvent.GAMENEWSTART, this.onNewStart, this);
    };
    GameView.prototype.onGameBack = function () {
        this.gameBack();
    };
    GameView.prototype.onNewStart = function () {
        this.startNewGame();
    };
    GameView.prototype.gameBack = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.dispatchEventWith(GameEvent.GAMEBACK);
    };
    GameView.prototype.startNewGame = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.clean();
        this.init();
        this.start();
    };
    GameView.prototype.clean = function () {
        this.removeChildren();
    };
    GameView.prototype.rouMove = function (pos) {
        this.gc.rouMove(pos);
    };
    GameView.prototype.rouUp = function () {
        this.gc.rouUp();
    };
    GameView.prototype.onPause = function () {
    };
    GameView.prototype.onResume = function () {
        this.lastGameTime = egret.getTimer();
    };
    GameView.prototype.gameViewMove = function (pass) {
        this.x = this.x - (GameView.speed * pass) / 1000;
    };
    /////////////////////////////////
    GameView.prototype.onChangeGao = function (i) {
        this.gc.changeOriginGao(i);
        egret.log("gameview changegao :" + i);
    };
    GameView.prototype.skillActivation = function () {
        this.gc.skillActivation();
    };
    GameView.speed = 30;
    return GameView;
}(egret.DisplayObjectContainer));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map