export class Reading {
  
    public weight: number;
    public date:   string; 

    constructor (weight?: number, date?:string) {
        this.weight=weight;
        this.date=date;
    }
}