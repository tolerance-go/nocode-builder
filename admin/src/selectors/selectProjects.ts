import { ProjectTreeStates } from "@/store/createProjectTreeSlice";

export const selectProjects = (state: ProjectTreeStates) => state.projects;
