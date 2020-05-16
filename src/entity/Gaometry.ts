// TypeScript file
class Gaometry extends Entity{

    public static TYPE_DIAMOND:number=2;
    public static TYPE_CIRCLE:number=1;
    public static TYPE_SQUARE:number=3;
    public static TYPE_TRIANGLE:number=4;

    public static STATE_FREE:number=1;
    public static STATE_FATTER:number=2;
    public static STATE_FOLLOW:number=3;

    private type:number;
    private state:number;

    protected attackSpeed : number;// mei miao gongji ci yu
    protected attackTime : number ;
    public constructor(type:number,id:string,pos:number,isFriendly:boolean,x:number,y:number,
    state:number, speed : number , timePatDatas : Array<TimePathData>,gc? : GameControl) {
        super(id,x,y,gc);
        this.type=type;
        this.setPosition(pos);
        this.isFriendly=isFriendly;
        this.state=state;

        this.setspeed(speed);
        this.timePathDatas=timePatDatas;

        if(this.isFriendly){
            this.color=0x00ffff;
        }else{
            this.color=0xff0000;
        }

        this.life=1;
        this.attack=1;
        this.maxLifeTime=50000;
        this.attackSpeed=0.5;
        this.attackTime=0;

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

    protected draw(){
        
    }
    protected initChild(){}
   

    protected moveRun(pass : number){
        if(this.state==Gaometry.STATE_FREE){
            super.moveRun(pass);
        }else if(this.state==Gaometry.STATE_FATTER){
            //方向改变 围绕ORIGIN 圆周运动
            this.revolution(pass);

        }else if(this.state==Gaometry.STATE_FOLLOW){
            //GENSUI  ORIGIN 圆周运动
            this.followMove();

        }
    }

    protected lifeControl(pass : number){
        if(this.state==Gaometry.STATE_FATTER){
            this.lifeTime=this.lifeTime+pass;
        }else{
            super.lifeControl(pass);
        }
    }

    protected attackRun(pass :number) {
        if(this.attackTime >= (1000/this.attackSpeed)){
            // if(this.state==Gaometry.STATE_FATTER){
            //     this.fatterShot();
            // }
            this.shot();
        
        this.attackTime=0;
        }else{
            this.attackTime=this.attackTime+pass;
        }
    }
    protected shot(){}
    //protected fatterShot(){}

    public collisionHandle(entity:any){//碰撞处理
        let cName=entity.constructor.name;
        //区分碰撞类型
        if(cName == "Origin"){//直死
            this.behitOfOrigin(entity);
        }else if(cName == "Bullet" || cName =="CirBullet" || cName =="SquBullet" ||
        cName =="TriBullet" || cName =="CirSuperBullet"){//下发至内部碰撞检测
            this.behit(entity);
        }else if(cName == "Gaometry" || cName =="Circle" ||cName =="Diamond" ||
        cName =="Square"||cName =="Triangle"){////下发至内部碰撞检测
            this.behit(entity);
        }
    }

    public behit(entity:any){
        if(this.state==Gaometry.STATE_FREE || this.state==Gaometry.STATE_FOLLOW){
            //伤害计算
        let hurt=entity.getHurt();
        this.life=this.life-hurt;
        if(this.life<=0){
            //处理伤害结果
            this.die();
        }
        }else if(this.state==Gaometry.STATE_FATTER){
            this.revolutionOrigin.behit(entity);
        }
        
    }
     public behitOfOrigin(entity:any){
        if(this.state==Gaometry.STATE_FREE){
        
            this.die();
        }else if(this.state==Gaometry.STATE_FATTER){
            this.revolutionOrigin.behitOfOrigin(entity);
        }
    }


    private radian:number=0;
    private revolutionRadius:number;
    private revSpeed:number=5000;
    private revolutionOrigin : Origin;
    private revolution(num:number){
        // if(this.radian>=2*Math.PI){
        //     this.radian=this.radian-2*Math.PI;
        // }
        let multiple =1;
        if(this.revolutionOrigin.getMultipleBuff()){
            multiple=this.revolutionOrigin.getMultiple();
        }
        this.radian=this.radian+(num*2*Math.PI/this.revSpeed)*multiple;
        if(this.radian>=2*Math.PI){
            this.radian=this.radian-2*Math.PI;
        }
        this.x=this.revolutionRadius*Math.cos(this.radian);
        this.y=this.revolutionRadius*Math.sin(this.radian);
    }

    public setRevolutionData(radian : number, revolutionRadius : number, origin :Origin){
        this.radian=radian;
        this.revolutionRadius=revolutionRadius;
        this.revolutionOrigin=origin;
        
    }

    private followOrigin : Origin;
    private followX : number;
    private followY : number;
    //GEN SUI 
    private followMove(){
        this.x=this.followOrigin.x+this.followX;
        this.y=this.followOrigin.y+this.followY;
    }

    public setFollowData( fx: number ,fy: number ,fOrigin : Origin){
        this.followX=fx;
        this.followY=fy;
        this.followOrigin=fOrigin;
    }

    ///////////////////////////////////die animation 
    protected timer: egret.Timer;
    protected dieAnimation() {
        
        //chuanjian she zhi jishiqi
        this.timer = new egret.Timer(1000 / 30, 10);

        this.timer.addEventListener(egret.TimerEvent.TIMER, this.dieAnimationRun, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dieAnimationComplete, this);

        //this.animationLastEgretTime=egret.getTimer();
        this.timer.start();

    }

    protected dieAnimationRun(event: egret.TimerEvent) {
        this.dieAnimationPaintin(this.timer.currentCount / this.timer.repeatCount);
    }

    protected dieAnimationPaintin(prog : number){}

    protected dieAnimationComplete(event: egret.TimerEvent) {
        egret.log("circle animationComplete");
        this.isOver = true;
    }


///////////////////////////////////////////////////////////////////////
    public getType() : number{
        return this.type;
    }


    public getRadian() : number{
        return this.radian;
    }


    public getRevolutionRadius() : number{
        return this.revolutionRadius;
    }

    
}