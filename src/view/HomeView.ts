// TypeScript file
//主页面
class HomeView extends egret.DisplayObjectContainer{
    private backGround : egret.Sprite;
    public startButton : Button;
    private aboutButton : Button;
    constructor(){
        super();
        this.startButton=new Button();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(){
        this.width=this.stage.stageWidth;
        this.height=this.stage.stageHeight;
        this.draw();
    }
    private onAboutButton(){
        this.about();
    }
    private about(){}
    private draw(){
        this.drawChild();
    }
    private drawChild(){
        if(this.backGround==null){
            this.backGround=new egret.Sprite();
        }
        this.backGround.graphics.beginFill(0x222222);
        this.backGround.graphics.drawRect(0,0,this.width,this.height);
        this.backGround.graphics.endFill();
        this.addChild(this.backGround);
        //if(this.startButton==null){
            //this.startButton=new Button();
            this.startButton.x=this.width/2-this.startButton.width/2;
            this.startButton.y=400;
            
        //}
        this.startButton.setButtonText("开始游戏");
        this.addChild(this.startButton);

        if(this.aboutButton==null){
            this.aboutButton=new Button();
            this.aboutButton.x=this.width/2-this.aboutButton.width/2;
            this.aboutButton.y=200;
            this.aboutButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAboutButton,this);
        }
        this.aboutButton.setButtonText("关于");
        this.addChild(this.aboutButton);
        
    }

}