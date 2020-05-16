// TypeScript file
class Bullet extends Entity{

    public static TYPE_NOR:number=1;
    public static TYPE_CIRCLE:number=2;
    public static TYPE_SQUARE:number=3;
    public static TYPE_TRIANGLE:number=4;

    private producer:Entity;
    private type:number;
    public constructor(type:number,id:string,producer:Entity,pos:number,isFriendly:boolean,x:number,y:number) {
        super(id,x,y);
        this.producer=producer;
        this.type=type;
        this.setPosition(pos);
        this.isFriendly=isFriendly;

        if(this.isFriendly){
            this.color=0x00ffff;
        }else{
            this.color=0xff0000;
        }

        this.setspeed(200);
        this.life=1;
        this.attack=1;
        this.maxLifeTime=10000;

        //this.width=100;
        //this.height=100;

        //this.x=600;
        //this.y=325;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    // protected initData(){
    //     super.initData();
    //     this.setspeed(150);
    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=10000;
        
    // }


    public collisionHandle(entity:any){//碰撞处理
        //pengzhun xiaoguo
        this.collisionAnimation();
        //直死
        this.die();
    }

    protected isCollisionAnimation : boolean;
    private collisionAnimation(){
        this.isCollisionAnimation=true;
        //
        let an =new egret.Shape();
        an.graphics.beginFill(0xffffff,1);
        an.graphics.moveTo(-10,-4);
        an.graphics.lineTo(10,-4);
        an.graphics.lineTo(20,0);
        an.graphics.lineTo(10,4);
        an.graphics.lineTo(-10,4);
        an.graphics.lineTo(-10,-4);
        //an.graphics.drawRect(0,0,20,20);
        an.graphics.endFill();
        an.y=-this.height/2;
        an.rotation=-45;
        this.addChild(an);
        //
        let tw = egret.Tween.get(an);
        //tw.to({ "alpha": 1 }, 500);
        tw.to({ "alpha": 0 }, 200);
        //tw.to({ "alpha": 1 }, 1000);
        //tw.wait(2000);
        //tw.to({ "alpha": 0 }, 500);
        tw.call(this.onComplete,this);
    }

    private onComplete(){//donhua jie su
        this.isCollisionAnimation=false;
        this.isOver=true;
    }
    protected dieAnimation(){
        if(!this.isCollisionAnimation){
            this.isOver=true;
        }
    };

    protected draw(){
        //绘制普通子弹
        var blt=new egret.Sprite();
        blt.graphics.beginFill(this.color,1);
        blt.graphics.drawCircle(0,0,5);
        blt.graphics.endFill();
        this.addChild(blt);
    }
    protected initChild(){}
}

