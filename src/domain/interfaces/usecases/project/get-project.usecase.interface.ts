import ProjectEntity from "../../../entities/project.entity";

export default interface GetProjectUsecaseInterface {
    execute(id: string): Promise<ProjectEntity | null>;
}
