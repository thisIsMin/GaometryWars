// TypeScript file
//菱形
class Square extends Gaometry{
    public constructor(id:string,pos:number,isFriendly:boolean,x:number,y:number,
    state:number, speed : number , timePatDatas : Array<TimePathData>,gc? : GameControl) {
        super(Gaometry.TYPE_SQUARE,id,pos,isFriendly,x,y,state,speed ,timePatDatas,gc);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.life=1;
        this.attack=1;
        this.maxLifeTime=50000;
        this.attackSpeed=0.2;
        this.attackTime=0;
    }

    // protected initData(){
    //     super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;

    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=15000;
    //     this.attackSpeed=0.2;
    //     this.attackTime=0;
    // }

    protected draw(){

            this.width=40;
            this.height=30;
            this.graphics.lineStyle(2,this.color);
            this.graphics.moveTo(this.width/2,0);
            this.graphics.lineTo(0,-this.height/2);
            this.graphics.lineTo(-this.width/2,0);
            this.graphics.lineTo(0,this.height/2);
            this.graphics.lineTo(this.width/2,0);
            this.graphics.endFill();
    }

    protected shot(){
        let globlaP=new egret.Point();
        this.localToGlobal(0,0,globlaP);
        let bt=new SquBullet("dddd",this,this.getPosition(),this.isFriendly,globlaP.x,globlaP.y);
        if(this.gc!=null){
            this.gc.addEntityToGame(bt);
        }
    }


    //////////////////////////////////////////////////////////////////////
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
                this.lineAnimations.push(line);
                this.addChild(line);

            }
        }
        for (let i = 0; i < 8; i++) {
                this.lineAnimations[i].graphics.clear();

            }

        this.lineAnimations[0].graphics.lineStyle(2, this.color);
        this.lineAnimations[0].graphics.moveTo((this.width/4-(this.width/4*progress)),
        this.height/4-this.height/4*progress);
        this.lineAnimations[0].graphics.lineTo(this.width/2-this.width/4*progress,0);
        this.lineAnimations[0].graphics.endFill();

        this.lineAnimations[1].graphics.lineStyle(2, this.color);
        this.lineAnimations[1].graphics.moveTo(this.width/4-(this.width/4*progress),
        this.height/4-this.height/4*progress);
        this.lineAnimations[1].graphics.lineTo(0,(this.height/2-this.height/4*progress));  
        this.lineAnimations[1].graphics.endFill();

        this.lineAnimations[2].graphics.lineStyle(2, this.color);
        this.lineAnimations[2].graphics.moveTo(-(this.width/4-(this.width/4*progress)),
        this.height/4-this.height/4*progress);
        this.lineAnimations[2].graphics.lineTo(0,(this.height/2-this.height/4*progress));
        this.lineAnimations[2].graphics.endFill();

        this.lineAnimations[3].graphics.lineStyle(2, this.color);
        this.lineAnimations[3].graphics.moveTo(-(this.width/4-(this.width/4*progress)),
        this.height/4-this.height/4*progress);
        this.lineAnimations[3].graphics.lineTo(-(this.width/2-this.width/4*progress),0);
        this.lineAnimations[3].graphics.endFill();

        this.lineAnimations[4].graphics.lineStyle(2, this.color);
        this.lineAnimations[4].graphics.moveTo(-(this.width/4-(this.width/4*progress)),
        -this.height/4+this.height/4*progress);
        this.lineAnimations[4].graphics.lineTo(-(this.width/2-this.width/4*progress),0);
        this.lineAnimations[4].graphics.endFill();

        this.lineAnimations[5].graphics.lineStyle(2, this.color);
        this.lineAnimations[5].graphics.moveTo(-(this.width/4-(this.width/4*progress)),
        -this.height/4+this.height/4*progress);
        this.lineAnimations[5].graphics.lineTo(0,-(this.height/2-this.height/4*progress));
        this.lineAnimations[5].graphics.endFill();

        this.lineAnimations[6].graphics.lineStyle(2, this.color);
        this.lineAnimations[6].graphics.moveTo(this.width/4-(this.width/4*progress),
        -this.height/4+this.height/4*progress);
        this.lineAnimations[6].graphics.lineTo(0,-(this.height/2-this.height/4*progress));
        this.lineAnimations[6].graphics.endFill();

        this.lineAnimations[7].graphics.lineStyle(2, this.color);
        this.lineAnimations[7].graphics.moveTo(this.width/4-(this.width/4*progress),
        -this.height/4+this.height/4*progress);
        this.lineAnimations[7].graphics.lineTo(this.width/2-this.width/4*progress,0);
        this.lineAnimations[7].graphics.endFill();

    
        
    }

    
}