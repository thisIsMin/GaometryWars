// TypeScript file
class Button extends egret.Sprite{
    text : egret.TextField;
    private upColor : number=0xdddddd;
    private downColor : number=0x222222;
    private isDown : boolean=false;
    public constructor() {
        super();
        this.text=new egret.TextField();
        this.text.text="BUTTON";
        this.text.x=10;
        this.text.y=5;

        this.touchEnabled = true;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.draw();
        this.drawChild();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    // protected onTouchTap(e : egret.TouchEvent){

    // }
    // protected postClickEvent(){

    // }
    protected drawChild(){
        this.addChild(this.text);
    }
    protected draw(){
        let c=this.upColor;
        if(this.isDown){
            c=this.downColor;
        }
        this.graphics.lineStyle(2,c);
        this.graphics.drawRect(0,0,this.text.width+20,this.text.height+10);
        this.graphics.endFill();
        this.graphics.beginFill(c,0.5);
        this.graphics.drawRect(0,0,this.text.width+20,this.text.height+10);
        this.graphics.endFill();
        this.anchorOffsetX=this.width/2;
        this.anchorOffsetY=this.height/2;
    }
    public setButtonText( text : string){
        this.text.text=text;
    }
    protected onTouchDown(){
        this.isDown=true;
        this.draw();
    }
    protected onTouchUp(){
        this.isDown=false;
        this.draw();
    }
}
