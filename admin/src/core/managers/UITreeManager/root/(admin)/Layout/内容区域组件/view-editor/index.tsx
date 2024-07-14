import { layoutPadding } from '@/core/managers/UITreeManager/configs';
import { theme } from 'antd';

export const ViewEditor = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              backgroundColor: token.colorBgContainer,
              padding: layoutPadding(token),
            }}
          >
            header
          </div>
          <div>stage</div>
        </div>
        <div
          style={{
            width: 400,
            borderLeft: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flexGrow: 1,
            }}
          >
            toolPanel-top
          </div>
          <div
            style={{
              flexGrow: 1,
              borderTop: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            toolPanel-bottom
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorBgContainer,
          padding: layoutPadding(token),
        }}
      >
        footer
      </div>
    </div>
  );
};
