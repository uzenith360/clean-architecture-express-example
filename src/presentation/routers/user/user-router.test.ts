
import request from "supertest";
import UserEntity from "../../../domain/entities/user.entity";
import CreateUserUsecaseInterface from "../../../domain/interfaces/usecases/user/create-user.usecase.interface";
import GetAllUsersUsecaseInterface from "../../../domain/interfaces/usecases/user/get-all-users.usecase.interface";
import UserRouter from '../../../presentation/routers/user/user.router'
import server from '../../../server'
import DeleteUserUsecase from "../../../domain/usecases/user/delete-user.usecase";
import GetUserUsecase from "../../../domain/usecases/user/get-user.usecase";
import UpdateUserPasswordUsecase from "../../../domain/usecases/user/update-user-password.usecase";
import UpdateUserProfileUsecase from "../../../domain/usecases/user/update-user-profile.usecase";

class MockGetAllUsersUseCase implements GetAllUsersUsecaseInterface {
    execute(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.")
    }
}

class MockCreateUserUseCase implements CreateUserUsecaseInterface {
    execute(user: UserEntity): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

describe("User Router", () => {
    let mockCreateUserUseCase: CreateUserUsecaseInterface;
    let mockGetAllUsersUseCase: GetAllUsersUsecaseInterface;
    let mockDeleteUserUsecase: DeleteUserUsecase;
    let mockGetUserUsecase: GetUserUsecase;
    let mockUpdateUserPasswordUsecase: UpdateUserPasswordUsecase;
    let mockUpdateUserProfileUsecase: UpdateUserProfileUsecase;

    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase()
        mockCreateUserUseCase = new MockCreateUserUseCase()
        server.use("/user", UserRouter(mockGetAllUsersUseCase, mockCreateUserUseCase, mockDeleteUserUsecase, mockGetUserUsecase, mockUpdateUserPasswordUsecase, mockUpdateUserProfileUsecase))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /user", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }];
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData as unknown as UserEntity[]))

            const response = await request(server).get("/user")

            expect(response.status).toBe(200)
            expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)

        });

        test("GET /user returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/user")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("POST /user", () => {

        test("POST /user", async () => {
            const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/user").send(InputData)
            expect(response.status).toBe(201)
        });

        test("POST /user returns 500 on use case error", async () => {
            const InputData = { id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/user").send(InputData)
            expect(response.status).toBe(500)
        });
    })

})
