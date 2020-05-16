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
//几何资源
var ResourcesGao = (function (_super) {
    __extends(ResourcesGao, _super);
    function ResourcesGao(type, id, x, y) {
        var _this = _super.call(this, id, x, y) || this;
        _this.type = type;
        return _this;
        //this.x=600;
        //this.y=325;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    ResourcesGao.prototype.draw = function () {
        if (this.type == ResourcesGao.RESGAO_CIRCLE) {
            this.graphics.lineStyle(3, this.color);
            this.graphics.drawCircle(0, 0, 20);
            this.graphics.endFill();
        }
        else if (this.type == ResourcesGao.RESGAO_DIAMOND) {
            //
            this.width = 20;
            this.height = 20;
            this.anchorOffsetX = -this.width / 2;
            this.anchorOffsetY = -this.height / 2;
            this.graphics.lineStyle(3, this.color);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
        }
        else if (this.type == ResourcesGao.RESGAO_SQUARE) {
            this.width = 20;
            this.height = 20;
            this.graphics.lineStyle(3, this.color);
            this.graphics.moveTo(this.width / 2, 0);
            this.graphics.lineTo(0, -this.height / 2);
            this.graphics.lineTo(-this.width / 2, 0);
            this.graphics.lineTo(0, this.height / 2);
            this.graphics.lineTo(this.width / 2, 0);
            this.graphics.endFill();
        }
        else if (this.type == ResourcesGao.RESGAO_TRIANGLE) {
            this.width = 20;
            this.height = 20;
            this.graphics.lineStyle(3, this.color);
            this.graphics.moveTo(this.width / 2, this.height / 2);
            this.graphics.lineTo(0, -this.height / 2);
            this.graphics.lineTo(-this.width / 2, this.height / 2);
            this.graphics.lineTo(this.width / 2, this.height / 2);
            this.graphics.endFill();
        }
    };
    ResourcesGao.prototype.go = function (pass) { };
    ResourcesGao.prototype.move = function () { };
    ResourcesGao.prototype.collisionHandle = function () {
        this.die();
    };
    ResourcesGao.RESGAO_CIRCLE = 1;
    ResourcesGao.RESGAO_DIAMOND = 2;
    ResourcesGao.RESGAO_SQUARE = 3;
    ResourcesGao.RESGAO_TRIANGLE = 4;
    return ResourcesGao;
}(Entity));
__reflect(ResourcesGao.prototype, "ResourcesGao");
//# sourceMappingURL=ResourcesGeo.js.map