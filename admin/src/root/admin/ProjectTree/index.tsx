import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Suspense, useEffect, useRef } from "react";
import { TreeMenu } from "./TreeMenu";
import { debounce } from "lodash-es";
import { setContainerHeightAction } from "@/stores/projects/actions/setContainerHeightAction";

export const ProjectTree = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 当组件装载到 dom 上之后
   * 检查他的高度，然后调用 projectsStore.actions.setContainerHeight
   * 并且监听 dom 高度变化，同步设置
   * 设置 debounce 控制同步频率
   */
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        setContainerHeightAction(height);
      }
    };

    const debouncedUpdateHeight = debounce(updateHeight, 300);

    updateHeight();
    const resizeObserver = new ResizeObserver(debouncedUpdateHeight);
    const container = containerRef.current;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
      }}
    >
      <Suspense
        fallback={
          <Flex
            style={{
              height: "100%",
            }}
            justify="center"
            align="center"
          >
            <Spin indicator={<LoadingOutlined spin />} />
          </Flex>
        }
      >
        <TreeMenu />
      </Suspense>
    </div>
  );
};
