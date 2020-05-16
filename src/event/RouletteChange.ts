// TypeScript file
class RouletteChange extends egret.Event{
    public static EVENT_ROULETTECHANGE:string="event_roulettechange"
    public m_position:egret.Point;
    public constructor(type:string , point:egret.Point) {
        super(type);
        this.m_position=point;
    }
}