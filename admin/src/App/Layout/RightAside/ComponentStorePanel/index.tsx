import { Button, Segmented } from "antd";
import { ComponentStore } from "./ComponentStore";
import stores from "@/stores";
import { useSnapshot } from "valtio";

export const ComponentStorePanel = () => {
  const currentSystemPaths = useSnapshot(stores.navs.currentSystemPaths);

  const activeKey = currentSystemPaths.segmentedView ?? "component";

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-3 py-2">
        <Button
          size="small"
          type="text"
          onClick={() => {
            stores.navs.actions.changeDesignRightSideNav("editor");
          }}
        >
          编辑器
        </Button>
      </div>
      <Segmented
        options={[
          {
            label: "组件",
            value: "component",
          },
          {
            label: "区块",
            value: "section",
          },
          {
            label: "模板",
            value: "template",
          },
        ]}
        block
        value={activeKey}
        onChange={(val) => stores.navs.actions.changeSegmentedView(val)}
      />
      <div className="flex-grow">
        {activeKey === "component" && <ComponentStore />}
      </div>
    </div>
  );
};
