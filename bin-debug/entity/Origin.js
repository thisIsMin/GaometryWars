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
//本体
var Origin = (function (_super) {
    __extends(Origin, _super);
    function Origin(id, pos, isFriendly, x, y, speed, timePatDatas, gc) {
        var _this = _super.call(this, id, x, y, gc) || this;
        _this.attackApeed = 0.5; // mei miao gongji ci yu
        _this.attackTime = 1000 / 0.5;
        // public recoverySpeed(){
        //     this.setspeed(this.delSpeed);
        // }
        /////////////////////////////////////////////////huan rou xuanzhuan xitong
        //ORIGIN 身边默认有三个GAOMETRY 围绕ORIGIN旋转
        //GAOMETRY 有器正常射击功能 能碰撞，但碰撞伤害计算到ORIGIN，生命周期跟随ORIGIN
        //可以手动切换GAO
        //当三个GAO一样时可以激活其特殊技能
        _this.gts = new Array();
        _this.multiple = 1;
        _this.multipleBuff = false;
        _this.multipleBuffTimeSurplus = 0;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        _this.setPosition(pos);
        _this.isFriendly = isFriendly;
        _this.setspeed(speed);
        _this.timePathDatas = timePatDatas;
        _this.delSpeed = 100;
        if (_this.isFriendly) {
            _this.color = 0x00ffff;
        }
        else {
            _this.color = 0xff0000;
        }
        _this.initData();
        return _this;
    }
    // public onAddToStage(event: egret.Event) {
    //     this.draw();
    //     var circle:Circle=new Circle();
    //     this.addChild(circle);
    //     egret.log("origin onaddstage");
    // }
    // private onEnterFrame(){
    //     this.go();
    //     egret.log("origin onenterframe");
    // }
    Origin.prototype.initData = function () {
        //super.initData();
        this.life = 1;
        this.attack = 1;
        this.maxLifeTime = -1;
    };
    Origin.prototype.initChild = function () {
        //var circle:Circle=new Circle();
        //this.addChild(circle);
        for (var i = 0; i < 3; i++) {
            var cr = new Circle(IdUitl.getId(), 0, this.isFriendly, 0, 0, Gaometry.STATE_FATTER, 0, null, this.gc);
            cr.setRevolutionData(i * Math.PI / 3 * 2, this.og.width / 2, this);
            //this.removeChild(this.gts[i]);
            this.gts[i] = cr;
            this.addChild(cr);
        }
        this.activationCirSkill();
        //this.skill=new SkillCir(this,this.gc);
        //egret.log("origin initChild");
    };
    Origin.prototype.draw = function () {
        this.og = new egret.Shape();
        this.og.width = 80;
        this.og.height = 80;
        this.og.graphics.beginFill(this.color, 0.8);
        this.og.graphics.drawCircle(0, 0, 8);
        this.og.graphics.endFill();
        //this.graphics.beginFill(0x0000ff, 1);
        this.og.graphics.lineStyle(5, this.color);
        this.og.graphics.drawCircle(0, 0, 40);
        this.og.graphics.endFill();
        this.addChild(this.og);
        //egret.log("origin draw");
    };
    // public go(pass: number){
    //     super.go(pass);
    //     //if(this.isShot){
    //     this.attackRun(pass);
    //     //}
    // }
    Origin.prototype.go = function (pass) {
        _super.prototype.go.call(this, pass);
        this.buffLifeRun(pass);
    };
    Origin.prototype.buffLifeRun = function (pass) {
        //multiple
        if (this.multipleBuff) {
            this.multipleBuffTimeSurplus = this.multipleBuffTimeSurplus - pass;
            if (this.multipleBuffTimeSurplus <= 0) {
                this.restoreRevo();
            }
        }
    };
    Origin.prototype.move = function (pass) {
        _super.prototype.move.call(this, pass);
        //+gameview速度
        this.x = this.x + GameView.speed * pass / 1000;
        //egret.log("origin move");
    };
    Origin.prototype.shot = function () {
        var globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        var bt = new Bullet(Bullet.TYPE_NOR, "dddd", this, 0, true, globlaP.x, globlaP.y);
        //egret.log("origin shot x" + this. x + "y" + this.y );
        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
        }
    };
    Origin.prototype.attackRun = function (pass) {
        this.attackTime = this.attackTime + pass;
        if (this.attackTime >= (1000 / this.attackApeed)) {
            this.shot();
            this.attackTime = 0;
        }
    };
    Origin.prototype.childGo = function (pass) {
        for (var i = 0; i < this.gts.length; i++) {
            this.gts[i].go(pass);
        }
    };
    Origin.prototype.die = function () {
        //
        this.isDie = true;
        //内方块死亡
    };
    Origin.prototype.collisionHandle = function (entity) {
        // shi fo gts pengzhu
        if (this.gtsCollisionHandle(entity)) {
            return;
        }
        var cName = entity.constructor.name;
        //区分碰撞类型
        if (cName == "Origin") {
            this.behitOfOrigin(entity);
        }
        else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            this.behit(entity);
        }
        else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" || cName == "Square" || cName == "Triangle") {
            this.behit(entity);
        }
    };
    Origin.prototype.gtsCollisionHandle = function (entity) {
        for (var i = 0; i < this.gts.length; i++) {
            if (GameControl.hitEntityTest(this.gts[i], entity)) {
                this.gts[i].collisionHandle(entity);
                return true;
            }
        }
        return false;
    };
    Origin.prototype.getGloHitRects = function () {
        var ars = new Array();
        //GTS RECT
        for (var i = 0; i < this.gts.length; i++) {
            var ars1 = this.gts[i].getGloHitRects();
            ars = ars.concat(ars1);
        }
        //自身RECT
        var rt = this.getSelfGloHitRect();
        ars.push(rt);
        return ars;
    };
    Origin.prototype.getSelfGloHitRect = function () {
        //自身RECT
        var rt = this.og.getBounds();
        var point = new egret.Point();
        this.og.localToGlobal(0 + this.anchorOffsetX, 0 + this.anchorOffsetY, point); //获取自身原点在全局STAGE的坐标
        //吧原点放到左上角
        rt.x = point.x + rt.left;
        rt.y = point.y + rt.top;
        return rt;
    };
    Origin.prototype.setSpeedForDel = function () {
        this.setspeed(this.delSpeed);
    };
    //手动切换GAO
    Origin.prototype.changeGao = function (i) {
        if (this.gts[i] != null) {
            var type = this.gts[i].getType() + 1;
            if (type == Gaometry.TYPE_CIRCLE) {
                var cr = new Circle(IdUitl.getId(), this.gts[i].getPosition(), this.isFriendly, this.gts[i].x, this.gts[i].y, Gaometry.STATE_FATTER, 0, null, this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(), this.gts[i].getRevolutionRadius(), this);
                this.removeChild(this.gts[i]);
                this.gts[i] = cr;
                this.addChild(cr);
            }
            else if (type == Gaometry.TYPE_DIAMOND) {
                var cr = new Diamond(IdUitl.getId(), this.gts[i].getPosition(), this.isFriendly, this.gts[i].x, this.gts[i].y, Gaometry.STATE_FATTER, 0, null, this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(), this.gts[i].getRevolutionRadius(), this);
                this.removeChild(this.gts[i]);
                this.gts[i] = cr;
                this.addChild(cr);
            }
            else if (type == Gaometry.TYPE_SQUARE) {
                var cr = new Square(IdUitl.getId(), this.gts[i].getPosition(), this.isFriendly, this.gts[i].x, this.gts[i].y, Gaometry.STATE_FATTER, 0, null, this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(), this.gts[i].getRevolutionRadius(), this);
                this.removeChild(this.gts[i]);
                this.gts[i] = cr;
                this.addChild(cr);
            }
            else if (type == Gaometry.TYPE_TRIANGLE) {
                var cr = new Triangle(IdUitl.getId(), this.gts[i].getPosition(), this.isFriendly, this.gts[i].x, this.gts[i].y, Gaometry.STATE_FATTER, 0, null, this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(), this.gts[i].getRevolutionRadius(), this);
                this.removeChild(this.gts[i]);
                this.gts[i] = cr;
                this.addChild(cr);
            }
            else {
                var cr = new Circle(IdUitl.getId(), this.gts[i].getPosition(), this.isFriendly, this.gts[i].x, this.gts[i].y, Gaometry.STATE_FATTER, 0, null, this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(), this.gts[i].getRevolutionRadius(), this);
                this.removeChild(this.gts[i]);
                this.gts[i] = cr;
                this.addChild(cr);
            }
        }
    };
    ////////////////////////////////skill///////////////////////////////////特殊技能
    Origin.prototype.skillShot = function (pass) {
        this.skill.skillShot(pass);
    };
    Origin.prototype.activationSkill = function () {
        //pan duan san gao wei sm xing tai
        if (this.gts[0].getType() == Gaometry.TYPE_CIRCLE && this.gts[1].getType() == Gaometry.TYPE_CIRCLE
            && this.gts[2].getType() == Gaometry.TYPE_CIRCLE) {
            if (this.skill.getType() != Skill.TYPE_CIR) {
                this.activationCirSkill();
            }
        }
        else if (this.gts[0].getType() == Gaometry.TYPE_DIAMOND && this.gts[1].getType() == Gaometry.TYPE_DIAMOND
            && this.gts[2].getType() == Gaometry.TYPE_DIAMOND) {
            if (this.skill.getType() != Skill.TYPE_DIA) {
                this.activationDiaSkill();
            }
        }
        else if (this.gts[0].getType() == Gaometry.TYPE_SQUARE && this.gts[1].getType() == Gaometry.TYPE_SQUARE
            && this.gts[2].getType() == Gaometry.TYPE_SQUARE) {
            if (this.skill.getType() != Skill.TYPE_SQU) {
                this.activationSquSkill();
            }
        }
        else if (this.gts[0].getType() == Gaometry.TYPE_TRIANGLE && this.gts[1].getType() == Gaometry.TYPE_TRIANGLE
            && this.gts[2].getType() == Gaometry.TYPE_TRIANGLE) {
            if (this.skill.getType() != Skill.TYPE_TRI) {
                this.activationTriSkill();
            }
        }
    };
    Origin.prototype.activationCirSkill = function () {
        if (this.skill != null) {
            this.skill.die();
        }
        this.skill = new SkillCir(this, this.gc);
    };
    Origin.prototype.activationDiaSkill = function () {
        this.skill.die();
        this.skill = new SkillDia(this, this.gc);
    };
    Origin.prototype.activationSquSkill = function () {
        this.skill.die();
        this.skill = new SkillSqu(this, this.gc);
    };
    Origin.prototype.activationTriSkill = function () {
        this.skill.die();
        this.skill = new SkillTri(this, this.gc);
    };
    /////////////jiasu revolution ji neng
    Origin.prototype.accelerateRevo = function (multiple) {
        this.multiple = multiple;
        this.multipleBuff = true;
        this.multipleBuffTimeSurplus = 5000; //zhi xu 5 xiao
    };
    Origin.prototype.restoreRevo = function () {
        this.multiple = 1;
        this.multipleBuff = false;
    };
    Origin.prototype.getMultiple = function () {
        return this.multiple;
    };
    Origin.prototype.getMultipleBuff = function () {
        return this.multipleBuff;
    };
    Origin.prototype.getOgRadius = function () {
        return this.og.width / 2;
    };
    Origin.prototype.getGts = function () {
        return this.gts;
    };
    return Origin;
}(Entity));
__reflect(Origin.prototype, "Origin");
//# sourceMappingURL=Origin.js.map