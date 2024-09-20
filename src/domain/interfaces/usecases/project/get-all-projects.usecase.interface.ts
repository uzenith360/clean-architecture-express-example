import ProjectEntity from "../../../entities/project.entity";

export default interface GetAllProjectsUsecaseInterface {
    execute(page: number, limit: number): Promise<ProjectEntity[]>;
}
