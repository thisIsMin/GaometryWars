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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(type, id, producer, pos, isFriendly, x, y) {
        var _this = _super.call(this, id, x, y) || this;
        _this.producer = producer;
        _this.type = type;
        _this.setPosition(pos);
        _this.isFriendly = isFriendly;
        if (_this.isFriendly) {
            _this.color = 0x00ffff;
        }
        else {
            _this.color = 0xff0000;
        }
        _this.setspeed(200);
        _this.life = 1;
        _this.attack = 1;
        _this.maxLifeTime = 10000;
        return _this;
        //this.width=100;
        //this.height=100;
        //this.x=600;
        //this.y=325;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    // protected initData(){
    //     super.initData();
    //     this.setspeed(150);
    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=10000;
    // }
    Bullet.prototype.collisionHandle = function (entity) {
        //pengzhun xiaoguo
        this.collisionAnimation();
        //直死
        this.die();
    };
    Bullet.prototype.collisionAnimation = function () {
        this.isCollisionAnimation = true;
        //
        var an = new egret.Shape();
        an.graphics.beginFill(0xffffff, 1);
        an.graphics.moveTo(-10, -4);
        an.graphics.lineTo(10, -4);
        an.graphics.lineTo(20, 0);
        an.graphics.lineTo(10, 4);
        an.graphics.lineTo(-10, 4);
        an.graphics.lineTo(-10, -4);
        //an.graphics.drawRect(0,0,20,20);
        an.graphics.endFill();
        an.y = -this.height / 2;
        an.rotation = -45;
        this.addChild(an);
        //
        var tw = egret.Tween.get(an);
        //tw.to({ "alpha": 1 }, 500);
        tw.to({ "alpha": 0 }, 200);
        //tw.to({ "alpha": 1 }, 1000);
        //tw.wait(2000);
        //tw.to({ "alpha": 0 }, 500);
        tw.call(this.onComplete, this);
    };
    Bullet.prototype.onComplete = function () {
        this.isCollisionAnimation = false;
        this.isOver = true;
    };
    Bullet.prototype.dieAnimation = function () {
        if (!this.isCollisionAnimation) {
            this.isOver = true;
        }
    };
    ;
    Bullet.prototype.draw = function () {
        //绘制普通子弹
        var blt = new egret.Sprite();
        blt.graphics.beginFill(this.color, 1);
        blt.graphics.drawCircle(0, 0, 5);
        blt.graphics.endFill();
        this.addChild(blt);
    };
    Bullet.prototype.initChild = function () { };
    Bullet.TYPE_NOR = 1;
    Bullet.TYPE_CIRCLE = 2;
    Bullet.TYPE_SQUARE = 3;
    Bullet.TYPE_TRIANGLE = 4;
    return Bullet;
}(Entity));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map