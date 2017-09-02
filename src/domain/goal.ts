export class Goal {
  
    public goal: number;
    public date:   string; 

    constructor (goal?: number, date?:string) {
        this.goal=goal;
        this.date=date;
    }
}