import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'Esdras', email: 'esdras@lonewolfcorp.com', password: '1234', techs: [
            'Javascript',
            'Node',
            {
                title: 'Node.js',
                experience: 50
            },
            {
                title: 'ReactJS',
                experience: 50
            }
        ]
    })
    return response.json({ message: 'Hello World' })
};