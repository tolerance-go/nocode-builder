import { AppData, AppGroup } from "@/types";
import store from "store2";
import { proxy, subscribe } from "valtio";

const apps = proxy<{
  list: AppData[];
}>({
  list: store.get("apps")?.list || [],
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

subscribe(apps, () => {
  store.set("apps", apps);
});
