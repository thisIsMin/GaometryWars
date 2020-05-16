// TypeScript file
//本体
class Origin extends Entity{
    private delSpeed : number;
    private og : egret.Shape;

    protected attackApeed : number=0.5;// mei miao gongji ci yu
    protected attackTime : number = 1000/0.5;
    public constructor(id:string,pos:number,isFriendly:boolean,x:number,y:number,
    speed : number , timePatDatas : Array<TimePathData>,gc? : GameControl) {
        super(id,x,y,gc);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

        this.setPosition(pos);
        this.isFriendly=isFriendly;

        this.setspeed(speed);
        this.timePathDatas=timePatDatas;

        this.delSpeed=100;

        if(this.isFriendly){
            this.color=0x00ffff;
        }else{
            this.color=0xff0000;
        }

        this.initData();
    }

    // public onAddToStage(event: egret.Event) {
    //     this.draw();

    //     var circle:Circle=new Circle();
    //     this.addChild(circle);

    //     egret.log("origin onaddstage");
    // }

    // private onEnterFrame(){
    //     this.go();
    //     egret.log("origin onenterframe");
    // }

    protected initData(){
        //super.initData();

        this.life=1;
        this.attack=1;
        this.maxLifeTime=-1;
    
        
    }

    protected initChild(){
        //var circle:Circle=new Circle();
        //this.addChild(circle);
        for(let i : number=0;i<3;i++){
            let cr=new Circle(IdUitl.getId(),0,this.isFriendly,0,
                0,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(i*Math.PI/3*2,this.og.width/2,this);
                //this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
        }
        this.activationCirSkill();
        //this.skill=new SkillCir(this,this.gc);
        //egret.log("origin initChild");
    }

    protected draw(){
        
        this.og=new egret.Shape();
        this.og.width=80;
        this.og.height=80;
        this.og.graphics.beginFill(this.color, 0.8);
        this.og.graphics.drawCircle(0,0,8);
        this.og.graphics.endFill();

        //this.graphics.beginFill(0x0000ff, 1);
        this.og.graphics.lineStyle(5,this.color);
        
        this.og.graphics.drawCircle(0,0,40);
        this.og.graphics.endFill();
        this.addChild(this.og);
        //egret.log("origin draw");
    }
    // public go(pass: number){
    //     super.go(pass);
    //     //if(this.isShot){
    //     this.attackRun(pass);
    //     //}
    // }

    public go(pass: number){
        super.go(pass);
        this.buffLifeRun(pass);
    }

    protected buffLifeRun(pass: number){
        //multiple
        if(this.multipleBuff){
            this.multipleBuffTimeSurplus=this.multipleBuffTimeSurplus-pass;
            if(this.multipleBuffTimeSurplus<=0){
                this.restoreRevo();
            }
        }
    }

    protected move(pass:number){
        super.move(pass);
        //+gameview速度
        this.x=this.x+GameView.speed*pass/1000;
        //egret.log("origin move");
    }

    protected shot(){  
    
        let globlaP=new egret.Point();
        this.localToGlobal(0,0,globlaP);
        var bt=new Bullet(Bullet.TYPE_NOR,"dddd",this,0,true,globlaP.x,globlaP.y);
        //egret.log("origin shot x" + this. x + "y" + this.y );
    // 加入game
    if(this.gc!=null){
            this.gc.addEntityToGame(bt);
    }
   

}

    protected attackRun(pass :number) {
        this.attackTime=this.attackTime+pass;
        if(this.attackTime >= (1000/this.attackApeed)){
            this.shot();
        
        this.attackTime=0;
        }
    }

    protected childGo(pass: number){
        for(let i=0;i<this.gts.length;i++){
            this.gts[i].go(pass);
        }
    }
    protected die(){
        //
        this.isDie=true;
        //内方块死亡
    }
    public collisionHandle(entity:any){//碰撞处理
        // shi fo gts pengzhu
        if(this.gtsCollisionHandle(entity)){
            return;
        }
        let cName=entity.constructor.name;
        //区分碰撞类型
        if(cName == "Origin"){//直死
            this.behitOfOrigin(entity);
        }else if(cName == "Bullet" || cName =="CirBullet" || cName =="SquBullet" ||
        cName =="TriBullet" || cName =="CirSuperBullet"){//下发至内部碰撞检测
            this.behit(entity);
        }else if(cName == "Gaometry" || cName =="Circle" ||cName =="Diamond" ||cName =="Square"||cName =="Triangle"){////下发至内部碰撞检测
            this.behit(entity);
        }
    }

    private gtsCollisionHandle(entity:any) :boolean{
        for(let i=0;i<this.gts.length;i++){
            if(GameControl.hitEntityTest(this.gts[i],entity)){
                this.gts[i].collisionHandle(entity);
                return true;
            }
        }
        return false;
    }

    public getGloHitRects() : Array<egret.Rectangle>{
        let ars=new Array<egret.Rectangle>();
        //GTS RECT
        for(let i : number=0;i<this.gts.length;i++){
            let ars1=this.gts[i].getGloHitRects();
            ars=ars.concat(ars1);
        }
        //自身RECT
        let rt=this.getSelfGloHitRect();
        ars.push(rt);

        return ars;
    }

    public getSelfGloHitRect() : egret.Rectangle{
        //自身RECT
        let rt=this.og.getBounds();
        let point=new egret.Point();
        this.og.localToGlobal(0+this.anchorOffsetX,0+this.anchorOffsetY,point)//获取自身原点在全局STAGE的坐标
        //吧原点放到左上角
        rt.x = point.x+rt.left;
        rt.y = point.y+rt.top;
        return rt;
    }

    public setSpeedForDel(){
        this.setspeed(this.delSpeed);
    }

    // public recoverySpeed(){
    //     this.setspeed(this.delSpeed);
    // }

    /////////////////////////////////////////////////huan rou xuanzhuan xitong
    //ORIGIN 身边默认有三个GAOMETRY 围绕ORIGIN旋转
    //GAOMETRY 有器正常射击功能 能碰撞，但碰撞伤害计算到ORIGIN，生命周期跟随ORIGIN
    //可以手动切换GAO
    //当三个GAO一样时可以激活其特殊技能
    private gts : Array<Gaometry>=new Array();
    //手动切换GAO
    public changeGao(i : number){
        if(this.gts[i]!=null){
            let type=this.gts[i].getType()+1;
            if(type==Gaometry.TYPE_CIRCLE){
                let cr=new Circle(IdUitl.getId(),this.gts[i].getPosition(),this.isFriendly,this.gts[i].x,
                this.gts[i].y,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(),this.gts[i].getRevolutionRadius(),this);
                this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
            } else if(type==Gaometry.TYPE_DIAMOND){
                let cr=new Diamond(IdUitl.getId(),this.gts[i].getPosition(),this.isFriendly,this.gts[i].x,
                this.gts[i].y,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(),this.gts[i].getRevolutionRadius(),this);
                this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
            } else if(type==Gaometry.TYPE_SQUARE){
                let cr=new Square(IdUitl.getId(),this.gts[i].getPosition(),this.isFriendly,this.gts[i].x,
                this.gts[i].y,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(),this.gts[i].getRevolutionRadius(),this);
                this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
            } else if(type==Gaometry.TYPE_TRIANGLE){
                let cr=new Triangle(IdUitl.getId(),this.gts[i].getPosition(),this.isFriendly,this.gts[i].x,
                this.gts[i].y,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(),this.gts[i].getRevolutionRadius(),this);
                this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
            }else {
                let cr=new Circle(IdUitl.getId(),this.gts[i].getPosition(),this.isFriendly,this.gts[i].x,
                this.gts[i].y,Gaometry.STATE_FATTER,0,null,this.gc);
                cr.setRevolutionData(this.gts[i].getRadian(),this.gts[i].getRevolutionRadius(),this);
                this.removeChild(this.gts[i]);
                this.gts[i]=cr;
                this.addChild(cr);
            }



        }
    }

    private skill: Skill;
    private multiple =1;
    private multipleBuff =false;
    protected multipleBuffTimeSurplus=0;
           ////////////////////////////////skill///////////////////////////////////特殊技能
    protected skillShot(pass : number){
        this.skill.skillShot(pass);
    }
    public activationSkill(){
        //pan duan san gao wei sm xing tai
        if(this.gts[0].getType()==Gaometry.TYPE_CIRCLE && this.gts[1].getType()==Gaometry.TYPE_CIRCLE
        &&this.gts[2].getType()==Gaometry.TYPE_CIRCLE){
                if(this.skill.getType()!= Skill.TYPE_CIR){
                    this.activationCirSkill();
                }
        }else if(this.gts[0].getType()==Gaometry.TYPE_DIAMOND && this.gts[1].getType()==Gaometry.TYPE_DIAMOND
        &&this.gts[2].getType()==Gaometry.TYPE_DIAMOND){
                if(this.skill.getType()!= Skill.TYPE_DIA){
                    this.activationDiaSkill();
                }
        }else if(this.gts[0].getType()==Gaometry.TYPE_SQUARE && this.gts[1].getType()==Gaometry.TYPE_SQUARE
        &&this.gts[2].getType()==Gaometry.TYPE_SQUARE){
                if(this.skill.getType()!= Skill.TYPE_SQU){
                    this.activationSquSkill();
                }
        }else if(this.gts[0].getType()==Gaometry.TYPE_TRIANGLE && this.gts[1].getType()==Gaometry.TYPE_TRIANGLE
        &&this.gts[2].getType()==Gaometry.TYPE_TRIANGLE){
                if(this.skill.getType()!= Skill.TYPE_TRI){
                    this.activationTriSkill();
                }
        }
    }
    private activationCirSkill(){
        if(this.skill!=null){
            this.skill.die();
        }
        this.skill=new SkillCir(this,this.gc);
    } 
    private activationDiaSkill(){
        this.skill.die();
        this.skill=new SkillDia(this,this.gc);
    }
    private activationSquSkill(){
        this.skill.die();
        this.skill=new SkillSqu(this,this.gc);
    }
    private activationTriSkill(){
        this.skill.die();
        this.skill=new SkillTri(this,this.gc);
    }
            /////////////jiasu revolution ji neng
    public accelerateRevo(multiple:number){//加速旋转
        this.multiple=multiple;
        this.multipleBuff=true;
        this.multipleBuffTimeSurplus=5000;//zhi xu 5 xiao
    }
    public restoreRevo(){//恢复旋转
        this.multiple=1;
        this.multipleBuff=false;
    }
    public getMultiple() : number{
        return this.multiple;
    }
    public getMultipleBuff() : boolean{
        return this.multipleBuff;
    }

    public getOgRadius(){
        return this.og.width/2;
    }

    public getGts(){
        return this.gts;
    }
}