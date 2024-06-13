import { Button, Segmented } from "antd";
import { ComponentStore } from "./ComponentStore";
import stores from "@/stores";
import { useQueryParams } from "@/hooks/useQueryParams";

export const ComponentStorePanel = () => {
  const [queryParams, updateQueryParams] = useQueryParams<{
    segmented: string;
  }>();

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
        value={queryParams.segmented ?? "component"}
        onChange={(val) =>
          updateQueryParams({
            segmented: val ?? undefined,
          })
        }
      />
      <div className="flex-grow">
        {queryParams.segmented === "component" && <ComponentStore />}
      </div>
    </div>
  );
};
