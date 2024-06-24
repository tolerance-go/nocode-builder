import { Button, Space } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IconHoverableButton } from "@/components/BaseButton";

export const AppDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex border-b px-2 h-[34px] items-center justify-between">
        <Space>
          <Button
            size="small"
            type="default"
            autoInsertSpace={false}
            onClick={() => {
              navigate(`/apps/${0}/data`);
            }}
          >
            编辑
          </Button>
          <IconHoverableButton
            size="small"
            type="text"
            icon={<ShareAltOutlined />}
          ></IconHoverableButton>
          <IconHoverableButton
            size="small"
            type="text"
            icon={<StarOutlined />}
          ></IconHoverableButton>
          <IconHoverableButton
            size="small"
            type="text"
            icon={<EllipsisOutlined />}
          ></IconHoverableButton>
        </Space>
      </div>
      <div>
        <iframe></iframe>
      </div>
    </div>
  );
};
