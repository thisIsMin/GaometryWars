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
//菱形
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) {
        var _this = _super.call(this, Gaometry.TYPE_SQUARE, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) || this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        _this.life = 1;
        _this.attack = 1;
        _this.maxLifeTime = 50000;
        _this.attackSpeed = 0.2;
        _this.attackTime = 0;
        return _this;
    }
    // protected initData(){
    //     super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;
    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=15000;
    //     this.attackSpeed=0.2;
    //     this.attackTime=0;
    // }
    Square.prototype.draw = function () {
        this.width = 40;
        this.height = 30;
        this.graphics.lineStyle(2, this.color);
        this.graphics.moveTo(this.width / 2, 0);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, 0);
        this.graphics.lineTo(0, this.height / 2);
        this.graphics.lineTo(this.width / 2, 0);
        this.graphics.endFill();
    };
    Square.prototype.shot = function () {
        var globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        var bt = new SquBullet("dddd", this, this.getPosition(), this.isFriendly, globlaP.x, globlaP.y);
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
        }
    };
    //hui zhen
    //@progress 表示动画进度
    Square.prototype.dieAnimationPaintin = function (progress) {
        if (this.lineAnimations == null) {
            //qing chu yuan xianshiti
            this.graphics.clear();
            //chuangjian shua zhen duixiang
            this.lineAnimations = new Array();
            for (var i = 0; i < 8; i++) {
                var line = new egret.Shape();
                this.lineAnimations.push(line);
                this.addChild(line);
            }
        }
        for (var i = 0; i < 8; i++) {
            this.lineAnimations[i].graphics.clear();
        }
        this.lineAnimations[0].graphics.lineStyle(2, this.color);
        this.lineAnimations[0].graphics.moveTo((this.width / 4 - (this.width / 4 * progress)), this.height / 4 - this.height / 4 * progress);
        this.lineAnimations[0].graphics.lineTo(this.width / 2 - this.width / 4 * progress, 0);
        this.lineAnimations[0].graphics.endFill();
        this.lineAnimations[1].graphics.lineStyle(2, this.color);
        this.lineAnimations[1].graphics.moveTo(this.width / 4 - (this.width / 4 * progress), this.height / 4 - this.height / 4 * progress);
        this.lineAnimations[1].graphics.lineTo(0, (this.height / 2 - this.height / 4 * progress));
        this.lineAnimations[1].graphics.endFill();
        this.lineAnimations[2].graphics.lineStyle(2, this.color);
        this.lineAnimations[2].graphics.moveTo(-(this.width / 4 - (this.width / 4 * progress)), this.height / 4 - this.height / 4 * progress);
        this.lineAnimations[2].graphics.lineTo(0, (this.height / 2 - this.height / 4 * progress));
        this.lineAnimations[2].graphics.endFill();
        this.lineAnimations[3].graphics.lineStyle(2, this.color);
        this.lineAnimations[3].graphics.moveTo(-(this.width / 4 - (this.width / 4 * progress)), this.height / 4 - this.height / 4 * progress);
        this.lineAnimations[3].graphics.lineTo(-(this.width / 2 - this.width / 4 * progress), 0);
        this.lineAnimations[3].graphics.endFill();
        this.lineAnimations[4].graphics.lineStyle(2, this.color);
        this.lineAnimations[4].graphics.moveTo(-(this.width / 4 - (this.width / 4 * progress)), -this.height / 4 + this.height / 4 * progress);
        this.lineAnimations[4].graphics.lineTo(-(this.width / 2 - this.width / 4 * progress), 0);
        this.lineAnimations[4].graphics.endFill();
        this.lineAnimations[5].graphics.lineStyle(2, this.color);
        this.lineAnimations[5].graphics.moveTo(-(this.width / 4 - (this.width / 4 * progress)), -this.height / 4 + this.height / 4 * progress);
        this.lineAnimations[5].graphics.lineTo(0, -(this.height / 2 - this.height / 4 * progress));
        this.lineAnimations[5].graphics.endFill();
        this.lineAnimations[6].graphics.lineStyle(2, this.color);
        this.lineAnimations[6].graphics.moveTo(this.width / 4 - (this.width / 4 * progress), -this.height / 4 + this.height / 4 * progress);
        this.lineAnimations[6].graphics.lineTo(0, -(this.height / 2 - this.height / 4 * progress));
        this.lineAnimations[6].graphics.endFill();
        this.lineAnimations[7].graphics.lineStyle(2, this.color);
        this.lineAnimations[7].graphics.moveTo(this.width / 4 - (this.width / 4 * progress), -this.height / 4 + this.height / 4 * progress);
        this.lineAnimations[7].graphics.lineTo(this.width / 2 - this.width / 4 * progress, 0);
        this.lineAnimations[7].graphics.endFill();
    };
    return Square;
}(Gaometry));
__reflect(Square.prototype, "Square");
//# sourceMappingURL=Square.js.map