import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false
})
export class ProductModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({allowNull: true})
    purchasePrice: number;

    @Column({allowNull: true})
    stock: number;

    @Column({allowNull: true})
    createdAt: Date;

    @Column({allowNull: true})
    updatedAt: Date;

    // para resolver o problema de ter esse atributo sem precisar fazer as migrations usando o umzug
    // em minha opiniao ter dois models apontando para a mesma tabela nao eh correto
    // minha sugestao seria ter uma tabela products_sales com o id do produto e o salesPrice
    @Column({allowNull: true})
    salesPrice: number;
}