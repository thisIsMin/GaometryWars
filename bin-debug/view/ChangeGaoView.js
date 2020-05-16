var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var ChangeGaoView = (function (_super) {
    __extends(ChangeGaoView, _super);
    //private m_insideX:number=0;
    //private m_insideY:number=0;
    function ChangeGaoView() {
        var _this = _super.call(this) || this;
        _this.bts = new Array();
        //this.x=150;
        //this.y=650-150;
        //this.m_insideX=this.x;
        //this.m_insideY=this.y;
        //this.touchEnabled = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ChangeGaoView.prototype.onAddToStage = function (event) {
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
    };
    ChangeGaoView.prototype.draw = function () {
        //
    };
    ChangeGaoView.prototype.initChild = function () {
        for (var i = 0; i < 3; i++) {
            var p = this.getBulletP(i);
            this.bts[i] = new CirButton(p, Icon.ICONTYPE_CIRCLE);
            this.addChild(this.bts[i]);
            this.bts[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
        this.skillActivation = new CirButton(new egret.Point(0, 0), Icon.ICONTYPE_SKILL);
        this.skillActivation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addChild(this.skillActivation);
    };
    ChangeGaoView.prototype.getBulletP = function (i) {
        var reP = new egret.Point();
        reP.x = -Math.cos(i * Math.PI / 4) * 100;
        reP.y = -Math.sin(i * Math.PI / 4) * 100;
        return reP;
    };
    ChangeGaoView.prototype.onTouchTap = function (event) {
        egret.log("touchtap this x :" + event.localX);
        egret.log("touchtap this stage x :" + event.stageX);
        if (event.target == this.bts[0]) {
            this.postEvent(0);
            this.bts[0].changeIcon();
        }
        else if (event.target == this.bts[1]) {
            this.postEvent(1);
            this.bts[1].changeIcon();
        }
        else if (event.target == this.bts[2]) {
            this.postEvent(2);
            this.bts[2].changeIcon();
        }
        else if (event.target == this.skillActivation) {
            this.postSkillEvent();
        }
    };
    ChangeGaoView.prototype.postEvent = function (i) {
        var changeGaoEvent = new ChangeGaoEvent(i);
        this.dispatchEvent(changeGaoEvent);
        egret.log("post changeGao event ");
    };
    ChangeGaoView.prototype.postSkillEvent = function () {
        var event = new egret.Event("postSkillEvent");
        this.dispatchEvent(event);
        egret.log("post skillactivation event ");
    };
    return ChangeGaoView;
}(egret.Sprite));
__reflect(ChangeGaoView.prototype, "ChangeGaoView");
var CirButton = (function (_super) {
    __extends(CirButton, _super);
    function CirButton(point, iconType) {
        var _this = _super.call(this) || this;
        _this.iconType = 1;
        _this.x = point.x;
        _this.y = point.y;
        _this.iconType = iconType;
        _this.touchEnabled = true;
        return _this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    // private onAddToStage(event: egret.Event) {
    //     //var origin:Origin=new Origin();
    //     //this.addChild(origin);
    //     this.draw();
    // }
    CirButton.prototype.draw = function () {
        this.graphics.beginFill(0x345500, 0);
        this.graphics.drawCircle(0, 0, 35);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0xdddddd);
        this.graphics.drawCircle(0, 0, 35);
        this.graphics.endFill();
        this.icon = new Icon(this.iconType);
        this.addChild(this.icon);
        this.drawIcon();
    };
    CirButton.prototype.drawChild = function () { };
    CirButton.prototype.drawIcon = function () {
        this.icon.draw();
    };
    CirButton.prototype.clearIcon = function () {
        this.icon.clear();
    };
    CirButton.prototype.changeIcon = function () {
        var newIconType = this.iconType + 1;
        if (newIconType > Icon.ICONTYPE_TRIANGLE && newIconType < 10) {
            this.iconType = 1;
        }
        else {
            this.iconType = newIconType;
        }
        this.icon.setType(this.iconType);
        this.clearIcon();
        this.drawIcon();
    };
    return CirButton;
}(Button));
__reflect(CirButton.prototype, "CirButton");
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon(type) {
        var _this = _super.call(this) || this;
        _this.type = 1;
        _this.type = type;
        _this.width = 30;
        _this.height = 30;
        return _this;
    }
    Icon.prototype.draw = function () {
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
    };
    Icon.prototype.drawCircle = function () {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        //this.graphics.beginFill(0x0000ff, 1);
        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.drawCircle(0, 0, this.width / 2);
        this.graphics.endFill();
    };
    Icon.prototype.drawSquare = function () {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.graphics.lineStyle(2, 0xffffff);
        this.graphics.moveTo(this.width * 2 / 3, 0);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width * 2 / 3, 0);
        this.graphics.lineTo(0, this.height / 2);
        this.graphics.lineTo(this.width * 2 / 3, 0);
        this.graphics.endFill();
    };
    Icon.prototype.drawTriangle = function () {
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.moveTo(this.width / 2, this.height / 2);
        this.graphics.lineTo(0, -this.height / 2);
        this.graphics.lineTo(-this.width / 2, this.height / 2);
        this.graphics.lineTo(this.width / 2, this.height / 2);
        this.graphics.endFill();
    };
    Icon.prototype.drawDiamond = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
    };
    Icon.prototype.drawSkill = function () {
        var r = 20;
        var angle = 40;
        var arrowAngle = 40;
        var arrowLenght = 10;
        this.line1 = new egret.Shape();
        this.line1.anchorOffsetX = 0;
        this.line1.anchorOffsetY = -r + this.height / 4;
        this.line1.graphics.lineStyle(2, 0xffffff);
        this.line1.graphics.drawArc(0, 0, r, (-90 - angle) * Math.PI / 180, (-90 + angle) * Math.PI / 180);
        /////////////////////////jiantuo
        this.line1.graphics.moveTo(Math.cos((270 + angle) * Math.PI / 180) * r, Math.sin((270 + angle) * Math.PI / 180) * r);
        this.line1.graphics.lineTo(Math.cos((270 + angle) * Math.PI / 180) * r + Math.cos(((270 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght, Math.sin((270 + angle) * Math.PI / 180) * r + Math.sin(((270 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line1.graphics.moveTo(Math.cos((270 + angle) * Math.PI / 180) * r, Math.sin((270 + angle) * Math.PI / 180) * r);
        this.line1.graphics.lineTo(Math.cos((270 + angle) * Math.PI / 180) * r + Math.cos(((270 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght, Math.sin((270 + angle) * Math.PI / 180) * r + Math.sin(((270 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line1.graphics.endFill();
        this.line2 = new egret.Shape();
        this.line2.anchorOffsetX = 0;
        this.line2.anchorOffsetY = r - this.height / 4;
        this.line2.graphics.lineStyle(2, 0xffffff);
        this.line2.graphics.drawArc(0, 0, r, (90 - angle) * Math.PI / 180, (90 + angle) * Math.PI / 180);
        /////////////////////////jiantuo
        this.line2.graphics.moveTo(Math.cos((90 + angle) * Math.PI / 180) * r, Math.sin((90 + angle) * Math.PI / 180) * r);
        this.line2.graphics.lineTo(Math.cos((90 + angle) * Math.PI / 180) * r + Math.cos(((90 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght, Math.sin((90 + angle) * Math.PI / 180) * r + Math.sin(((90 + angle - 90) - arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line2.graphics.moveTo(Math.cos((90 + angle) * Math.PI / 180) * r, Math.sin((90 + angle) * Math.PI / 180) * r);
        this.line2.graphics.lineTo(Math.cos((90 + angle) * Math.PI / 180) * r + Math.cos(((90 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght, Math.sin((90 + angle) * Math.PI / 180) * r + Math.sin(((90 + angle - 90) + arrowAngle) * Math.PI / 180) * arrowLenght);
        this.line2.graphics.endFill();
        this.addChild(this.line1);
        this.addChild(this.line2);
        this.rotation = 45;
    };
    Icon.prototype.clear = function () {
        this.graphics.clear();
        if (this.line1 != null && this.line2 != null) {
            this.line1.graphics.clear();
            this.line2.graphics.clear();
        }
    };
    Icon.prototype.setType = function (type) {
        this.type = type;
    };
    Icon.ICONTYPE_CIRCLE = 1;
    Icon.ICONTYPE_DIAMOND = 2;
    Icon.ICONTYPE_SQUARE = 3;
    Icon.ICONTYPE_TRIANGLE = 4;
    Icon.ICONTYPE_SKILL = 10;
    return Icon;
}(egret.Sprite));
__reflect(Icon.prototype, "Icon");
//# sourceMappingURL=ChangeGaoView.js.map