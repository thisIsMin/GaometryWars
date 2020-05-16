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
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) {
        var _this = _super.call(this, Gaometry.TYPE_DIAMOND, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) || this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        _this.life = 1;
        _this.attack = 1;
        _this.maxLifeTime = 30000;
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
    // }
    Diamond.prototype.draw = function () {
        this.width = 40;
        this.height = 40;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.graphics.lineStyle(3, this.color);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        // this.anchorOffsetX=this.width/2;
        // this.anchorOffsetY=this.height/2;
    };
    Diamond.prototype.shot = function () {
        //let bt=new dia("dddd",this,this.getPosition(),true,this.x+this.width/2,this.y);
    };
    Diamond.prototype.collisionHandle = function (entity) {
        var cName = entity.constructor.name;
        //区分碰撞类型
        if (cName == "Origin") {
            this.behitOfOrigin(entity);
        }
        else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" || cName == "TriBullet") {
            //this.behit(entity);
        }
        else if (cName == "Diamond") {
            this.behit(entity);
        }
    };
    //////////////////////////////////////////protected dieAnimationPaintin(prog : number){}
    //private lineAnimations: Array<egret.Shape>;
    //hui zhen
    //@progress 表示动画进度
    Diamond.prototype.dieAnimationPaintin = function (progress) {
        //tou mingdu
        this.alpha = progress;
    };
    return Diamond;
}(Gaometry));
__reflect(Diamond.prototype, "Diamond");
//# sourceMappingURL=Diamond.js.map