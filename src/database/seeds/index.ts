import { Connection } from "typeorm";
import { seedCategories } from "./seedCategories";
import { seedPets } from "./seedPets";
import { seedUsers } from "./seedUsers";


export async function seedDB(con: Connection) {
    await seedCategories(con);
    await seedUsers(con);
    await seedPets(con);
}

