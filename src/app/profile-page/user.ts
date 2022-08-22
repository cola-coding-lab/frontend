export interface User{
    id: string;
    userName: string;
    eMail: string;
    password: string;
    account: string;
    school: string;
    location: string;
    startedWorkshops: startedWorkshops[];
    finishedWorkshops: string[];
    xp: number;
    codingTime: string[];
}

export enum account {
    ADMIN,
    TEACHER,
    STUDENT
}

export interface startedWorkshops{
    // id: string;
    title: string;
    lesson: number;
    step: number;
}