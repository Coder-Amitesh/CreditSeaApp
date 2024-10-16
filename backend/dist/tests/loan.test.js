"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app")); // Adjusted path
// Adjust the import based on your app structure
describe('Loan API', () => {
    let loanId; // Variable to store the ID of the created loan for further tests
    it('should return all loans', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/loans');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should create a new loan', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/loans')
            .send({ amount: 1000, interestRate: 5 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.amount).toBe(1000);
        expect(res.body.interestRate).toBe(5);
        loanId = res.body.id; // Store the ID for later tests
    }));
    it('should get a loan by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/loans/${loanId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', loanId);
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('interestRate');
    }));
    it('should update an existing loan', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/loans/${loanId}`)
            .send({ amount: 1200, interestRate: 4.5 });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', loanId);
        expect(res.body.amount).toBe(1200);
        expect(res.body.interestRate).toBe(4.5);
    }));
    it('should delete a loan', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/loans/${loanId}`);
        expect(res.status).toBe(204); // No Content status
        // Verify that the loan is deleted
        const getRes = yield (0, supertest_1.default)(app_1.default).get(`/loans/${loanId}`);
        expect(getRes.status).toBe(404); // Not Found status
    }));
    it('should return 404 for non-existent loan', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/loans/999999'); // Assuming this ID does not exist
        expect(res.status).toBe(404);
    }));
    // Add more tests for other edge cases or functionality if needed...
});
