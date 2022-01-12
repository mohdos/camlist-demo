
// import jasmine =  require('jasmine');
import 'jasmine';
import { createConnection, getConnection } from 'typeorm';
import { vars } from '../../config';
import { Bid } from '../../database/entities/Bid';
import { Pet } from '../../database/entities/Pet';
import { PetCategory } from '../../database/entities/PetCategory';
import { User } from '../../database/entities/User';
import { seedDB } from '../../database/seeds';
import { PetService } from '../../services/pet.service';

describe('', () => {
    
    beforeAll(async () => {
        const conn = await createConnection({
            type: "postgres",
            host: vars.postgres.host,
            port: vars.postgres.port,
            username: vars.postgres.username,
            password: vars.postgres.password,
            database: vars.postgres.db,
            entities: [User, Bid, Pet, PetCategory],
            synchronize: true,
            dropSchema: true
        });
        if (!conn) throw Error('Cannot connect to DB');
        await seedDB(conn);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        jasmine.addMatchers({
            toBeIn: (expected) => {
                return {
                    compare: (actual, expected) => {
                        return {
                            pass: expected.some(function(item){ return item === actual; }),
                            message: actual + ' is not in ' + expected
                        }
                    }
                };
            }
        })
    })

    it('Testing create bid with -ve bid', async () => {
        try {
            const result = await PetService.addBid({userId: 4, petId: 5, bid: -100});
            fail('Created trip with -ve bid')
        }
        catch (err: any) {
            expect(err.code).toBeGreaterThanOrEqual(400);
        }
    });

    it('Testing create bid with non existent user', async () => {
        try {
            const result = await PetService.addBid({userId: -4, petId: 5, bid: 100});
            fail('Created trip with non existent user');
        }
        catch (err: any) {
            expect(err.code).toBeGreaterThanOrEqual(400);
        }
    });

    it('Testing create bid with valid info', async () => {
        try {
            const result = await PetService.addBid({userId: 3, petId: 2, bid: 100});
            expect(result.bid).toEqual(100);
            expect(result.pet.id).toEqual(2);
            expect(result.bidder.id).toEqual(3);
        }
        catch (err: any) {
            fail('Error adding bid with valid info')
        }
    });


    it('Testing list bids with non owner', async () => {
        try {
            const result = await PetService.listBids({userId: 5, petId: 2});
            fail('Listed bids for non owner')
        }
        catch (err: any) {
            expect(err.code).toBeGreaterThanOrEqual(400);
        }
    });


    it('Testing list bids with owner', async () => {
        try {
            const result = await PetService.listBids({userId: 1, petId: 2});
            expect(result.bids.length).toEqual(1);
            expect(result.pet.id).toEqual(2);
        }
        catch (err: any) {
            fail('Error adding bid with valid info')
        }
    });
    

})

