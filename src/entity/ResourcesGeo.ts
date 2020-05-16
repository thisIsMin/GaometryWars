// TypeScript file
//几何资源
class ResourcesGao extends Entity{
    public static RESGAO_CIRCLE:number=1;
    public static RESGAO_DIAMOND:number=2;
    public static RESGAO_SQUARE:number=3;
    public static RESGAO_TRIANGLE:number=4;
    public constructor(type:number,id:string,x:number,y:number) {
        super(id,x,y);
        this.type=type;
        //this.x=600;
        //this.y=325;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    // protected initData(){
    //     super.initData();
    //     this.color=0x0000ff;
    // }

    // protected initData(pos:number,speed:number){
    //     super.initData(pos,speed);
    // }
    private type:number;
    protected draw(){
        if(this.type==ResourcesGao.RESGAO_CIRCLE){
            
            this.graphics.lineStyle(3,this.color);
            this.graphics.drawCircle(0,0,20);
            this.graphics.endFill();
        }else if(this.type==ResourcesGao.RESGAO_DIAMOND){
            //
            this.width=20;
            this.height=20;
            this.anchorOffsetX=-this.width/2;
            this.anchorOffsetY=-this.height/2
            this.graphics.lineStyle(3,this.color);
            this.graphics.drawRect(0,0,this.width,this.height);
            this.graphics.endFill();
        }else if(this.type==ResourcesGao.RESGAO_SQUARE){
            this.width=20;
            this.height=20;
            this.graphics.lineStyle(3,this.color);
            this.graphics.moveTo(this.width/2,0);
            this.graphics.lineTo(0,-this.height/2);
            this.graphics.lineTo(-this.width/2,0);
            this.graphics.lineTo(0,this.height/2);
            this.graphics.lineTo(this.width/2,0);
            this.graphics.endFill();
        }else if(this.type==ResourcesGao.RESGAO_TRIANGLE){
            this.width=20;
            this.height=20;
            this.graphics.lineStyle(3,this.color);
            this.graphics.moveTo(this.width/2,this.height/2);
            this.graphics.lineTo(0,-this.height/2);
            this.graphics.lineTo(-this.width/2,this.height/2);
            this.graphics.lineTo(this.width/2,this.height/2);
            this.graphics.endFill();
        }
    }
    public go(pass:number){}
    protected move(){}
    public collisionHandle(){
        this.die();
    }
}