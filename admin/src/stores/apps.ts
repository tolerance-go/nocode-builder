import { AppData, AppGroup, DataKey } from "@/types";
import { ensure } from "@/utils/ensure";
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
};

subscribe(apps, () => {
  store.set("apps", apps);
});
