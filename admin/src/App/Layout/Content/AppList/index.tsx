import { Button, Flex, Input, Select, Typography } from "antd";
import ItemList from "./ItemList";

export const AppList = () => {
  const selectBefore = (
    <Select defaultValue="按名称排序">
      <Select.Option value="按名称排序">按名称排序</Select.Option>
      <Select.Option value="按状态排序">按状态排序</Select.Option>
    </Select>
  );

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-4xl mt-14">
          <Typography.Title level={2}>应用列表</Typography.Title>
          <Typography.Paragraph>
            Below you'll find the list of apps that you have access to
          </Typography.Paragraph>
          <Flex justify="space-between" className="my-8">
            <Button type="primary">创建应用</Button>
            <Input.Search
              addonBefore={selectBefore}
              className="max-w-[300px]"
            ></Input.Search>
          </Flex>
          <ItemList />
        </div>
      </div>
    </>
  );
};
