import projectStatus from "../project-status.enum";
import TaskEntity from "./task.entity";

export default interface ProjectEntity {
    id?: string;
    title: string;
    status: projectStatus;
    startDate?: string;
    dueDate?: string;
    description: string;
    assigneeIds: string[];
    tasks: TaskEntity[];
    attachments: ProjectAttachmentEntity[];
    dateAdded: string;
    dateUpdated?: string;
    dateDeleted?: string;
}

export interface ProjectAttachmentEntity {
    id?: string;
    url: string;
    dateAdded: string;
    dateDeleted?: string;
}
