import { SettingFilled, SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, Switch, theme } from 'antd';
import React from 'react';

export const OperationBar: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Space
      style={{
        paddingRight: token.paddingContentHorizontalSM / 2,
      }}
      split={<Divider type="vertical" />}
    >
      <Space>
        <Button type="primary" size="small">
          Quoter-ETH-JUPITER
        </Button>
        <Space.Compact>
          <Button type="primary" size="small">
            Hedger-ETH-OKEX
          </Button>
          <Button size="small" icon={<SettingOutlined />}></Button>
        </Space.Compact>
      </Space>

      <Space>
        <Button size="small" type="text">
          Resume
        </Button>
        <Button size="small" type="text">
          Pause
        </Button>
        <Button size="small" type="text">
          ResetMMP
        </Button>
        <Button size="small" type="text">
          AkrVol
        </Button>
      </Space>

      <Space>
        <Switch
          size="small"
          checkedChildren="DERIBIT"
          unCheckedChildren="DERIBIT"
          defaultChecked
        />
        <Switch size="small" checkedChildren="OKEX" unCheckedChildren="OKEX" />
      </Space>
    </Space>
  );
};
