import { useQueryParams } from "@/hooks/useQueryParams";
import { Button, Segmented } from "antd";
import { ComponentStore } from "./ComponentStore";

type SegmentedType = "component" | "section" | "template";

export const ComponentStorePanel = () => {
  const [queryParams, updateQueryParams] = useQueryParams({
    segmented: "component" as SegmentedType,
  });

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-3 py-2">
        <Button
          size="small"
          type="text"
          onClick={() => {
            updateQueryParams({
              designAsideType: "settings",
            });
          }}
        >
          关闭
        </Button>
      </div>
      <Segmented<SegmentedType>
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
        value={queryParams.segmented}
        onChange={(val) =>
          updateQueryParams({
            segmented: val,
          })
        }
      />
      <div className="flex-grow">
        {queryParams.segmented === "component" && <ComponentStore />}
      </div>
    </div>
  );
};
