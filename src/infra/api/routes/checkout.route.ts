import express, { Request, Response } from 'express';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory';

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
    const facade = CheckoutFacadeFactory.create();
    try {
        const orderDto = {
            clientId: req.body.clientId,
            products: req.body.products
        };
        const output = await facade.addOrder(orderDto);
        res.send(output);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});