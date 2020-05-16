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
var Gaometry = (function (_super) {
    __extends(Gaometry, _super);
    function Gaometry(type, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc) {
        var _this = _super.call(this, id, x, y, gc) || this;
        _this.radian = 0;
        _this.revSpeed = 5000;
        _this.type = type;
        _this.setPosition(pos);
        _this.isFriendly = isFriendly;
        _this.state = state;
        _this.setspeed(speed);
        _this.timePathDatas = timePatDatas;
        if (_this.isFriendly) {
            _this.color = 0x00ffff;
        }
        else {
            _this.color = 0xff0000;
        }
        _this.life = 1;
        _this.attack = 1;
        _this.maxLifeTime = 50000;
        _this.attackSpeed = 0.5;
        _this.attackTime = 0;
        return _this;
        //this.x=600;
        //this.y=325;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    // protected initData(){
    //     super.initData();
    //     //this.setspeed(0);
    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=30000;
    //     this.attackSpeed=0.5;
    //     this.attackTime=0;
    // }
    Gaometry.prototype.draw = function () {
    };
    Gaometry.prototype.initChild = function () { };
    Gaometry.prototype.moveRun = function (pass) {
        if (this.state == Gaometry.STATE_FREE) {
            _super.prototype.moveRun.call(this, pass);
        }
        else if (this.state == Gaometry.STATE_FATTER) {
            //方向改变 围绕ORIGIN 圆周运动
            this.revolution(pass);
        }
        else if (this.state == Gaometry.STATE_FOLLOW) {
            //GENSUI  ORIGIN 圆周运动
            this.followMove();
        }
    };
    Gaometry.prototype.lifeControl = function (pass) {
        if (this.state == Gaometry.STATE_FATTER) {
            this.lifeTime = this.lifeTime + pass;
        }
        else {
            _super.prototype.lifeControl.call(this, pass);
        }
    };
    Gaometry.prototype.attackRun = function (pass) {
        if (this.attackTime >= (1000 / this.attackSpeed)) {
            // if(this.state==Gaometry.STATE_FATTER){
            //     this.fatterShot();
            // }
            this.shot();
            this.attackTime = 0;
        }
        else {
            this.attackTime = this.attackTime + pass;
        }
    };
    Gaometry.prototype.shot = function () { };
    //protected fatterShot(){}
    Gaometry.prototype.collisionHandle = function (entity) {
        var cName = entity.constructor.name;
        //区分碰撞类型
        if (cName == "Origin") {
            this.behitOfOrigin(entity);
        }
        else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            this.behit(entity);
        }
        else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" ||
            cName == "Square" || cName == "Triangle") {
            this.behit(entity);
        }
    };
    Gaometry.prototype.behit = function (entity) {
        if (this.state == Gaometry.STATE_FREE || this.state == Gaometry.STATE_FOLLOW) {
            //伤害计算
            var hurt = entity.getHurt();
            this.life = this.life - hurt;
            if (this.life <= 0) {
                //处理伤害结果
                this.die();
            }
        }
        else if (this.state == Gaometry.STATE_FATTER) {
            this.revolutionOrigin.behit(entity);
        }
    };
    Gaometry.prototype.behitOfOrigin = function (entity) {
        if (this.state == Gaometry.STATE_FREE) {
            this.die();
        }
        else if (this.state == Gaometry.STATE_FATTER) {
            this.revolutionOrigin.behitOfOrigin(entity);
        }
    };
    Gaometry.prototype.revolution = function (num) {
        // if(this.radian>=2*Math.PI){
        //     this.radian=this.radian-2*Math.PI;
        // }
        var multiple = 1;
        if (this.revolutionOrigin.getMultipleBuff()) {
            multiple = this.revolutionOrigin.getMultiple();
        }
        this.radian = this.radian + (num * 2 * Math.PI / this.revSpeed) * multiple;
        if (this.radian >= 2 * Math.PI) {
            this.radian = this.radian - 2 * Math.PI;
        }
        this.x = this.revolutionRadius * Math.cos(this.radian);
        this.y = this.revolutionRadius * Math.sin(this.radian);
    };
    Gaometry.prototype.setRevolutionData = function (radian, revolutionRadius, origin) {
        this.radian = radian;
        this.revolutionRadius = revolutionRadius;
        this.revolutionOrigin = origin;
    };
    //GEN SUI 
    Gaometry.prototype.followMove = function () {
        this.x = this.followOrigin.x + this.followX;
        this.y = this.followOrigin.y + this.followY;
    };
    Gaometry.prototype.setFollowData = function (fx, fy, fOrigin) {
        this.followX = fx;
        this.followY = fy;
        this.followOrigin = fOrigin;
    };
    Gaometry.prototype.dieAnimation = function () {
        //chuanjian she zhi jishiqi
        this.timer = new egret.Timer(1000 / 30, 10);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.dieAnimationRun, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dieAnimationComplete, this);
        //this.animationLastEgretTime=egret.getTimer();
        this.timer.start();
    };
    Gaometry.prototype.dieAnimationRun = function (event) {
        this.dieAnimationPaintin(this.timer.currentCount / this.timer.repeatCount);
    };
    Gaometry.prototype.dieAnimationPaintin = function (prog) { };
    Gaometry.prototype.dieAnimationComplete = function (event) {
        egret.log("circle animationComplete");
        this.isOver = true;
    };
    ///////////////////////////////////////////////////////////////////////
    Gaometry.prototype.getType = function () {
        return this.type;
    };
    Gaometry.prototype.getRadian = function () {
        return this.radian;
    };
    Gaometry.prototype.getRevolutionRadius = function () {
        return this.revolutionRadius;
    };
    Gaometry.TYPE_DIAMOND = 2;
    Gaometry.TYPE_CIRCLE = 1;
    Gaometry.TYPE_SQUARE = 3;
    Gaometry.TYPE_TRIANGLE = 4;
    Gaometry.STATE_FREE = 1;
    Gaometry.STATE_FATTER = 2;
    Gaometry.STATE_FOLLOW = 3;
    return Gaometry;
}(Entity));
__reflect(Gaometry.prototype, "Gaometry");
//# sourceMappingURL=Gaometry.js.map