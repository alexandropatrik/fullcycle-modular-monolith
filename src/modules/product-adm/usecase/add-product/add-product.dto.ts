import Id from "../../../_shared/domain/value-object/id.value-object";

export interface AddProductInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface AddProductOutputDto {
    id: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}