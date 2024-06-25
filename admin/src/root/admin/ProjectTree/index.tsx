import { useRef, forwardRef, useImperativeHandle } from "react";
import { TreeMenuRef, TreeMenu } from "./TreeMenu";
import store from "@/store";
import { createProjectGroup } from "@/services/api/createProjectGroup";
import { createProject } from "@/services/api/createProject";

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
});
