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
//三角子弹
var TriBullet = (function (_super) {
    __extends(TriBullet, _super);
    function TriBullet(id, producer, pos, isFriendly, x, y) {
        var _this = _super.call(this, Bullet.TYPE_TRIANGLE, id, producer, pos, isFriendly, x, y) || this;
        _this.initData();
        return _this;
    }
    TriBullet.prototype.initData = function () {
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;
        this.setspeed(90);
        this.life = 1;
        this.attack = 1;
        this.maxLifeTime = 15000;
    };
    TriBullet.prototype.draw = function () {
        //绘制圆子弹
        this.width = 10;
        this.height = 10;
        this.graphics.lineStyle(2, this.color);
        this.graphics.moveTo(this.width / 2, this.height / 2);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, this.height / 2);
        this.graphics.lineTo(this.width / 2, this.height / 2);
        this.graphics.endFill();
    };
    TriBullet.prototype.initChild = function () { };
    // public go(pass:number){//
    //     //跟踪
    //     if(this.hostile!=null){
    //         //改变方向
    //         let x=this.hostile.x-this.x;
    //         let y=this.hostile.y-this.y;
    //         let tan=y/x;
    //         let pos=Math.atan(tan);
    //         if(this.isFriendly){
    //             //友方
    //             if(pos<=Math.PI/2 || pos >=Math.PI*3/2){
    //                 this.setPosition(pos);
    //             }
    //         }else{
    //             if(pos>=Math.PI/2 && pos <=Math.PI*3/2){
    //                 this.setPosition(pos);
    //             }
    //         }
    //     }
    //     super.go(pass)
    // }
    TriBullet.prototype.moveRun = function (pass) {
        //跟踪
        if (this.hostile != null && !this.hostile.getIsDie()) {
            //改变方向
            var x = this.hostile.x - this.x;
            var y = this.hostile.y - this.y;
            var tan = y / x;
            var pos = 0;
            if (y == 0 && x == 0) {
                pos = 0;
            }
            else {
                if (y >= 0) {
                    pos = Math.acos(x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                }
                else {
                    pos = -Math.acos(x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                }
            }
            if (this.isFriendly) {
                //友方
                if (Math.abs(pos) <= Math.PI / 2 || pos >= Math.PI * 3 / 2) {
                    this.setPosition(pos);
                }
            }
            else {
                if (Math.abs(pos) >= Math.PI / 2 && pos <= Math.PI * 3 / 2) {
                    this.setPosition(pos);
                }
            }
        }
        this.move(pass);
    };
    TriBullet.prototype.setHostile = function (entity) {
        this.hostile = entity;
    };
    return TriBullet;
}(Bullet));
__reflect(TriBullet.prototype, "TriBullet");
//# sourceMappingURL=TriBullet.js.map