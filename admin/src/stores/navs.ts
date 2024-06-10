import { proxy } from "valtio";

/**
 * 当前系统路径
 *
 * eg: ['apps', 'appId']
 */
export type SystemPaths = string[];

export const currentSystemPaths = proxy<{
  paths: SystemPaths;
  startsWithApp: boolean;
  startsWithAppAndId: boolean;
  isApp: boolean;
}>({
  paths: ["apps"],
  get isApp() {
    return this.paths.length === 1 && this.paths[0] === "apps";
  },
  get startsWithApp() {
    return this.paths[0] === "apps";
  },
  get startsWithAppAndId() {
    return this.startsWithApp && !!this.paths[1];
  },
});

/**
 * 当前选中的应用 id
 *
 * @param index
 * @param item
 */
const currentSelectedApp = proxy<{
  id: string | null;
}>({
  id: null,
});

export const states = {
  currentSystemPaths,
  currentSelectedApp,
};

export const actions = {
  /**
   * 改变导航
   *
   * @param key
   * @returns
   */
  changeNav: (key: string) => {
    if (currentSystemPaths.paths.length === 1) {
      currentSystemPaths.paths[0] = key;
      return;
    }

    if (currentSystemPaths.paths.length === 2) {
      currentSystemPaths.paths[2] = key;
    }
  },

  /**
   * 追加导航
   */
  pushNav: (key: string) => {
    currentSystemPaths.paths.push(key);
  },

  /**
   * 回退导航
   */
  backNav: () => {
    currentSystemPaths.paths.pop();

    // 清空选中
    if (currentSystemPaths.paths.length === 1) {
      if (currentSelectedApp.id) {
        currentSelectedApp.id = null;
      }
    }
  },

  /**
   * 选中 app
   *
   * @param id
   */
  selectApp: (id: string) => {
    currentSelectedApp.id = id;

    actions.pushNav(id);
  },
};
