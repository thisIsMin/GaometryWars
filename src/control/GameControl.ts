// TypeScript file

//
class GameControl {
    
    public constructor(gv: GameView) {
        this.gameview = gv;
    }
    //init game 
    public initGame() {
        //自身数据INIT
        //myORIGIN MAP init
        let map = new Map();
        this.addEntityToGame(map)
        let my = new Origin(IdUitl.getId(), 0, true, 200, 200, 0, null, this);
        this.addEntityToGame(my);

        this.enimys = new Array;
        this.bullets = new Array;
        this.gaometrys = new Array;

        this.gameTime = 0;
        this.lastGameTime = 0;
        this.lifeTime = 140000;
        this.updateEntityNum=0;

        
        

    }
    ////start game 
    public gameStart(){
        this.gameState=GameControl.GAMESTATE_RUN;
    }
    //start game 
    
    protected gameState: number;
    public static GAMESTATE_RUN = 1;
    public static GAMESTATE_STOP = 2;
    public static GAMESTATE_OVER = 3;
    // game run
    public gameRun(pass: number) {
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
    }
    private lifeRun(pass: number) {
        this.lastGameTime = this.gameTime;
        this.gameTime = this.gameTime + pass;

        this.isGameOver();
    }
    //

    protected entityGo(pass: number) {
        this.my.go(pass);

        for (let i = 0; i < this.enimys.length; i++) {
            if (!this.enimys[i].getIsDie()) {
                this.enimys[i].go(pass);
            }

        }

        for (let i = 0; i < this.gaometrys.length; i++) {
            //let b=this.gaometrys[i].getIsDie();
            if (!this.gaometrys[i].getIsDie()) {
                //let a=0;.constructor.name
                // if(this.gaometrys[i].getType()==Gaometry.TYPE_DIAMOND){
                //   let a=0;
                // }
                this.gaometrys[i].go(pass);
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            if (!this.bullets[i].getIsDie()) {
                this.bullets[i].go(pass);
            }
        }
    }
    //game over
    public gameOver(isWin: boolean) {
        //结算//
        //
        if(this.gameState==GameControl.GAMESTATE_RUN){
          this.gameview.gameOver(isWin);
          this.gameState=GameControl.GAMESTATE_OVER;
        }
    }
    private gameTime = 0;
    private lastGameTime = 0;
    private lifeTime = 140000;
    private updateEntityNum = 0;
    /*
    //没20秒刷一次 共刷15次到300秒
     范围为updateEntityNum *600到（updateEntityNum+1）*600
    */

    protected updateEntity() {
        if (this.lastGameTime <= this.updateEntityNum * 20000 && this.gameTime > this.updateEntityNum * 20000
            && this.updateEntityNum < this.lifeTime / 20000) {
            this.uptadeEntityForUpNum(this.updateEntityNum, 20);
            this.updateEntityNum++;
        }

    }
    ///uptadeentity for upNum
    private uptadeEntityForUpNum(num: number, timeSpan: number) {
        let baseX = 1200 + num * timeSpan * GameView.speed;//x fan wei basex dao basex+timespan*speed
        switch (num) {
            case 0://di yi ci
                for (let i = 0; i < 3; i++) {
                    let e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 200, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);

                    let e2 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 400, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);

                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }

                break;
            case 1://
                for (let i = 0; i < 3; i++) {
                    let e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 200, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);

                    let e2 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 400, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);

                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }

                for (let i = 0; i < 3; i++) {
                    let e = new Diamond(IdUitl.getId(), Math.PI / 2, false, 100 + baseX + i * 200, -(i * 100 + 100), Gaometry.STATE_FREE, 50, null, this);
                    this.addEntityToGame(e);

                    let e3 = new Diamond(IdUitl.getId(), Math.PI * 3 / 2, false, 100 + baseX + i * 200, 650 + (i * 100 + 100), Gaometry.STATE_FREE, 50, null, this);
                    this.addEntityToGame(e3);
                }

                break;
            case 2://
                for (let i = 0; i < 6; i++) {
                    let e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);

                    let e2 = new Triangle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 325, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);

                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }

                break;
            case 3://
                for (let i = 0; i < 3; i++) {
                    let e = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);

                    let e2 = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 325, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e2);

                    let e3 = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 200, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;
            case 4://
                let paths = new Array<TimePathData>();
                let tpd = new TimePathData(0, Math.PI * 3 / 2);
                paths.push(tpd);
                tpd = new TimePathData(10000, Math.PI * 3 / 2 - Math.PI * 3 / 4);
                paths.push(tpd);
                let d = new Diamond(IdUitl.getId(), Math.PI / 2, false, baseX, 650, Gaometry.STATE_FREE, 50, paths, this);
                this.addEntityToGame(d);

                let paths1 = new Array<TimePathData>();
                tpd = new TimePathData(0, Math.PI / 2);
                paths1.push(tpd);
                tpd = new TimePathData(10000, Math.PI / 2 + Math.PI * 3 / 4);
                paths1.push(tpd);
                let d2 = new Diamond(IdUitl.getId(), Math.PI * 3 / 2, false, baseX, 0, Gaometry.STATE_FREE, 50, paths1, this);
                this.addEntityToGame(d2);
                for (let i = 0; i < 3; i++) {
                    let e = new Square(IdUitl.getId(), Math.PI, false, 300 + baseX + i * 100, 50, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e);


                    let e3 = new Square(IdUitl.getId(), Math.PI, false, 300 + baseX + i * 100, 600, Gaometry.STATE_FREE, 0, null, this);
                    this.addEntityToGame(e3);
                }
                break;

            case 5://
                for (let i = 0; i < 6; i++) {
                    let paths = new Array<TimePathData>();
                    let tpd = new TimePathData(0, Math.PI * 3 / 2);
                    paths.push(tpd);
                    tpd = new TimePathData(12000, Math.PI / 2);
                    paths.push(tpd);

                    let paths1 = new Array<TimePathData>();
                    tpd = new TimePathData(0, Math.PI / 2);
                    paths1.push(tpd);
                    tpd = new TimePathData(10000, Math.PI / 2 * 3);
                    paths1.push(tpd);

                    let e = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1, this);
                    this.addEntityToGame(e);


                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths, this);
                    this.addEntityToGame(e3);
                }
                break;

            case 6://
                for (let i = 0; i < 6; i++) {
                    let paths = new Array<TimePathData>();
                    let tpd = new TimePathData(0, Math.PI * 7 / 4);
                    paths.push(tpd);
                    tpd = new TimePathData(15000, Math.PI / 2);
                    paths.push(tpd);
                    tpd = new TimePathData(25000, Math.PI);
                    paths.push(tpd);

                    let paths1 = new Array<TimePathData>();
                    tpd = new TimePathData(0, Math.PI / 2);
                    paths1.push(tpd);
                    tpd = new TimePathData(10000, Math.PI / 2 * 3);
                    paths1.push(tpd);

                    let e = new Triangle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1, this);
                    this.addEntityToGame(e);


                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths, this);
                    this.addEntityToGame(e3);
                }
                break;

            case 7://
                for (let i = 0; i < 6; i++) {
                    let paths = new Array<TimePathData>();
                    let tpd = new TimePathData(0, Math.PI * 3 / 2);
                    paths.push(tpd);
                    tpd = new TimePathData(10000, 0);
                    paths.push(tpd);
                    tpd = new TimePathData(20000, Math.PI / 2);
                    paths.push(tpd);

                    let paths1 = new Array<TimePathData>();
                    tpd = new TimePathData(0, Math.PI / 2);
                    paths1.push(tpd);
                    tpd = new TimePathData(10000, 0);
                    paths1.push(tpd);
                    tpd = new TimePathData(20000, Math.PI * 3 / 2);
                    paths1.push(tpd);

                    let e = new Square(IdUitl.getId(), Math.PI, false, baseX + i * 100, 50, Gaometry.STATE_FREE, 50, paths1, this);
                    this.addEntityToGame(e);


                    let e3 = new Circle(IdUitl.getId(), Math.PI, false, baseX + i * 100, 600, Gaometry.STATE_FREE, 50, paths, this);
                    this.addEntityToGame(e3);
                }
                break;

        }
    }
    protected collisionDetection() {
        //自身与敌方单位或资源
        // for(let i=0;i<this.enimys.length;i++){
        //     if(this.hitTest(this.my,this.enimys[i])){
        //         this.my.collisionHandle(this.enimys[i]);
        //         this.enimys[i].collisionHandle(this.my);
        //     }
        // }
        //自身检测
        for (let i = 0; i < this.bullets.length; i++) {//自身与敌子弹
            if (!this.bullets[i].getIsFriendly() && !this.bullets[i].getIsDie()) {
                if (GameControl.hitEntityTest(this.my, this.bullets[i])) {//碰撞检测
                    this.my.collisionHandle(this.bullets[i]);//自身碰撞处理
                    this.bullets[i].collisionHandle(this.my);//子弹碰撞处理
                }
            }

        }
        for (let i = 0; i < this.gaometrys.length; i++) {
            if (!this.gaometrys[i].getIsFriendly() && !this.gaometrys[i].getIsDie()) {
                if (GameControl.hitEntityTest(this.my, this.gaometrys[i])) {
                    this.my.collisionHandle(this.gaometrys[i]);
                    this.gaometrys[i].collisionHandle(this.my);
                }
            }

        }
        //子弹与GAO 

        for (let i = 0; i < this.bullets.length; i++) {//遍历子弹
            for (let j = 0; j < this.gaometrys.length; j++) {//遍历GAO
                if (this.bullets[i].getIsFriendly() != this.gaometrys[j].getIsFriendly() && !this.gaometrys[j].getIsDie()
                    && !this.bullets[i].getIsDie()) {// 不同一方 且都没有死亡
                    if (GameControl.hitEntityTest(this.bullets[i], this.gaometrys[j])) {
                        this.bullets[i].collisionHandle(this.gaometrys[j]);
                        this.gaometrys[j].collisionHandle(this.bullets[i]);
                    }
                }
            }

        }

        //gao与GAO 

        for (let i = 0; i < this.gaometrys.length; i++) {
            if (this.gaometrys[i].getIsFriendly()) {//己方
                for (let j = 0; j < this.gaometrys.length; j++) {//敌方
                    if (!this.gaometrys[j].getIsFriendly()) {
                        if (GameControl.hitEntityTest(this.gaometrys[i], this.gaometrys[j])) {
                            this.gaometrys[i].collisionHandle(this.gaometrys[j]);
                            this.gaometrys[j].collisionHandle(this.gaometrys[i]);
                        }
                    }
                }
            }

        }


    }

    public static hitEntityTest(obj1: Entity, obj2: Entity): boolean {
        //document.createElement("canvas").getContext("2d");
        let rt1s = obj1.getGloHitRects();
        let rt2s = obj2.getGloHitRects();
        for (let i: number = 0; i < rt1s.length; i++) {
            for (let j = 0; j < rt2s.length; j++) {
                if (rt1s[i].intersects(rt2s[j])) {
                    return true;
                }
            }
        }
        return false;
    }
    public hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();

        rect1.x = obj1.x + rect1.left;
        rect1.y = obj1.y + rect1.top;
        rect2.x = obj2.x + rect2.left;
        rect2.y = obj2.y + rect2.top;
        return rect1.intersects(rect2);
    }

    public hitTestForCirler(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        let cd1: CirlerData = new CirlerData(obj1.x, obj1.y, obj1.width / 2);
        let cd2: CirlerData = new CirlerData(obj2.x, obj2.y, obj2.width / 2);

        return cd1.intersects(cd2);
    }
    protected isGameOver() {

        //自己死亡 失败
        if (this.my.getIsDie()) {
            this.gameOver(false);
        } else if (this.gameTime >= this.lifeTime && this.isNoEntity()) {// 时间结束 胜利
            this.gameOver(true);
        }
    }
    private isNoEntity(): boolean {
        for (let i = 0; i < this.enimys.length; i++) {
            if (this.enimys.length > 0) {
                if (!this.enimys[i].getIsFriendly()) {
                    return false;
                }
            }
        }

        for (let i = 0; i < this.gaometrys.length; i++) {
            if (this.gaometrys.length > 0) {
                if (!this.gaometrys[i].getIsFriendly()) {
                    return false;
                }
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets.length > 0) {
                if (!this.bullets[i].getIsFriendly()) {
                    return false;
                }
            }
        }

        return true;
    }
    protected overClean() {
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

    }

    private removeOverEntitys(ar: Array<Entity>) {
        let ar1 = new Array<Entity>();
        //let re=false;
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].getIsOver()) {
                //this.reMoveEntityForGame(ar[i]);
                //re=true;
                ar1.push(ar[i]);
                //break;
            }
        }

        for (let i = 0; i < ar1.length; i++) {
            if (ar1[i].getIsOver()) {
                //this.reMoveEntityForGame(ar[i]);
                //re=true;
                this.reMoveEntityForGame(ar1[i]);
                //break;
            }
        }


    }
    private gameview: GameView;

    private my: Origin;
    private enimys: Array<Origin> = new Array();
    private bullets: Array<Bullet>;
    private gaometrys: Array<Gaometry>;
    private map: Map;
    public addEntityToGame(entity: any) {
        let cName = entity.constructor.name;
        //let ada=entity.constructor.className;
        if (cName == "Origin") {
            if (entity.getIsFriendly) {//己
                this.my = entity;//加入控制器
                this.gameview.addChild(this.my);//加入显示
            } else {//敌
                this.enimys.push(entity);
                this.gameview.addChild(entity);
            }
        } else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            this.bullets.push(entity);
            let p = new egret.Point();
            this.gameview.globalToLocal(entity.x, entity.y, p);
            entity.x = p.x;
            entity.y = p.y;
            this.gameview.addChild(entity);

        } else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" || cName == "Square" || cName == "Triangle") {
            this.gaometrys.push(entity);
            this.gameview.addChild(entity);
        } else if (cName == "Map") {
            this.map = entity;
            this.gameview.addChild(entity);
        }
        // let index=array.indexOf(5);

        // if (index > -1) {
        //     array.splice(index, 1);
        // }
    }
    public reMoveEntityForGame(entity: any) {

        let cName = entity.constructor.name;

        if (cName == "Origin") {
            if (entity.getIsFriendly()) {//己
                this.my = null;//
                this.gameview.removeChild(this.my);//
            } else {//敌
                let index = this.enimys.indexOf(entity);
                if (index > -1) {
                    this.enimys.splice(index, 1);
                }
                this.gameview.removeChild(entity);
            }
        } else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" ||
            cName == "TriBullet" || cName == "CirSuperBullet") {
            let index = this.bullets.indexOf(entity);
            if (index > -1) {
                this.bullets.splice(index, 1);
            }
            this.gameview.removeChild(entity);
        } else if (cName == "Gaometry" || cName == "Circle" || cName == "Diamond" || cName == "Square" || cName == "Triangle") {
            let index = this.gaometrys.indexOf(entity);
            if (index > -1) {
                this.gaometrys.splice(index, 1);
            }
            this.gameview.removeChild(entity);
        } else if (cName == "Map") {
            this.map = null;
            this.gameview.removeChild(entity);
        }
    }

    public rouMove(pos: number) {
        this.my.setPosition(pos);
        this.my.setSpeedForDel();
    }

    public rouUp() {
        //this.my.setPosition(pos);
        this.my.setspeed(0);
    }
    //////////////////////////////////获取跟踪对象
    public getTrackObj(bl: Bullet) {
        //  if(bl.getIsFriendly()){
        //      return this.getCurTrack(bl);
        //  }else{//敌方子弹
        //      return this.my;
        //  }
        // 把敌对 GAO ORIGIN 挑出来
        let ens = this.getHostiles(bl);
        //根据范围挑出来根据数量随机一个 范围0-100，100-300,300-600,600-900.900<= <1200
        return this.getCurTrack(bl, ens, 0, 100);
    }

    private getHostiles(bl: Bullet): Array<Entity> {
        let reEns = new Array<Entity>();
        if (bl.getIsFriendly() != this.my.getIsFriendly()) {//you
            reEns.push(this.my);
        }
        for (let i = 0; i < this.enimys.length; i++) {
            if (this.enimys[i].getIsFriendly() != bl.getIsFriendly()) {
                reEns.push(this.enimys[i]);
            }
        }

        for (let i = 0; i < this.gaometrys.length; i++) {
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
    }

    private getCurTrack(bl: Bullet, ar: Array<Entity>, start: number, scope: number) {
        let gain = (bl: Bullet, ar: Array<Entity>, start: number, scope: number) => {
            let ar1 = this.getGainHostiles(bl, ar, start, scope);
            if (ar1.length == 1) {
                return ar1[0];
            } else if (ar1.length > 1) {
                let i = Math.floor(Math.random() * ar1.length);
                return ar1[i];
            }
            return null;
        };
        let reE = gain(bl, ar, start, scope);
        if (reE == null) {
            let startTo = start + scope;
            let scopeTo = 300;
            if (startTo >= 1200) {
                return null;
            } else {
                return this.getCurTrack(bl, ar, startTo, scopeTo);
            }
        } else {
            return reE;
        }
        //return null;
    }

    private getGainHostiles(bl: Bullet, ar: Array<Entity>, start: number, scope: number) {
        let reEns = new Array<Entity>();
        for (let i = 0; i < ar.length; i++) {
            let position = Math.sqrt(Math.pow((ar[i].x - bl.x), 2) + Math.pow((ar[i].y - bl.y), 2));
            if (start <= position && position < (scope + start)) {
                reEns.push(ar[i]);
            }
        }
        return reEns;
    }
    ////////////////////////////////////////////huan rou xuanzhan xi tong
    ////////////////////////////////////////执行切换GAO命令
    public changeOriginGao(i: number) {
        this.my.changeGao(i);
    }
    /////////////////////////jihuo jineng
    public skillActivation() {
        this.my.activationSkill();
    }
    /////////////////////////// jiao huan xianshi wei zhi 
    public putUpMy(e: Entity) {
        this.gameview.swapChildren(this.my, e);
    }
    public setGameViewChildBefMy(e: Entity) {
        let i = this.gameview.getChildIndex(this.my);
        this.gameview.setChildIndex(e, i);
    }
}