import Id from "../../_shared/domain/value-object/id.value-object";

export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: Id;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}