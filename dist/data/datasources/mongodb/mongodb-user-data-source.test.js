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
const mongodb_user_datasource_1 = __importDefault(require("../../../../src/data/datasources/mongodb/mongodb-user.datasource"));
describe("MongoDB DataSource", () => {
    let mockDatabase;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockDatabase = {
            count: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            join: jest.fn(),
        };
    }));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("getAll", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new mongodb_user_datasource_1.default(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }]));
        const result = yield ds.getAll(1, 10);
        expect(mockDatabase.find).toHaveBeenCalledWith({});
        expect(result).toStrictEqual([{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }]);
    }));
    test("create", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new mongodb_user_datasource_1.default(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }));
        const result = yield ds.createOne({ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() });
        expect(result).toStrictEqual(true);
    }));
});
