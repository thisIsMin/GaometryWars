// TypeScript file
class Skill {
    public static TYPE_CIR = 1;
    public static TYPE_DIA = 2;
    public static TYPE_SQU = 3;
    public static TYPE_TRI = 4;
    protected type: number;
    protected skillTime: number;// ju li shangci shifang duo jiu la 
    protected skillSpeed: number;// duoxiao miao shifang yici
    protected og: Origin;
    protected gc: GameControl;
    public constructor(og: Origin, gc?: GameControl) {
        this.og = og;
    }

    public skillShot(pass) {
        if (this.skillTime >= (1000 / this.skillSpeed)) {
            this._skillShot(pass);
            this.skillTime = 0;
        } else {
            this.skillTime = this.skillTime + pass;
        }
    }

    protected _skillShot(pass: number) {

    }
    public getType(): Number {
        return this.type;
    }
    public die() { }
}
class SkillCir extends Skill {
    protected continuedTime: number = 0;//zhi xu la duo jiu
    protected totalTime: number = 5000;
    protected skillShoting = false;
    public constructor(og: Origin, gc: GameControl) {
        super(og);
        //init data
        this.skillTime = 0;
        this.skillSpeed = 0.1;
        this.type = Skill.TYPE_CIR;
        this.gc = gc;

    }

    public skillShot(pass) {

        if (this.skillShoting && this.continuedTime <= this.totalTime) {
            this.continuedTime = this.continuedTime + pass;
            this._skillShot(pass);
        } else {
            this.skillShoting = false;
            let i = this.og.getChildIndex(this.skillShape);
            if (i >= 0) {
                this.og.removeChild(this.skillShape);
            }
            if (this.skillTime >= (1000 / this.skillSpeed)) {
                this.og.addChildAt(this.skillShape, 0);
                this._skillShot(pass);
                this.skillTime = 0;
                this.continuedTime = 0;
                this.skillShoting = true;
            } else {
                this.skillTime = this.skillTime + pass;
            }
        }

    }


    protected _skillShot(pass: number) {
        let x = Math.cos(this.skillRadian) * this.og.getOgRadius() * 3 / 8;
        let y = Math.sin(this.skillRadian) * this.og.getOgRadius() * 3 / 8;

        //jineng xiao guo hui zhi
        this.drawSkill(pass, x, y);

        let pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        } else {
            pos = Math.PI / 2;
        }
        let globlaP = new egret.Point();
        this.og.localToGlobal(x, y, globlaP);
        this.shot(globlaP.x, globlaP.y);
    }

    protected shot(x: number, y: number) {
        let pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        } else {
            pos = Math.PI / 2;
        }
        var bt = new CirSuperBullet(IdUitl.getId(), this.og, pos, true, x, y);

        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(bt);
            this.gc.setGameViewChildBefMy(bt);
        }
    }

    protected skillShape: egret.Shape = new egret.Shape();
    protected skillRadian = 0;
    protected drawSkill(pass: number, x: number, y: number) {
        this.skillShape.graphics.clear();
        let gts = this.og.getGts();
        this.skillShape.graphics.lineStyle(8, 0xdddddd);
        for (let i = 0; i < gts.length; i++) {//hua san xian
            this.skillShape.graphics.moveTo(x, y);
            this.skillShape.graphics.lineTo(gts[i].x, gts[i].y);

        }
        //hui yuandian
        this.skillShape.graphics.beginFill(0xffffff);
        this.skillShape.graphics.drawCircle(x, y, 8);
        this.skillShape.graphics.endFill();

        this.skillRadian = this.skillRadian + pass / 2000 * Math.PI * 2;
    }
    public die() {
        let i = this.og.getChildIndex(this.skillShape);
        if (i >= 0) {
            this.og.removeChild(this.skillShape);
        }
    }
}

class SkillDia extends Skill {
    protected continuedTime: number = 0;//zhi xu la duo jiu
    protected totalTime: number = 5000;
    protected skillShoting = false;
    public constructor(og: Origin, gc: GameControl) {
        super(og);
        //init data
        this.skillTime = 0;
        this.skillSpeed = 1;
        this.type = Skill.TYPE_DIA;
        this.gc = gc;

    }

    public skillShot(pass) {

        if (this.skillShoting && this.continuedTime <= this.totalTime) {
            this.continuedTime = this.continuedTime + pass;
            //this.skillShoting=false;
        } else {
            this.skillShoting = false;

            if (this.skillTime >= (1000 / this.skillSpeed)) {
                this._skillShot(pass);
                this.skillTime = 0;
                this.continuedTime = 0;
                this.skillShoting = true;
            } else {
                this.skillTime = this.skillTime + pass;
            }
        }

    }

    private multiple = 4;
    protected _skillShot(pass: number) {
        this.og.accelerateRevo(this.multiple);
    }

    // protected _skillEnd(){
    //     this.og.restoreRevo();
    // }
}

class SkillSqu extends Skill {
    public constructor(og: Origin, gc: GameControl) {
        super(og);
        //init data
        this.skillTime = 19000;
        this.skillSpeed = 1000 / 20000;
        this.type = Skill.TYPE_SQU;
        this.gc = gc;

    }

    // public skillShot(pass){

    //         //this.skillTime=this.skillTime+pass;
    //        if(this.skillTime >= (1000/this.skillSpeed)){
    //             this._skillShot();
    //             this.skillTime=0;
    //         }else{
    //             this.skillTime=this.skillTime+pass;
    //         }


    // }

    //private multiple=4; 
    protected _skillShot(pass: number) {


        let p = new egret.Point();
        p.x = 0;
        p.y = 90;
        this._skillShotByPosition(p);
        p.x = 0;
        p.y = -90;
        this._skillShotByPosition(p);
        p.x = -50;
        p.y = 90 + 50;
        this._skillShotByPosition(p);
        p.x = 0 - 50;
        p.y = -90 - 50;
        this._skillShotByPosition(p);

    }

    protected _skillShotByPosition(point: egret.Point) {
        let pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        } else {
            pos = Math.PI / 2;
        }
        let x = this.og.x + point.x;
        let y = this.og.y + point.y;
        var squ = new Square(IdUitl.getId(), pos, this.og.getIsFriendly(),
            this.og.x + point.x, this.og.y + point.y, Gaometry.STATE_FOLLOW, 0, null, this.gc);

        squ.setFollowData(point.x, point.y, this.og);
        // 加入game
        if (this.gc != null) {
            this.gc.addEntityToGame(squ);

        }
    }



    // protected _skillEnd(){
    //     this.og.restoreRevo();
    // }
}

class SkillTri extends Skill {
    public constructor(og: Origin, gc: GameControl) {
        super(og);
        //init data
        this.skillTime = 0;
        this.skillSpeed = 0.5;
        this.type = Skill.TYPE_TRI;
        this.gc = gc;

    }


    protected _skillShot(pass: number) {


        let p = new egret.Point();
        let globlaP = new egret.Point();
        this.og.localToGlobal(0, 0, globlaP);
        p.x = globlaP.x;
        p.y = globlaP.y;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y - this.og.height / 2;
        this._skillShotByPosition(p);
        p.x = globlaP.x + this.og.width / 2;
        p.y = globlaP.y + this.og.height / 2;
        this._skillShotByPosition(p);

    }

    protected _skillShotByPosition(point: egret.Point) {
        let pos = 0;
        if (this.og.getIsFriendly()) {
            pos = 0;
        } else {
            pos = Math.PI / 2;
        }
        var squ = new TriBullet(IdUitl.getId(), this.og, pos, this.og.getIsFriendly(),
            point.x, point.y);

        // 加入game
        if (this.gc != null) {

            this.gc.addEntityToGame(squ);
            squ.setHostile(this.gc.getTrackObj(squ));

        }
    }


}