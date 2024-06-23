import { AppData, AppGroup } from "@/types";
import { proxy } from "valtio";

const apps = proxy<{
  list: AppData[];
}>({
  list: [],
});

const appGroups = proxy<{
  list: AppGroup[];
}>({
  list: [],
});

export const states = proxy({
  apps,
  appGroups,
});

export const actions = {
  addApp: (newApp: AppData) => {
    states.apps.list.push(newApp);
  },
};

