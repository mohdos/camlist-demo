import { seedPets } from "./seedPets";
import { seedUsers } from "./seedUsers";


export async function seedDB() {
    await seedUsers();
    await seedPets();
}

