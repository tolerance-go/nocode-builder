import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import { Button, Card } from "antd";
import React from "react";

const { Meta } = Card;

interface Template {
  previewImgSrc: string;
  title: string;
  type: string;
}

interface PreviewCardProps {
  template: Template;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ template }) => (
  <Card
    size="small"
    className="overflow-hidden"
    cover={
      <div
        className={cx(
          "relative hover:cursor-pointer",
          css`
            border-radius: 8px 8px 0 0;
          `
        )}
      >
        <img
          src={template.previewImgSrc}
          alt={template.title}
          className="object-cover"
          style={{
            width: template.type === "desktop" ? 400 : 200,
            height: template.type === "desktop" ? 200 : 400,
          }}
        />
        <div className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="w-full flex flex-col gap-2 items-center justify-center bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-all">
            <Button type="primary" icon={<CopyOutlined />}>
              使用
            </Button>
            <Button ghost icon={<EyeOutlined />}>
              预览
            </Button>
          </div>
        </div>
      </div>
    }
  >
    <Meta title={template.title} />
  </Card>
);
