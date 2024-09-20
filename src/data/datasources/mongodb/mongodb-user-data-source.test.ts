import MongoDBUserDatasource from '../../../../src/data/datasources/mongodb/mongodb-user.datasource'
import DatabaseWrapperInterface from '../../../../src/data/interfaces/datasources/database-wrapper.interface';

describe("MongoDB DataSource", () => {

    let mockDatabase: DatabaseWrapperInterface

    beforeAll(async () => {
        mockDatabase = {
            count: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            join: jest.fn(),
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBUserDatasource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }]))
        const result = await ds.getAll(1, 10);
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual([{ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() }])
    })


    test("create", async () => {
        const ds = new MongoDBUserDatasource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }))
        const result = await ds.createOne({ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ id: "1", lastName: "Smith", firstName: "John", email: "john@gmail.com", department: "finance", designation: "finance manager", isAdmin: false, hash: "", dateAdded: new Date().toISOString(), dateLastActive: new Date().toISOString() })
        expect(result).toStrictEqual(true)
    })

})
