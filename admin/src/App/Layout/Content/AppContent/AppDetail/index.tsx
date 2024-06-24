import { Button, Space } from "antd";
import {
  EditOutlined,
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
          <IconHoverableButton
            size="small"
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/apps/${0}/data`);
            }}
          >
            编辑
          </IconHoverableButton>
          <IconHoverableButton size="small" type="text" icon={<ShareAltOutlined />}>
            分享
          </IconHoverableButton>
          <IconHoverableButton size="small" type="text" icon={<StarOutlined />}>
            收藏
          </IconHoverableButton>
        </Space>
      </div>
      <div>
        <iframe></iframe>
      </div>
    </div>
  );
};
