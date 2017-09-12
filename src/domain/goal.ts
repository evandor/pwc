export class Goal {

    private targetWeight: number;
    private date: string;

    constructor(targetWeight?: number, date?: string) {
        this.targetWeight = targetWeight;
        this.date = date;
    }

    getTargetWeight(){
        return this.targetWeight;
    }

    getTargetDate(){
        return this.date;
    }


}