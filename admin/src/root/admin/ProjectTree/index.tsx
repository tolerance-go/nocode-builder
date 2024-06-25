import { projectControllerCreateProject } from "@/services/api/projectControllerCreateProject";
import { projectGroupControllerCreateProjectGroup } from "@/services/api/projectGroupControllerCreateProjectGroup";
import { useRef, forwardRef, useImperativeHandle } from "react";
import { TreeMenuRef, TreeMenu } from "./TreeMenu";
import stores from "@/stores";

export const ProjectTree = forwardRef((props, ref) => {
  const treeMenuRef = useRef<TreeMenuRef>(null);

  useImperativeHandle(ref, () => ({
    addFile: () => {
      treeMenuRef.current?.addFile();
    },
    addFolder: () => {
      treeMenuRef.current?.addFolder();
    },
  }));

  return (
    <TreeMenu
      initialTreeData={[]}
      ref={treeMenuRef}
      onFolderAdd={async ({ title, parentKey }) => {
        try {
          stores.projects.states.addFolderLoading.loading = true;
          const result = await projectGroupControllerCreateProjectGroup({
            name: title,
            parentGroupId: parentKey as number,
          });
          return result.id;
        } finally {
          stores.projects.states.addFolderLoading.loading = false;
        }
      }}
      onFileAdd={async ({ title, parentKey }) => {
        try {
          stores.projects.states.addFileLoading.loading = true;
          const result = await projectControllerCreateProject({
            name: title,
            projectGroupId: parentKey as number,
          });
          return result.id;
        } finally {
          stores.projects.states.addFileLoading.loading = false;
        }
      }}
    />
  );
});
