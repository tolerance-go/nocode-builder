import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';

export const UpdateTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString(),
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <Tag>更新时间：{currentTime}</Tag>;
};
