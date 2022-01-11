import * as express from 'express';
import {PetService} from '../services';
import {CustomResponse} from '../utils';


export class PetController {

    static async addBid(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const result = await PetService.addBid({ userId: Number(req.headers['user-id']), bid: Number(req.body.bid), petId: Number(req.params.petId) })
            const response = new CustomResponse(res);
            response.success({code: 201}).send({ result });
        } catch (error) {
            next(error);
        }
    }

    static async listBids(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const result = await PetService.listBids({ userId: Number(req.headers['user-id']), petId: Number(req.params.petId) });
            const response = new CustomResponse(res);
            response.success({code: 200}).send({ result });
        } catch (error) {
            next(error);
        }
    }

    static async listWinners(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const result = await PetService.listWinners({ userId: Number(req.headers['user-id']), petId: Number(req.params.petId) });
            const response = new CustomResponse(res);
            response.success({code: 200}).send({ result });
        } catch (error) {
            next(error);
        }
    }
}