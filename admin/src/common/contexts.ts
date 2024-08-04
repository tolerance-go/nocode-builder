import { createContext, useContext } from 'react';

export const StageHeightContext = createContext<number>(0);

export const useStageHeight = () => useContext(StageHeightContext);
