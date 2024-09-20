import Utils from "@uzenith360/utils";
import TaskEntity from "../../../domain/entities/task.entity";
import TaskModel from "../../datasources/mongodb/models/task.model";

/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/
// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
export default abstract class TaskDataSourceInterface {
    abstract createOne(task: TaskEntity): Promise<boolean>;
    abstract getAll(projectId: string, page: number, limit: number): Promise<TaskEntity[]>;
    abstract getOne(id: string): Promise<TaskEntity | null>;
    abstract updateOne(id: string, task: Partial<TaskEntity>): Promise<boolean>;

    static _mapDataToEntity(task: TaskModel): TaskEntity {
        const { _id, createdAt, updatedAt/*, projectId*/, status, title, deletedAt } = task;

        return Utils.removeUndefinedNullValuesFromObject({
            id: _id?.toString(),
            status,
            title,
            // projectId: projectId?.toString(),
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
            lastModified: !!updatedAt ? new Date(updatedAt).toISOString() : undefined,
        }) as unknown as TaskEntity;
    }

    static _mapEntityToData(task: TaskEntity): TaskModel {
        const { dateDeleted, status, title, dateAdded } = task;

        return Utils.removeUndefinedNullValuesFromObject({
            title,
            status,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        }) as unknown as TaskModel;
    };
}