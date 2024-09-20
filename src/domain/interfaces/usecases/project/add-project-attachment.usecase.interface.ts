import { ProjectAttachmentEntity } from "../../../entities/project.entity";

export default interface AddProjectAttachmentUsecaseInterface {
    execute(projectId: string, attachment: ProjectAttachmentEntity): Promise<boolean>;
}
