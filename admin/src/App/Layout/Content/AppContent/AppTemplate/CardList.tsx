import { Template } from "@/types";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import { Button, Card, Space, Typography } from "antd";
import React from "react";

const { Meta } = Card;

interface CardListProps {
  templates: Template[];
}

export const CardList: React.FC<CardListProps> = ({ templates }) => (
  <div className="grid grid-cols-3 gap-5">
    {templates.map((template, index) => (
      <Card
        size="small"
        key={index}
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
              className="w-[400px] h-[200px] object-cover"
            />
            <div className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="w-full flex flex-col gap-2 items-center justify-center bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-all">
                <Button ghost icon={<EyeOutlined />}>
                  预览
                </Button>
                <Button ghost icon={<CopyOutlined />}>
                  选用
                </Button>
              </div>
            </div>
          </div>
        }
      >
        <Meta title={template.title} />
      </Card>
    ))}
  </div>
);
