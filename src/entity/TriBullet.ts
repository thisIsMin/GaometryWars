// TypeScript file
//三角子弹
class TriBullet extends Bullet{

    private hostile:Entity;
    public constructor(id:string,producer:Entity,pos:number,isFriendly:boolean,x:number,y:number) {
        super(Bullet.TYPE_TRIANGLE,id,producer,pos,isFriendly,x,y);
        this.initData();
    }

    protected initData(){
        //super.initData();
        // private speed:number=0;//速度 秒为单位
        // protected life:number=0;
        // protected attack:number=0;

        this.setspeed(90);
        this.life=1;
        this.attack=1;
        this.maxLifeTime=15000;
    }

    protected draw(){
        //绘制圆子弹
        this.width=10;
            this.height=10;
            this.graphics.lineStyle(2,this.color);
            this.graphics.moveTo(this.width/2,this.height/2);
            this.graphics.lineTo(0,-this.height/2);
            this.graphics.lineTo(-this.width/2,this.height/2);
            this.graphics.lineTo(this.width/2,this.height/2);
            this.graphics.endFill();
    }
    protected initChild(){}

    // public go(pass:number){//

        
    //     //跟踪
    //     if(this.hostile!=null){
    //         //改变方向
    //         let x=this.hostile.x-this.x;
    //         let y=this.hostile.y-this.y;
    //         let tan=y/x;
    //         let pos=Math.atan(tan);
    //         if(this.isFriendly){
    //             //友方
    //             if(pos<=Math.PI/2 || pos >=Math.PI*3/2){
    //                 this.setPosition(pos);
    //             }
    //         }else{
    //             if(pos>=Math.PI/2 && pos <=Math.PI*3/2){
    //                 this.setPosition(pos);
    //             }
    //         }

    //     }
    //     super.go(pass)
    // }

    protected moveRun(pass: number) {
        //跟踪
        if(this.hostile!=null && !this.hostile.getIsDie()){
            //改变方向
            let x=this.hostile.x-this.x;
            let y=this.hostile.y-this.y;
            let tan=y/x;
            var pos=0;
            if(y == 0 && x==0){
               pos=0;
            }else{
              if(y>=0){
              pos=Math.acos(x/Math.sqrt(Math.pow(x,2)+ Math.pow(y,2)));
              }else{
              pos= - Math.acos(x/Math.sqrt(Math.pow(x,2)+ Math.pow(y,2)));
              
          }
      }
            
            if(this.isFriendly){
                //友方
                if(Math.abs(pos)<=Math.PI/2 || pos >=Math.PI*3/2){
                    this.setPosition(pos);
                }
            }else{
                if(Math.abs(pos)>=Math.PI/2 && pos <=Math.PI*3/2){
                    this.setPosition(pos);
                }
            }

        }
        this.move(pass);
    }

    public setHostile(entity:Entity){
        this.hostile=entity;
    }
}