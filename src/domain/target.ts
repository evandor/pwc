export class Target {
  
    public target: number;
    public date:   string; 

    constructor (target?: number, date?:string) {
        this.target=target;
        this.date=date;
    }
}