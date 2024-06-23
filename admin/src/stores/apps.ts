import { App, AppGroup } from "@/types";
import { proxy } from "valtio";

const apps = proxy<{
  list: App[];
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
  addApp: (newApp: App) => {
    states.apps.list.push(newApp);
  },
};

