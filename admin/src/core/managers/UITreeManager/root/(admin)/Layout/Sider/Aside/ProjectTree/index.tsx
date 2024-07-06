import { 更新容器高度, useAppDispatch } from '@/core/managers/UIStoreManager';
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { DirectoryTree } from './DirectoryTree';

export const ProjectTree = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

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
        dispatch(更新容器高度(height));
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
  }, [dispatch]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
      }}
    >
      <DirectoryTree />
    </div>
  );
};
