import { css } from "@emotion/css";
import { Button, Input, Segmented, Select, Space, Typography } from "antd";
import { AppList } from "./AppList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { getValidParam } from "@/utils/getValidType";
import { updateSearchParams } from "@/utils/updateSearchParams";

export const AppAll = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    searchType: "list",
  });
  return (
    <div className="py-8 px-10">
      <div className="w-[1500px] mx-auto px-10">
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <Typography.Title level={3}>欢迎，Yarnb</Typography.Title>
              <Typography.Paragraph>
                以下是您可以访问的应用程序列表
              </Typography.Paragraph>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate("/apps/templates");
              }}
            >
              新建
            </Button>
          </Space>
          <Space>
            <Space.Compact>
              <Select
                variant="filled"
                defaultValue={"time"}
                options={[
                  {
                    label: "按更新时间排序",
                    value: "time",
                  },
                  {
                    label: "按状态排序",
                    value: "state",
                  },
                ]}
              />
              <Input.Search
                allowClear
                className={css`
                  .ant-input-affix-wrapper {
                    height: 32px;
                  }
                `}
              ></Input.Search>
            </Space.Compact>
            <Segmented
              value={getValidParam(
                searchParams.get("searchType"),
                ["list", "card"],
                "list"
              )}
              onChange={(type) => {
                setSearchParams(
                  updateSearchParams(searchParams, {
                    searchType: type,
                  })
                );
              }}
              options={[
                { value: "list", icon: <BarsOutlined /> },
                {
                  value: "card",
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
          </Space>
        </div>
        <AppList
          type={getValidParam(
            searchParams.get("searchType"),
            ["list", "card"],
            "list"
          )}
        />
      </div>
    </div>
  );
};
