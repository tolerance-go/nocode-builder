import { states } from "../states";

export const setExpandedKeys = (newExpandedKeys: React.Key[]) => {
  states.expandedKeys = newExpandedKeys;
};
