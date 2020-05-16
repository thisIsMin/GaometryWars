// TypeScript file
class GameView extends egret.DisplayObjectContainer{
    private gc: GameControl;
    public constructor() {
        super();
        this.gc=new GameControl(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        
    }

    private onAddToStage(event: egret.Event) {

        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.init();
        this.start();

        //this.initView();

    }

    private init(){
        GameView.speed=30;
        this.x=0;
    }
    private start(){
        this.gc.initGame();
        this.lastGameTime=egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.gc.gameStart();
    }

    private lastGameTime=0;
    private onEnterFrame(){
        let gameTime=egret.getTimer();
        let pass = gameTime- this.lastGameTime;
        this.lastGameTime=gameTime;
        this.gameViewMove(pass);
        this.gc.gameRun(pass);
        //this.gameViewMove(pass);

        //egret.log("gameview on ef pass" +pass);
    }
    public gameOver(isWin : boolean){

        GameView.speed=0;

        let reString;
        if(isWin){
            reString="WIN";
        }else{
            reString="LOST";
        }
        let gov=new GameOverView(reString);
        gov.x=(0-this.x)+(this.stage.stageWidth-gov.width)/2;
        gov.y=(this.stage.stageHeight-gov.height)/2;
        this.addChild(gov);

        gov.addEventListener(GameEvent.GAMEBACK,this.onGameBack,this);
        gov.addEventListener(GameEvent.GAMENEWSTART,this.onNewStart,this);
    }
    protected onGameBack(){
        this.gameBack();
    }
    protected onNewStart(){
        this.startNewGame();
    }
    protected gameBack(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.dispatchEventWith(GameEvent.GAMEBACK);
    }
    protected startNewGame(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.clean();
        this.init();
        this.start();
    }
    private clean(){
        this.removeChildren();
    }
    public rouMove(pos : number){
        this.gc.rouMove(pos);
    }

    public rouUp(){
        this.gc.rouUp();
    }

    public onPause(){

    }

    public onResume(){
        this.lastGameTime=egret.getTimer();
    }
    public static speed : number=30;
    public gameViewMove(pass){
        this.x=this.x-(GameView.speed* pass)/1000;
    }

    /////////////////////////////////
    public onChangeGao(i: number){
        this.gc.changeOriginGao(i);
        egret.log("gameview changegao :" +i);
    }

    public skillActivation(){
        this.gc.skillActivation();
    }
}