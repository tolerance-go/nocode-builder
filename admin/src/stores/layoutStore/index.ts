import { proxy } from "valtio";

export const layoutState = proxy({
  subSiderVisible: false,
  projectTreeTimeLineVisible: false,
});

export const showSubSiderAction = () => {
  layoutState.subSiderVisible = true;
};

export const closeSubSiderAction = () => {
  layoutState.subSiderVisible = false;
};

export const showProjectTreeTimeLineAction = () => {
  showSubSiderAction();
  layoutState.projectTreeTimeLineVisible = true;
};

export const closeProjectTreeTimeLineAction = () => {
  closeSubSiderAction();
  layoutState.projectTreeTimeLineVisible = false;
};

// subscribeKey(layoutState, "projectTreeTimeLineVisible", (visible) => {
//   if (!visible) {
//   }
// });
