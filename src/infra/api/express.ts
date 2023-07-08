import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/product.route";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { clientsRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { ProductModel as ProductCatalogModel } from "../../modules/store-catalog/repository/product.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import { OrderItemModel } from "../../modules/checkout/repository/order-item.model";
import { invoiceRoute } from "./routes/invoice.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    })
    sequelize.addModels([ProductModel, ProductCatalogModel, ClientModel, OrderModel, OrderItemModel, InvoiceModel, InvoiceItemModel, TransactionModel]);
    sequelize.sync( {force: true} );

}
setupDb();