import { Connection } from "typeorm";
import { PetCategory } from "../entities/PetCategory";


export async function seedCategories(con: Connection) {
    const categorieNames = [
        { id: 1, name: 'cat' },
        { id: 2, name: 'dog' },
        { id: 3, name: 'bird' }
    ]

    let promiseActions = categorieNames.map((category) => {
        const petCategory = new PetCategory();
        for (let key of Object.keys(category)) {
            petCategory[key] = category[key];
        }
        return con.manager.save(petCategory);
    });
    try {
        await Promise.all(promiseActions)
    }
    catch(error) {
        console.log(error);
    }
}


