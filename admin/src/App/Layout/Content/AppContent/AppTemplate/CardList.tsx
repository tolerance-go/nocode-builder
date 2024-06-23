import React from "react";
import { Card } from "antd";

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
];

export const CardList: React.FC = () => (
  <div className="grid grid-cols-3 gap-5">
    {cardData.map((card, index) => (
      <Card
        key={index}
        cover={<img className='w-[400px] h-[150px] bg-gray-400' />}
      >
        <Meta title={card.title} description={card.description} />
      </Card>
    ))}
  </div>
);
