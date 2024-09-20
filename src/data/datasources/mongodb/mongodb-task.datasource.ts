import TaskDatasourceInterface from "../../interfaces/datasources/task.datasource.interface";
import DatabaseWrapperInterface from "../../interfaces/datasources/database-wrapper.interface";
import TaskModel from "./models/task.model";
import TaskEntity from "../../../domain/entities/task.entity";
import Utils from "@uzenith360/utils";
import { ObjectId } from "mongodb";

export default class MongoDBTaskDatasource extends TaskDatasourceInterface {

    private database: DatabaseWrapperInterface
    constructor(database: DatabaseWrapperInterface) {
        super();

        this.database = database
    }

    async createOne(task: TaskEntity): Promise<boolean> {
        const result = await this.database.insertOne(MongoDBTaskDatasource._mapEntityToData(task));

        return result !== null;
    }

    async getAll(projectId: string, page: number, limit: number): Promise<TaskEntity[]> {
        const { toSkip: skip } = Utils.getPaginationParameters(page, limit);

        const tasks = await this.database.find({ projectId: new ObjectId(projectId) }, { limit, skip }) as TaskModel[];

        return tasks.map((task: TaskModel) => MongoDBTaskDatasource._mapDataToEntity(task));
    }

    async getOne(id: string): Promise<TaskEntity | null> {
        const task = await this.database.findOne({ _id: new ObjectId(id), deletedAt: null }) as TaskModel | null;

        return task && MongoDBTaskDatasource._mapDataToEntity(task);
    }

    async updateOne(id: string, task: Partial<TaskEntity>): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $set: MongoDBTaskDatasource._mapEntityToData(task as TaskEntity) });

        return result !== null;
    }
}
