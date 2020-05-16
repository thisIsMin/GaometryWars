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
var Skill = (function () {
    function Skill(og, gc) {
        this.og = og;
    }
    Skill.prototype.skillShot = function (pass) {
        if (this.skillTime >= (1000 / this.skillSpeed)) {
            this._skillShot(pass);
            this.skillTime = 0;
        }
        else {
            this.skillTime = this.skillTime + pass;
        }
    };
    Skill.prototype._skillShot = function (pass) {
    };
    Skill.prototype.getType = function () {
        return this.type;
    };
    Skill.prototype.die = function () { };
    Skill.TYPE_CIR = 1;
    Skill.TYPE_DIA = 2;
    Skill.TYPE_SQU = 3;
    Skill.TYPE_TRI = 4;
    return Skill;
}());
__reflect(Skill.prototype, "Skill");
var SkillCir = (function (_super) {
    __extends(SkillCir, _super);
    function SkillCir(og, gc) {
        var _this = _super.call(this, og) || this;
        _this.continuedTime = 0; //zhi xu la duo jiu
        _this.totalTime = 5000;
        _this.skillShoting = false;
        _this.skillShape = new egret.Shape();
        _this.skillRadian = 0;
        //init data
        _this.skillTime = 0;
        _this.skillSpeed = 0.1;
        _this.type = Skill.TYPE_CIR;
        _this.gc = gc;
        return _this;
    }
    SkillCir.prototype.skillShot = function (pass) {
        if (this.skillShoting && this.continuedTime <= this.totalTime) {
            this.continuedTime = this.continuedTime + pass;
            this._skillShot(pass);
        }
        else {
            this.skillShoting = false;
            var i = this.og.getChildIndex(this.skillShape);
            if (i >= 0) {
                this.og.removeChild(this.skillShape);
            }
            if (this.skillTime >= (1000 / this.skillSpeed)) {
                this.og.addChildAt(this.skillShape, 0);
                this._skillShot(pass);
                this.skillTime = 0;
                this.continuedTime = 0;
                this.skillShoting = true;
            }
            else {
                this.skillTime = this.skillTime + pass;
            }
        }
    };
    SkillCir.prototype._skillShot = function (pass) {
        var x = Math.cos(this.skillRadian) * this.og.getOgRadius() * 3 / 8;
        var y = Math.sin(this.skillRadian) * this.og.getOgRadius() * 3 / 8;
        //jineng xiao guo hui zhi
        this.drawSkill(pass, x, y);
        var pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        }
        else {
            pos = Math.PI / 2;
        }
        var globlaP = new egret.Point();
        this.og.localToGlobal(x, y, globlaP);
        this.shot(globlaP.x, globlaP.y);
    };
    SkillCir.prototype.shot = function (x, y) {
        var pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        }
        else {
            pos = Math.PI / 2;
        }
        var bt = new CirSuperBullet(IdUitl.getId(), this.og, pos, true, x, y);
        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
            this.gc.setGameViewChildBefMy(bt);
        }
    };
    SkillCir.prototype.drawSkill = function (pass, x, y) {
        this.skillShape.graphics.clear();
        var gts = this.og.getGts();
        this.skillShape.graphics.lineStyle(8, 0xdddddd);
        for (var i = 0; i < gts.length; i++) {
            this.skillShape.graphics.moveTo(x, y);
            this.skillShape.graphics.lineTo(gts[i].x, gts[i].y);
        }
        //hui yuandian
        this.skillShape.graphics.beginFill(0xffffff);
        this.skillShape.graphics.drawCircle(x, y, 8);
        this.skillShape.graphics.endFill();
        this.skillRadian = this.skillRadian + pass / 2000 * Math.PI * 2;
    };
    SkillCir.prototype.die = function () {
        var i = this.og.getChildIndex(this.skillShape);
        if (i >= 0) {
            this.og.removeChild(this.skillShape);
        }
    };
    return SkillCir;
}(Skill));
__reflect(SkillCir.prototype, "SkillCir");
var SkillDia = (function (_super) {
    __extends(SkillDia, _super);
    function SkillDia(og, gc) {
        var _this = _super.call(this, og) || this;
        _this.continuedTime = 0; //zhi xu la duo jiu
        _this.totalTime = 5000;
        _this.skillShoting = false;
        _this.multiple = 4;
        //init data
        _this.skillTime = 0;
        _this.skillSpeed = 1;
        _this.type = Skill.TYPE_DIA;
        _this.gc = gc;
        return _this;
    }
    SkillDia.prototype.skillShot = function (pass) {
        if (this.skillShoting && this.continuedTime <= this.totalTime) {
            this.continuedTime = this.continuedTime + pass;
            //this.skillShoting=false;
        }
        else {
            this.skillShoting = false;
            if (this.skillTime >= (1000 / this.skillSpeed)) {
                this._skillShot(pass);
                this.skillTime = 0;
                this.continuedTime = 0;
                this.skillShoting = true;
            }
            else {
                this.skillTime = this.skillTime + pass;
            }
        }
    };
    SkillDia.prototype._skillShot = function (pass) {
        this.og.accelerateRevo(this.multiple);
    };
    return SkillDia;
}(Skill));
__reflect(SkillDia.prototype, "SkillDia");
var SkillSqu = (function (_super) {
    __extends(SkillSqu, _super);
    function SkillSqu(og, gc) {
        var _this = _super.call(this, og) || this;
        //init data
        _this.skillTime = 19000;
        _this.skillSpeed = 1000 / 20000;
        _this.type = Skill.TYPE_SQU;
        _this.gc = gc;
        return _this;
    }
    // public skillShot(pass){
    //         //this.skillTime=this.skillTime+pass;
    //        if(this.skillTime >= (1000/this.skillSpeed)){
    //             this._skillShot();
    //             this.skillTime=0;
    //         }else{
    //             this.skillTime=this.skillTime+pass;
    //         }
    // }
    //private multiple=4; 
    SkillSqu.prototype._skillShot = function (pass) {
        var p = new egret.Point();
        p.x = 0;
        p.y = 90;
        this._skillShotByPosition(p);
        p.x = 0;
        p.y = -90;
        this._skillShotByPosition(p);
        p.x = -50;
        p.y = 90 + 50;
        this._skillShotByPosition(p);
        p.x = 0 - 50;
        p.y = -90 - 50;
        this._skillShotByPosition(p);
    };
    SkillSqu.prototype._skillShotByPosition = function (point) {
        var pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        }
        else {
            pos = Math.PI / 2;
        }
        var x = this.og.x + point.x;
        var y = this.og.y + point.y;
        var squ = new Square(IdUitl.getId(), pos, this.og.getIsFriendly(), this.og.x + point.x, this.og.y + point.y, Gaometry.STATE_FOLLOW, 0, null, this.gc);
        squ.setFollowData(point.x, point.y, this.og);
        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(squ);
        }
    };
    return SkillSqu;
}(Skill));
__reflect(SkillSqu.prototype, "SkillSqu");
var SkillTri = (function (_super) {
    __extends(SkillTri, _super);
    function SkillTri(og, gc) {
        var _this = _super.call(this, og) || this;
        //init data
        _this.skillTime = 0;
        _this.skillSpeed = 0.5;
        _this.type = Skill.TYPE_TRI;
        _this.gc = gc;
        return _this;
    }
    SkillTri.prototype._skillShot = function (pass) {
        var p = new egret.Point();
        var globlaP = new egret.Point();
        this.og.localToGlobal(0, 0, globlaP);
        p.x = globlaP.x;
        p.y = globlaP.y;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y - this.og.height / 2;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y + this.og.height / 2;
        this._skillShotByPosition(p);
    };
    SkillTri.prototype._skillShotByPosition = function (point) {
        var pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        }
        else {
            pos = Math.PI / 2;
        }
        var squ = new TriBullet(IdUitl.getId(), this.og, pos, this.og.getIsFriendly(), point.x, point.y);
        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(squ);
            squ.setHostile(this.gc.getTrackObj(squ));
        }
    };
    return SkillTri;
}(Skill));
__reflect(SkillTri.prototype, "SkillTri");
//# sourceMappingURL=Skill.js.map