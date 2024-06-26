import { AppData, AppGroup } from "@/types";
import { createConfigMapByKey } from "@/utils/blueMap/createConfigMapById";
import { ensure } from "@/utils/ensure";
import { derive } from "derive-valtio";
import store from "store2";
import { proxy, subscribe } from "valtio";

const apps = proxy<{
  list: AppData[];
}>({
  list: store.get("apps")?.list || [],
});

const appsById = derive({
  ids: (get) => createConfigMapByKey(get(apps).list, "id"),
});

const appGroups = proxy<{
  list: AppGroup[];
}>({
  list: [],
});

export const states = proxy({
  apps,
  appGroups,
  appsById,
});

export const actions = {
  getAppById: (id: AppData["id"]) => {
    const app = states.apps.list.find((item) => item.id === id);
    ensure(app, "app 不存在。");
    return app;
  },
  addApp: (newApp: AppData) => {
    states.apps.list.push(newApp);
  },
  favoriteApp: (id: AppData["id"]) => {
    const app = states.apps.list.find((item) => item.id === id);
    ensure(app, "app 不存在。");
    app.ifFavorite = true;
  },
  unfavoriteApp: (id: AppData["id"]) => {
    const app = states.apps.list.find((item) => item.id === id);
    ensure(app, "app 不存在。");
    app.ifFavorite = false;
  },
  removeApp: (id: AppData["id"]) => {
    const index = states.apps.list.findIndex((item) => item.id === id);
    ensure(index !== -1, "app 不存在。");
    states.apps.list.splice(index, 1);
  },
};

subscribe(apps, () => {
  store.set("apps", apps);
});
