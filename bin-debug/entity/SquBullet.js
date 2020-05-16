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
//菱形子弹
var SquBullet = (function (_super) {
    __extends(SquBullet, _super);
    function SquBullet(id, producer, pos, isFriendly, x, y) {
        var _this = _super.call(this, Bullet.TYPE_SQUARE, id, producer, pos, isFriendly, x, y) || this;
        _this.initData();
        return _this;
    }
    SquBullet.prototype.initData = function () {
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;
        this.setspeed(200);
        this.life = 1;
        this.attack = 2;
        this.maxLifeTime = 10000;
    };
    SquBullet.prototype.draw = function () {
        //绘制圆子弹
        this.width = 8;
        this.height = 10;
        this.graphics.lineStyle(2, this.color);
        this.graphics.moveTo(this.width / 2, 0);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, 0);
        this.graphics.lineTo(0, this.height / 2);
        this.graphics.lineTo(this.width / 2, 0);
        this.graphics.endFill();
    };
    SquBullet.prototype.initChild = function () { };
    return SquBullet;
}(Bullet));
__reflect(SquBullet.prototype, "SquBullet");
//# sourceMappingURL=SquBullet.js.map