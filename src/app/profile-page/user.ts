export interface User{
    id: string;
    userName: string;
    eMail: string;
    password: string;
    account: account;
    school: string;
    location: string;
    startedWorkshops: startedWorkshops[];
    finishedWorkshops: finishedWorkshops[];
    achievedXp: number;
    codingTime: number;
}

export enum account {
    ADMIN = "Admin",
    TEACHER = "Lehrer",
    STUDENT = "Schüler",
}

// export interface workshop {
//         // id: string;
//         title: string;
// }
export interface startedWorkshops{
    // workshop.id;
    // workshop.title;
    title: string;
    lesson: number;
    step: number;
}

export interface finishedWorkshops{
    // workshop.title;
    title: string;
}