// TypeScript file
//轮盘显示与操控
class Roulette extends egret.Sprite{
    //private m_insideX:number=0;
    //private m_insideY:number=0;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.x=150;
        this.y=650-150;
        //this.m_insideX=this.x;
        //this.m_insideY=this.y;
        this.width=200;
        this.height=200;

        //this.addEventListener( egret.Event.ENTER_FRAME, this.onEnterFrame, this ); 
        this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onTouchDownThis, this );

        
    }

    private onAddToStage(event: egret.Event) {

        //var origin:Origin=new Origin();
        //this.addChild(origin);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);

        this.draw();
        //let a=[1,2,3,5],b=[1,2,5],s=new Set(b);
        // var s=new Array();
        // var s=new List

    }

    private m_insiteRou:egret.Sprite;//中心点
    private m_outlineou:egret.Sprite;//轮廓
    private draw(){//自身绘制
        this.m_outlineou=new egret.Sprite();
        this.m_outlineou.x=0;
        this.m_outlineou.y=0;
        this.m_outlineou.graphics.lineStyle(2,0xdddddd);
        this.m_outlineou.graphics.drawCircle(0,0,100);
        this.m_outlineou.graphics.endFill();

        this.addChild(this.m_outlineou);

        this.m_insiteRou=new egret.Sprite();
        this.m_insiteRou.x=0;
        this.m_insiteRou.y=0;
    
        this.m_insiteRou.graphics.beginFill(0xaaaaaa, 1);
        this.m_insiteRou.graphics.drawCircle(0,0,30);
        this.m_insiteRou.graphics.endFill();
        this.addChild(this.m_insiteRou);
    }

    

    //
    private touchPoints:Object = {names:[]}; //{touchid:touch local,names:[ID1,ID2]};
    private insideRouTouchId:number;

    private onTouchDownThis(event: egret.TouchEvent){
        //egret.log("touch down this :"+event.touchPointID);
        //egret.log("touch down this x :"+event.localX);
    }

    private onTouchMove(event: egret.TouchEvent){
        //egret.log("touch move state x :"+event.stageX);
        if(event.touchPointID==this.insideRouTouchId)
        {
            egret.log("touch move touchID :"+event.touchPointID);
            this.touchPoints[event.touchPointID].x = event.stageX;
            this.touchPoints[event.touchPointID].y = event.stageY;
            if(this.m_outlineou.hitTestPoint(this.touchPoints[event.touchPointID].x,this.touchPoints[event.touchPointID].y,false)){

             //改变轮盘中点的显示
           this.m_insiteRou.x=this.touchPoints[event.touchPointID].x-this.x;
           this.m_insiteRou.y=this.touchPoints[event.touchPointID].y-this.y;
           this.postEvent(new egret.Point(this.m_insiteRou.x,this.m_insiteRou.y));
            }
        }
    }
    private onTouchUp(event: egret.TouchEvent){
        //egret.log("touch end:"+event.touchPointID);

        if(event.touchPointID==this.insideRouTouchId)
        {
            //改变轮盘中点的显示
           this.m_insiteRou.x=0;
           this.m_insiteRou.y=0;
           this.postEvent(new egret.Point(this.m_insiteRou.x,this.m_insiteRou.y));
           this.insideRouTouchId=-1;
        }
        
        delete  this.touchPoints[event.touchPointID];
    
    }
    private onTouchDown(event: egret.TouchEvent){
        //egret.log("touch down state :"+event.touchPointID);
        //egret.log("touch down state x :"+event.stageX);
        if(this.touchPoints[event.touchPointID]==null)
        {
            this.touchPoints[event.touchPointID] = new egret.Point(event.stageX,event.stageY);
            this.touchPoints["names"].push(event.touchPointID);
        }
        //egret.log("touch down local x :"+this.touchPoints[event.touchPointID].x);
        //按下的点在轮盘内 记录
        if(this.hitTestPoint(this.touchPoints[event.touchPointID].x,this.touchPoints[event.touchPointID].y,false)){
            this.insideRouTouchId=event.touchPointID;

            //改变轮盘中点的显示
           this.m_insiteRou.x=this.touchPoints[event.touchPointID].x-this.x;
           this.m_insiteRou.y=this.touchPoints[event.touchPointID].y-this.y;
           this.postEvent(new egret.Point(this.m_insiteRou.x,this.m_insiteRou.y));
        }
        
    }

    private postEvent(point:egret.Point){
        //egret.log(" roulettechange  rrr");
        var rouChangeEvent = new RouletteChange(RouletteChange.EVENT_ROULETTECHANGE,point);
        this.dispatchEvent(rouChangeEvent);
    }
    
}