// TypeScript file
//自增ID
class IdUitl {
    public static curId: number=10000;
    public constructor(){

    }

    public static getId() : string{
        IdUitl.curId++;
        return IdUitl.curId.toString();
    }
}