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
//所有实体类的父类
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(id, x, y, gc) {
        var _this = _super.call(this) || this;
        _this.position = 0; //方向 弧度
        _this.speed = 0; //速度 秒为单位
        _this.life = 0;
        _this.attack = 0;
        _this.isDie = false;
        _this.isOver = false;
        _this.id = null;
        _this.color = 0;
        _this.isFriendly = true;
        _this.lifeTime = 0;
        _this.maxLifeTime = -1;
        _this.timePathDatas = null;
        // protected initData(){
        // }
        _this.lastTime = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        _this.id = id;
        _this.x = x;
        _this.y = y;
        _this.gc = gc;
        return _this;
    }
    Entity.prototype.onAddToStage = function (event) {
        this.lastTime = egret.getTimer();
        //egret.log("entity onaddstage");
        this.draw();
        this.initChild();
        this.lifeTime = 0;
    };
    //private onEnterFrame(){
    // let nowTime=egret.getTimer();
    // let pass=nowTime-this.lastTime;
    // this.lastTime=egret.getTimer();
    // this.lifeTime=this.lifeTime+pass;
    // if(!this.isDie){
    //     this.go(pass);
    // }
    //egret.log("entity onenterframe");
    //}
    Entity.prototype.draw = function () { };
    Entity.prototype.initChild = function () { };
    Entity.prototype.move = function (pass) {
        var x = (this.speed * pass / 1000) * Math.cos(this.position);
        var y = (this.speed * pass / 1000) * Math.sin(this.position);
        this.x = this.x + x;
        this.y = this.y + y;
        //egret.log("entity move");
    };
    Entity.prototype.go = function (pass) {
        if (!this.isDie) {
            //移动控制
            this.moveRun(pass);
            //攻击
            this.attackRun(pass);
            //
            this.childGo(pass);
            //
            this.skillShot(pass);
        }
        //生命周期控制
        this.lifeControl(pass);
    };
    Entity.prototype.childGo = function (pass) {
    };
    Entity.prototype.getGloHitRects = function () {
        var ars = new Array();
        //自身RECT
        var rt = this.getSelfGloHitRect();
        ars.push(rt);
        return ars;
    };
    Entity.prototype.getSelfGloHitRect = function () {
        //自身RECT
        var rt = this.getBounds();
        var point = new egret.Point();
        this.localToGlobal(0 + this.anchorOffsetX, 0 + this.anchorOffsetY, point); //获取自身原点在全局STAGE的坐标
        //吧原点放到左上角
        rt.x = point.x + rt.left;
        rt.y = point.y + rt.top;
        return rt;
    };
    Entity.prototype.lifeControl = function (pass) {
        this.lastTime = this.lifeTime;
        this.lifeTime = this.lifeTime + pass;
        if (this.maxLifeTime >= 0 && this.lifeTime >= this.maxLifeTime) {
            this.die();
            return;
        }
    };
    Entity.prototype.moveRun = function (pass) {
        if (this.timePathDatas != null && this.timePathDatas.length > 0) {
            var timeCur = this.lifeTime;
            var timeLast = this.lastTime;
            if (this.lifeTime != 0 && this.lastTime != 0 && this.maxLifeTime < 0) {
                timeCur = this.lifeTime % this.timePathDatas[this.timePathDatas.length - 1].time;
                timeLast = this.lastTime % this.timePathDatas[this.timePathDatas.length - 1].time;
                if (timeLast > timeCur) {
                    timeLast = 0;
                }
            }
            if (this.lifeTime > 6000) {
                var a_1 = 0;
            }
            for (var i = 0; i < this.timePathDatas.length; i++) {
                if (timeCur > this.timePathDatas[i].time && timeLast <= this.timePathDatas[i].time) {
                    this.position = this.timePathDatas[i].position;
                    break;
                }
            }
        }
        this.move(pass);
    };
    Entity.prototype.attackRun = function (pass) { };
    Entity.prototype.shot = function (pass) {
        // 产生子弹
        //加入game
    };
    Entity.prototype.die = function () {
        if (!this.isDie) {
            this.isDie = true;
            this.dieAnimation();
        }
    };
    Entity.prototype.dieAnimation = function () {
        this.isOver = true;
    };
    ;
    Entity.prototype.collisionHandle = function (entity) {
        this.behit(entity); //bei jizhong chuli
    };
    Entity.prototype.behit = function (entity) {
        //伤害计算
        var hurt = entity.getHurt();
        this.life = this.life - hurt;
        if (this.life <= 0) {
            //处理伤害结果
            this.die();
        }
    };
    ////////////////////////////////
    Entity.prototype.skillShot = function (pass) {
    };
    Entity.prototype.behitOfOrigin = function (entity) {
        this.die();
    };
    Entity.prototype.getHurt = function () {
        return this.attack;
    };
    Entity.prototype.getPosition = function () {
        return this.position;
    };
    Entity.prototype.setPosition = function (pos) {
        this.position = pos;
    };
    Entity.prototype.getspeed = function () {
        return this.speed;
    };
    Entity.prototype.setspeed = function (speed) {
        this.speed = speed;
    };
    Entity.prototype.getIsFriendly = function () {
        return this.isFriendly;
    };
    Entity.prototype.getIsDie = function () {
        return this.isDie;
    };
    Entity.prototype.getIsOver = function () {
        return this.isOver;
    };
    return Entity;
}(egret.Sprite));
__reflect(Entity.prototype, "Entity");
//# sourceMappingURL=Entity.js.map