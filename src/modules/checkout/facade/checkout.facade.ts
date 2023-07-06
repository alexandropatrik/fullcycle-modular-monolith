import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {

    private _placeOrderUseCase: PlaceOrderUseCase;

    constructor(placeOrderUseCase: PlaceOrderUseCase) {
        this._placeOrderUseCase = placeOrderUseCase;
    }

    async addOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return await this._placeOrderUseCase.execute(input);
    }



}