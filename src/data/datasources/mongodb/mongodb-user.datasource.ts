import UserDatasourceInterface from "../../interfaces/datasources/user.datasource.interface";
import DatabaseWrapperInterface from "../../interfaces/datasources/database-wrapper.interface";
import UserModel from "./models/user.model";
import UserEntity from "../../../domain/entities/user.entity";
import Utils from "@uzenith360/utils";
import { ObjectId } from "mongodb";

export default class MongoDBUserDatasource extends UserDatasourceInterface {

    private database: DatabaseWrapperInterface
    constructor(database: DatabaseWrapperInterface) {
        super();

        this.database = database
    }

    async createOne(user: UserEntity): Promise<boolean> {
        const result = await this.database.insertOne(MongoDBUserDatasource._mapEntityToData(user));

        return result !== null;
    }

    async getAll(page: number, limit: number): Promise<UserEntity[]> {
        const { toSkip: skip } = Utils.getPaginationParameters(page, limit);

        const users = await this.database.find({ deletedAt: null }, { limit, skip }) as UserModel[];

        return users.map((user) => MongoDBUserDatasource._mapDataToEntity(user));
    }

    async getOne(id: string): Promise<UserEntity | null> {
        const user = await this.database.findOne({ _id: new ObjectId(id), deletedAt: null }) as UserModel | null;

        return user && MongoDBUserDatasource._mapDataToEntity(user);
    }

    async updateOne(id: string, user: Partial<UserEntity>): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $set: MongoDBUserDatasource._mapEntityToData(user as UserEntity) });

        return result !== null;
    }
}
