import { layoutPadding } from '@/modules/界面组件树管理模块/configs';
import { 测试标识 } from '@/common/constants';
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
      data-test-id={测试标识.视图编辑页面.区域}
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
          data-test-id={测试标识.视图编辑页面.舞台.区域}
        >
          <div
            style={{
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              backgroundColor: token.colorBgContainer,
              padding: layoutPadding(token),
            }}
            data-test-id={测试标识.视图编辑页面.舞台.头部}
          >
            header
          </div>
          <div data-test-id={测试标识.视图编辑页面.舞台.内容}>stage</div>
        </div>
        <div
          style={{
            width: 400,
            borderLeft: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
          }}
          data-test-id={测试标识.视图编辑页面.配置栏目.区域}
        >
          <div
            style={{
              flexGrow: 1,
            }}
            data-test-id={测试标识.视图编辑页面.配置栏目.上部}
          >
            toolPanel-top
          </div>
          <div
            style={{
              flexGrow: 1,
              borderTop: `1px solid ${token.colorBorderSecondary}`,
            }}
            data-test-id={测试标识.视图编辑页面.配置栏目.下部}
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
        data-test-id={测试标识.视图编辑页面.底部}
      >
        footer
      </div>
    </div>
  );
};
