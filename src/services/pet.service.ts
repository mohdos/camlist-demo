import { dbCollections, firestore } from "../config";
import { errorManager } from "../config/errorManager";
import {CustomError} from "../utils";

export class PetService {
    /**
     * @throws
     * @async
     * Adds a new bid for a specific pet
     * @param __namedParameters.userId id of the user to bid
     * @param __namedParameters.petId id of the pet to bid for
     * @param __namedParameters.bid bid amount
     * 
     * @returns the newly created bid if successful
     */
    static async addBid({userId, petId, bid}: {userId: number, petId: number, bid: number})
    {
        const pet = await firestore.collection(dbCollections.PETS).doc(`${petId}`).get();
        if (!pet) {
            throw new CustomError({...errorManager.NOT_FOUND});
        }
        else if (pet.get('ownerId') == userId) {
            throw new CustomError({...errorManager.OWNER_IS_BIDDER});
        }

        const bidObject = {bid, petId, userId};
        await firestore.runTransaction(async (transaction) => {
            const maxBidDoc = await transaction.get(firestore.collection(dbCollections.BIDS).where('petId', '==', petId).orderBy('bid', 'desc').limit(1));
            const currentBid = (maxBidDoc && maxBidDoc.docs && maxBidDoc.docs.length) ? maxBidDoc.docs[0].get('bid') : 0;
            if (bid <= currentBid) {
                throw new CustomError({...errorManager.LOW_BID, message: `Your bid must be larger than the current bid for the pet (${bid})`});
            }

            const newBid = transaction.set(firestore.collection(dbCollections.BIDS).doc(`${userId}:${petId}`), {bid, petId, userId})
            
            return newBid;
        });
        return bidObject;
    }

    /**
     * @throws
     * @async
     * List the bids for a specific pet
     * @param __namedParameters.userId id of the user requesting to list the bids
     * @param __namedParameters.petId id of the pet to list bids for
     * @param __namedParameters.limit maximum number of bids to be listed (for pagination)
     * @param __namedParameters.page page number (for pagination)
     * 
     * @returns the list of bids for the pet along with the pet information
     */
    static async listBids({userId, petId, limit=10, page=1}: {userId: number, petId: number, limit?: number, page?: number}) {
        const petInfo = await firestore.collection(dbCollections.PETS).doc(`${petId}`).get();
        // const petInfo = await Pet.findOne({where: {id: petId, owner: {id: userId}}, relations: ['category']});
        if (!petInfo || petInfo.get('ownerId') != userId) { throw new CustomError({...errorManager.UNAUTHORIZED}) }
        
        const bids = await firestore.collection(dbCollections.BIDS).where('petId', '==', petId).orderBy('bid', 'desc').offset((page - 1) * limit).limit(limit).get();
        return {bids: bids.docs.map(doc => doc.data()), pet: petInfo.data()};
    }

    /**
     * @throws
     * @async
     * List bid winners according to Generalized second price auction
     * @param __namedParameters.userId id of the user requesting to list the winners (pet owners only)
     * @param __namedParameters.petId id of the pet to list winners for
     * 
     * @returns the list of winners for the bid on the provided petId
     */
    static async listWinners({userId, petId}: {userId: number, petId: number}) {
        const petInfo = await firestore.collection(dbCollections.PETS).doc(`${petId}`).get();
        if (!petInfo || petInfo.get('ownerId') != userId) { throw new CustomError({...errorManager.UNAUTHORIZED}) }

        const bidsDocs = await firestore.collection(dbCollections.BIDS).where('petId', '==', petId).orderBy('bid', 'desc').get();
        const bidsData = bidsDocs.docs.map((value) => value.data());

        if (!bidsData || bidsData.length == 0) {
            return 'No Winners';
        }
        const bidsDataSorted = bidsData.sort((a, b) => {
            if (a.bid != b.bid) { return b.bid - a.bid }
            return (a.firstName + a.lastName) > (b.firstName + b.lastName) ? 1 : -1
        });

        let results = bidsDataSorted.slice(1).reduce((prev: any[], current) => {
            let prevCorrected = [...prev];
            prevCorrected[prevCorrected.length - 1]['Paid in USD'] = current.bid;
            return [...prevCorrected, current];
        }, [bidsDataSorted[0]])
        
        if (results.length > 1) {
            results[results.length - 1]['Paid in USD'] = 'Lost the auction'
        }
        else {
            results[0]['Paid in USD'] = 0;
        }
        return results.map(result => {return {...result, bid: undefined}});
    }
}

