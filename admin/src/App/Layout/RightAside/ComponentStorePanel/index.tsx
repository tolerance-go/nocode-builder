import { Button } from "antd";
import { ComponentStore } from "./ComponentStore";
import stores from "@/stores";

export const ComponentStorePanel = () => {
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
      <div className="flex-grow">
        <ComponentStore />
      </div>
    </div>
  );
};
