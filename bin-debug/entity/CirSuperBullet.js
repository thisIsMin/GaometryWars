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
var CirSuperBullet = (function (_super) {
    __extends(CirSuperBullet, _super);
    function CirSuperBullet(id, producer, pos, isFriendly, x, y) {
        var _this = _super.call(this, Bullet.TYPE_CIRCLE, id, producer, pos, isFriendly, x, y) || this;
        _this.oneTrue = true;
        _this.setspeed(0);
        _this.life = 1;
        _this.attack = 1;
        _this.maxLifeTime = 10000;
        return _this;
    }
    CirSuperBullet.prototype.draw = function () {
        //绘制圆子弹
        var sky = this.createBitmapByName("cirsuperb_png");
        // var blt=new egret.Sprite();
        // blt.graphics.lineStyle(2,this.color);
        // blt.graphics.drawCircle(0,0,5);
        // blt.graphics.endFill();
        this.addChild(sky);
        this.anchorOffsetY = this.height / 2;
    };
    CirSuperBullet.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    CirSuperBullet.prototype.lifeControl = function (pass) {
        if (this.oneTrue) {
            this.oneTrue = false;
            return;
        }
        else {
            this.die();
            this.isOver = true;
        }
    };
    CirSuperBullet.prototype.collisionHandle = function (entity) {
    };
    return CirSuperBullet;
}(Bullet));
__reflect(CirSuperBullet.prototype, "CirSuperBullet");
//# sourceMappingURL=CirSuperBullet.js.map