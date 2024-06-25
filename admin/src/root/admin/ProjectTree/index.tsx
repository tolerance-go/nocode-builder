import { createProject } from "@/services/api/createProject";
import { createProjectGroup } from "@/services/api/createProjectGroup";
import store from "@/store";
import { TreeMenu } from "./TreeMenu";

export const ProjectTree = () => {
  return (
    <TreeMenu
      initialTreeData={[]}
      onFolderAdd={async ({ title, parentKey }) => {
        try {
          store.projects.states.addFolderLoading = true;
          const result = await createProjectGroup({
            name: title,
            parentGroupId: parentKey as number,
          });
          return result.id;
        } finally {
          store.projects.states.addFolderLoading = false;
        }
      }}
      onFileAdd={async ({ title, parentKey }) => {
        try {
          store.projects.states.addFileLoading = true;
          const result = await createProject({
            name: title,
            projectGroupId: parentKey as number,
          });
          return result.id;
        } finally {
          store.projects.states.addFileLoading = false;
        }
      }}
    />
  );
};
