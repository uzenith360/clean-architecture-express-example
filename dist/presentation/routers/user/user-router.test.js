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
const user_router_1 = __importDefault(require("../../../presentation/routers/user/user.router"));
const server_1 = __importDefault(require("../../../server"));
class MockGetAllUsersUseCase {
    execute() {
        throw new Error("Method not implemented.");
    }
}
class MockCreateUserUseCase {
    execute(user) {
        throw new Error("Method not implemented.");
    }
}
describe("User Router", () => {
    let mockCreateUserUseCase;
    let mockGetAllUsersUseCase;
    let mockDeleteUserUsecase;
    let mockGetUserUsecase;
    let mockUpdateUserPasswordUsecase;
    let mockUpdateUserProfileUsecase;
    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
        mockCreateUserUseCase = new MockCreateUserUseCase();
        server_1.default.use("/user", (0, user_router_1.default)(mockGetAllUsersUseCase, mockCreateUserUseCase, mockDeleteUserUsecase, mockGetUserUsecase, mockUpdateUserPasswordUsecase, mockUpdateUserProfileUsecase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("GET /user", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }];
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).get("/user");
            expect(response.status).toBe(200);
            expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /user returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).get("/user");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" });
        }));
    });
    describe("POST /user", () => {
        test("POST /user", () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() };
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.resolve(true));
            const response = yield (0, supertest_1.default)(server_1.default).post("/user").send(InputData);
            expect(response.status).toBe(201);
        }));
        test("POST /user returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() };
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).post("/user").send(InputData);
            expect(response.status).toBe(500);
        }));
    });
});
