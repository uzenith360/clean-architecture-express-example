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
const create_user_usecase_1 = __importDefault(require("../../../../src/domain/usecases/user/create-user.usecase"));
describe("Create User Use Case", () => {
    class MockUserRepository {
        updateUser(id, user) {
            throw new Error("Method not implemented.");
        }
        deleteUser(id) {
            throw new Error("Method not implemented.");
        }
        getUser(id) {
            throw new Error("Method not implemented.");
        }
        createUser(user) {
            throw new Error("Method not implemented.");
        }
        getUsers() {
            throw new Error("Method not implemented.");
        }
    }
    let mockUserRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });
    test("should return true", () => __awaiter(void 0, void 0, void 0, function* () {
        const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() };
        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true));
        const createUserUseCase = new create_user_usecase_1.default(mockUserRepository);
        const result = yield createUserUseCase.execute(InputData);
        expect(result).toBe(true);
    }));
});
