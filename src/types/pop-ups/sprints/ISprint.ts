import { Itask } from "./ITask";

export interface ISprint{
    id?:string;
    name:string;
    beginLine:string;
    deadLine:string;
    tasks:Itask[];
}