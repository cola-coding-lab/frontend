import { account, User } from './user';

export const USERS: User[] = [
  {
    id: '1',
    userName: 'Jenny',
    eMail: 'jenny@muster.at',
    password: 'encrypted',
    account: account.STUDENT,
    school: 'Neue Mittelschule Kapfenberg',
    location: 'Kapfenberg',
    startedWorkshops: [
      { title: 'Flappy Bird', lesson: 2, step: 1 },
      { title: 'Paint', lesson: 1, step: 2 },
    ],
    finishedWorkshops: [{title: 'Paint'}],
    achievedXp: 200,
    codingTime: 150,
  },
];

