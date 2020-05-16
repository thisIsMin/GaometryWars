// TypeScript file
class ChangeGaoView extends egret.Sprite {
    //private m_insideX:number=0;
    //private m_insideY:number=0;
    public constructor() {
        super();
        //this.x=150;
        //this.y=650-150;
        //this.m_insideX=this.x;
        //this.m_insideY=this.y;
        //this.touchEnabled = true;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    private onAddToStage(event: egret.Event) {

        //var origin:Origin=new Origin();
        //this.addChild(origin);
        this.x = this.parent.width - 100;
        this.y = this.parent.height - 100;

        this.draw();
        this.initChild();
        //this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onTouchDownThis, this );
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapStage, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);


        //let a=[1,2,3,5],b=[1,2,5],s=new Set(b);
        // var s=new Array();
        // var s=new List

    }
    private draw() {//自身绘制
        //
    }
    private bts = new Array<CirButton>();
    private skillActivation: CirButton;
    private initChild() {
        for (let i = 0; i < 3; i++) {
            let p = this.getBulletP(i);
            this.bts[i] = new CirButton(p, Icon.ICONTYPE_CIRCLE);
            this.addChild(this.bts[i]);
            this.bts[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        this.skillActivation = new CirButton(new egret.Point(0, 0), Icon.ICONTYPE_SKILL);
        this.skillActivation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addChild(this.skillActivation);
    }

    private getBulletP(i: number): egret.Point {
        let reP = new egret.Point();
        reP.x = -Math.cos(i * Math.PI / 4) * 100;
        reP.y = -Math.sin(i * Math.PI / 4) * 100;
        return reP;
    }

    private onTouchTap(event: egret.TouchEvent) {
        egret.log("touchtap this x :" + event.localX);
        egret.log("touchtap this stage x :" + event.stageX);
        if (event.target == this.bts[0]) {
            this.postEvent(0);
            this.bts[0].changeIcon();
        } else if (event.target == this.bts[1]) {
            this.postEvent(1);
            this.bts[1].changeIcon();
        } else if (event.target == this.bts[2]) {
            this.postEvent(2);
            this.bts[2].changeIcon();
        } else if (event.target == this.skillActivation) {
            this.postSkillEvent();
        }
    }




    private postEvent(i: number) {
        var changeGaoEvent = new ChangeGaoEvent(i);
        this.dispatchEvent(changeGaoEvent);
        egret.log("post changeGao event ");
    }
    private postSkillEvent() {
        var event = new egret.Event("postSkillEvent");
        this.dispatchEvent(event);
        egret.log("post skillactivation event ");
    }
}

class CirButton extends Button {
    private iconType = 1;
    public constructor(point: egret.Point, iconType: number) {
        super();
        this.x = point.x;
        this.y = point.y;
        this.iconType = iconType;
        this.touchEnabled = true;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    // private onAddToStage(event: egret.Event) {

    //     //var origin:Origin=new Origin();
    //     //this.addChild(origin);

    //     this.draw();
    // }


    protected draw() {//自身绘制
        this.graphics.beginFill(0x345500, 0);
        this.graphics.drawCircle(0, 0, 35);
        this.graphics.endFill();

        this.graphics.lineStyle(2, 0xdddddd);
        this.graphics.drawCircle(0, 0, 35);
        this.graphics.endFill();

        this.icon = new Icon(this.iconType);
        this.addChild(this.icon);
        this.drawIcon();

    }

    protected drawChild(){}
    

    private icon: Icon;
    private drawIcon() {
        this.icon.draw();
    }

    private clearIcon() {
        this.icon.clear();
    }

    public changeIcon() {
        let newIconType = this.iconType + 1;
        if (newIconType > Icon.ICONTYPE_TRIANGLE && newIconType < 10) {
            this.iconType = 1;
        } else {
            this.iconType = newIconType;
        }
        this.icon.setType(this.iconType);
        this.clearIcon();
        this.drawIcon();
    }
}


class Icon extends egret.Sprite {
    public static ICONTYPE_CIRCLE = 1;
    public static ICONTYPE_DIAMOND = 2;
    public static ICONTYPE_SQUARE = 3;
    public static ICONTYPE_TRIANGLE = 4;
    public static ICONTYPE_SKILL = 10;

    private type: number = 1;
    constructor(type: number) {
        super();
        this.type = type;

        this.width = 30;
        this.height = 30;
    }

    public draw() {
        switch (this.type) {
            case Icon.ICONTYPE_CIRCLE:
                this.drawCircle();
                break;
            case Icon.ICONTYPE_DIAMOND:
                this.drawDiamond();
                break;
            case Icon.ICONTYPE_SQUARE:
                this.drawSquare();
                break;
            case Icon.ICONTYPE_TRIANGLE:
                this.drawTriangle();
                break;
            case Icon.ICONTYPE_SKILL:
                this.drawSkill();
                break;

        }
    }

    private drawCircle() {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        //this.graphics.beginFill(0x0000ff, 1);
        this.graphics.lineStyle(2, 0xffffff);

        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    }

    private drawSquare() {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.moveTo(this.width*2/3, 0);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width*2/3, 0);
        this.graphics.lineTo(0, this.height / 2);
        this.graphics.lineTo(this.width*2/3, 0);
        this.graphics.endFill();
    }
    private drawTriangle() {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.moveTo(this.width / 2, this.height / 2);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, this.height / 2);
        this.graphics.lineTo(this.width / 2, this.height / 2);
        this.graphics.endFill();
    }

    private drawDiamond() {

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
    }
    private drawSkill() {
        let r = 20;
        let angle = 40;
        let arrowAngle = 40;
        let arrowLenght = 10;
        this.line1 = new egret.Shape();
        this.line1.anchorOffsetX = 0;
        this.line1.anchorOffsetY = -r + this.height / 4;
        this.line1.graphics.lineStyle(2, 0xffffff);
        this.line1.graphics.drawArc(0, 0, r, (-90 - angle) * Math.PI / 180, (-90 + angle) * Math.PI / 180);

        /////////////////////////jiantuo
        this.line1.graphics.moveTo(Math.cos((270 + angle) * Math.PI / 180) * r, Math.sin((270 + angle) * Math.PI / 180) * r);
        this.line1.graphics.lineTo(Math.cos((270 + angle) * Math.PI / 180) * r + Math.cos(((270 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght
            , Math.sin((270 + angle) * Math.PI / 180) * r + Math.sin(((270 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line1.graphics.moveTo(Math.cos((270 + angle) * Math.PI / 180) * r, Math.sin((270 + angle) * Math.PI / 180) * r);
        this.line1.graphics.lineTo(Math.cos((270 + angle) * Math.PI / 180) * r + Math.cos(((270 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght
            , Math.sin((270 + angle) * Math.PI / 180) * r + Math.sin(((270 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght);

        this.line1.graphics.endFill();


        this.line2 = new egret.Shape();
        this.line2.anchorOffsetX = 0;
        this.line2.anchorOffsetY = r - this.height / 4;
        this.line2.graphics.lineStyle(2, 0xffffff);
        this.line2.graphics.drawArc(0, 0, r, (90 - angle) * Math.PI / 180, (90 + angle) * Math.PI / 180);

        /////////////////////////jiantuo
        this.line2.graphics.moveTo(Math.cos((90 + angle) * Math.PI / 180) * r, Math.sin((90 + angle) * Math.PI / 180) * r);
        this.line2.graphics.lineTo(Math.cos((90 + angle) * Math.PI / 180) * r + Math.cos(((90 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght
            , Math.sin((90 + angle) * Math.PI / 180) * r + Math.sin(((90 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line2.graphics.moveTo(Math.cos((90 + angle) * Math.PI / 180) * r, Math.sin((90 + angle) * Math.PI / 180) * r);
        this.line2.graphics.lineTo(Math.cos((90 + angle) * Math.PI / 180) * r + Math.cos(((90 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght
            , Math.sin((90 + angle) * Math.PI / 180) * r + Math.sin(((90 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght);

        this.line2.graphics.endFill();

        this.addChild(this.line1);
        this.addChild(this.line2);
        this.rotation = 45;
    }

    private line1: egret.Shape;
    private line2: egret.Shape;
    public clear() {
        this.graphics.clear();
        if (this.line1 != null && this.line2 != null) {
            this.line1.graphics.clear();
            this.line2.graphics.clear();
        }

    }

    public setType(type: number) {
        this.type = type;
    }
}
