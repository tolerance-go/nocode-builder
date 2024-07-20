import { Flex, Typography } from 'antd';
import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <Flex
      vertical
      style={{
        height: '100vh',
      }}
      justify="center"
      align="center"
    >
      <Typography.Title>404 - Page Not Found</Typography.Title>
      <Typography.Paragraph>
        The page you are looking for does not exist.
      </Typography.Paragraph>
    </Flex>
  );
};
