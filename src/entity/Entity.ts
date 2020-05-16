// TypeScript file
//所有实体类的父类
class Entity extends egret.Sprite {
    public constructor(id: string, x: number, y: number, gc?: GameControl) {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.id = id;
        this.x = x;
        this.y = y;
        this.gc = gc;

    }

    private onAddToStage(event: egret.Event) {

        this.lastTime = egret.getTimer();
        //egret.log("entity onaddstage");

        this.draw();
        this.initChild();

        this.lifeTime = 0;
    }

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

    protected draw() { }
    protected initChild() { }

    protected gc: GameControl;

    private position: number = 0;//方向 弧度
    private speed: number = 0;//速度 秒为单位
    protected life: number = 0;
    protected attack: number = 0;
    protected isDie: boolean = false;
    protected isOver: boolean = false;
    protected id: string = null;
    protected color: number = 0;
    protected isFriendly: boolean = true;

    protected lifeTime = 0;
    protected maxLifeTime: number = -1;
    protected timePathDatas: Array<TimePathData> = null;


    // protected initData(){

    // }

    public lastTime: number = 0;

    protected move(pass: number) {
        let x = (this.speed * pass / 1000) * Math.cos(this.position);
        let y = (this.speed * pass / 1000) * Math.sin(this.position);
        this.x = this.x + x;
        this.y = this.y + y;
        //egret.log("entity move");

    }
    public go(pass: number) {

        
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

    }

    protected childGo(pass: number) {
    }

    public getGloHitRects(): Array<egret.Rectangle> {
        let ars = new Array<egret.Rectangle>();

        //自身RECT
        let rt = this.getSelfGloHitRect();
        ars.push(rt);

        return ars;
    }

    public getSelfGloHitRect(): egret.Rectangle {
        //自身RECT

        let rt = this.getBounds();
        let point = new egret.Point();
        this.localToGlobal(0 + this.anchorOffsetX, 0 + this.anchorOffsetY, point)//获取自身原点在全局STAGE的坐标
        //吧原点放到左上角
        rt.x = point.x + rt.left;
        rt.y = point.y + rt.top;
        return rt;
    }

    protected lifeControl(pass: number) {
        this.lastTime=this.lifeTime;
        this.lifeTime = this.lifeTime + pass;
        if (this.maxLifeTime >= 0 && this.lifeTime >= this.maxLifeTime) {
            this.die();
            return;
        } 
    }

    protected moveRun(pass: number) {
        if (this.timePathDatas != null && this.timePathDatas.length>0) {
            var timeCur=this.lifeTime;
            var timeLast=this.lastTime;
            if(this.lifeTime!=0 && this.lastTime!=0 && this.maxLifeTime<0){
                timeCur = this.lifeTime % this.timePathDatas[this.timePathDatas.length - 1].time;
                timeLast = this.lastTime % this.timePathDatas[this.timePathDatas.length - 1].time;
                if (timeLast > timeCur) {
                    timeLast = 0;
                }
            }
            if(this.lifeTime>6000){
                let a=0;
            }
            
            for (let i = 0; i < this.timePathDatas.length; i++) {
                if (timeCur > this.timePathDatas[i].time && timeLast <= this.timePathDatas[i].time ) { 
                    this.position = this.timePathDatas[i].position;
                     break;
                }
            }

        }

        this.move(pass);
    }

    protected attackRun(pass) { }
    protected shot(pass: number) {
        // 产生子弹

        //加入game
    }

    protected die() {
        if (!this.isDie) {
            this.isDie = true;
            this.dieAnimation();
        }

    }

    protected dieAnimation() {
        this.isOver = true;
    };

    public collisionHandle(entity: any) {//碰撞处理
        this.behit(entity);//bei jizhong chuli
    }

    public behit(entity: any) {
        //伤害计算
        let hurt = entity.getHurt();
        this.life = this.life - hurt;
        if (this.life <= 0) {
            //处理伤害结果
            this.die();
        }
    }

    ////////////////////////////////
    protected skillShot(pass: number) {

    }

    public behitOfOrigin(entity: any) {

        this.die();
    }

    public getHurt(): number {
        return this.attack;
    }


    public getPosition(): number {
        return this.position;
    }
    public setPosition(pos: number) {
        this.position = pos;
    }
    public getspeed(): number {
        return this.speed;
    }
    public setspeed(speed: number) {
        this.speed = speed;
    }

    public getIsFriendly(): boolean {
        return this.isFriendly
    }

    public getIsDie(): boolean {
        return this.isDie;
    }

    public getIsOver(): boolean {
        return this.isOver;
    }
}