// TypeScript file
class Diamond extends Gaometry {
    public constructor(id: string, pos: number, isFriendly: boolean, x: number, y: number,
        state: number, speed: number, timePatDatas: Array<TimePathData>, gc?: GameControl) {
        super(Gaometry.TYPE_DIAMOND, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.life = 1;
        this.attack = 1;
        this.maxLifeTime = 30000;
    }

    // protected initData(){
    //     super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;

    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=15000;
    // }

    protected draw() {

        this.width = 40;
        this.height = 40;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2
        this.graphics.lineStyle(3, this.color);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        // this.anchorOffsetX=this.width/2;
        // this.anchorOffsetY=this.height/2;
    }

    protected shot() {
        //let bt=new dia("dddd",this,this.getPosition(),true,this.x+this.width/2,this.y);
    }

    public collisionHandle(entity: any) {//碰撞处理
        let cName = entity.constructor.name;
        //区分碰撞类型
        if (cName == "Origin") {//
            this.behitOfOrigin(entity);
        } else if (cName == "Bullet" || cName == "CirBullet" || cName == "SquBullet" || cName == "TriBullet") {//bu zhuli 
            //this.behit(entity);
        } else if (cName == "Diamond") {////
            this.behit(entity);
        }
    }
    //////////////////////////////////////////protected dieAnimationPaintin(prog : number){}
    //private lineAnimations: Array<egret.Shape>;
    //hui zhen
    //@progress 表示动画进度
    protected dieAnimationPaintin(progress: number) {

        //tou mingdu
        this.alpha = progress;

    }
}