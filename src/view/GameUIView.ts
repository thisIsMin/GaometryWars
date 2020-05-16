// TypeScript file
class GameUIView extends egret.DisplayObjectContainer{
    public constructor() {
        super();
       
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.width=this.stage.stageWidth;
        this.height=this.stage.stageHeight;
        this.initView();

    }

    private changeGaoView : ChangeGaoView;
    private initView(){
        var roulette:Roulette=new Roulette();
        this.addChild(roulette);
        roulette.addEventListener(RouletteChange.EVENT_ROULETTECHANGE,this.onRouChange,this);

        this.changeGaoView=new ChangeGaoView();
        this.changeGaoView.addEventListener(ChangeGaoEvent.EVENT_ROULETTECHANGE,this.onChangeGao,this);
        this.changeGaoView.addEventListener("postSkillEvent",this.onSkillActivation,this);
        this.addChild(this.changeGaoView);
    }


   protected onSkillActivation(event : egret.Event){
       this.dispatchEvent(event);
   }
    onChangeGao(event:ChangeGaoEvent){
        egret.log(" changegoa  vi");
        this.dispatchEvent(event);
    }
    public onRouChange(event:RouletteChange){
        this.dispatchEvent(event);
        egret.log(" roulettechange  vi");
    }
    
}