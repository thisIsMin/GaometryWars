// TypeScript file
class Circle extends Gaometry {
    public constructor(id: string, pos: number, isFriendly: boolean, x: number, y: number,
        state: number, speed: number, timePatDatas: Array<TimePathData>, gc?: GameControl) {
        super(Gaometry.TYPE_CIRCLE, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.life = 1;
        this.attack = 1;
        this.attackSpeed = 0.2;
        this.attackTime = 0;
    }

    // private onAddToStage(event: egret.Event) {
    //     this.draw();

    //     this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    //     this.timeOnEnterFrame = egret.getTimer();
    // }

    // private revolutionRadius:number=150;

    // protected initData(){
    //     //super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;
    //     this.life=1;
    //     this.attack=1;
    //     this.attackSpeed=0.5;
    //     this.attackTime=0;
    // }

    protected draw() {

        this.width = 40;
        this.height = 40;
        //this.graphics.beginFill(0x0000ff, 1);
        this.graphics.lineStyle(2, this.color);

        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    }

    protected shot() {
        let globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        let bt = new CirBullet("dddd", this, this.getPosition(), this.isFriendly, globlaP.x, globlaP.y);
        //let bt=new Bullet(Bullet.TYPE_NOR,"dddd",this,this.getPosition(),this.isFriendly,this.x+this.width/2,this.y);
        if (bt.getIsFriendly()) {
            bt.setPosition(0);
        } else {
            bt.setPosition(Math.PI);
        }
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
        }
    }

    
    
    // protected dieAnimation() {
        
    //     //chuanjian she zhi jishiqi
    //     this.timer = new egret.Timer(1000 / 30, 10);

    //     this.timer.addEventListener(egret.TimerEvent.TIMER, this.dieAnimationRun, this);
    //     this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dieAnimationComplete, this);

    //     //this.animationLastEgretTime=egret.getTimer();
    //     this.timer.start();

    // }

    //private animationTime=2000;//donghua zhixu shijia 2miao
    //private animationCurTime=0;//dong hua dangqi shijian duan
    //private animationLastEgretTime=0;
    // private animationRun(event: egret.TimerEvent) {
    //     //
    //     //if(this.animationCurTime<this.animationTime){
    //     this.animationPaintin(this.timer.currentCount / this.timer.repeatCount);
    //     //this.animationCurTime=this.animationCurTime+1000/30;

    //     //this.animationLastEgretTime=egret.getTimer();
    //     //egret.log("circle animationRun");
    //     //}else{
    //     //egret.log("circle ccount"+ this.timer.currentCount);
    //     //egret.log("circle re=1");
    //     //this.timer.repeatCount=1;//触发 TIMER_COMPLETE
    //     //}
    // }


    private lineAnimations: Array<egret.Shape>;
    //hui zhen
    //@progress 表示动画进度
    protected dieAnimationPaintin(progress: number) {
        if (this.lineAnimations == null) {
            //qing chu yuan xianshiti

            this.graphics.clear();
            //chuangjian shua zhen duixiang
            this.lineAnimations = new Array<egret.Shape>();
            for (let i = 0; i < 8; i++) {
                let line = new egret.Shape();
                line.graphics.lineStyle(2, this.color);
                line.graphics.drawArc(0, 0, this.width / 2, i * Math.PI / 4, (i + 1) * Math.PI / 4);
                line.graphics.endFill();
                line.x = Math.cos((i + 1) * Math.PI / 4) * this.width / 2;
                line.y = Math.sin((i + 1) * Math.PI / 4) * this.width / 2;
                line.anchorOffsetX = line.x;
                line.anchorOffsetY = line.y;
                this.lineAnimations.push(line);
                this.addChild(line);

            }
        }
        for (let i = 0; i < this.lineAnimations.length; i++) {
            //zixuan
            this.lineAnimations[i].rotation = 90 * progress;
            //gong zhuan gong zhuan banjing suojian
            let revolutionRadian = Math.acos(this.lineAnimations[i].x / Math.sqrt(Math.pow(this.lineAnimations[i].x, 2) + Math.pow(this.lineAnimations[i].y, 2)));
            if (this.lineAnimations[i].y < 0) {
                revolutionRadian = Math.PI * 2 - revolutionRadian;
            }
            this.lineAnimations[i].x = Math.cos(revolutionRadian) * ((this.width / 2) * (1 - progress));
            this.lineAnimations[i].y = Math.sin(revolutionRadian) * ((this.width / 2) * (1 - progress));

            //tou mingdu
            this.lineAnimations[i].alpha = 1-progress;
        }
    }

    // protected dieAnimationComplete(event: egret.TimerEvent) {
    //     egret.log("circle animationComplete");
    //     this.isOver = true;
    // }

    // private timeOnEnterFrame:number = 0;
    // private radian:number=0;
    // private  onEnterFrame(e:egret.Event){  
    //     var now = egret.getTimer();
    //     var time = this.timeOnEnterFrame;
    //     var pass = now - time;
    //     console.log("onEnterFrame: ", (1000 / pass).toFixed(5));
    //     this.timeOnEnterFrame = egret.getTimer();

    //     this.revolution(pass);
    // }


    // private revolution(num:number){
    //     // if(this.radian>=2*Math.PI){
    //     //     this.radian=this.radian-2*Math.PI;
    //     // }
    //     this.radian=this.radian+(num*2*Math.PI/5000);
    //     if(this.radian>=2*Math.PI){
    //         this.radian=this.radian-2*Math.PI;
    //     }
    //     this.x=this.revolutionRadius*Math.cos(this.radian);
    //     this.y=this.revolutionRadius*Math.sin(this.radian);
    // }
}