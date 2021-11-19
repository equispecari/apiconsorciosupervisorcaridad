interface IDia {
    inicio: string;
    fin: string;
    active: boolean;
}
interface IHorario {
    0: IDia;
    1: IDia;
    2: IDia;
    3: IDia;
    4: IDia;
    5: IDia;
    6: IDia;
}
export declare class HoursOfAttention {
    static getNewHour(horario: IHorario): string;
    static nextDay(horario: IHorario, day: number): [string | null, number];
}
export {};
