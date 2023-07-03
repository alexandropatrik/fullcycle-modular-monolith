import UseCaseInterface from "../../_shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findUseCase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._generateUseCase = props.generateUseCase;
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return await this._generateUseCase.execute(input);
    }

}