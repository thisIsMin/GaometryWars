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
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) {
        var _this = _super.call(this, Gaometry.TYPE_CIRCLE, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) || this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        _this.life = 1;
        _this.attack = 1;
        _this.attackSpeed = 0.2;
        _this.attackTime = 0;
        return _this;
    }
    // private onAddToStage(event: egret.Event) {
    //     this.draw();
    //     this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    //     this.timeOnEnterFrame = egret.getTimer();
    // }
    // private revolutionRadius:number=150;
    // protected initData(){
    //     //super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;
    //     this.life=1;
    //     this.attack=1;
    //     this.attackSpeed=0.5;
    //     this.attackTime=0;
    // }
    Circle.prototype.draw = function () {
        this.width = 40;
        this.height = 40;
        //this.graphics.beginFill(0x0000ff, 1);
        this.graphics.lineStyle(2, this.color);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    };
    Circle.prototype.shot = function () {
        var globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        var bt = new CirBullet("dddd", this, this.getPosition(), this.isFriendly, globlaP.x, globlaP.y);
        //let bt=new Bullet(Bullet.TYPE_NOR,"dddd",this,this.getPosition(),this.isFriendly,this.x+this.width/2,this.y);
        if (bt.getIsFriendly()) {
            bt.setPosition(0);
        }
        else {
            bt.setPosition(Math.PI);
        }
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
        }
    };
    //hui zhen
    //@progress 表示动画进度
    Circle.prototype.dieAnimationPaintin = function (progress) {
        if (this.lineAnimations == null) {
            //qing chu yuan xianshiti
            this.graphics.clear();
            //chuangjian shua zhen duixiang
            this.lineAnimations = new Array();
            for (var i = 0; i < 8; i++) {
                var line = new egret.Shape();
                line.graphics.lineStyle(2, this.color);
                line.graphics.drawArc(0, 0, this.width / 2, i * Math.PI / 4, (i + 1) * Math.PI / 4);
                line.graphics.endFill();
                line.x = Math.cos((i + 1) * Math.PI / 4) * this.width / 2;
                line.y = Math.sin((i + 1) * Math.PI / 4) * this.width / 2;
                line.anchorOffsetX = line.x;
                line.anchorOffsetY = line.y;
                this.lineAnimations.push(line);
                this.addChild(line);
            }
        }
        for (var i = 0; i < this.lineAnimations.length; i++) {
            //zixuan
            this.lineAnimations[i].rotation = 90 * progress;
            //gong zhuan gong zhuan banjing suojian
            var revolutionRadian = Math.acos(this.lineAnimations[i].x / Math.sqrt(Math.pow(this.lineAnimations[i].x, 2) + Math.pow(this.lineAnimations[i].y, 2)));
            if (this.lineAnimations[i].y < 0) {
                revolutionRadian = Math.PI * 2 - revolutionRadian;
            }
            this.lineAnimations[i].x = Math.cos(revolutionRadian) * ((this.width / 2) * (1 - progress));
            this.lineAnimations[i].y = Math.sin(revolutionRadian) * ((this.width / 2) * (1 - progress));
            //tou mingdu
            this.lineAnimations[i].alpha = 1 - progress;
        }
    };
    return Circle;
}(Gaometry));
__reflect(Circle.prototype, "Circle");
//# sourceMappingURL=Circle.js.map