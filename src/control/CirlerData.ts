// TypeScript file
class CirlerData {
    public x:number;
    public y:number;
    public r:number
    public constructor(x? :number,y? : number, r? : number){
        this.x=x;
        this.y=y;
        this.r=r;
    }

    public intersects(cd : CirlerData) : boolean{
        let x=this.x-cd.x;
        let y=this.y- cd.y;
        let dis=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        if(dis<=(this.r+cd.r)){
            return true;
        }
        return false;
    }
}