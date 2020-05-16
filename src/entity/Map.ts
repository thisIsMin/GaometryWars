// TypeScript file
class Map extends egret.Sprite{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event: egret.Event) {
        this.width=this.stage.stageWidth;
        this.height=this.stage.stageHeight;
        this.draw();
    }

    private draw(){
        this.graphics.beginFill(0x222222,1);
        this.graphics.drawRect(0,0,this.width*10,this.height);
        this.graphics.endFill();

        let line=new egret.Sprite();
        line.graphics.lineStyle(2,0xffffff);
        for(let i=0;i*this.width<=this.width*10;i++){
            line.graphics.moveTo(i*this.width/2,0);
            line.graphics.lineTo(i*this.width/2,this.height);
        }
        line.graphics.endFill();

        this.addChild(line);
    }
}