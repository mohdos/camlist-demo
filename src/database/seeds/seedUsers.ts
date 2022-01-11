

import { Connection } from "typeorm";
import { User } from "../entities/User";


export async function seedUsers(con: Connection) {
    const users = [
        { id: 1, email: 'test1@email.com', username: 'test1', firstName: 'test', lastName: 'user1', phone: '+201001001001', status: 0 },
        { id: 2, email: 'test2@email.com', username: 'test2', firstName: 'test', lastName: 'user2', phone: '+201001001002', status: 0 },
        { id: 3, email: 'john@email.com', username: 'johndoe', firstName: 'John', lastName: 'Doe', phone: '+201001001003', status: 0 },
        { id: 4, email: 'jsmith@email.com', username: 'john_smith', firstName: 'John', lastName: 'Smith', phone: '+201001001004', status: 0 },
        { id: 5, email: 'sara@email.com', username: 'sara', firstName: 'Sara', lastName: 'Connor', phone: '+201001001005', status: 0 },
        { id: 6, email: 'martin@email.com', username: 'martin', firstName: 'Martin', lastName: 'Fowler', phone: '+201001001006', status: 0 },
    ]

    let promiseActions = users.map((user) => {
        const userRecord = new User();
        for (let key of Object.keys(user)) {
            userRecord[key] = user[key];
        }
        return con.manager.save(userRecord);
    });
    try {
        await Promise.all(promiseActions)
    }
    catch(error) {
        console.log(error);
    }
}

