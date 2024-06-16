import { Input, List, Typography } from "antd";
import React, { useState } from "react";

export const SearchNode = () => {
  const [searchValue, setSearchValue] = useState("");
  const [listItems, setListItems] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // 根据搜索内容更新列表
    setListItems([e.target.value, "Item 1", "Item 2", "Item 3"]); // 示例数据
  };

  return (
    <div className="bg-white border px-2 py-1 rounded-md h-[100%]">
      <div className="mb-1">
        <Typography.Text>此蓝图的所有操作</Typography.Text>
      </div>
      <Input.Search
        autoFocus
        size="small"
        placeholder="输入搜索内容"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <List
        size="small"
        bordered
        dataSource={listItems}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};
