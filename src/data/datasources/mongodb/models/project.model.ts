/**
 * This is how the database stores the dara
 */

import { ObjectId } from "mongodb";
import projectStatus from "../../../../domain/project-status.enum";
import TaskModel from "./task.model";
export default interface ProjectModel {
    _id?: ObjectId;
    title: string;
    status: projectStatus;
    startDate?: Date;
    dueDate?: Date;
    description: string;
    assigneeIds: ObjectId[];
    tasks: TaskModel[];
    attachments: ProjectAttachmentModel[];
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ProjectAttachmentModel {
    _id?: ObjectId;
    url: string;
    createdAt: Date;
    deletedAt?: Date;
}