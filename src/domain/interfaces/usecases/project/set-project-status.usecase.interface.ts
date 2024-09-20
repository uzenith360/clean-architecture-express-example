import projectStatus from "../../../project-status.enum";

export default interface SetProjectStatusUsecaseInterface {
    execute(id: string, status: projectStatus): Promise<boolean>;
}
