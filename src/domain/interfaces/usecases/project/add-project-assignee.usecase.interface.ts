import UserEntity from "../../../entities/user.entity";

export default interface AddProjectAttachmentUsecaseInterface {
    execute(projectId: string, assigneeId: string): Promise<boolean>;
}
