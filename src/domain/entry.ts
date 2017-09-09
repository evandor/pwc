export class Entry {
  
    public weight: number;
    public date:   string;
    public time:   string; 

    constructor (weight?: number, date?:string, time?:string) {
        this.weight=weight;
        this.date=date;
        this.time=time;
    }
}