import { updateSearchParams } from "@/utils/updateSearchParams";
import { Button, Segmented } from "antd";
import { useSearchParams } from "react-router-dom";
import { ComponentStore } from "./ComponentStore";

type SegmentedType = "component" | "section" | "template";

export const ComponentStorePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    segmented: "component",
  });

  const segmented = searchParams.get("segmented") as SegmentedType;

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-3 py-2">
        <Button
          size="small"
          type="text"
          onClick={() => {
            setSearchParams(
              updateSearchParams(searchParams, {
                designAsideType: "settings",
              })
            );
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
        value={segmented}
        onChange={(val) => {
          setSearchParams(
            updateSearchParams(searchParams, {
              segmented: val,
            })
          );
        }}
      />
      <div className="flex-grow">
        {segmented === "component" && <ComponentStore />}
      </div>
    </div>
  );
};
