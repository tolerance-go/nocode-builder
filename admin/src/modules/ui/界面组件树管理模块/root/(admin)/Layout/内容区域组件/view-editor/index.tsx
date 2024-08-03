import { layoutPadding } from '@/modules/ui/界面组件树管理模块/configs';
import { 组件测试标识 } from '@/common/constants';
import { Button, theme } from 'antd';
import { WidgetTree } from './WidgetTree';
import { WidgetDrawer, WidgetDrawerRef } from './WidgetDrawer';
import { useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Stage } from './Stage';

export const ViewEditor = () => {
  const { token } = theme.useToken();
  const drawerRef = useRef<WidgetDrawerRef>(null);
  const widgetOpenBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
        data-test-id={组件测试标识.视图编辑页面.区域}
      >
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundColor: token.colorBgContainer,
              borderRight: `1px solid ${token.colorBorderSecondary}`,
              width: 300,
            }}
          >
            <WidgetTree />
          </div>
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
              data-test-id={组件测试标识.视图编辑页面.舞台.区域}
            >
              <div
                style={{
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  backgroundColor: token.colorBgContainer,
                  padding: layoutPadding(token),
                }}
                data-test-id={组件测试标识.视图编辑页面.舞台.头部}
              >
                header
              </div>
              <div data-test-id={组件测试标识.视图编辑页面.舞台.内容}>
                <Stage />
              </div>
            </div>
            <div
              style={{
                width: 300,
                borderLeft: `1px solid ${token.colorBorderSecondary}`,
                backgroundColor: token.colorBgContainer,
                display: 'flex',
                flexDirection: 'column',
              }}
              data-test-id={组件测试标识.视图编辑页面.配置栏目.区域}
            >
              <div
                style={{
                  flexGrow: 1,
                }}
                data-test-id={组件测试标识.视图编辑页面.配置栏目.上部}
              >
                toolPanel-top
              </div>
              <div
                style={{
                  flexGrow: 1,
                  borderTop: `1px solid ${token.colorBorderSecondary}`,
                }}
                data-test-id={组件测试标识.视图编辑页面.配置栏目.下部}
              >
                toolPanel-bottom
              </div>
            </div>
          </div>
          <WidgetDrawer widgetOpenBtnRef={widgetOpenBtnRef} ref={drawerRef} />
        </div>
        <div
          style={{
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            backgroundColor: token.colorBgContainer,
            padding: layoutPadding(token),
            zIndex: token.zIndexPopupBase + 1,
          }}
          data-test-id={组件测试标识.视图编辑页面.底部}
        >
          <Button
            ref={widgetOpenBtnRef}
            size="small"
            type="text"
            onClick={() => {
              drawerRef.current?.switch();
            }}
          >
            部件库
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};
