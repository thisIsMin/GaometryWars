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
//三角
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) {
        var _this = _super.call(this, Gaometry.TYPE_TRIANGLE, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) || this;
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
    Triangle.prototype.draw = function () {
        this.width = 40;
        this.height = 40;
        this.graphics.lineStyle(3, this.color);
        this.graphics.moveTo(this.width / 2, this.height / 2);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, this.height / 2);
        this.graphics.lineTo(this.width / 2, this.height / 2);
        this.graphics.endFill();
    };
    Triangle.prototype.shot = function () {
        var globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        var bt = new TriBullet("dddd", this, this.getPosition(), this.isFriendly, globlaP.x, globlaP.y);
        //bt.setHostile();
        if (this.gc != null) {
            var e = this.gc.getTrackObj(bt);
            bt.setHostile(e);
            this.gc.addEntityToGame(bt);
        }
    };
    //hui zhen
    //@progress 表示动画进度
    Triangle.prototype.dieAnimationPaintin = function (progress) {
        if (this.lineAnimations == null) {
            //qing chu yuan xianshiti
            this.graphics.clear();
            //chuangjian shua zhen duixiang
            this.lineAnimations = new Array();
            for (var i = 0; i < 3; i++) {
                var line = new egret.Shape();
                if (i == 0) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(this.width / 2, this.height / 2);
                    line.graphics.lineTo(-this.width / 2, this.height / 2);
                    line.graphics.endFill();
                    line.x = this.width / 2;
                    line.y = this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                }
                else if (i == 1) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(-this.width / 2, this.height / 2);
                    line.graphics.lineTo(0, -this.height / 2);
                    line.graphics.endFill();
                    line.x = -this.width / 2;
                    line.y = this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                }
                else if (i == 2) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(0, -this.height / 2);
                    line.graphics.lineTo(this.width / 2, this.height / 2);
                    line.graphics.endFill();
                    line.x = 0;
                    line.y = -this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                }
                this.lineAnimations.push(line);
                this.addChild(line);
            }
        }
        for (var i = 0; i < this.lineAnimations.length; i++) {
            //zixuan
            this.lineAnimations[i].rotation = 25 * progress;
            //gong zhuan gong zhuan 
            var revolutionRadian = Math.acos(this.lineAnimations[i].x / Math.sqrt(Math.pow(this.lineAnimations[i].x, 2) + Math.pow(this.lineAnimations[i].y, 2)));
            if (this.lineAnimations[i].y < 0) {
                revolutionRadian = Math.PI * 2 - revolutionRadian;
            }
            this.lineAnimations[i].x = Math.cos(revolutionRadian + Math.PI * progress) * ((this.width / 2));
            this.lineAnimations[i].y = Math.sin(revolutionRadian + Math.PI * progress) * ((this.width / 2));
            //tou mingdu
            this.lineAnimations[i].alpha = 1 - progress;
        }
    };
    return Triangle;
}(Gaometry));
__reflect(Triangle.prototype, "Triangle");
//# sourceMappingURL=Triangle.js.map