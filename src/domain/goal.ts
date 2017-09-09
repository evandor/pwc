export class Goal {
  
    public targetWeight: number;
    public date: string; 

    constructor (targetWeight?: number, date?:string) {
        this.targetWeight=targetWeight;
        this.date=date;
    }
}