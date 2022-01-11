import { errorManager } from "../config/errorManager";
import CustomError from "../utils/customError";
import { Bid } from "../database/entities/Bid";
import { getConnection } from "typeorm";
import { Pet } from "../database/entities/Pet";

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
        const petOwner = await Pet.findOne({where: {id: petId, owner: {id: userId}}});
        if (petOwner) {
            throw new CustomError({...errorManager.OWNER_IS_BIDDER});
        }
        return await getConnection().transaction(async (transactionalManager) => {
            let queryBuilder = transactionalManager.createQueryBuilder(Bid, 'bids');
            queryBuilder = queryBuilder.select('max(bids.bid)');
            queryBuilder = queryBuilder.where({pet: petId})
            const result = await queryBuilder.getRawOne();
            const currentBid = result.max || 0;
            if (bid <= currentBid) {
                throw new CustomError({...errorManager.LOW_BID, message: `Your bid must be larger than the current bid for the pet (${bid})`});
            }
            
            const newBid = await transactionalManager.save(Bid, {
                bid,
                pet: {
                    id: petId
                },
                bidder: {
                    id: userId
                }
            });
            return newBid;
        })
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
        const petInfo = await Pet.findOne({where: {id: petId, owner: {id: userId}}, relations: ['category']});
        if (!petInfo) { throw new CustomError({...errorManager.UNAUTHORIZED}) }
        
        const bids = await Bid.find({
            where: {
                pet: {
                    id: petId
                }
            },
            order: {
                bid: "DESC"
            },
            relations: ['bidder'],
            take: limit,
            skip: (page - 1) * limit
        });
        return {bids, pet: petInfo};
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
        const petInfo = await Pet.findOne({where: {id: petId, owner: {id: userId}}});
        if (!petInfo) { throw new CustomError({...errorManager.UNAUTHORIZED}) }

        let queryBuilder = Bid.createQueryBuilder();
        queryBuilder = queryBuilder.select(['u.firstName "firstName"', 'u.lastName "lastName"', 'COALESCE(LEAD(bid, 1) OVER (PARTITION BY "pet_id" ORDER BY bid desc, u.firstName ASC, u.lastName ASC), 0) "Paid in USD"']);
        queryBuilder = queryBuilder.innerJoin('user', 'u', 'u.id = "bidder_id"');
        queryBuilder = queryBuilder.where('"pet_id"=:petId', {petId}).orderBy('bid', 'DESC');
        
        let results = await queryBuilder.getRawMany();
        if (results && results.length) {
            if (results.length > 1) {
                results[results.length - 1]['Paid in USD'] = 'Lost the auction'
            }
        }
        else {
            return 'No Winners';
        }
        return results;
    }

}

