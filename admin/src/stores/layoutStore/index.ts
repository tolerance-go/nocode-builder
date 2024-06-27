import { proxy } from "valtio";

export const layoutState = proxy({
  subSiderVisible: false,
});

export const showSubSiderAction = () => {
  layoutState.subSiderVisible = true;
};

export const closeSubSiderAction = () => {
  layoutState.subSiderVisible = false;
};
