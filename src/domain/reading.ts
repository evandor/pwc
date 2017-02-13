export class Reading {
  
    weight: number;
    date:   string; 

    constructor (weight?: number, date?:string) {
        this.weight=weight;
        this.date=date;
    }
}