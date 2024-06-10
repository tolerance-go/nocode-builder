import { Typography } from "antd";
import ItemList from "./ItemList";

export const AppList = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div className="max-w-4xl">
          <Typography.Title level={2}>应用列表</Typography.Title>
          <Typography.Paragraph>
            Below you'll find the list of apps that you have access to
          </Typography.Paragraph>
          <ItemList />
        </div>
      </div>
    </>
  );
};
