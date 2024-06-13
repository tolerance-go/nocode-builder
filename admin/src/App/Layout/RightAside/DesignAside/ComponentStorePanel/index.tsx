import { Button, Segmented } from "antd";
import { useSearchParams } from "react-router-dom";
import { ComponentStore } from "./ComponentStore";

type SegmentedType = "component" | "section" | "template";

export const ComponentStorePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    segmented: "component",
  });

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-3 py-2">
        <Button
          size="small"
          type="text"
          onClick={() => {
            searchParams.set("designAsideType", "settings");
            setSearchParams(searchParams);
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
        value={searchParams.get("segmented") as SegmentedType}
        onChange={(val) => {
          searchParams.set("segmented", val);
          setSearchParams(searchParams);
        }}
      />
      <div className="flex-grow">
        {searchParams.get("segmented") === "component" && <ComponentStore />}
      </div>
    </div>
  );
};
