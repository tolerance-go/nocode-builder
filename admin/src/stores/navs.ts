import { topNavs } from "@/configs/navs";
import { APPS_NAV } from "@/constants";
import { SystemPaths } from "@/types";
import { ensure } from "@/utils/ensure";
import { findFirstItem } from "@/utils/findFirstItem";
import { proxy, subscribe } from "valtio";

type CurrentSystemPaths = {
  paths: SystemPaths;
  startsWithApp: boolean;
  startsWithAppAndId: boolean;
  isApp: boolean;
  activeTopNavKey: string | undefined;
  isAppData: boolean;
  isAppDesign: boolean;
  isAppDesignAndRightSideIsEditor: boolean;
  isAppDesignAndRightSideIsComponentStore: boolean;
  designPathItem: SystemPaths[number];
  /**
   * 当前 app 下 design 界面的右侧栏目的 componentStore 的 segmented 视图的导航名称
   */
  segmentedView: string | undefined;
};

export const currentSystemPaths = proxy<CurrentSystemPaths>({
  /**
   * 是一个不断增长的数组，并且可以在根部进行分叉增长（通过 subPaths）
   */
  paths:
    (JSON.parse(
      localStorage.getItem("currentSystemPaths.paths") || "null"
    ) as SystemPaths | null) ||
    ([
      {
        type: "nav",
        value: APPS_NAV,
      },
    ] as SystemPaths),
  get designPathItem() {
    return this.paths.find(
      (item: SystemPaths[number]) =>
        item.type === "nav" && item.value === "design"
    );
  },
  get segmentedView() {
    if (this.isAppDesignAndRightSideIsComponentStore) {
      return (
        this.designPathItem.subPaths?.rightSide[0].subPaths?.segmented?.[0]
          .value ?? undefined
      );
    }
    return undefined;
  },
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
  get isAppDesignAndRightSideIsEditor() {
    return (
      this.isAppDesign &&
      this.designPathItem.subPaths?.rightSide[0].type === "nav" &&
      this.designPathItem.subPaths?.rightSide[0].value === "editor"
    );
  },
  get isAppDesignAndRightSideIsComponentStore() {
    return (
      this.isAppDesign &&
      this.designPathItem.subPaths?.rightSide[0].type === "nav" &&
      this.designPathItem.subPaths?.rightSide[0].value === "componentStore"
    );
  },
  get isApp() {
    return this.paths.length === 1 && this.paths[0].value === APPS_NAV;
  },
  get startsWithApp() {
    return this.paths[0].value === APPS_NAV;
  },
  get startsWithAppAndId() {
    return this.startsWithApp && !!this.paths[1];
  },
  get activeTopNavKey() {
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

subscribe(currentSystemPaths, () => {
  localStorage.setItem(
    "currentSystemPaths.paths",
    JSON.stringify(currentSystemPaths.paths)
  );
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
  pushNavById: (id: string) => {
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
            value: APPS_NAV,
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
   * 选中 app 后，需要改变 paths，插入 2 个元素
   * 一个是 type 为 id 类型的元素，表示当前路径下的 app id
   * 紧接着是 type 为 nav 类型的元素，表示此时的激活路径，比如 design
   * 一个场景数据如下
   *
   * app -> :id -> design
   *
   * @param id
   */
  selectApp: (id: string) => {
    currentSelectedApp.id = id;

    /**
     * 假设此时 paths 长度为 1 且为 nav:app
     */
    actions.pushNavById(id);

    const appsIdFirstChild = findFirstItem(topNavs, APPS_NAV, ":id");

    ensure(!!appsIdFirstChild, "appsIdFirstChild 不能为空");

    actions.pushNav(appsIdFirstChild.key);
  },
  /**
   * 修改 design 的 rightSide 的导航为编辑器
   */
  changeDesignRightSideNav: (key: string) => {
    if (currentSystemPaths.designPathItem.subPaths === undefined) {
      currentSystemPaths.designPathItem.subPaths = {
        rightSide: [
          {
            type: "nav",
            value: key,
          },
        ],
      };
    } else {
      currentSystemPaths.designPathItem.subPaths.rightSide = [
        {
          type: "nav",
          value: key,
        },
      ];
    }
  },

  changeSegmentedView: (key: string) => {
    if (currentSystemPaths.isAppDesignAndRightSideIsComponentStore) {
      if (
        !currentSystemPaths.designPathItem.subPaths ||
        !currentSystemPaths.designPathItem.subPaths.rightSide
      ) {
        currentSystemPaths.designPathItem.subPaths = {
          rightSide: [
            {
              type: "nav",
              value: "componentStore",
              subPaths: {
                segmented: [
                  {
                    type: "nav",
                    value: key,
                  },
                ],
              },
            },
          ],
        };
      } else {
        currentSystemPaths.designPathItem.subPaths.rightSide[0].subPaths = {
          segmented: [
            {
              type: "nav",
              value: key,
            },
          ],
        };
      }
    }
  },
};
