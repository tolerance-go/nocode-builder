import { createSelectors } from "@/utils";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { NetworkSlice, createNetworkSlice } from "./createNetworkSlice";
import {
  ProjectGroupTableDataSlice,
  createProjectGroupTableSlice,
} from "./createProjectGroupTableSlice";
import {
  ProjectTableDataSlice,
  createProjectTableSlice,
} from "./createProjectTableSlice";
import {
  ProjectTreeSlice,
  createProjectTreeSlice,
} from "./createProjectTreeSlice";
import { immer } from "zustand/middleware/immer";

interface FishSlice {
  fishes: number;
  addFish: () => void;
}

interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // you can reuse previous methods
    get().addBear();
    get().addFish();
    // or do them from scratch
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
});

export type States = {
  firstName: string;
  lastName: string;
};

export type Actions = {
  updateFirstName: (firstName: States["firstName"]) => void;
  updateLastName: (lastName: States["lastName"]) => void;
};

export const useAppStoreBase = create<
  States &
    Actions &
    BearSlice &
    FishSlice &
    SharedSlice &
    ProjectTreeSlice &
    ProjectTableDataSlice &
    ProjectGroupTableDataSlice &
    NetworkSlice
>()(
  devtools(
    immer((...a) => {
      const [set] = a;
      return {
        ...createNetworkSlice(...a),
        ...createProjectGroupTableSlice(...a),
        ...createProjectTableSlice(...a),
        ...createProjectTreeSlice(...a),
        ...createBearSlice(...a),
        ...createFishSlice(...a),
        ...createSharedSlice(...a),
        firstName: "firstName",
        lastName: "lastName",
        updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
        updateLastName: (lastName) => set(() => ({ lastName: lastName })),
      };
    }),
  ),
);

export const useAppStore = createSelectors(useAppStoreBase);
