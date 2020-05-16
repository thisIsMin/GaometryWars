// TypeScript file
class CirSuperBullet extends Bullet{
    public constructor(id:string,producer:Entity,pos:number,isFriendly:boolean,x:number,y:number) {
        super(Bullet.TYPE_CIRCLE,id,producer,pos,isFriendly,x,y,);
        

        this.setspeed(0);
        this.life=1;
        this.attack=1;
        this.maxLifeTime=10000;

    }

    protected draw(){
        //绘制圆子弹
        let sky = this.createBitmapByName("cirsuperb_png");
        // var blt=new egret.Sprite();
        // blt.graphics.lineStyle(2,this.color);
        // blt.graphics.drawCircle(0,0,5);
        // blt.graphics.endFill();
        this.addChild(sky);
        this.anchorOffsetY=this.height/2;
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private oneTrue=true;
    protected lifeControl(pass : number){
        if(this.oneTrue){//保证他的生命周期只有一帧
            this.oneTrue=false;
            return;
        }else{
            this.die();
            this.isOver=true;
        }
    }

    public collisionHandle(entity:any){//碰撞处理
        
    }
}