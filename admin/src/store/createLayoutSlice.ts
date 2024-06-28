import { ImmerStateCreator } from "@/utils";

export type LayoutStates = {
  subSiderVisible: boolean;
  projectTreeTimeLineVisible: boolean;
};

export type LayoutActions = {
  showSubSiderAction: () => void;
  closeSubSiderAction: () => void;
  showProjectTreeTimeLineAction: () => void;
  closeProjectTreeTimeLineAction: () => void;
};

export type LayoutSlice = LayoutStates & LayoutActions;

export const createLayoutSlice: ImmerStateCreator<LayoutSlice, LayoutSlice> = (
  set,
) => ({
  subSiderVisible: false,
  projectTreeTimeLineVisible: false,
  showSubSiderAction: () => {
    set((state) => {
      state.subSiderVisible = true;
    });
  },
  closeSubSiderAction: () => {
    set((state) => {
      state.subSiderVisible = false;
    });
  },
  showProjectTreeTimeLineAction: () => {
    set((state) => {
      state.projectTreeTimeLineVisible = true;
      state.subSiderVisible = true;
    });
  },
  closeProjectTreeTimeLineAction: () => {
    set((state) => {
      state.projectTreeTimeLineVisible = false;
      state.subSiderVisible = false;
    });
  },
});
