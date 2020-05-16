// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
var GameControl = (function () {
    function GameControl(gv) {
        this.gameTime = 0;
        this.lastGameTime = 0;
        this.lifeTime = 140000;
        this.updateEntityNum = 0;
        this.enimys = new Array();
        this.gameview = gv;
    }
    //init game 
    GameControl.prototype.initGame = function () {
        //自身数据INIT
        //myORIGIN MAP init
        var map = new Map();
        this.addEntityToGame(map);
        var my = new Origin(IdUitl.getId(), 0, true, 200, 200, 0, null, this);
        this.addEntityToGame(my);
        this.enimys = new Array;
        this.bullets = new Array;
        this.gaometrys = new Array;
        this.gameTime = 0;
        this.lastGameTime = 0;
        this.lifeTime = 140000;
        this.updateEntityNum = 0;
    };
    ////start game 
    GameControl.prototype.gameStart = function () {
        this.gameState = GameControl.GAMESTATE_RUN;
    };
    // game run
    GameControl.prototype.gameRun = function (pass) {
        //if (this.gameState == GameControl.GAMESTATE_RUN) {
        //update enimy根据时间更新新的敌人和资源加入GAME
        this.updateEntity();
        //碰撞检测
        this.collisionDetection();
        //entity go
        this.entityGo(pass);
        //碰撞检测
        //this.collisionDetection();
        //死亡检测
        this.overClean();
        //
        //shneg ming zhou qi 
        this.lifeRun(pass);
        //}
    };
    GameControl.prototype.lifeRun = function (pass) {
        this.lastGameTime = this.gameTime;
        this.gameTime = this.gameTime + pass;
        this.isGameOver();
    };
    //
    GameControl.prototype.entityGo = function (pass) {
        this.my.go(pass);
        for (var i = 0; i < this.enimys.length; i++) {
            if (!this.enimys[i].getIsDie()) {
                this.enimys[i].go(pass);
            }
        }
        for (var i = 0; i < this.gaometrys.length; i++) {
            //let b=this.gaometrys[i].getIsDie();
            if (!this.gaometrys[i].getIsDie()) {
                //let a=0;.constructor.name
                // if(this.gaometrys[i].getType()==Gaometry.TYPE_DIAMOND){
                //   let a=0;
                // }
                this.gaometrys[i].go(pass);
            }
        }
        for (var i = 0; i < this.bullets.length; i++) {
            if (!this.bullets[i].getIsDie()) {
                this.bullets[i].go(pass);
            }
        }
    };
    //game over
    GameControl.prototype.gameOver = function (isWin) {
        //结算//
        //
        if (this.gameState == GameControl.GAMESTATE_RUN) {
            this.gameview.gameOver(isWin);
            this.gameState = GameControl.GAMESTATE_OVER;
        }
    };
    /*
    //没20秒刷一次 共刷15次到300秒
     范围为updateEntityNum *600到（updateEntityNum+1）*600
    */
    GameControl.prototype.updateEntity = function () {
        if (this.lastGameTime <= this.updateEntityNum * 20000 && this.gameTime > this.updateEntityNum * 20000
            && this.updateEntityNum < this.lifeTime / 20000) {
            this.uptadeEntityForUpNum(this.updateEntityNum, 20);
            this.updateEntityNum++;
        }
    };
    ///uptadeentity for upNum
    GameControl.prototype.uptadeEntityForUpNum = function (num, timeSpan) {
        var baseX = 1200 + num * timeSpan * GameView.speed; //x fan wei basex dao basex+timespan*speed
        switch (num) {
            case 0://di yi ci
                for (var i = 0; i < 3; i++) {
                    var e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 200, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);
                    var e2 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 400, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 1://
                for (var i = 0; i < 3; i++) {
                    var e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 200, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);
                    var e2 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 400, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                for (var i = 0; i < 3; i++) {
                    var e = new Diamond(IdUitl.getId(), Math.PI / 2, false, 100 + baseX + i * 200, -(i * 100 + 100), Gaometry.STATE_FREE, 50, null, this);
                    this.addEntityToGame(e);
                    var e3 = new Diamond(IdUitl.getId(), Math.PI * 3 / 2, false, 100 + baseX + i * 200, 650 + (i * 100 + 100), Gaometry.STATE_FREE, 50, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 2://
                for (var i = 0; i < 6; i++) {
                    var e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);
                    var e2 = new Triangle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 325, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 3://
                for (var i = 0; i < 3; i++) {
                    var e = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);
                    var e2 = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 325, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);
                    var e3 = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 4://
                var paths = new Array();
                var tpd = new TimePathData(0, Math.PI * 3 / 2);
                paths.push(tpd);
                tpd = new TimePathData(10000, Math.PI * 3 / 2 - Math.PI * 3 / 4);
                paths.push(tpd);
                var d = new Diamond(IdUitl.getId(), Math.PI / 2, false, baseX, 650, Gaometry.STATE_FREE, 50, paths, this);
                this.addEntityToGame(d);
                var paths1 = new Array();
                tpd = new TimePathData(0, Math.PI / 2);
                paths1.push(tpd);
                tpd = new TimePathData(10000, Math.PI / 2 + Math.PI * 3 / 4);
                paths1.push(tpd);
                var d2 = new Diamond(IdUitl.getId(), Math.PI * 3 / 2, false, baseX, 0, Gaometry.STATE_FREE, 50, paths1, this);
                this.addEntityToGame(d2);
                for (var i = 0; i < 3; i++) {
                    var e = new Square(IdUitl.getId(), Math.PI, false, 300 + baseX + i * 100, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);
                    var e3 = new Square(IdUitl.getId(), Math.PI, false, 300 + baseX + i * 100, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 5://
                for (var i = 0; i < 6; i++) {
                    var paths_1 = new Array();
                    var tpd_1 = new TimePathData(0, Math.PI * 3 / 2);
                    paths_1.push(tpd_1);
                    tpd_1 = new TimePathData(12000, Math.PI / 2);
                    paths_1.push(tpd_1);
                    var paths1_1 = new Array();
                    tpd_1 = new TimePathData(0, Math.PI / 2);
                    paths1_1.push(tpd_1);
                    tpd_1 = new TimePathData(10000, Math.PI / 2 * 3);
                    paths1_1.push(tpd_1);
                    var e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1_1, this);
                    this.addEntityToGame(e);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths_1, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 6://
                for (var i = 0; i < 6; i++) {
                    var paths_2 = new Array();
                    var tpd_2 = new TimePathData(0, Math.PI * 7 / 4);
                    paths_2.push(tpd_2);
                    tpd_2 = new TimePathData(15000, Math.PI / 2);
                    paths_2.push(tpd_2);
                    tpd_2 = new TimePathData(25000, Math.PI);
                    paths_2.push(tpd_2);
                    var paths1_2 = new Array();
                    tpd_2 = new TimePathData(0, Math.PI / 2);
                    paths1_2.push(tpd_2);
                    tpd_2 = new TimePathData(10000, Math.PI / 2 * 3);
                    paths1_2.push(tpd_2);
                    var e = new Triangle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1_2, this);
                    this.addEntityToGame(e);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths_2, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 7://
                for (var i = 0; i < 6; i++) {
                    var paths_3 = new Array();
                    var tpd_3 = new TimePathData(0, Math.PI * 3 / 2);
                    paths_3.push(tpd_3);
                    tpd_3 = new TimePathData(10000, 0);
                    paths_3.push(tpd_3);
                    tpd_3 = new TimePathData(20000, Math.PI / 2);
                    paths_3.push(tpd_3);
                    var paths1_3 = new Array();
                    tpd_3 = new TimePathData(0, Math.PI / 2);
                    paths1_3.push(tpd_3);
                    tpd_3 = new TimePathData(10000, 0);
                    paths1_3.push(tpd_3);
                    tpd_3 = new TimePathData(20000, Math.PI * 3 / 2);
                    paths1_3.push(tpd_3);
                    var e = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1_3, this);
                    this.addEntityToGame(e);
                    var e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths_3, this);
                    this.addEntityToGame(e3);
                }
                break;
        }
    };
    GameControl.prototype.collisionDetection = function () {
        //自身与敌方单位或资源
        // for(let i=0;i<this.enimys.length;i++){
        //     if(this.hitTest(this.my,this.enimys[i])){
        //         this.my.collisionHandle(this.enimys[i]);
        //         this.enimys[i].collisionHandle(this.my);
        //     }
        // }
        //自身检测
        for (var i = 0; i < this.bullets.length; i++) {
            if (!this.bullets[i].getIsFriendly() && !this.bullets[i].getIsDie()) {
                if (GameControl.hitEntityTest(this.my, this.bullets[i])) {
                    this.my.collisionHandle(this.bullets[i]); //自身碰撞处理
                    this.bullets[i].collisionHandle(this.my); //子弹碰撞处理
                }
            }
        }
        for (var i = 0; i < this.gaometrys.length; i++) {
            if (!this.gaometrys[i].getIsFriendly() && !this.gaometrys[i].getIsDie()) {
                if (GameControl.hitEntityTest(this.my, this.gaometrys[i])) {
                    this.my.collisionHandle(this.gaometrys[i]);
                    this.gaometrys[i].collisionHandle(this.my);
                }
            }
        }
        //子弹与GAO 
        for (var i = 0; i < this.bullets.length; i++) {
            for (var j = 0; j < this.gaometrys.length; j++) {
                if (this.bullets[i].getIsFriendly() != this.gaometrys[j].getIsFriendly() && !this.gaometrys[j].getIsDie()
                    && !this.bullets[i].getIsDie()) {
                    if (GameControl.hitEntityTest(this.bullets[i], this.gaometrys[j])) {
                        this.bullets[i].collisionHandle(this.gaometrys[j]);
                        this.gaometrys[j].collisionHandle(this.bullets[i]);
                    }
                }
            }
        }
        //gao与GAO 
        for (var i = 0; i < this.gaometrys.length; i++) {
            if (this.gaometrys[i].getIsFriendly()) {
                for (var j = 0; j < this.gaometrys.length; j++) {
                    if (!this.gaometrys[j].getIsFriendly()) {
                        if (GameControl.hitEntityTest(this.gaometrys[i], this.gaometrys[j])) {
                            this.gaometrys[i].collisionHandle(this.gaometrys[j]);
                            this.gaometrys[j].collisionHandle(this.gaometrys[i]);
                        }
                    }
                }
            }
        }
    };
    GameControl.hitEntityTest = function (obj1, obj2) {
        //document.createElement("canvas").getContext("2d");
        var rt1s = obj1.getGloHitRects();
        var rt2s = obj2.getGloHitRects();
        for (var i = 0; i < rt1s.length; i++) {
            for (var j = 0; j < rt2s.length; j++) {
                if (rt1s[i].intersects(rt2s[j])) {
                    return true;
                }
            }
        }
        return false;
    };
    GameControl.prototype.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x + rect1.left;
        rect1.y = obj1.y + rect1.top;
        rect2.x = obj2.x + rect2.left;
        rect2.y = obj2.y + rect2.top;
        return rect1.intersects(rect2);
    };
    GameControl.prototype.hitTestForCirler = function (obj1, obj2) {
        var cd1 = new CirlerData(obj1.x, obj1.y, obj1.width / 2);
        var cd2 = new CirlerData(obj2.x, obj2.y, obj2.width / 2);
        return cd1.intersects(cd2);
    };
    GameControl.prototype.isGameOver = function () {
        //自己死亡 失败
        if (this.my.getIsDie()) {
            this.gameOver(false);
        }
        else if (this.gameTime >= this.lifeTime && this.isNoEntity()) {
            this.gameOver(true);
        }
    };
    GameControl.prototype.isNoEntity = function () {
        for (var i = 0; i < this.enimys.length; i++) {
            if (this.enimys.length > 0) {
                if (!this.enimys[i].getIsFriendly()) {
                    return false;
                }
            }
        }
        for (var i = 0; i < this.gaometrys.length; i++) {
            if (this.gaometrys.length > 0) {
                if (!this.gaometrys[i].getIsFriendly()) {
                    return false;
                }
            }
        }
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets.length > 0) {
                if (!this.bullets[i].getIsFriendly()) {
                    return false;
                }
            }
        }
        return true;
    };
    GameControl.prototype.overClean = function () {
        //this.removeDieEntity(this.enimys);
        this.removeOverEntitys(this.bullets);
        this.removeOverEntitys(this.gaometrys);
        // var list=new Array<number>();
        // for(let i=0;i<this.enimys.length;i++){
        //     if(this.enimys[i].getIsDie){
        //         list.push(i);
        //     }
        // }
        // if(list.length>0){
        //     for(let i=0;i<list.length;i++){
        //        this.reMoveEntityForGame(this.enimys[i]); 
        //     }
        // }
    };
    GameControl.prototype.removeOverEntitys = function (ar) {
        var ar1 = new Array();
        //let re=false;
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].getIsOver()) {
                //this.reMoveEntityForGame(ar[i]);
                //re=true;
                ar1.push(ar[i]);
                //break;
            }
        }
        for (var i = 0; i < ar1.length; i++) {
            if (ar1[i].getIsOver()) {
                //this.reMoveEntityForGame(ar[i]);
                //re=true;
                this.reMoveEntityForGame(ar1[i]);
                //break;
            }
        }
    };
    GameControl.prototype.addEntityToGame = function (entity) {
        var cName = entity.constructor.name;
        //let ada=entity.constructor.className;
        if (cName == "Origin") {
            if (entity.getIsFriendly) {
                this.my = entity; //加入控制器
                this.gameview.addChild(this.my); //加入显示
            }
            else {
                this.enimys.push(entity);
                this.gameview.addChild(entity);
            }
        }
        else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            this.bullets.push(entity);
            var p = new egret.Point();
            this.gameview.globalToLocal(entity.x, entity.y, p);
            entity.x = p.x;
            entity.y = p.y;
            this.gameview.addChild(entity);
        }
        else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" || cName == "Square" || cName == "Triangle") {
            this.gaometrys.push(entity);
            this.gameview.addChild(entity);
        }
        else if (cName == "Map") {
            this.map = entity;
            this.gameview.addChild(entity);
        }
        // let index=array.indexOf(5);
        // if (index > -1) {
        //     array.splice(index, 1);
        // }
    };
    GameControl.prototype.reMoveEntityForGame = function (entity) {
        var cName = entity.constructor.name;
        if (cName == "Origin") {
            if (entity.getIsFriendly()) {
                this.my = null; //
                this.gameview.removeChild(this.my); //
            }
            else {
                var index = this.enimys.indexOf(entity);
                if (index > -1) {
                    this.enimys.splice(index, 1);
                }
                this.gameview.removeChild(entity);
            }
        }
        else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            var index = this.bullets.indexOf(entity);
            if (index > -1) {
                this.bullets.splice(index, 1);
            }
            this.gameview.removeChild(entity);
        }
        else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" || cName == "Square" || cName == "Triangle") {
            var index = this.gaometrys.indexOf(entity);
            if (index > -1) {
                this.gaometrys.splice(index, 1);
            }
            this.gameview.removeChild(entity);
        }
        else if (cName == "Map") {
            this.map = null;
            this.gameview.removeChild(entity);
        }
    };
    GameControl.prototype.rouMove = function (pos) {
        this.my.setPosition(pos);
        this.my.setSpeedForDel();
    };
    GameControl.prototype.rouUp = function () {
        //this.my.setPosition(pos);
        this.my.setspeed(0);
    };
    //////////////////////////////////获取跟踪对象
    GameControl.prototype.getTrackObj = function (bl) {
        //  if(bl.getIsFriendly()){
        //      return this.getCurTrack(bl);
        //  }else{//敌方子弹
        //      return this.my;
        //  }
        // 把敌对 GAO ORIGIN 挑出来
        var ens = this.getHostiles(bl);
        //根据范围挑出来根据数量随机一个 范围0-100，100-300,300-600,600-900.900<= <1200
        return this.getCurTrack(bl, ens, 0, 100);
    };
    GameControl.prototype.getHostiles = function (bl) {
        var reEns = new Array();
        if (bl.getIsFriendly() != this.my.getIsFriendly()) {
            reEns.push(this.my);
        }
        for (var i = 0; i < this.enimys.length; i++) {
            if (this.enimys[i].getIsFriendly() != bl.getIsFriendly()) {
                reEns.push(this.enimys[i]);
            }
        }
        for (var i = 0; i < this.gaometrys.length; i++) {
            if (this.gaometrys[i].getIsFriendly() != bl.getIsFriendly()) {
                reEns.push(this.gaometrys[i]);
            }
        }
        // for(let e in this.gaometrys){
        //     if(e.getIsFriendly() != bl.getIsFriendly()){
        //         reEns.push(e);
        //     }
        // }
        return reEns;
    };
    GameControl.prototype.getCurTrack = function (bl, ar, start, scope) {
        var _this = this;
        var gain = function (bl, ar, start, scope) {
            var ar1 = _this.getGainHostiles(bl, ar, start, scope);
            if (ar1.length == 1) {
                return ar1[0];
            }
            else if (ar1.length > 1) {
                var i = Math.floor(Math.random() * ar1.length);
                return ar1[i];
            }
            return null;
        };
        var reE = gain(bl, ar, start, scope);
        if (reE == null) {
            var startTo = start + scope;
            var scopeTo = 300;
            if (startTo >= 1200) {
                return null;
            }
            else {
                return this.getCurTrack(bl, ar, startTo, scopeTo);
            }
        }
        else {
            return reE;
        }
        //return null;
    };
    GameControl.prototype.getGainHostiles = function (bl, ar, start, scope) {
        var reEns = new Array();
        for (var i = 0; i < ar.length; i++) {
            var position = Math.sqrt(Math.pow((ar[i].x - bl.x), 2) + Math.pow((ar[i].y - bl.y), 2));
            if (start <= position && position < (scope + start)) {
                reEns.push(ar[i]);
            }
        }
        return reEns;
    };
    ////////////////////////////////////////////huan rou xuanzhan xi tong
    ////////////////////////////////////////执行切换GAO命令
    GameControl.prototype.changeOriginGao = function (i) {
        this.my.changeGao(i);
    };
    /////////////////////////jihuo jineng
    GameControl.prototype.skillActivation = function () {
        this.my.activationSkill();
    };
    /////////////////////////// jiao huan xianshi wei zhi 
    GameControl.prototype.putUpMy = function (e) {
        this.gameview.swapChildren(this.my, e);
    };
    GameControl.prototype.setGameViewChildBefMy = function (e) {
        var i = this.gameview.getChildIndex(this.my);
        this.gameview.setChildIndex(e, i);
    };
    GameControl.GAMESTATE_RUN = 1;
    GameControl.GAMESTATE_STOP = 2;
    GameControl.GAMESTATE_OVER = 3;
    return GameControl;
}());
__reflect(GameControl.prototype, "GameControl");
//# sourceMappingURL=GameControl.js.map