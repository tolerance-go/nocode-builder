import { createContext, useContext } from 'react';

export const StageHeightContext = createContext<number>(0);

export const useStageHeight = () => useContext(StageHeightContext);

// 定义 StageSize 的类型
export interface StageSize {
  width: number;
  height: number;
}

// 创建 StageSizeContext 并提供默认值
export const StageSizeContext = createContext<StageSize>({
  width: 0,
  height: 0,
});

export const useStageSize = () => useContext(StageSizeContext);
