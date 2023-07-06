export interface AddProductFacadaInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    salesPrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export interface CheckStockFacadeOutputDto {
    productId: string;
    stock: number;
}

export default interface ProductAdmFacadeInterface {

    addProduct(input: AddProductFacadaInputDto): Promise<void>;

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;

}