import React from 'react';
import { Flex, Radio } from 'antd';

export const AccountSelector: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group size="small" buttonStyle="solid">
      <Radio.Button value="a">@neo/sphinx</Radio.Button>
      <Radio.Button value="b">@neo/sigma</Radio.Button>
    </Radio.Group>
  </Flex>
);
