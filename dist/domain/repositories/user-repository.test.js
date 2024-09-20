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
const user_repository_1 = __importDefault(require("./user.repository"));
class MockUserDataSource {
    getOne(id) {
        throw new Error("Method not implemented.");
    }
    _mapEntityToData(user) {
        throw new Error("Method not implemented.");
    }
    _mapDataToEntity(user) {
        throw new Error("Method not implemented.");
    }
    updateOne(id, user) {
        throw new Error("Method not implemented.");
    }
    deleteOne(id) {
        throw new Error("Method not implemented.");
    }
    createOne(user) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
}
describe("User Repository", () => {
    let mockUserDataSource;
    let userRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUserDataSource = new MockUserDataSource();
        userRepository = new user_repository_1.default(mockUserDataSource);
    });
    describe("getAllUsers", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedData = [{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }];
            jest.spyOn(mockUserDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData));
            const result = yield userRepository.getUsers(1, 10);
            expect(result).toBe(expectedData);
        }));
    });
    describe("createUser", () => {
        test("should return true", () => __awaiter(void 0, void 0, void 0, function* () {
            const inputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() };
            jest.spyOn(mockUserDataSource, "createOne").mockImplementation(() => Promise.resolve(true));
            const result = yield userRepository.createUser(inputData);
            expect(result).toBe(true);
        }));
    });
});
