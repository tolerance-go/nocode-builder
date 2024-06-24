import { PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import { Button, Input, Select, Space, Typography } from "antd";
import { AppList } from "./AppList";
import { useNavigate } from "react-router-dom";

export const AppAll = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 px-10">
      <div className="w-[1500px] mx-auto">
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
              icon={<PlusOutlined />}
              
              type="primary"
              onClick={() => {
                navigate("/apps/templates");
              }}
            >
              新建
            </Button>
          </Space>
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
        </div>
        <AppList />
      </div>
    </div>
  );
};
