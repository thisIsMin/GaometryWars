var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var aaa = (function () {
    function aaa(i) {
        this.j = 0;
        this.po = new egret.Point();
        this.i = i;
        //let abc=new abc();
    }
    aaa.prototype.getI = function () {
        return this.i;
    };
    return aaa;
}());
__reflect(aaa.prototype, "aaa");
// interface abc{
//     new () : any;
//     aaad();
// } 
//# sourceMappingURL=aaa.js.map