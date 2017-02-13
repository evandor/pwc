export class Reading {
  
    weight: number;
    date:   number; // dd.mm.yyyy

    constructor (weight?: number, date?:number) {
        this.weight=weight;
        this.date=date;
    }
}