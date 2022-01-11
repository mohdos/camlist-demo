

import { Connection } from "typeorm";
import { Pet } from "../entities/Pet";


export async function seedPets(con: Connection) {
    const pets = [
        { id: 1, name: 'Snowshoe', category: {id: 1}, owner: {id: 1} },
        { id: 2, name: 'Calico', category: {id: 1}, owner: {id: 1} },
        { id: 3, name: 'Persian', category: {id: 1}, owner: {id: 1} },
        { id: 4, name: 'German', category: {id: 2}, owner: {id: 2} },
        { id: 5, name: 'Husky', category: {id: 2}, owner: {id: 1} },
    ]

    let promiseActions = pets.map((pet) => {
        const petRecord = new Pet();
        for (let key of Object.keys(pet)) {
            petRecord[key] = pet[key];
        }
        return con.manager.save(petRecord);
    });
    try {
        await Promise.all(promiseActions)
    }
    catch(error) {
        console.log(error);
    }
}

