import Id from "../../../_shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../_shared/usecase/use-case.interface";
import Address from "../../domain/address.vo";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

const product1 = new Product({
    id: new Id("1"),
    name: "monitor",
    price: 750
});
const product2 = new Product({
    id: new Id("2"),
    name: "teclado",
    price: 250
});
const address = new Address("av 1", "0", "casa", "toledo", "pr", "0000000");

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: address,
            items: [product1, product2],
        };

        const invoice = new Invoice(props);
        await this._invoiceRepository.generate(invoice);
        
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map( (item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total
        };
    }

}