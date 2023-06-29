import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-usecase/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-usecase/generate-invoce.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const findUseCase = new FindInvoiceUseCase(repository);
        const facade = new InvoiceFacade( {
            generateUseCase: generateUseCase,
            findUseCase: findUseCase
        });
        return facade;
    }
}