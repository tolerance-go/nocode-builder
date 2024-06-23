import React from "react";
import { Card } from "antd";
import { EyeOutlined, DownloadOutlined, CopyOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";

const { Meta } = Card;

const cardData = [
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Europe Street beat",
    description: "www.instagram.com",
    imgSrc: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
];

export const CardList: React.FC = () => (
  <div className="grid grid-cols-3 gap-5">
    {cardData.map((card, index) => (
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
              src={card.imgSrc}
              alt={card.title}
              className="w-[400px] h-[200px] object-cover"
            />
            <div className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="w-1/2 flex items-center justify-center bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-all">
                <EyeOutlined className="text-2xl text-white" />
              </div>
              <div className="w-1/2 flex items-center justify-center bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-all">
                <CopyOutlined className="text-2xl text-white" />
              </div>
            </div>
          </div>
        }
      >
        <Meta title={card.title} />
      </Card>
    ))}
  </div>
);
