import ProjectDatasourceInterface from "../../interfaces/datasources/project.datasource.interface";
import DatabaseWrapperInterface from "../../interfaces/datasources/database-wrapper.interface";
import ProjectModel from "./models/project.model";
import ProjectEntity, { ProjectAttachmentEntity } from "../../../domain/entities/project.entity";
import Utils from "@uzenith360/utils";
import { ObjectId } from "mongodb";
import UserEntity from "../../../domain/entities/user.entity";
import UserModel from "./models/user.model";
import projectStatus from "../../../domain/project-status.enum";
import TaskEntity from "../../../domain/entities/task.entity";
import taskStatus from "../../../domain/task-status.enum";

export default class MongoDBProjectDatasource extends ProjectDatasourceInterface {
    private database: DatabaseWrapperInterface
    constructor(database: DatabaseWrapperInterface) {
        super();

        this.database = database
    }

    async createOne(project: ProjectEntity): Promise<boolean> {
        const result = await this.database.insertOne(MongoDBProjectDatasource._mapEntityToData(project));

        return result !== null;
    }

    countOverdue(startDate: string, endDate: string): Promise<number> {
        const match: Record<string, string | null | Object>
            = {
            deletedAt: null,
            status: { $ne: projectStatus.completed },
            dueDate: { $lte: new Date() },
        };

        if (!!startDate) {
            match['createdAt'] = { $gte: new Date(startDate) }
        }

        if (!!endDate) {
            match['createdAt'] = { $lte: new Date(endDate) }
        }

        return this.database.count(match);
    }

    async getStats(startDate: string, endDate: string): Promise<Record<projectStatus, number> | null> {
        const match: Record<string, string | null | Object> = { deletedAt: null };

        if (!!startDate) {
            match['createdAt'] = { $gte: new Date(startDate) }
        }

        if (!!endDate) {
            match['createdAt'] = { $lte: new Date(endDate) }
        }

        const stats = await this.database.join(
            [
                {
                    $match: match
                },
                { $sortByCount: "$status" },
                { $project: { status: "$_id", count: 1, _id: 0 } }
            ]
        ) as { status: string, count: number }[] | null;

        return stats?.reduce(
            (acc, { status, count }) =>
                ({ ...acc, [status]: !!acc[status] ? (acc[status] + count) : count }),
            {} as Record<string, number>
        ) as Record<projectStatus, number> ?? null;
    }

    async getAll(page: number, limit: number): Promise<(ProjectEntity & { assignees?: UserEntity[] })[]> {
        const { limit: take, toSkip: skip } = Utils.getPaginationParameters(page, limit);

        const projects = await this.database.join(
            [
                {
                    $match: { deletedAt: null }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "assigneeIds",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $skip: skip },
                { $limit: take },
            ]
        ) as [ProjectModel & { users?: UserModel[] }] | null;

        return projects?.map((project) => MongoDBProjectDatasource._mapDataToEntity(project)) ?? [];
    }

    async getOne(id: string): Promise<ProjectEntity & { assignees?: UserEntity[] } | null> {
        const projects = await this.database.join(
            [
                {
                    $match: { _id: new ObjectId(id), deletedAt: null }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "assigneeIds",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $limit: 1 },
            ]
        ) as [ProjectModel & { users?: UserModel[] }] | null;

        const projectsWithUsers = projects?.[0];

        return !!projectsWithUsers ? MongoDBProjectDatasource._mapDataToEntity(projectsWithUsers) : null;
    }

    async updateOne(id: string, project: Partial<ProjectEntity>): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $set: MongoDBProjectDatasource._mapEntityToData(project as ProjectEntity) });

        return result !== null;
    }

    async addAssigneeId(id: string, assigneeId: string): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $push: { assigneeIds: assigneeId } }, { upsert: false });

        return result !== null;
    }

    async addAttachment(id: string, attachment: ProjectAttachmentEntity): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $push: { attachments: attachment } }, { upsert: false });

        return result !== null;
    }

    async addTask(id: string, task: TaskEntity): Promise<boolean> {
        const result = await this.database.updateOne({ _id: new ObjectId(id) }, { $push: { tasks: task } }, { upsert: false });

        return result !== null;
    }

    async removeAssigneeId(id: string, assigneeId: string): Promise<boolean> {
        const result = await this.database.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { assigneeIds: new ObjectId(assigneeId) } },
        );

        return result !== null;
    }

    async removeAttachment(id: string, attachmentId: string): Promise<boolean> {
        const result = await this.database.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { attachments: { _id: new ObjectId(attachmentId) } } }
        );

        return result !== null;
    }

    async removeTask(id: string, taskId: string): Promise<boolean> {
        const result = await this.database.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { tasks: { _id: new ObjectId(taskId) } } }
        );

        return result !== null;
    }

    async setTaskStatus(id: string, taskId: string, status: taskStatus): Promise<boolean> {
        const result = await this.database.updateOne(
            { _id: new ObjectId(id), "tasks._id": new ObjectId(taskId) },
            { $set: { tasks: { "tasks.$.status": status } } }
        );

        return result !== null;
    }
}
