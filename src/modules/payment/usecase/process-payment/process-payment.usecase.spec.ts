import Id from "../../../_shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved"
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transactionDeclined = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined"
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
    }
}

describe("process payment usecase unit test", () => {

    it ("should approve a transaction", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 100
        }
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe(transaction.status);
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.createdAt).toEqual(transaction.createdAt);
        expect(result.updatedAt).toEqual(transaction.updatedAt);
    })

    it ("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50
        }
        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe(transactionDeclined.status);
        expect(result.amount).toBe(transactionDeclined.amount);
        expect(result.orderId).toBe(transactionDeclined.orderId);
        expect(result.createdAt).toEqual(transactionDeclined.createdAt);
        expect(result.updatedAt).toEqual(transactionDeclined.updatedAt);
    })

});