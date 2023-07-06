import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
    static create() {
       const checkoutGateway = new CheckoutRepository();
       const placeOrderUseCase = new PlaceOrderUseCase(ClientAdmFacadeFactory.create(),
        ProductAdmFacadeFactory.create(), StoreCatalogFacadeFactory.create(),
        checkoutGateway, InvoiceFacadeFactory.create(), PaymentFacadeFactory.create());

       const facade = new CheckoutFacade(placeOrderUseCase);
       return facade;
    }
}