import taskStatus from "../task-status.enum";

export default interface TaskEntity {
    id?: string;
    title: string;
    status: taskStatus;
    dateAdded: string;
    dateDeleted?: string;
    dateUpdated: Date;
}

