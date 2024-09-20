import UserEntity from "../../../../src/domain/entities/user.entity";
import UserRepositoryInterface from "../../../../src/domain/interfaces/repositories/user.repository.interface";
import CreateUserUsecase from '../../../../src/domain/usecases/user/create-user.usecase';

describe("Create User Use Case", () => {
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

    test("should return true", async () => {
        const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }

        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true))
        const createUserUseCase = new CreateUserUsecase(mockUserRepository)
        const result = await createUserUseCase.execute(InputData);
        expect(result).toBe(true)

    });

})