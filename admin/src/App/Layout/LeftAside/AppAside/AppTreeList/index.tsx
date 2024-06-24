import stores from "@/stores";
import {
  AppstoreOutlined,
  EllipsisOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/css";
import type { GetProps, TreeDataNode } from "antd";
import { Button, Dropdown, Tree } from "antd";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { buildTreeData } from "./utils/buildTreeData";
import colors from "tailwindcss/colors";
import { parseParamToNumber } from "@/utils/parseParamToNumber";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const AppTreeList: React.FC = () => {
  const appsSnapshot = useSnapshot(stores.apps.states.apps);
  const appGroupsSnapshot = useSnapshot(stores.apps.states.appGroups);
  const navigate = useNavigate();
  const match = useMatch("/apps/:id?");

  // 将 apps 和 appGroups 转换为 treeData
  const treeData = buildTreeData(appsSnapshot.list, appGroupsSnapshot.list);

  const onSelect: DirectoryTreeProps["onSelect"] = (_keys, info) => {
    if (info.selected) {
      navigate(`/apps/${info.node.key}`);
    }
  };

  return (
    <DirectoryTree
      blockNode
      className={css`
        .ant-tree-node-content-wrapper {
          display: inline-flex;
        }
        .ant-tree-title {
          flex-grow: 1;
        }
        .ant-tree-treenode {
          &:hover {
            .more-btn {
              opacity: 100;
              color: ${colors.gray[500]};
              &:hover {
                color: ${colors.gray[900]};
              }
            }
          }

          &.ant-tree-treenode-selected {
            &:hover {
              .more-btn {
                color: white !important;
              }
            }
          }
        }
      `}
      titleRender={(data) => {
        return (
          <div className="flex justify-between pr-1">
            {typeof data.title === "function" ? data.title(data) : data.title}
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "1",
                    label: "删除",
                    onClick: () => {
                      stores.apps.actions.removeApp(data.key);
                    },
                  },
                ],
              }}
            >
              <Button
                className="more-btn opacity-0"
                onClick={(e) => e.stopPropagation()}
                size="small"
                type="text"
                icon={<EllipsisOutlined />}
              ></Button>
            </Dropdown>
          </div>
        );
      }}
      defaultExpandAll
      selectedKeys={
        match?.params.id ? [parseParamToNumber(match.params.id)] : undefined
      }
      onSelect={onSelect}
      treeData={[
        {
          key: "all",
          title: "全部",
          isLeaf: true,
          icon: <AppstoreOutlined />,
        } as TreeDataNode,
        ...treeData,
      ]}
    />
  );
};

export default AppTreeList;
