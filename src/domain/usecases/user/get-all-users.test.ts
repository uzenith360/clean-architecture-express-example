import UserEntity from "../../../../src/domain/entities/user.entity";
import UserRepositoryInterface from "../../../../src/domain/interfaces/repositories/user.repository.interface";
import GetAllUsersUsecase from '../../../../src/domain/usecases/user/get-all-users.usecase';

describe("Get All Users Use Case", () => {

    class MockUserRepository implements UserRepositoryInterface {
        updateUser(id: string, user: Partial<UserEntity>): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        deleteUser(id: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        getUser(id: string): Promise<UserEntity> {
            throw new Error("Method not implemented.");
        }
        createUser(user: UserEntity): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        getUsers(): Promise<UserEntity[]> {
            throw new Error("Method not implemented.");
        }
    }
    let mockUserRepository: UserRepositoryInterface;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository()
    })

    test("should return data", async () => {
        const ExpectedResult = [{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }]

        jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getAllUsersUse = new GetAllUsersUsecase(mockUserRepository)
        const result = await getAllUsersUse.execute(1, 10);
        expect(result).toStrictEqual(ExpectedResult)

    });

})