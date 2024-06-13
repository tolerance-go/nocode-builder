import { Button } from "antd";
import Editor from "../../LeftAside/DesignAside/BottomPanel/Editor";
import stores from "@/stores";

export const EditorPanel = () => {
  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-3 py-2">
        <Button
          size="small"
          type="text"
          onClick={() => {
            stores.navs.actions.changeDesignRightSideNav("componentStore");
          }}
        >
          组件库
        </Button>
      </div>
      <div className="flex-grow">
        <Editor />
      </div>
    </div>
  );
};
