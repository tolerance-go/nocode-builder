import configs from "@/configs";
import { ensure } from "@/utils/ensure";
import { proxy } from "valtio";

/**
 * 当前系统路径
 *
 * eg: ['apps', 'appId']
 */
export type SystemPaths = {
  type: "nav" | "id";
  value: string;
}[];

export const currentSystemPaths = proxy<{
  paths: SystemPaths;
  startsWithApp: boolean;
  startsWithAppAndId: boolean;
  isApp: boolean;
  activeNavKey: string | undefined;
  isAppData: boolean;
  isAppDesign: boolean;
}>({
  paths: [
    {
      type: "nav",
      value: "apps",
    },
  ],
  get isAppData() {
    return (
      this.startsWithApp &&
      this.paths.length === 3 &&
      this.paths.at(2)?.value === "data"
    );
  },
  get isAppDesign() {
    return (
      this.startsWithApp &&
      this.paths.length === 3 &&
      this.paths.at(2)?.value === "design"
    );
  },
  get isApp() {
    return this.paths.length === 1 && this.paths[0].value === "apps";
  },
  get startsWithApp() {
    return this.paths[0].value === "apps";
  },
  get startsWithAppAndId() {
    return this.startsWithApp && !!this.paths[1];
  },
  get activeNavKey() {
    if (this.paths.length) {
      const last = this.paths.at(this.paths.length - 1) as SystemPaths[number];
      if (last.type === "id") {
        // 倒数第二个
        const penultimate = this.paths.at(
          this.paths.length - 2
        ) as SystemPaths[number];
        return penultimate.value;
      }
      return last.value;
    }
    return undefined;
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
      currentSystemPaths.paths[0].value = key;
      return;
    }

    if (currentSystemPaths.paths.length === 3) {
      currentSystemPaths.paths[2].value = key;
    }
  },

  /**
   * 追加导航
   */
  pushNav: (key: string) => {
    currentSystemPaths.paths.push({
      type: "nav",
      value: key,
    });
  },

  /**
   * 追加导航
   */
  pushId: (id: string) => {
    currentSystemPaths.paths.push({
      type: "id",
      value: id,
    });
  },

  /**
   * 回退导航
   */
  backNav: () => {
    // 清空选中
    if (currentSystemPaths.paths.length === 3) {
      if (currentSystemPaths.startsWithApp) {
        currentSystemPaths.paths = [
          {
            type: "nav",
            value: "apps",
          },
        ];

        if (currentSelectedApp.id) {
          currentSelectedApp.id = null;
        }
      }
    } else {
      currentSystemPaths.paths.pop();
    }
  },

  /**
   * 选中 app
   *
   * @param id
   */
  selectApp: (id: string) => {
    currentSelectedApp.id = id;

    actions.pushId(id);

    const appsFirstItemKey = configs.base.navs
      .find((item) => item.key === "apps")
      ?.items?.at(0)?.key;

    ensure(!!appsFirstItemKey, "appsFirstItemKey 不能为空");

    actions.pushNav(appsFirstItemKey);
  },
};
