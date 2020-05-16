// TypeScript file
class GameOverView extends egret.Sprite{
    private backButton : Button;
    private newButton : Button;
    private resultText : egret.TextField;
    public constructor(resultText : string) {
        super();
        this.width=800;
        this.height=500;
        this.resultText=new egret.TextField();
        this.resultText.text=resultText;
        this.resultText.x=400-this.resultText.width/2;
        this.resultText.y=200;

        this.backButton=new Button();
        this.backButton.setButtonText("返回");
        this.backButton.x=200;
        this.backButton.y=400;

        this.newButton=new Button();
        this.newButton.setButtonText("重新开始");
        this.newButton.x=600;
        this.newButton.y=400;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.newButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    protected onTouchTap(event : egret.TouchEvent){
        if(event.target==this.backButton){
            this.postGameBack();
        }else if(event.target==this.newButton){
            this.postGameNewStart()
        }
    }
    private onAddToStage(event: egret.Event) {
        this.draw();
        this.childDraw();
    }
    private postGameBack(){
        this.dispatchEventWith(GameEvent.GAMEBACK);

    }
    private postGameNewStart(){
        this.dispatchEventWith(GameEvent.GAMENEWSTART);
    }
    private draw(){
        this.graphics.beginFill(0x222222);
        this.graphics.drawRect(0,0,this.width,this.height);
        this.graphics.endFill();
        this.graphics.lineStyle(2,0xdddddd);
        this.graphics.drawRect(0,0,this.width,this.height);
        this.graphics.endFill();
    }
    private childDraw(){
        this.addChild(this.resultText);
        this.addChild(this.backButton);
        this.addChild(this.newButton);
    }
}

class GameEvent extends egret.Event{
    public static GAMEBACK="gameback";
    public static GAMENEWSTART="gamenewstart";
}