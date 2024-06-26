import { createProject } from "@/services/api/createProject";
import { createProjectGroup } from "@/services/api/createProjectGroup";
import { projectsStore } from "@/store/projects";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Suspense } from "react";
import { TreeMenu } from "./TreeMenu";

export const ProjectTree = () => {
  return (
    <Suspense
      fallback={
        <Flex
          style={{
            height: "100%",
          }}
          justify="center"
          align="center"
        >
          <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
      }
    >
      <TreeMenu
        initialTreeData={[]}
        onFolderAdd={async ({ title, parentKey }) => {
          try {
            projectsStore.states.addFolderLoading = true;
            const result = await createProjectGroup({
              name: title,
              parentGroupId: parentKey as number,
            });
            return result.id;
          } finally {
            projectsStore.states.addFolderLoading = false;
          }
        }}
        onFileAdd={async ({ title, parentKey }) => {
          try {
            projectsStore.states.addFileLoading = true;
            const result = await createProject({
              name: title,
              projectGroupId: parentKey as number,
            });
            return result.id;
          } finally {
            projectsStore.states.addFileLoading = false;
          }
        }}
      />
    </Suspense>
  );
};
