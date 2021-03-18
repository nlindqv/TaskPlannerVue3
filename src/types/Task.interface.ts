
export interface ITask {
    id: number;
    text: string;
    creationDate: Date;
    completed: boolean;
    endDate?: Date;
    category: string;
    selected: boolean;
}