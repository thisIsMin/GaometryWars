// TypeScript file
//三角
class Triangle extends Gaometry {
    public constructor(id: string, pos: number, isFriendly: boolean, x: number, y: number,
        state: number, speed: number, timePatDatas: Array<TimePathData>, gc?: GameControl) {
        super(Gaometry.TYPE_TRIANGLE, id, pos, isFriendly, x, y, state, speed, timePatDatas, gc);
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.life = 1;
        this.attack = 1;
        this.maxLifeTime = 50000;
        this.attackSpeed = 0.2;
        this.attackTime = 0;
    }

    // protected initData(){
    //     super.initData();
    //     // private speed:number=0;//速度 秒为单位
    //     // protected life:number=0;
    //     // protected attack:number=0;

    //     this.life=1;
    //     this.attack=1;
    //     this.maxLifeTime=15000;
    //     this.attackSpeed=0.2;
    //     this.attackTime=0;
    // }

    protected draw() {

        this.width = 40;
        this.height = 40;
        this.graphics.lineStyle(3, this.color);
        this.graphics.moveTo(this.width / 2, this.height / 2);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, this.height / 2);
        this.graphics.lineTo(this.width / 2, this.height / 2);
        this.graphics.endFill();
    }

    protected shot() {
        let globlaP = new egret.Point();
        this.localToGlobal(0, 0, globlaP);
        let bt = new TriBullet("dddd", this, this.getPosition(), this.isFriendly, globlaP.x, globlaP.y);
        //bt.setHostile();
        if (this.gc != null) {
            let e = this.gc.getTrackObj(bt);
            bt.setHostile(e);
            this.gc.addEntityToGame(bt);

        }
    }
    //////////////////////////////////////////////////
    private lineAnimations: Array<egret.Shape>;
    //hui zhen
    //@progress 表示动画进度
    protected dieAnimationPaintin(progress: number) {
        if (this.lineAnimations == null) {
            //qing chu yuan xianshiti

            this.graphics.clear();
            //chuangjian shua zhen duixiang
            this.lineAnimations = new Array<egret.Shape>();
            for (let i = 0; i < 3; i++) {
                let line = new egret.Shape();
                if (i == 0) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(this.width / 2, this.height / 2);
                    line.graphics.lineTo(-this.width / 2, this.height / 2);
                    line.graphics.endFill();
                    line.x = this.width / 2;
                    line.y = this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                } else if (i == 1) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(-this.width / 2, this.height / 2);
                    line.graphics.lineTo(0, -this.height / 2);
                    line.graphics.endFill();
                    line.x = -this.width / 2;
                    line.y = this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                } else if (i == 2) {
                    line.graphics.lineStyle(2, this.color);
                    line.graphics.moveTo(0, -this.height / 2);
                    line.graphics.lineTo(this.width / 2, this.height / 2);
                    line.graphics.endFill();
                    line.x = 0;
                    line.y = -this.height / 2;
                    line.anchorOffsetX = line.x;
                    line.anchorOffsetY = line.y;
                }
                this.lineAnimations.push(line);
                this.addChild(line);

            }
        }
        for (let i = 0; i < this.lineAnimations.length; i++) {
            //zixuan
            this.lineAnimations[i].rotation = 25 * progress;
            //gong zhuan gong zhuan 
            let revolutionRadian = Math.acos(this.lineAnimations[i].x / Math.sqrt(Math.pow(this.lineAnimations[i].x, 2) + Math.pow(this.lineAnimations[i].y, 2)));
            if (this.lineAnimations[i].y < 0) {
                revolutionRadian = Math.PI * 2 - revolutionRadian;
            }
            this.lineAnimations[i].x = Math.cos(revolutionRadian + Math.PI * progress) * ((this.width / 2));
            this.lineAnimations[i].y = Math.sin(revolutionRadian + Math.PI * progress) * ((this.width / 2));

            //tou mingdu
            this.lineAnimations[i].alpha = 1 - progress;
        }
    }
}