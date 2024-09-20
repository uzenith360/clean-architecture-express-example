import UserDatasourceInterface from "../../data/interfaces/datasources/user.datasource.interface";
import UserEntity from "../entities/user.entity";
import UserRepositoryInterface from "../interfaces/repositories/user.repository.interface";
import UserRepository from "./user.repository";
import UserModel from "../../data/datasources/mongodb/models/user.model";

class MockUserDataSource implements UserDatasourceInterface {
    getOne(id: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
    _mapEntityToData(user: UserEntity): UserModel {
        throw new Error("Method not implemented.");
    }
    _mapDataToEntity(user: UserModel): UserEntity {
        throw new Error("Method not implemented.");
    }
    updateOne(id: string, user: Partial<UserEntity>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createOne(user: UserEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
}

describe("User Repository", () => {
    let mockUserDataSource: UserDatasourceInterface;
    let userRepository: UserRepositoryInterface

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserDataSource = new MockUserDataSource()
        userRepository = new UserRepository(mockUserDataSource)
    })

    describe("getAllUsers", () => {
        test("should return data", async () => {
            const expectedData = [{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }]
            jest.spyOn(mockUserDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await userRepository.getUsers(1, 10);
            expect(result).toBe(expectedData)
        });
    })

    describe("createUser", () => {
        test("should return true", async () => {
            const inputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }
            jest.spyOn(mockUserDataSource, "createOne").mockImplementation(() => Promise.resolve(true))
            const result = await userRepository.createUser(inputData);
            expect(result).toBe(true)
        });
    })

})
