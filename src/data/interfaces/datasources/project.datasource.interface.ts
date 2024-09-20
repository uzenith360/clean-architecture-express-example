import { ObjectId } from "mongodb";
import Utils from "@uzenith360/utils";
import ProjectEntity, { ProjectAttachmentEntity } from "../../../domain/entities/project.entity";
import UserEntity from "../../../domain/entities/user.entity";
import ProjectModel from "../../datasources/mongodb/models/project.model";
import UserModel from "../../datasources/mongodb/models/user.model";
import UserDataSourceInterface from "./user.datasource.interface";
import projectStatus from "../../../domain/project-status.enum";
import TaskEntity from "../../../domain/entities/task.entity";
import taskStatus from "../../../domain/task-status.enum";

/**
 * Like database operations/operations directly on the data-source (database, file, memory, network etc)
 * Pass in the parameters, that will be interpreted to database specific parameters
 * Dont pass in database/data-source specific parameters here!!!
**/
// This serves as an interface, i wanted to get static methods but couldn't do that with typescript interface
export default abstract class ProjectDataSourceInterface {
    abstract createOne(project: ProjectEntity): Promise<boolean>;
    abstract getStats(startDate?: string, endDate?: string): Promise<Record<projectStatus, number> | null>;
    abstract countOverdue(startDate?: string, endDate?: string): Promise<number>;
    abstract getAll(page: number, limit: number): Promise<(ProjectEntity & { assignees?: UserEntity[] })[]>;
    abstract getOne(id: string): Promise<ProjectEntity & { assignees?: UserEntity[] } | null>;
    abstract updateOne(id: string, project: Partial<ProjectEntity>): Promise<boolean>;
    abstract addAssigneeId(id: string, assigneeId: string): Promise<boolean>;
    abstract addAttachment(id: string, attachment: ProjectAttachmentEntity): Promise<boolean>;
    abstract addTask(id: string, task: TaskEntity): Promise<boolean>;
    abstract removeAssigneeId(id: string, assigneeId: string): Promise<boolean>;
    abstract removeAttachment(id: string, attachmentId: string): Promise<boolean>;
    abstract removeTask(id: string, taskId: string): Promise<boolean>;
    abstract setTaskStatus(id: string, taskId: string, status: taskStatus): Promise<boolean>;

    static _mapDataToEntity(project: ProjectModel & { users?: UserModel[] }): ProjectEntity & { assignees?: UserEntity[] } {
        const { _id, createdAt, assigneeIds, attachments, description, startDate, status, tasks, title, dueDate, updatedAt, deletedAt, users } = project;

        return Utils.removeUndefinedNullValuesFromObject({
            id: _id?.toString(),
            assigneeIds: assigneeIds?.map((assigneeId: ObjectId) => assigneeId?.toString()),
            assignees: users?.map(UserDataSourceInterface._mapDataToEntity),
            attachments: attachments?.map(
                ({ _id, createdAt, deletedAt, ...others }) =>
                    Utils.removeUndefinedNullValuesFromObject(
                        {
                            ...others,
                            id: _id?.toString(),
                            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
                            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
                        }
                    )
            ),
            description,
            status,
            tasks: tasks?.map(
                ({ _id, createdAt, deletedAt, updatedAt, ...others }) =>
                    Utils.removeUndefinedNullValuesFromObject(
                        {
                            ...others,
                            id: _id?.toString(),
                            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
                            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
                            dateUpdated: !!updatedAt ? new Date(updatedAt).toISOString() : undefined,
                        }
                    )
            ),
            title,
            startDate: !!startDate ? new Date(startDate).toISOString() : undefined,
            dueDate: !!dueDate ? new Date(dueDate).toISOString() : undefined,
            dateDeleted: !!deletedAt ? new Date(deletedAt).toISOString() : undefined,
            dateAdded: !!createdAt ? new Date(createdAt).toISOString() : undefined,
            dateUpdated: !!updatedAt ? new Date(updatedAt).toISOString() : undefined,
        }) as unknown as ProjectEntity;
    }

    static _mapEntityToData(project: ProjectEntity): ProjectModel {
        const { dateDeleted, assigneeIds, attachments, description, startDate, status, tasks, title, dueDate, dateAdded } = project;

        return Utils.removeUndefinedNullValuesFromObject({
            assigneeIds: assigneeIds?.map((assigneeId: string) => new ObjectId(assigneeId)),
            attachments: attachments?.map(
                ({ id, dateAdded, dateDeleted, ...others }) =>
                    Utils.removeUndefinedNullValuesFromObject(
                        {
                            ...others,
                            _id: new ObjectId(id ?? undefined),
                            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
                            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
                        }
                    ),
            ),
            description,
            status,
            tasks: tasks?.map(
                ({ id, dateAdded, dateUpdated, dateDeleted, ...others }) =>
                    Utils.removeUndefinedNullValuesFromObject(
                        {
                            ...others, // ?? undefined, so a new ObjectId can be created, i.e it looks like no id was passed
                            _id: new ObjectId(id ?? undefined),
                            updatedAt: !!dateUpdated ? new Date(dateUpdated) : new Date(),
                            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
                            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
                        }
                    ),
            ),
            title,
            startDate: !!startDate ? new Date(startDate) : undefined,
            dueDate: !!dueDate ? new Date(dueDate) : undefined,
            updatedAt: new Date(),
            createdAt: (!!dateAdded ? new Date(dateAdded) : undefined)!,
            deletedAt: !!dateDeleted ? new Date(dateDeleted) : undefined,
        }) as unknown as ProjectModel;
    }
}