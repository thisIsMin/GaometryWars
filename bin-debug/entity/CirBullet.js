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
//圆形子弹
var CirBullet = (function (_super) {
    __extends(CirBullet, _super);
    function CirBullet(id, producer, pos, isFriendly, x, y) {
        var _this = _super.call(this, Bullet.TYPE_CIRCLE, id, producer, pos, isFriendly, x, y) || this;
        _this.initData();
        return _this;
    }
    CirBullet.prototype.initData = function () {
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;
        this.setspeed(200);
        this.life = 1;
        this.attack = 1;
        this.maxLifeTime = 10000;
    };
    CirBullet.prototype.draw = function () {
        //绘制圆子弹
        var blt = new egret.Sprite();
        blt.graphics.lineStyle(2, this.color);
        blt.graphics.drawCircle(0, 0, 5);
        blt.graphics.endFill();
        this.addChild(blt);
    };
    CirBullet.prototype.initChild = function () { };
    return CirBullet;
}(Bullet));
__reflect(CirBullet.prototype, "CirBullet");
//# sourceMappingURL=CirBullet.js.map