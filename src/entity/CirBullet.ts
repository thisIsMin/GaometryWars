// TypeScript file
//圆形子弹
class CirBullet extends Bullet{
    public constructor(id:string,producer:Entity,pos:number,isFriendly:boolean,x:number,y:number) {
        super(Bullet.TYPE_CIRCLE,id,producer,pos,isFriendly,x,y);
        this.initData();
    }

    protected initData(){
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;

        this.setspeed(200);
        this.life=1;
        this.attack=1;
        this.maxLifeTime=10000;
    }

    protected draw(){
        //绘制圆子弹
        var blt=new egret.Sprite();
        blt.graphics.lineStyle(2,this.color);
        blt.graphics.drawCircle(0,0,5);
        blt.graphics.endFill();
        this.addChild(blt);
    }

    
    protected initChild(){}
}