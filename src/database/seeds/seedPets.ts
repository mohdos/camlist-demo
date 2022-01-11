import { dbCollections, firestore } from "../../config";


export async function seedPets() {
    const pets = [
        { id: 1, name: 'Snowshoe', category: 'cat', ownerId: 1 },
        { id: 2, name: 'Calico', category: 'cat', ownerId: 1 },
        { id: 3, name: 'Persian', category: 'cat', ownerId: 1 },
        { id: 4, name: 'German', category: 'dog', ownerId: 2 },
        { id: 5, name: 'Husky', category: 'dog', ownerId: 1 },
    ]

    let promiseActions = pets.map((pet) => {
        return firestore.collection(dbCollections.PETS).doc(`${pet.id}`).set(pet, {merge: true});
    });
    try {
        await Promise.all(promiseActions)
    }
    catch(error) {
        console.log(error);
    }
}

