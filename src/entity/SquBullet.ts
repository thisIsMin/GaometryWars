// TypeScript file
//菱形子弹
class SquBullet extends Bullet{
    public constructor(id:string,producer:Entity,pos:number,isFriendly:boolean,x:number,y:number) {
        super(Bullet.TYPE_SQUARE,id,producer,pos,isFriendly,x,y);
        this.initData();
    }

    protected initData(){
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;

        this.setspeed(200);
        this.life=1;
        this.attack=2;
        this.maxLifeTime=10000;
    }

    protected draw(){
        //绘制圆子弹
        this.width=8;
            this.height=10;
            this.graphics.lineStyle(2,this.color);
            this.graphics.moveTo(this.width/2,0);
            this.graphics.lineTo(0,-this.height/2);
            this.graphics.lineTo(-this.width/2,0);
            this.graphics.lineTo(0,this.height/2);
            this.graphics.lineTo(this.width/2,0);
            this.graphics.endFill();
    }
    protected initChild(){}
}