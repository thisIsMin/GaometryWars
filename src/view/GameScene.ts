// TypeScript file
class GameScene extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private gameView : GameView;

    private onAddToStage(event: egret.Event) {

        //var origin:Origin=new Origin();
        //this.addChild(origin);
        

        this.initView();

    }

    private initView(){
        // var gameUIView:GameUIView=new GameUIView();
        // this.addChild(gameUIView);

        

        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.gameView.addEventListener(GameEvent.GAMEBACK,this.gameBack,this);

        var gameUIView:GameUIView=new GameUIView();
        this.addChild(gameUIView);
        gameUIView.addEventListener(RouletteChange.EVENT_ROULETTECHANGE,this.onRouChange,this);
        gameUIView.addEventListener(ChangeGaoEvent.EVENT_ROULETTECHANGE,this.onChangeGao,this);
        gameUIView.addEventListener("postSkillEvent",this.onSkillActivation,this);
    }

    protected gameBack(){
        this.dispatchEventWith(GameEvent.GAMEBACK);
    }

    protected onSkillActivation(event : egret.Event){
       this.gameView.skillActivation();
   }

    private onChangeGao(event : ChangeGaoEvent){
        egret.log(" changegoa  GameScene :"+ event.i);
        this.gameView.onChangeGao(event.i);
    }

    private onRouChange(event:RouletteChange){
        egret.log(" roulettechange  gs");
        egret.log(" roulettechange position point.x="+event.m_position.x+"point.y="+event.m_position.y);
      
      if(event.m_position.y == 0 && event.m_position.x==0){
          this.gameView.rouUp();
      }else{
          if(event.m_position.y>=0){
              let pos=Math.acos(event.m_position.x/Math.sqrt(Math.pow(event.m_position.x,2)+ Math.pow(event.m_position.y,2)));
              this.gameView.rouMove(pos);
          }else{
              let pos= - Math.acos(event.m_position.x/Math.sqrt(Math.pow(event.m_position.x,2)+ Math.pow(event.m_position.y,2)));
              
              this.gameView.rouMove(pos);
          }
      }
    }

    public onPause(){
        this.gameView.onPause();
    }

    public onResume(){
        this.gameView.onResume();

    }
    
}