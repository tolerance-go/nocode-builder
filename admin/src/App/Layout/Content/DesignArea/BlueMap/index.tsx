import { ContentToolBar } from "@/components/ContentToolBar";
import BlueMapGraph from "./BlueMapGraph";
import { Button, Space } from "antd";
import { useSearchData } from "@/utils/useSearchData";
import { SearchParams } from "@/types";

export const BlueMap = () => {
  const { updateSearchData } = useSearchData<
    Pick<SearchParams["/apps/:id/design"], "contentType">
  >({
    contentType: "design",
  });
  return (
    <div className="flex flex-col h-[100%]">
      <ContentToolBar>
        <Space>
          <Button
            size="small"
            type="text"
            onClick={() => {
              updateSearchData({
                contentType: "design",
                selectedEvent: undefined,
              });
            }}
          >
            关闭
          </Button>
        </Space>
      </ContentToolBar>
      <div className="flex-grow">
        <BlueMapGraph />
      </div>
    </div>
  );
};
