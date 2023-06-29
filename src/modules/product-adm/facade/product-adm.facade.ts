import UseCaseInterface from "../../_shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadaInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockdUseCase: UseCaseInterface;

    constructor (useCaseProps: UseCaseProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockdUseCase = useCaseProps.stockUseCase;

    }

    addProduct(input: AddProductFacadaInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockdUseCase.execute(input);
    }

}