// TypeScript file
class ChangeGaoEvent extends egret.Event{
    public static EVENT_ROULETTECHANGE:string="event_changegaoevent"
    public i:number=0;
    public constructor(i: number) {
        super(ChangeGaoEvent.EVENT_ROULETTECHANGE);
        this.i=i;
    }


}